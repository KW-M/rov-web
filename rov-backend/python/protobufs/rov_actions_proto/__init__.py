# Generated by the protocol buffer compiler.  DO NOT EDIT!
# sources: shared/protobufs/rov_actions.proto
# plugin: python-betterproto
from dataclasses import dataclass
from typing import List

import betterproto


class SensorMeasurmentTypes(betterproto.Enum):
    depth_meters = 0
    water_temp_celsius = 1
    pressure_mbar = 2
    yaw_degrees = 3
    pitch_degrees = 4
    roll_degrees = 5
    x_acceleration_m_s2 = 6
    y_acceleration_m_s2 = 7
    z_acceleration_m_s2 = 8
    battery_voltage = 9
    battery_current_amps = 10
    internal_temp_celsius = 11


class DataTransportMethod(betterproto.Enum):
    LivekitReliable = 0
    """
    Livekit reliable messages are sent / received through the livekit server
    via TCP.
    """

    LivekitUnreliable = 1
    """
    Livekit unreliable messages are sent / received through the livekit server
    via UDP (messages may get lost in transit).
    """

    DirectUnreliable = 3
    """
    // [[[ Unlikely to get used ]]] Direct reliable messages are sent/recived
    over the simplepeer webrtc connection via TCP DirectReliable = 2; Direct
    unreliable messages are sent/recived over the simplepeer webrtc connection
    via UDP (messages may get lost in transit)
    """


class InternalWebpageEvent(betterproto.Enum):
    RovConnected = 0
    """The rov has connected to at least one livekit server"""

    RovDisconnected = 1
    """The rov is disconnected from all livekit servers"""

    UserConnected = 2
    """A livekit user has connected to the rov"""

    UserDisconnected = 3
    """A livekit user has disconnected from the rov"""


@dataclass(eq=False, repr=False)
class Measurement(betterproto.Message):
    """Storez a single sensor measurement/value"""

    measurement_type: "SensorMeasurmentTypes" = betterproto.enum_field(1)
    """The sensor type (see RovSensorTypes)"""

    value: float = betterproto.float_field(2)
    """The sensor value"""


@dataclass(eq=False, repr=False)
class PingAction(betterproto.Message):
    time: int = betterproto.int64_field(1)
    """The time the ping was sent"""


@dataclass(eq=False, repr=False)
class PasswordAttemptAction(betterproto.Message):
    password: str = betterproto.string_field(1)
    """The password to attempt"""


@dataclass(eq=False, repr=False)
class AuthTokenAttemptAction(betterproto.Message):
    token: str = betterproto.string_field(1)
    """The token to attempt"""


@dataclass(eq=False, repr=False)
class TakeControlAction(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class MoveAction(betterproto.Message):
    velocity_x: float = betterproto.float_field(1)
    """
    How to move the rov (X is left/right, Y is forward/backward, Z is up/down,
    Yaw is rotation))
    """

    velocity_y: float = betterproto.float_field(2)
    velocity_z: float = betterproto.float_field(3)
    angular_velocity_yaw: float = betterproto.float_field(4)


@dataclass(eq=False, repr=False)
class BeginVideoStreamAction(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class TakePhotoAction(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class StartVideoRecAction(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class StopVideoRecAction(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class ToogleLightsAction(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class ShutdownRovAction(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class RebootRovAction(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class EnableWifiAction(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class DisableWifiAction(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class RovStatusReportAction(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class RestartRovServicesAction(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class RovLogsAction(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class RefreshAllSensorsAction(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class MavlinkAction(betterproto.Message):
    message: bytes = betterproto.bytes_field(1)


@dataclass(eq=False, repr=False)
class SimplepeerSignalAction(betterproto.Message):
    message: str = betterproto.string_field(1)


@dataclass(eq=False, repr=False)
class ActionBackendMetadata(betterproto.Message):
    from_user_id: str = betterproto.string_field(1)
    """
    The identity of the livekit user/client that sent the message or the
    message relates to. !!!! This MUST get overwritten by the backend with the
    true origin user before being sent to the python code for security.
    """

    internal_webpage_evt: "InternalWebpageEvent" = betterproto.enum_field(2)
    """
    If an event happens such as a user connection or disconnection this will be
    set:
    """


@dataclass(eq=False, repr=False)
class RovAction(betterproto.Message):
    """
    wrapper message for anything sent by a pilot/spectator to the rov (aka an
    "action").
    """

    backend_metadata: "ActionBackendMetadata" = betterproto.message_field(1)
    """
    Metadata set by backend webpage before the message is forwarded to the
    python code.
    """

    exchange_id: int = betterproto.int32_field(2)
    """
    MUST BE UNIQUE! Message exchange id (used to match up action requests and
    responses and prevent duplicate messages from being processed)
    """

    ping: "PingAction" = betterproto.message_field(3, group="Body")
    """ping"""

    password_attempt: "PasswordAttemptAction" = betterproto.message_field(
        4, group="Body"
    )
    """password_attempt"""

    auth_token_attempt: "AuthTokenAttemptAction" = betterproto.message_field(
        5, group="Body"
    )
    """authtoken_attempt"""

    take_control: "TakeControlAction" = betterproto.message_field(6, group="Body")
    """take_control"""

    move: "MoveAction" = betterproto.message_field(7, group="Body")
    """move"""

    begin_video_stream: "BeginVideoStreamAction" = betterproto.message_field(
        8, group="Body"
    )
    """begin_video_stream"""

    take_photo: "TakePhotoAction" = betterproto.message_field(9, group="Body")
    """take_photo"""

    start_video_rec: "StartVideoRecAction" = betterproto.message_field(10, group="Body")
    """start_video_rec"""

    stop_video_rec: "StopVideoRecAction" = betterproto.message_field(11, group="Body")
    """stop_video_rec"""

    toogle_lights: "ToogleLightsAction" = betterproto.message_field(12, group="Body")
    """toogle_lights"""

    shutdown_rov: "ShutdownRovAction" = betterproto.message_field(13, group="Body")
    """shutdown_rov"""

    reboot_rov: "RebootRovAction" = betterproto.message_field(14, group="Body")
    """reboot_rov"""

    enable_wifi: "EnableWifiAction" = betterproto.message_field(15, group="Body")
    """enable_wifi"""

    disable_wifi: "DisableWifiAction" = betterproto.message_field(16, group="Body")
    """disable_wifi"""

    rov_status_report: "RovStatusReportAction" = betterproto.message_field(
        17, group="Body"
    )
    """rov_status_report"""

    restart_rov_services: "RestartRovServicesAction" = betterproto.message_field(
        18, group="Body"
    )
    """restart_rov_services"""

    rov_logs: "RovLogsAction" = betterproto.message_field(19, group="Body")
    """rov_logs"""

    refresh_all_sensors: "RefreshAllSensorsAction" = betterproto.message_field(
        20, group="Body"
    )
    """refresh_all_sensors"""

    mavlink: "MavlinkAction" = betterproto.message_field(21, group="Body")
    """mavlink"""

    simplepeer_signal: "SimplepeerSignalAction" = betterproto.message_field(
        22, group="Body"
    )
    """simplepeer_signal"""


@dataclass(eq=False, repr=False)
class DoneResponse(betterproto.Message):
    """
    sent to a specific client when an action is received by the rov and
    completes successfully.
    """

    message: str = betterproto.string_field(1)
    """An optional informational status message to send back"""


@dataclass(eq=False, repr=False)
class ErrorResponse(betterproto.Message):
    """
    sent to a specific client when an action is received by the rov and DOES
    NOT complete successfully.
    """

    message: str = betterproto.string_field(1)
    """The error message"""


@dataclass(eq=False, repr=False)
class PongResponse(betterproto.Message):
    """sent to a specific client in response to a ping request"""

    time: int = betterproto.int64_field(1)
    """The time the ping was sent"""


@dataclass(eq=False, repr=False)
class SensorUpdatesResponse(betterproto.Message):
    """
    sent to all clients whenever a sensor measurement changes or after a
    refresh_all_sensors action is sent.
    """

    measurement_updates: List["Measurement"] = betterproto.message_field(1)
    """All the changed mesurements from the sensors: (see Measurement type)"""


@dataclass(eq=False, repr=False)
class PasswordRequiredResponse(betterproto.Message):
    """
    sent to a specific client when the proceding action sent by the client to
    the rov requires a password to show the rov that the client has privilages.
    """

    rov_id: str = betterproto.string_field(1)
    """
    the id of the rov that is requesting a password (to be used to match tokens
    to rov's when using token based auth)
    """


@dataclass(eq=False, repr=False)
class PasswordAcceptedResponse(betterproto.Message):
    """
    sent when a password or token attempt is accepted by the rov. The rov will
    additionally do whatever action required the password or token in the first
    place.
    """

    auth_token: str = betterproto.string_field(1)
    """Authtoken to use for future requests in place of the password"""


@dataclass(eq=False, repr=False)
class PasswordInvalidResponse(betterproto.Message):
    """sent when a password or token attempt is not accepted by the rov."""

    pass


@dataclass(eq=False, repr=False)
class DriverChangedResponse(betterproto.Message):
    """
    sent to all clients (including the new driver) whenever the designated
    driver client changes.
    """

    driver_peer_id: str = betterproto.string_field(1)
    """The new driver's peer id"""


@dataclass(eq=False, repr=False)
class ClientConnectedResponse(betterproto.Message):
    """
    sent to all clients (including the new client) whenever a new client
    connects to the rov.
    """

    client_peer_id: str = betterproto.string_field(1)
    """The new client's peer id"""


@dataclass(eq=False, repr=False)
class ClientDisconnectedResponse(betterproto.Message):
    """
    sent to all clients whenever a client becomes disconnected from the rov
    (either due to leaving or a network timeout).
    """

    client_peer_id: str = betterproto.string_field(1)
    """The disconnected client's peer id"""


@dataclass(eq=False, repr=False)
class HeartbeatResponse(betterproto.Message):
    """
    sent at a regular interval to all clients regardless of their connection
    status.
    """

    time: int = betterproto.int64_field(1)
    """The time the heartbeat was sent"""


@dataclass(eq=False, repr=False)
class ContinuedOutputResponse(betterproto.Message):
    """
    sent to a specific client for responses that have multiple parts such as
    logs or shell command output that output in an async manner.
    """

    message: str = betterproto.string_field(1)


@dataclass(eq=False, repr=False)
class MavlinkResponse(betterproto.Message):
    """reserved for future use by the mavlink protocol if we ever need it."""

    message: bytes = betterproto.bytes_field(1)


@dataclass(eq=False, repr=False)
class SimplepeerSignalResponse(betterproto.Message):
    """
    used by the simplepeer signalling protocol to establish a direct webrtc
    connection between the rov and driver client (bypassing livekit).
    """

    message: str = betterproto.string_field(1)


@dataclass(eq=False, repr=False)
class ResponseBackendMetadata(betterproto.Message):
    target_user_i_ds: List[str] = betterproto.string_field(1)
    """
    The identiies of the livekit user/clients to sent this response to. !!!! If
    empty, the message will be sent to ALL clients.
    """

    transport_method: "DataTransportMethod" = betterproto.enum_field(2)
    """How to send this response (reliable/unreliable):"""


@dataclass(eq=False, repr=False)
class RovResponse(betterproto.Message):
    """
    wrapper message for any message sent by the rov to a pilot/spectator (aka a
    response).
    """

    backend_metadata: "ResponseBackendMetadata" = betterproto.message_field(1)
    """
    Metadata sent by the python code to the backend webpage to tell it how to
    send the message. !!!! This field WILL be erased before the message is
    forwarded from the backend website to the livekit users.
    """

    exchange_id: int = betterproto.int32_field(2)
    """
    Response exchange id (used to match up action requests and responses)
    """

    done: "DoneResponse" = betterproto.message_field(3, group="Body")
    """done (action was completed successfully)"""

    error: "ErrorResponse" = betterproto.message_field(4, group="Body")
    """error (action failed)"""

    pong: "PongResponse" = betterproto.message_field(5, group="Body")
    """pong (response to a ping action)"""

    continued_output: "ContinuedOutputResponse" = betterproto.message_field(
        6, group="Body"
    )
    """
    continued_output (for string responses that arrive in multiple parts such
    as logs or shell command output)
    """

    sensor_updates: "SensorUpdatesResponse" = betterproto.message_field(7, group="Body")
    """
    sensor_updates (gives a list of sensor updates containing only new/changed
    sensors and their current values)
    """

    password_required: "PasswordRequiredResponse" = betterproto.message_field(
        8, group="Body"
    )
    """
    password_required (sent when a password is required before an action is
    performed)
    """

    password_accepted: "PasswordAcceptedResponse" = betterproto.message_field(
        9, group="Body"
    )
    """password_accepted (sent when a password request is accepted)"""

    password_invalid: "PasswordInvalidResponse" = betterproto.message_field(
        10, group="Body"
    )
    """
    password_invalid (sent when a password or token challenge action has an
    incorrect password or token)
    """

    driver_changed: "DriverChangedResponse" = betterproto.message_field(
        13, group="Body"
    )
    """driver_changed"""

    client_connected: "ClientConnectedResponse" = betterproto.message_field(
        14, group="Body"
    )
    """client_connected"""

    client_disconnected: "ClientDisconnectedResponse" = betterproto.message_field(
        15, group="Body"
    )
    """client_disconnected"""

    heartbeat: "HeartbeatResponse" = betterproto.message_field(16, group="Body")
    """heartbeat"""

    mavlink: "MavlinkResponse" = betterproto.message_field(17, group="Body")
    """mavlink"""

    simplepeer_signal: "SimplepeerSignalResponse" = betterproto.message_field(
        18, group="Body"
    )
    """simplepeer_signal"""