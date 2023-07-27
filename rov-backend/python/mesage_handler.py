from __future__ import annotations
from typing import (
    TYPE_CHECKING,
    AsyncGenerator,
    Callable,
    Optional,
    Union,
)
from functools import wraps

import time
import logging
import asyncio

from config_reader import program_config
from rov_security.user_auth import user_auth
from sensors.sensors_controller import sensor_ctrl
from motion.motion_controller import motion_ctrl
from shell_cmd_utils import generate_cmd_continued_output_response, run_shell_cmd_async, read_full_cmd_output
from protobufs.rov_actions_proto import DataTransportMethod, ResponseBackendMetadata, betterproto, RovAction, SensorUpdatesResponse, RovResponse, DoneResponse, DriverChangedResponse, HeartbeatResponse, ErrorResponse, PasswordAcceptedResponse, PasswordInvalidResponse, PasswordRequiredResponse, PongResponse
from utilities import map_for_async_generator
from websocket_server import websocket_server

############################
###### setup logging #######
log = logging.getLogger(__name__)

def verify_authorization(require_password: bool, require_is_driver: bool):
    """ Decorator to verify that the sending user is authorized to perform the wrapped action handler function."""
    def decorator(func):
        @wraps(func)
        async def wrapper(self, *args, **kwargs):
            src_participant_id: str = kwargs['src_participant_id'] if 'src_participant_id' in kwargs else args[1]
            msg_data: RovAction = kwargs['msg_data'] if 'msg_data' in kwargs else args[2]
            resp = user_auth.check_authorization(src_participant_id,msg_data,require_password,require_is_driver)
            if resp is not None:
                message_handler.set_replay_action(src_participant_id, msg_data)
                return resp
            else:
                return await func(self, src_participant_id, msg_data)
        return wrapper
    return decorator
VERIFY_AUTHORIZATION = verify_authorization

class MessageHandlerClass:
    """ Handles all incoming and outgoing messages to the rov and events from the webrtc-relay."""
    last_msg_send_time: float = 0
    replay_actions: dict[str,RovAction] = {}

    def init(self):
        pass

    async def status_broadcast_loop(self):
        """ Main loop that sends periodic updates to all connected peers and handles peer timeouts. """
        while True:
            # Cut motors & keep looping if no one is connected to the rov (safety feature):
            if user_auth.designated_driver_id is None or not websocket_server.is_connected():
                motion_ctrl.stop_motors()
                # # if no one is connected continue looping
                await asyncio.sleep(0.1)
                continue

            # If we haven't recieved any messages recently from the driver, cut the motors (safety feature):
            if user_auth.get_time_since_last_driver_message() > 5 or user_auth.get_total_connected_users() == 0:
                motion_ctrl.stop_motors()
                break

            # get sensor updates from all sensors:
            sensor_updates = sensor_ctrl.get_sensor_updates()

            if len(sensor_updates) != 0:
                # Measurements has some values, send them to all connected peers
                await self.send_msg(RovResponse(sensor_updates=SensorUpdatesResponse(measurement_updates=sensor_updates),backend_metadata=ResponseBackendMetadata(target_user_ids=[])))
            elif self.last_msg_send_time < time.time() - 1:
                # otherwise send a heartbeat message to help the website clients know that the datachannel is still open
                time_ms = int(time.time() * 1000)
                await self.send_msg(RovResponse(heartbeat=HeartbeatResponse(time=time_ms),backend_metadata=ResponseBackendMetadata(target_user_ids=[])))

            await asyncio.sleep(0.002)

# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# Relay events (these are sent by the webrtc-relay when something happens)
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    # pylint: disable=too-many-branches
    # pylint: disable=too-many-statements
    async def handle_incoming_msg(self, raw_msg: Union[bytes, RovAction]):
        """
        Handle incoming messages from all peers
        :param msg_payload: the message payload bytes
        :param src_user_id: the peer id of the sender
        :param relay_peer_number: the number of the webrtc-relay relay peer that the message came through
        """

        msg_proto = self.parse_message(raw_msg)
        if msg_proto is None:
            print("msg_proto was None. Maybe it wasn't parsed successfully? line 114 messag ehandler.")
            return
        if msg_proto.backend_metadata is None:
            print("msg_proto.backend_metadata is None!")

        print("Msg_proto=", msg_proto)

        src_user_id = msg_proto.backend_metadata.from_user_id

        # >> Internal webpage events: (these are sent by the internal webpage to the backend in response to events)

        if msg_proto.backend_metadata.internal_webpage_evt:
            if(msg_proto.backend_metadata.internal_webpage_evt.RovConnected):
                return
            elif(msg_proto.backend_metadata.internal_webpage_evt.RovDisconnected):
                return
            elif(msg_proto.backend_metadata.internal_webpage_evt.UserConnected):
                return await user_auth.handle_user_connected(src_user_id)
            elif(msg_proto.backend_metadata.internal_webpage_evt.UserDisconnected):
                return await user_auth.handle_user_disconnected(src_user_id)


        # >> Actions that can be done by any peer:

        # Set the last_recived_msg_time for the peer:
        response = await user_auth.update_message_recived_stats(src_user_id)
        if response is not None:
            await self.send_msg(response)

        # typechecking protobuf oneOf fields doesn't yet work: https://github.com/danielgtaylor/python-betterproto/issues/358
        action, _ = betterproto.which_one_of(msg_proto, "Body")
        if action == "ping":
            response = await self.handle_ping_message(src_user_id, msg_proto)

        elif action == "password_attempt":
            response,auth_ok = await user_auth.handle_password_attempt(src_user_id, msg_proto)
            if auth_ok:
                await self.replay_action(src_user_id, msg_proto.exchange_id)

        elif action == "auth_token_attempt":
            response,auth_ok = await user_auth.handle_auth_token_attempt(src_user_id, msg_proto)
            if auth_ok:
                await self.replay_action(src_user_id, msg_proto.exchange_id)

        elif action == "rov_status_report":
            response = await self.handle_rov_status_report(src_user_id, msg_proto)

        elif action == "refresh_all_sensors":
            response = await self.handle_refresh_all_sensors(src_user_id, msg_proto)

        elif action == "begin_video_stream":
            response = await self.handle_begin_video_stream(src_user_id, msg_proto)

        # >> Actions that require the sending peer to be authenticated (have correctly done a password or token challenge before)

        elif action == "take_control":
            response = await self.handle_take_control(src_user_id, msg_proto)

        elif action == "take_photo":
            response = await self.handle_take_photo(src_user_id, msg_proto)

        elif action == "start_video_rec":
            response = await self.handle_start_video_rec(src_user_id, msg_proto)

        elif action == "stop_video_rec":
            response = await self.handle_stop_video_rec(src_user_id, msg_proto)

        elif action == "shutdown_rov":
            response = await self.handle_shutdown_rov(src_user_id, msg_proto)

        elif action == "reboot_rov":
            response = await self.handle_reboot_rov(src_user_id, msg_proto)

        elif action == "enable_wifi":
            response = await self.handle_enable_wifi(src_user_id, msg_proto)

        elif action == "disable_wifi":
            response = await self.handle_disable_wifi(src_user_id, msg_proto)

        elif action == "rov_logs":
            response = await self.handle_rov_logs(src_user_id, msg_proto)

        elif action == "restart_rov_services":
            response = await self.handle_restart_rov_services(src_user_id, msg_proto)

        # >> Actions that require the sending peer to be the designated driver:

        elif action == "move":
            response = await self.handle_move(src_user_id, msg_proto)

        elif action == "toggle_lights":
            response = await self.handle_toggle_lights(src_user_id, msg_proto)

        else:
            # If the message was not handled by any of the above, send an error response:
            # includes action requests that are invalid (do not contain an action parameter or an unknon action param):
            err_msg = 'No action specified' if action == "" else 'Unknown action: ' + action
            response = self.add_response_metadata(RovResponse(error=ErrorResponse(message=err_msg), exchange_id=msg_proto.exchange_id), [])

        # Send the response:
        if isinstance(response, RovResponse):
            response.exchange_id = msg_proto.exchange_id
            await self.send_msg(response)
        elif isinstance(response, AsyncGenerator):
            async for single_response in response:
                single_response.exchange_id = msg_proto.exchange_id
                await self.send_msg(single_response)
        else:
            raise Exception("Unexpected response type: " + str(type(msg_proto)))

# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# ROV Actions that can be done by anyone:
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    async def handle_ping_message(self, src_user_id: str, msg_data: RovAction) -> RovResponse:
        """Responds to a ping message with a pong message with the same timestamp"""
        # send back the same timestamp from the ping with a pong message
        return self.add_response_metadata(RovResponse(pong=PongResponse(time=msg_data.ping.time), exchange_id=msg_data.exchange_id), [src_user_id])

    async def handle_rov_status_report(self, src_user_id: str, msg_data: RovAction) -> AsyncGenerator[RovResponse,None]:
        """ Returns the generator of the status shell script"""
        msg_generator = generate_cmd_continued_output_response(msg_data.exchange_id, "/home/pi/rov-web/tooling/rasberry_pi_setup_scripts/rov_status_report.sh", cmd_timeout=20)
        return map_for_async_generator(msg_generator, self.add_response_metadata, [src_user_id])

    async def handle_refresh_all_sensors(self, src_user_id: str, msg_data: RovAction) -> RovResponse:
        """Refreshes all sensors and returns the results"""
        measurement_data = sensor_ctrl.get_all_sensor_values()
        return self.add_response_metadata(RovResponse(sensor_updates=SensorUpdatesResponse(measurement_updates=measurement_data), exchange_id=msg_data.exchange_id), [src_user_id])

    async def handle_begin_video_stream(self, src_user_id: str, msg_data: RovAction) -> None:
        """Begins streaming the video from the ROV's camera"""
        # TODO: This isn't used anymore, but it's still here in case we want to use it again
        return None

# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# Actions that require the sending peer to be the designated driver:
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    @VERIFY_AUTHORIZATION(require_password=False, require_is_driver=True)
    async def handle_move(self, src_user_id: str, msg_data: RovAction) -> None:
        """Moves the ROV in the given thrust vector & turn speed"""
        # Set the new rov motion target:
        motion_ctrl.set_rov_motion(msg_data.move.velocity_x, msg_data.move.velocity_y, msg_data.move.velocity_z, msg_data.move.angular_velocity_yaw)
        return None

    @VERIFY_AUTHORIZATION(require_password=False, require_is_driver=True)
    async def handle_toggle_lights(self, src_user_id: str, msg_data: RovAction) -> RovResponse:
        """Toggles the ROV lights on or off"""
        # TODO: implement toggle_light action
        return self.add_response_metadata(RovResponse(done=DoneResponse("(TODO!!!) Light NOT Toggled!")), [src_user_id])

# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# Actions that require the sending peer to be authenticated (have correctly done a password or token challenge before)
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    @VERIFY_AUTHORIZATION(require_password=True, require_is_driver=False)
    async def handle_take_control(self, src_user_id: str, msg_data: RovAction) -> RovResponse | None:
        """Changes the designated driver to the message sender"""
        # if the authenticated peer is trying to take control of the ROV, set their peer id to be the designated driver peer id.
        # Let all connected peers know that the designated driver has changed:
        return user_auth.change_driver(src_user_id)

    @VERIFY_AUTHORIZATION(require_password=True, require_is_driver=False)
    async def handle_shutdown_rov(self, src_user_id: str, msg_data: RovAction) -> RovResponse:
        """Shuts down the PI after a delay."""
        print("Shutting down...")
        await run_shell_cmd_async("sleep 4; sudo poweroff")
        return self.add_response_metadata(RovResponse(done=DoneResponse(message="OK: Shutting Down...")), [src_user_id])

    @VERIFY_AUTHORIZATION(require_password=True, require_is_driver=False)
    async def handle_reboot_rov(self, src_user_id: str, msg_data: RovAction) -> RovResponse:
        """Reboots the PI after a delay."""
        await run_shell_cmd_async("sleep 4; sudo reboot")
        return self.add_response_metadata(RovResponse(done=DoneResponse(message="OK: Rebooting...")), [src_user_id])

    @VERIFY_AUTHORIZATION(require_password=True, require_is_driver=False)
    async def handle_enable_wifi(self, src_user_id: str, msg_data: RovAction) -> RovResponse:
        """Enable WiFi by unblocking the wlan interface."""
        (cmd_out, cmd_err, status_code) = await read_full_cmd_output("sudo rfkill unblock wlan", cmd_timeout=5)
        if status_code == 0:
            return self.add_response_metadata(RovResponse(done=DoneResponse(message="OK: WiFi Enabled...")), [src_user_id])
        return self.add_response_metadata(RovResponse(error=ErrorResponse(message="ERROR: WiFi Enable Failed: " + cmd_out + cmd_err)), [src_user_id])

    @VERIFY_AUTHORIZATION(require_password=True, require_is_driver=False)
    async def handle_disable_wifi(self, src_user_id: str, msg_data: RovAction) -> RovResponse:
        """Disable WiFi by blocking the wlan interface."""
        (cmd_out, cmd_err, status_code) = await read_full_cmd_output("sudo rfkill block wlan", cmd_timeout=5)
        if status_code == 0:
            return self.add_response_metadata(RovResponse(done=DoneResponse(message="OK: WiFi Disabled...")), [src_user_id])
        return self.add_response_metadata(RovResponse(error=ErrorResponse(message="ERROR: WiFi Disable Failed: " + cmd_out + cmd_err)), [src_user_id])

    @VERIFY_AUTHORIZATION(require_password=True, require_is_driver=False)
    async def handle_rov_logs(self, src_user_id: str, msg_data: RovAction) -> AsyncGenerator[RovResponse, None]:
        """Return a generator that continuously outputs new systemd log messages as they appear plus the last 500 lines of log."""
        msg_generator = generate_cmd_continued_output_response(msg_data.exchange_id, "journalctl --unit=rov_python_code --unit=rov_go_code --unit=maintain_network --unit=nginx --no-pager --follow -n 500", cmd_timeout=20)
        return map_for_async_generator(msg_generator, self.add_response_metadata, [src_user_id])

    @VERIFY_AUTHORIZATION(require_password=True, require_is_driver=False)
    async def handle_restart_rov_services(self, src_user_id: str, msg_data: RovAction) -> AsyncGenerator[RovResponse, None]:
        msg_generator = generate_cmd_continued_output_response(msg_data.exchange_id, "/home/pi/rov-web/tooling/rasberry_pi_setup_scripts/fetch_changes.sh", cmd_timeout=20)
        return map_for_async_generator(msg_generator, self.add_response_metadata, [src_user_id])

    @VERIFY_AUTHORIZATION(require_password=True, require_is_driver=False)
    async def handle_take_photo(self, src_user_id: str, msg_data: RovAction) -> RovResponse:
        # TODO: implement take_photo action"
        return self.add_response_metadata(RovResponse(done=DoneResponse("(TODO!!!) Photo NOT Captured!")), [src_user_id])

    @VERIFY_AUTHORIZATION(require_password=True, require_is_driver=False)
    async def handle_start_video_rec(self, src_user_id: str, msg_data: RovAction) -> RovResponse:
        # TODO: implement start_video_rec action"
        return self.add_response_metadata(RovResponse(done=DoneResponse("(TODO!!!) Video NOT Recording!")), [src_user_id])

    @VERIFY_AUTHORIZATION(require_password=True, require_is_driver=False)
    async def handle_stop_video_rec(self, src_user_id: str, msg_data: RovAction) -> RovResponse:
        # TODO: implement stop_video_rec action"
        return self.add_response_metadata(RovResponse(done=DoneResponse("(TODO!!!) Video NOT Stopped!")), [src_user_id])


# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
# Helper Functions
# >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    def add_response_metadata(self, msg: RovResponse, recipient_ids: list[str] = [], transport_method: DataTransportMethod = DataTransportMethod.LivekitReliable) -> RovResponse:
        """ Add metadata to a message to be sent to one or more users.
        :param msg: the protobuf message to add metadata to
        :param recipient_ids: the list of livekit user IDs to send the message to (if empty, broadcast to ALL users)
        :param transport_method: the transport method to use to send the message (default: DataTransportMethod.DirectReliable)
        """
        msg.backend_metadata = ResponseBackendMetadata(target_user_ids=recipient_ids, transport_method=transport_method)
        return msg

    async def send_msg(self, msg: RovResponse):
        """
        Send a message to a list of livekit users (via websocket -> rov-internal-browser -> livekit-webrtc -> user-browser).
        """
        self.last_msg_send_time = time.time()
        if not msg.is_set("heartbeat") and not msg.is_set("sensor_updates") and not msg.is_set("continued_output"):
            print("Sending Message: ", msg)
        return await websocket_server.broadcast(msg.SerializeToString())

    def parse_message(self, raw_msg: Union[bytes,RovAction]) -> Optional[RovAction]:
        """
        Parse a message from the websocket and return the contents of the message.
        :param message_payload: the message payload to parse as bytes (protobuf message)
        :return: the decoded message data as an RovAction class instance.
        """
        if isinstance(raw_msg, RovAction):
            return raw_msg # return the message if it's already parsed

        elif isinstance(raw_msg, bytes):
            try:
                return RovAction().parse(raw_msg) # decode message payload as a protobuf message:
            except Exception as error:
                log.error("Parse Message Error: %s", error, exc_info=True)
                return None

        else:
            log.warning("Got unknown incoming message payload type: %s", str(type(raw_msg)))
            return None


    def set_replay_action(self,src_user_id: str, rov_action: RovAction):
        """ Saves the action request for the given exchange_id. """
        if src_user_id in self.replay_actions and rov_action.exchange_id is not None:
            user_auth.known_users[src_user_id].replay_actions[rov_action.exchange_id] = rov_action

    async def replay_action(self,src_user_id: str, exchange_id: int):
        """ Replays any action request with the given exchange_id that was previously sent by a user """
        if src_user_id in user_auth.known_users:
            replay_action = user_auth.known_users[src_user_id].replay_actions.get(exchange_id, None)
            if replay_action is not None:
                del user_auth.known_users[src_user_id].replay_actions[exchange_id]
                await self.handle_incoming_msg(replay_action)

message_handler = MessageHandlerClass()
