# Generated by the protocol buffer compiler.  DO NOT EDIT!
# sources: src/lib/proto/rov_actions.proto
# plugin: python-betterproto
from dataclasses import dataclass
from typing import (
    List,
    Optional,
)

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
class RovAction(betterproto.Message):
    rov_exchange_id: int = betterproto.int32_field(2)
    """Action exchange id (used to match up action requests and responses)"""

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


@dataclass(eq=False, repr=False)
class DoneResponse(betterproto.Message):
    message: Optional[str] = betterproto.string_field(
        1, optional=True, group="_Message"
    )
    """An optional status message to send back"""


@dataclass(eq=False, repr=False)
class ErrorResponse(betterproto.Message):
    message: str = betterproto.string_field(1)
    """The error message"""


@dataclass(eq=False, repr=False)
class ContinuedOutputResponse(betterproto.Message):
    message: str = betterproto.string_field(1)


@dataclass(eq=False, repr=False)
class PongResponse(betterproto.Message):
    time: int = betterproto.int64_field(1)
    """The time the ping was sent"""


@dataclass(eq=False, repr=False)
class Measurement(betterproto.Message):
    measurement_type: "SensorMeasurmentTypes" = betterproto.enum_field(1)
    """The sensor type (see RovSensorTypes)"""

    value: float = betterproto.float_field(2)
    """The sensor value"""


@dataclass(eq=False, repr=False)
class SensorUpdatesResponse(betterproto.Message):
    measurement_updates: List["Measurement"] = betterproto.message_field(1)
    """All the changed mesurements from the sensors: (see Measurement type)"""


@dataclass(eq=False, repr=False)
class PasswordRequiredResponse(betterproto.Message):
    rov_id: str = betterproto.string_field(1)
    """
    the id of the rov that is requesting a password (to be used to match tokens
    to rov's when using token based auth)
    """


@dataclass(eq=False, repr=False)
class PasswordAcceptedResponse(betterproto.Message):
    auth_token: str = betterproto.string_field(1)
    """Authtoken to use for future requests in place of the password"""


@dataclass(eq=False, repr=False)
class PasswordInvalidResponse(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class TokenAcceptedResponse(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class TokenInvalidResponse(betterproto.Message):
    pass


@dataclass(eq=False, repr=False)
class DriverChangedResponse(betterproto.Message):
    driver_peer_id: str = betterproto.string_field(1)
    """The new driver's peer id"""


@dataclass(eq=False, repr=False)
class ClientConnectedResponse(betterproto.Message):
    client_peer_id: str = betterproto.string_field(1)
    """The new client's peer id"""


@dataclass(eq=False, repr=False)
class ClientDisconnectedResponse(betterproto.Message):
    client_peer_id: str = betterproto.string_field(1)
    """The disconnected client's peer id"""


@dataclass(eq=False, repr=False)
class HeartbeatResponse(betterproto.Message):
    time: int = betterproto.int64_field(1)
    """The time the heartbeat was sent"""


@dataclass(eq=False, repr=False)
class RovResponse(betterproto.Message):
    rov_exchange_id: int = betterproto.int32_field(2)
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
    continued_output (for message responses that arrive in multiple parts such
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
    password_required (sent when a password is required to perform an action)
    """

    password_accepted: "PasswordAcceptedResponse" = betterproto.message_field(
        9, group="Body"
    )
    """password_accepted (sent when a password request action is accepted)"""

    password_invalid: "PasswordInvalidResponse" = betterproto.message_field(
        10, group="Body"
    )
    """
    password_invalid (sent when a password request action has the incorrect
    password)
    """

    token_accepted: "TokenAcceptedResponse" = betterproto.message_field(
        11, group="Body"
    )
    """
    token_accepted (sent when a token request action is accepted (replaces
    password for future requests))
    """

    token_invalid: "TokenInvalidResponse" = betterproto.message_field(12, group="Body")
    """token_invalid"""

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