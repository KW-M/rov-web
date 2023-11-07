export enum MavCmd {
	MAV_CMD_NAV_WAYPOINT = 16, // Navigate to waypoint.
	MAV_CMD_NAV_LOITER_UNLIM = 17, // Loiter around this waypoint an unlimited amount of time
	MAV_CMD_NAV_LOITER_TURNS = 18, // Loiter around this waypoint for X turns
	MAV_CMD_NAV_LOITER_TIME = 19, // Loiter around this waypoint for X seconds
	MAV_CMD_NAV_RETURN_TO_LAUNCH = 20, // Return to launch location
	MAV_CMD_NAV_LAND = 21, // Land at location.
	MAV_CMD_NAV_TAKEOFF = 22, // Takeoff from ground / hand. Vehicles that support multiple takeoff modes (e.g. VTOL quadplane) should take off using the currently configured mode.
	MAV_CMD_NAV_LAND_LOCAL = 23, // Land at local position (local frame only)
	MAV_CMD_NAV_TAKEOFF_LOCAL = 24, // Takeoff from local position (local frame only)
	MAV_CMD_NAV_FOLLOW = 25, // Vehicle following, i.e. this waypoint represents the position of a moving vehicle
	MAV_CMD_NAV_CONTINUE_AND_CHANGE_ALT = 30, // Continue on the current course and climb/descend to specified altitude.  When the altitude is reached continue to the next command (i.e., don't proceed to the next command until the desired altitude is reached.
	MAV_CMD_NAV_LOITER_TO_ALT = 31, // Begin loiter at the specified Latitude and Longitude.  If Lat=Lon=0, then loiter at the current position.  Don't consider the navigation command complete (don't leave loiter) until the altitude has been reached. Additionally, if the Heading Required parameter is non-zero the aircraft will not leave the loiter until heading toward the next waypoint.
	MAV_CMD_DO_FOLLOW = 32, // Begin following a target
	MAV_CMD_DO_FOLLOW_REPOSITION = 33, // Reposition the MAV after a follow target command has been sent
	MAV_CMD_NAV_ROI = 80, // Sets the region of interest (ROI) for a sensor set or the vehicle itself. This can then be used by the vehicle's control system to control the vehicle attitude and the attitude of various sensors such as cameras.
	MAV_CMD_NAV_PATHPLANNING = 81, // Control autonomous path planning on the MAV.
	MAV_CMD_NAV_SPLINE_WAYPOINT = 82, // Navigate to waypoint using a spline path.
	MAV_CMD_NAV_ALTITUDE_WAIT = 83, // Mission command to wait for an altitude or downwards vertical speed. This is meant for high altitude balloon launches, allowing the aircraft to be idle until either an altitude is reached or a negative vertical speed is reached (indicating early balloon burst). The wiggle time is how often to wiggle the control surfaces to prevent them seizing up.
	MAV_CMD_NAV_VTOL_TAKEOFF = 84, // Takeoff from ground using VTOL mode, and transition to forward flight with specified heading. The command should be ignored by vehicles that dont support both VTOL and fixed-wing flight (multicopters, boats,etc.).
	MAV_CMD_NAV_VTOL_LAND = 85, // Land using VTOL mode
	MAV_CMD_NAV_GUIDED_ENABLE = 92, // hand control over to an external controller
	MAV_CMD_NAV_DELAY = 93, // Delay the next navigation command a number of seconds or until a specified time
	MAV_CMD_NAV_PAYLOAD_PLACE = 94, // Descend and place payload. Vehicle moves to specified location, descends until it detects a hanging payload has reached the ground, and then releases the payload. If ground is not detected before the reaching the maximum descent value (param1), the command will complete without releasing the payload.
	MAV_CMD_NAV_LAST = 95, // NOP - This command is only used to mark the upper limit of the NAV/ACTION commands in the enumeration
	MAV_CMD_CONDITION_DELAY = 112, // Delay mission state machine.
	MAV_CMD_CONDITION_CHANGE_ALT = 113, // Ascend/descend to target altitude at specified rate. Delay mission state machine until desired altitude reached.
	MAV_CMD_CONDITION_DISTANCE = 114, // Delay mission state machine until within desired distance of next NAV point.
	MAV_CMD_CONDITION_YAW = 115, // Reach a certain target angle.
	MAV_CMD_CONDITION_LAST = 159, // NOP - This command is only used to mark the upper limit of the CONDITION commands in the enumeration
	MAV_CMD_DO_SET_MODE = 176, // Set system mode.
	MAV_CMD_DO_JUMP = 177, // Jump to the desired command in the mission list.  Repeat this action only the specified number of times
	MAV_CMD_DO_CHANGE_SPEED = 178, // Change speed and/or throttle set points
	MAV_CMD_DO_SET_HOME = 179, // Changes the home location either to the current location or a specified location.
	MAV_CMD_DO_SET_PARAMETER = 180, // Set a system parameter.  Caution!  Use of this command requires knowledge of the numeric enumeration value of the parameter.
	MAV_CMD_DO_SET_RELAY = 181, // Set a relay to a condition.
	MAV_CMD_DO_REPEAT_RELAY = 182, // Cycle a relay on and off for a desired number of cycles with a desired period.
	MAV_CMD_DO_SET_SERVO = 183, // Set a servo to a desired PWM value.
	MAV_CMD_DO_REPEAT_SERVO = 184, // Cycle a between its nominal setting and a desired PWM for a desired number of cycles with a desired period.
	MAV_CMD_DO_FLIGHTTERMINATION = 185, // Terminate flight immediately
	MAV_CMD_DO_CHANGE_ALTITUDE = 186, // Change altitude set point.
	MAV_CMD_DO_LAND_START = 189, // Mission command to perform a landing. This is used as a marker in a mission to tell the autopilot where a sequence of mission items that represents a landing starts.
	  It may also be sent via a COMMAND_LONG to trigger a landing, in which case the nearest (geographically) landing sequence in the mission will be used.
	  The Latitude/Longitude/Altitude is optional, and may be set to 0 if not needed. If specified then it will be used to help find the closest landing sequence.
	
	MAV_CMD_DO_RALLY_LAND = 190, // Mission command to perform a landing from a rally point.
	MAV_CMD_DO_GO_AROUND = 191, // Mission command to safely abort an autonomous landing.
	MAV_CMD_DO_REPOSITION = 192, // Reposition the vehicle to a specific WGS84 global position.
	MAV_CMD_DO_PAUSE_CONTINUE = 193, // If in a GPS controlled position mode, hold the current position or continue.
	MAV_CMD_DO_SET_REVERSE = 194, // Set moving direction to forward or reverse.
	MAV_CMD_DO_SET_ROI_LOCATION = 195, // Sets the region of interest (ROI) to a location. This can then be used by the vehicle's control system to control the vehicle attitude and the attitude of various sensors such as cameras.
	MAV_CMD_DO_SET_ROI_WPNEXT_OFFSET = 196, // Sets the region of interest (ROI) to be toward next waypoint, with optional pitch/roll/yaw offset. This can then be used by the vehicle's control system to control the vehicle attitude and the attitude of various sensors such as cameras.
	MAV_CMD_DO_SET_ROI_NONE = 197, // Cancels any previous ROI command returning the vehicle/sensors to default flight characteristics. This can then be used by the vehicle's control system to control the vehicle attitude and the attitude of various sensors such as cameras.
	MAV_CMD_DO_SET_ROI_SYSID = 198, // Mount tracks system with specified system ID. Determination of target vehicle position may be done with GLOBAL_POSITION_INT or any other means.
	MAV_CMD_DO_CONTROL_VIDEO = 200, // Control onboard camera system.
	MAV_CMD_DO_SET_ROI = 201, // Sets the region of interest (ROI) for a sensor set or the vehicle itself. This can then be used by the vehicle's control system to control the vehicle attitude and the attitude of various sensors such as cameras.
	MAV_CMD_DO_DIGICAM_CONFIGURE = 202, // Configure digital camera. This is a fallback message for systems that have not yet implemented PARAM_EXT_XXX messages and camera definition files (see https://mavlink.io/en/services/camera_def.html ).
	MAV_CMD_DO_DIGICAM_CONTROL = 203, // Control digital camera. This is a fallback message for systems that have not yet implemented PARAM_EXT_XXX messages and camera definition files (see https://mavlink.io/en/services/camera_def.html ).
	MAV_CMD_DO_MOUNT_CONFIGURE = 204, // Mission command to configure a camera or antenna mount
	MAV_CMD_DO_MOUNT_CONTROL = 205, // Mission command to control a camera or antenna mount
	MAV_CMD_DO_SET_CAM_TRIGG_DIST = 206, // Mission command to set camera trigger distance for this flight. The camera is triggered each time this distance is exceeded. This command can also be used to set the shutter integration time for the camera.
	MAV_CMD_DO_FENCE_ENABLE = 207, // Mission command to enable the geofence
	MAV_CMD_DO_PARACHUTE = 208, // Mission item/command to release a parachute or enable/disable auto release.
	MAV_CMD_DO_MOTOR_TEST = 209, // Mission command to perform motor test.
	MAV_CMD_DO_INVERTED_FLIGHT = 210, // Change to/from inverted flight.
	MAV_CMD_DO_GRIPPER = 211, // Mission command to operate a gripper.
	MAV_CMD_DO_AUTOTUNE_ENABLE = 212, // Enable/disable autotune.
	MAV_CMD_NAV_SET_YAW_SPEED = 213, // Sets a desired vehicle turn angle and speed change.
	MAV_CMD_DO_SET_CAM_TRIGG_INTERVAL = 214, // Mission command to set camera trigger interval for this flight. If triggering is enabled, the camera is triggered each time this interval expires. This command can also be used to set the shutter integration time for the camera.
	MAV_CMD_DO_SET_RESUME_REPEAT_DIST = 215, // Set the distance to be repeated on mission resume
	MAV_CMD_DO_SPRAYER = 216, // Control attached liquid sprayer
	MAV_CMD_DO_SEND_SCRIPT_MESSAGE = 217, // Pass instructions onto scripting, a script should be checking for a new command
	MAV_CMD_DO_AUX_FUNCTION = 218, // Execute auxiliary function
	MAV_CMD_DO_MOUNT_CONTROL_QUAT = 220, // Mission command to control a camera or antenna mount, using a quaternion as reference.
	MAV_CMD_DO_GUIDED_MASTER = 221, // set id of master controller
	MAV_CMD_DO_GUIDED_LIMITS = 222, // Set limits for external control
	MAV_CMD_DO_ENGINE_CONTROL = 223, // Control vehicle engine. This is interpreted by the vehicles engine controller to change the target engine state. It is intended for vehicles with internal combustion engines
	MAV_CMD_DO_SET_MISSION_CURRENT = 224, // Set the mission item with sequence number seq as current item. This means that the MAV will continue to this mission item on the shortest path (not following the mission items in-between).
	MAV_CMD_DO_LAST = 240, // NOP - This command is only used to mark the upper limit of the DO commands in the enumeration
	MAV_CMD_PREFLIGHT_CALIBRATION = 241, // Trigger calibration. This command will be only accepted if in pre-flight mode. Except for Temperature Calibration, only one sensor should be set in a single message and all others should be zero.
	MAV_CMD_PREFLIGHT_SET_SENSOR_OFFSETS = 242, // Set sensor offsets. This command will be only accepted if in pre-flight mode.
	MAV_CMD_PREFLIGHT_UAVCAN = 243, // Trigger UAVCAN configuration (actuator ID assignment and direction mapping). Note that this maps to the legacy UAVCAN v0 function UAVCAN_ENUMERATE, which is intended to be executed just once during initial vehicle configuration (it is not a normal pre-flight command and has been poorly named).
	MAV_CMD_PREFLIGHT_STORAGE = 245, // Request storage of different parameter values and logs. This command will be only accepted if in pre-flight mode.
	MAV_CMD_PREFLIGHT_REBOOT_SHUTDOWN = 246, // Request the reboot or shutdown of system components.
	MAV_CMD_OVERRIDE_GOTO = 252, // Override current mission with command to pause mission, pause mission and move to position, continue/resume mission. When param 1 indicates that the mission is paused (MAV_GOTO_DO_HOLD), param 2 defines whether it holds in place or moves to another position.
	MAV_CMD_OBLIQUE_SURVEY = 260, // Mission command to set a Camera Auto Mount Pivoting Oblique Survey (Replaces CAM_TRIGG_DIST for this purpose). The camera is triggered each time this distance is exceeded, then the mount moves to the next position. Params 4~6 set-up the angle limits and number of positions for oblique survey, where mount-enabled vehicles automatically roll the camera between shots to emulate an oblique camera setup (providing an increased HFOV). This command can also be used to set the shutter integration time for the camera.
	MAV_CMD_MISSION_START = 300, // start running a mission
	MAV_CMD_COMPONENT_ARM_DISARM = 400, // Arms / Disarms a component
	MAV_CMD_RUN_PREARM_CHECKS = 401, // Instructs system to run pre-arm checks.  This command should return MAV_RESULT_TEMPORARILY_REJECTED in the case the system is armed, otherwse MAV_RESULT_ACCEPTED.  Note that the return value from executing this command does not indicate whether the vehicle is armable or not, just whether the system has successfully run/is currently running the checks.  The result of the checks is reflected in the SYS_STATUS message.
	MAV_CMD_GET_HOME_POSITION = 410, // Request the home position from the vehicle.
	MAV_CMD_START_RX_PAIR = 500, // Starts receiver pairing.
	MAV_CMD_GET_MESSAGE_INTERVAL = 510, // Request the interval between messages for a particular MAVLink message ID. The receiver should ACK the command and then emit its response in a MESSAGE_INTERVAL message.
	MAV_CMD_SET_MESSAGE_INTERVAL = 511, // Set the interval between messages for a particular MAVLink message ID. This interface replaces REQUEST_DATA_STREAM.
	MAV_CMD_REQUEST_MESSAGE = 512, // Request the target system(s) emit a single instance of a specified message (i.e. a "one-shot" version of MAV_CMD_SET_MESSAGE_INTERVAL).
	MAV_CMD_REQUEST_PROTOCOL_VERSION = 519, // Request MAVLink protocol version compatibility. All receivers should ACK the command and then emit their capabilities in an PROTOCOL_VERSION message
	MAV_CMD_REQUEST_AUTOPILOT_CAPABILITIES = 520, // Request autopilot capabilities. The receiver should ACK the command and then emit its capabilities in an AUTOPILOT_VERSION message
	MAV_CMD_REQUEST_CAMERA_INFORMATION = 521, // Request camera information (CAMERA_INFORMATION).
	MAV_CMD_REQUEST_CAMERA_SETTINGS = 522, // Request camera settings (CAMERA_SETTINGS).
	MAV_CMD_REQUEST_STORAGE_INFORMATION = 525, // Request storage information (STORAGE_INFORMATION). Use the command's target_component to target a specific component's storage.
	MAV_CMD_STORAGE_FORMAT = 526, // Format a storage medium. Once format is complete, a STORAGE_INFORMATION message is sent. Use the command's target_component to target a specific component's storage.
	MAV_CMD_REQUEST_CAMERA_CAPTURE_STATUS = 527, // Request camera capture status (CAMERA_CAPTURE_STATUS)
	MAV_CMD_REQUEST_FLIGHT_INFORMATION = 528, // Request flight information (FLIGHT_INFORMATION)
	MAV_CMD_RESET_CAMERA_SETTINGS = 529, // Reset all camera settings to Factory Default
	MAV_CMD_SET_CAMERA_MODE = 530, // Set camera running mode. Use NaN for reserved values. GCS will send a MAV_CMD_REQUEST_VIDEO_STREAM_STATUS command after a mode change if the camera supports video streaming.
	MAV_CMD_SET_CAMERA_ZOOM = 531, // Set camera zoom. Camera must respond with a CAMERA_SETTINGS message (on success).
	MAV_CMD_SET_CAMERA_FOCUS = 532, // Set camera focus. Camera must respond with a CAMERA_SETTINGS message (on success).
	MAV_CMD_JUMP_TAG = 600, // Tagged jump target. Can be jumped to with MAV_CMD_DO_JUMP_TAG.
	MAV_CMD_DO_JUMP_TAG = 601, // Jump to the matching tag in the mission list. Repeat this action for the specified number of times. A mission should contain a single matching tag for each jump. If this is not the case then a jump to a missing tag should complete the mission, and a jump where there are multiple matching tags should always select the one with the lowest mission sequence number.
	MAV_CMD_DO_GIMBAL_MANAGER_PITCHYAW = 1000, // Set gimbal manager pitch/yaw setpoints (low rate command). It is possible to set combinations of the values below. E.g. an angle as well as a desired angular rate can be used to get to this angle at a certain angular rate, or an angular rate only will result in continuous turning. NaN is to be used to signal unset. Note: only the gimbal manager will react to this command - it will be ignored by a gimbal device. Use GIMBAL_MANAGER_SET_PITCHYAW if you need to stream pitch/yaw setpoints at higher rate. 
	MAV_CMD_DO_GIMBAL_MANAGER_CONFIGURE = 1001, // Gimbal configuration to set which sysid/compid is in primary and secondary control.
	MAV_CMD_IMAGE_START_CAPTURE = 2000, // Start image capture sequence. CAMERA_IMAGE_CAPTURED must be emitted after each capture.

          Param1 (id) may be used to specify the target camera: 0: all cameras, 1 to 6: autopilot-connected cameras, 7-255: MAVLink camera component ID.
          It is needed in order to target specific cameras connected to the autopilot, or specific sensors in a multi-sensor camera (neither of which have a distinct MAVLink component ID).
          It is also needed to specify the target camera in missions.

          When used in a mission, an autopilot should execute the MAV_CMD for a specified local camera (param1 = 1-6), or resend it as a command if it is intended for a MAVLink camera (param1 = 7 - 255), setting the command's target_component as the param1 value (and setting param1 in the command to zero).
          If the param1 is 0 the autopilot should do both.

          When sent in a command the target MAVLink address is set using target_component.
          If addressed specifically to an autopilot: param1 should be used in the same way as it is for missions (though command should NACK with MAV_RESULT_DENIED if a specified local camera does not exist).
          If addressed to a MAVLink camera, param 1 can be used to address all cameras (0), or to separately address 1 to 7 individual sensors. Other values should be NACKed with MAV_RESULT_DENIED.
          If the command is broadcast (target_component is 0) then param 1 should be set to 0 (any other value should be NACKED with MAV_RESULT_DENIED). An autopilot would trigger any local cameras and forward the command to all channels.
        
	MAV_CMD_IMAGE_STOP_CAPTURE = 2001, // Stop image capture sequence.

          Param1 (id) may be used to specify the target camera: 0: all cameras, 1 to 6: autopilot-connected cameras, 7-255: MAVLink camera component ID.
          It is needed in order to target specific cameras connected to the autopilot, or specific sensors in a multi-sensor camera (neither of which have a distinct MAVLink component ID).
          It is also needed to specify the target camera in missions.

          When used in a mission, an autopilot should execute the MAV_CMD for a specified local camera (param1 = 1-6), or resend it as a command if it is intended for a MAVLink camera (param1 = 7 - 255), setting the command's target_component as the param1 value (and setting param1 in the command to zero).
          If the param1 is 0 the autopilot should do both.

          When sent in a command the target MAVLink address is set using target_component.
          If addressed specifically to an autopilot: param1 should be used in the same way as it is for missions (though command should NACK with MAV_RESULT_DENIED if a specified local camera does not exist).
          If addressed to a MAVLink camera, param1 can be used to address all cameras (0), or to separately address 1 to 7 individual sensors. Other values should be NACKed with MAV_RESULT_DENIED.
          If the command is broadcast (target_component is 0) then param 1 should be set to 0 (any other value should be NACKED with MAV_RESULT_DENIED). An autopilot would trigger any local cameras and forward the command to all channels.
        
	MAV_CMD_DO_TRIGGER_CONTROL = 2003, // Enable or disable on-board camera triggering system.
	MAV_CMD_CAMERA_TRACK_POINT = 2004, // If the camera supports point visual tracking (CAMERA_CAP_FLAGS_HAS_TRACKING_POINT is set), this command allows to initiate the tracking.
	MAV_CMD_CAMERA_TRACK_RECTANGLE = 2005, // If the camera supports rectangle visual tracking (CAMERA_CAP_FLAGS_HAS_TRACKING_RECTANGLE is set), this command allows to initiate the tracking.
	MAV_CMD_CAMERA_STOP_TRACKING = 2010, // Stops ongoing tracking.
	MAV_CMD_VIDEO_START_CAPTURE = 2500, // Starts video capture (recording).
	MAV_CMD_VIDEO_STOP_CAPTURE = 2501, // Stop the current video capture (recording).
	MAV_CMD_VIDEO_START_STREAMING = 2502, // Start video streaming
	MAV_CMD_VIDEO_STOP_STREAMING = 2503, // Stop the given video stream
	MAV_CMD_REQUEST_VIDEO_STREAM_INFORMATION = 2504, // Request video stream information (VIDEO_STREAM_INFORMATION)
	MAV_CMD_REQUEST_VIDEO_STREAM_STATUS = 2505, // Request video stream status (VIDEO_STREAM_STATUS)
	MAV_CMD_LOGGING_START = 2510, // Request to start streaming logging data over MAVLink (see also LOGGING_DATA message)
	MAV_CMD_LOGGING_STOP = 2511, // Request to stop streaming log data over MAVLink
	MAV_CMD_AIRFRAME_CONFIGURATION = 2520, // 
	MAV_CMD_CONTROL_HIGH_LATENCY = 2600, // Request to start/stop transmitting over the high latency telemetry
	MAV_CMD_PANORAMA_CREATE = 2800, // Create a panorama at the current position
	MAV_CMD_DO_VTOL_TRANSITION = 3000, // Request VTOL transition
	MAV_CMD_ARM_AUTHORIZATION_REQUEST = 3001, // Request authorization to arm the vehicle to a external entity, the arm authorizer is responsible to request all data that is needs from the vehicle before authorize or deny the request. If approved the progress of command_ack message should be set with period of time that this authorization is valid in seconds or in case it was denied it should be set with one of the reasons in ARM_AUTH_DENIED_REASON.
        
	MAV_CMD_SET_GUIDED_SUBMODE_STANDARD = 4000, // This command sets the submode to standard guided when vehicle is in guided mode. The vehicle holds position and altitude and the user can input the desired velocities along all three axes.
                  
	MAV_CMD_SET_GUIDED_SUBMODE_CIRCLE = 4001, // This command sets submode circle when vehicle is in guided mode. Vehicle flies along a circle facing the center of the circle. The user can input the velocity along the circle and change the radius. If no input is given the vehicle will hold position.
                  
	MAV_CMD_NAV_FENCE_RETURN_POINT = 5000, // Fence return point (there can only be one such point in a geofence definition). If rally points are supported they should be used instead.
	MAV_CMD_NAV_FENCE_POLYGON_VERTEX_INCLUSION = 5001, // Fence vertex for an inclusion polygon (the polygon must not be self-intersecting). The vehicle must stay within this area. Minimum of 3 vertices required.
        
	MAV_CMD_NAV_FENCE_POLYGON_VERTEX_EXCLUSION = 5002, // Fence vertex for an exclusion polygon (the polygon must not be self-intersecting). The vehicle must stay outside this area. Minimum of 3 vertices required.
        
	MAV_CMD_NAV_FENCE_CIRCLE_INCLUSION = 5003, // Circular fence area. The vehicle must stay inside this area.
        
	MAV_CMD_NAV_FENCE_CIRCLE_EXCLUSION = 5004, // Circular fence area. The vehicle must stay outside this area.
        
	MAV_CMD_NAV_RALLY_POINT = 5100, // Rally point. You can have multiple rally points defined.
        
	MAV_CMD_UAVCAN_GET_NODE_INFO = 5200, // Commands the vehicle to respond with a sequence of messages UAVCAN_NODE_INFO, one message per every UAVCAN node that is online. Note that some of the response messages can be lost, which the receiver can detect easily by checking whether every received UAVCAN_NODE_STATUS has a matching message UAVCAN_NODE_INFO received earlier; if not, this command should be sent again in order to request re-transmission of the node information messages.
	MAV_CMD_DO_ADSB_OUT_IDENT = 10001, // Trigger the start of an ADSB-out IDENT. This should only be used when requested to do so by an Air Traffic Controller in controlled airspace. This starts the IDENT which is then typically held for 18 seconds by the hardware per the Mode A, C, and S transponder spec.
	MAV_CMD_LOWEHEISER_SET_STATE = 10151, // Set Loweheiser desired states
	MAV_CMD_PAYLOAD_PREPARE_DEPLOY = 30001, // Deploy payload on a Lat / Lon / Alt position. This includes the navigation to reach the required release position and velocity.
	MAV_CMD_PAYLOAD_CONTROL_DEPLOY = 30002, // Control the payload deployment.
	MAV_CMD_WAYPOINT_USER_1 = 31000, // User defined waypoint item. Ground Station will show the Vehicle as flying through this item.
	MAV_CMD_WAYPOINT_USER_2 = 31001, // User defined waypoint item. Ground Station will show the Vehicle as flying through this item.
	MAV_CMD_WAYPOINT_USER_3 = 31002, // User defined waypoint item. Ground Station will show the Vehicle as flying through this item.
	MAV_CMD_WAYPOINT_USER_4 = 31003, // User defined waypoint item. Ground Station will show the Vehicle as flying through this item.
	MAV_CMD_WAYPOINT_USER_5 = 31004, // User defined waypoint item. Ground Station will show the Vehicle as flying through this item.
	MAV_CMD_SPATIAL_USER_1 = 31005, // User defined spatial item. Ground Station will not show the Vehicle as flying through this item. Example: ROI item.
	MAV_CMD_SPATIAL_USER_2 = 31006, // User defined spatial item. Ground Station will not show the Vehicle as flying through this item. Example: ROI item.
	MAV_CMD_SPATIAL_USER_3 = 31007, // User defined spatial item. Ground Station will not show the Vehicle as flying through this item. Example: ROI item.
	MAV_CMD_SPATIAL_USER_4 = 31008, // User defined spatial item. Ground Station will not show the Vehicle as flying through this item. Example: ROI item.
	MAV_CMD_SPATIAL_USER_5 = 31009, // User defined spatial item. Ground Station will not show the Vehicle as flying through this item. Example: ROI item.
	MAV_CMD_USER_1 = 31010, // User defined command. Ground Station will not show the Vehicle as flying through this item. Example: MAV_CMD_DO_SET_PARAMETER item.
	MAV_CMD_USER_2 = 31011, // User defined command. Ground Station will not show the Vehicle as flying through this item. Example: MAV_CMD_DO_SET_PARAMETER item.
	MAV_CMD_USER_3 = 31012, // User defined command. Ground Station will not show the Vehicle as flying through this item. Example: MAV_CMD_DO_SET_PARAMETER item.
	MAV_CMD_USER_4 = 31013, // User defined command. Ground Station will not show the Vehicle as flying through this item. Example: MAV_CMD_DO_SET_PARAMETER item.
	MAV_CMD_USER_5 = 31014, // User defined command. Ground Station will not show the Vehicle as flying through this item. Example: MAV_CMD_DO_SET_PARAMETER item.
	MAV_CMD_CAN_FORWARD = 32000, // Request forwarding of CAN packets from the given CAN bus to this interface. CAN Frames are sent using CAN_FRAME and CANFD_FRAME messages
	MAV_CMD_POWER_OFF_INITIATED = 42000, // A system wide power-off event has been initiated.
	MAV_CMD_SOLO_BTN_FLY_CLICK = 42001, // FLY button has been clicked.
	MAV_CMD_SOLO_BTN_FLY_HOLD = 42002, // FLY button has been held for 1.5 seconds.
	MAV_CMD_SOLO_BTN_PAUSE_CLICK = 42003, // PAUSE button has been clicked.
	MAV_CMD_FIXED_MAG_CAL = 42004, // Magnetometer calibration based on fixed position
        in earth field given by inclination, declination and intensity.
	MAV_CMD_FIXED_MAG_CAL_FIELD = 42005, // Magnetometer calibration based on fixed expected field values.
	MAV_CMD_FIXED_MAG_CAL_YAW = 42006, // Magnetometer calibration based on provided known yaw. This allows for fast calibration using WMM field tables in the vehicle, given only the known yaw of the vehicle. If Latitude and longitude are both zero then use the current vehicle location.
	MAV_CMD_SET_EKF_SOURCE_SET = 42007, // Set EKF sensor source set.
	MAV_CMD_DO_START_MAG_CAL = 42424, // Initiate a magnetometer calibration.
	MAV_CMD_DO_ACCEPT_MAG_CAL = 42425, // Accept a magnetometer calibration.
	MAV_CMD_DO_CANCEL_MAG_CAL = 42426, // Cancel a running magnetometer calibration.
	MAV_CMD_SET_FACTORY_TEST_MODE = 42427, // Command autopilot to get into factory test/diagnostic mode.
	MAV_CMD_DO_SEND_BANNER = 42428, // Reply with the version banner.
	MAV_CMD_ACCELCAL_VEHICLE_POS = 42429, // Used when doing accelerometer calibration. When sent to the GCS tells it what position to put the vehicle in. When sent to the vehicle says what position the vehicle is in.
	MAV_CMD_GIMBAL_RESET = 42501, // Causes the gimbal to reset and boot as if it was just powered on.
	MAV_CMD_GIMBAL_AXIS_CALIBRATION_STATUS = 42502, // Reports progress and success or failure of gimbal axis calibration procedure.
	MAV_CMD_GIMBAL_REQUEST_AXIS_CALIBRATION = 42503, // Starts commutation calibration on the gimbal.
	MAV_CMD_GIMBAL_FULL_RESET = 42505, // Erases gimbal application and parameters.
	MAV_CMD_DO_WINCH = 42600, // Command to operate winch.
	MAV_CMD_FLASH_BOOTLOADER = 42650, // Update the bootloader
	MAV_CMD_BATTERY_RESET = 42651, // Reset battery capacity for batteries that accumulate consumed battery via integration.
	MAV_CMD_DEBUG_TRAP = 42700, // Issue a trap signal to the autopilot process, presumably to enter the debugger.
	MAV_CMD_SCRIPTING = 42701, // Control onboard scripting.
	MAV_CMD_NAV_SCRIPT_TIME = 42702, // Scripting command as NAV command with wait for completion.
	MAV_CMD_NAV_ATTITUDE_TIME = 42703, // Maintain an attitude for a specified time.
	MAV_CMD_GUIDED_CHANGE_SPEED = 43000, // Change flight speed at a given rate. This slews the vehicle at a controllable rate between it's previous speed and the new one. (affects GUIDED only. Outside GUIDED, aircraft ignores these commands. Designed for onboard companion-computer command-and-control, not normally operator/GCS control.)
	MAV_CMD_GUIDED_CHANGE_ALTITUDE = 43001, // Change target altitude at a given rate. This slews the vehicle at a controllable rate between it's previous altitude and the new one. (affects GUIDED only. Outside GUIDED, aircraft ignores these commands. Designed for onboard companion-computer command-and-control, not normally operator/GCS control.)
	MAV_CMD_GUIDED_CHANGE_HEADING = 43002, // Change to target heading at a given rate, overriding previous heading/s. This slews the vehicle at a controllable rate between it's previous heading and the new one. (affects GUIDED only. Exiting GUIDED returns aircraft to normal behaviour defined elsewhere. Designed for onboard companion-computer command-and-control, not normally operator/GCS control.)
	MAV_CMD_EXTERNAL_POSITION_ESTIMATE = 43003, // Provide an external position estimate for use when dead-reckoning. This is meant to be used for occasional position resets that may be provided by a external system such as a remote pilot using landmarks over a video link.
	MAV_CMD_ENUM_END = 43004, // 
}