export enum MavFrame {
	MAV_FRAME_GLOBAL = 0, // Global (WGS84) coordinate frame + MSL altitude. First value / x: latitude, second value / y: longitude, third value / z: positive altitude over mean sea level (MSL).
	MAV_FRAME_LOCAL_NED = 1, // NED local tangent frame (x: North, y: East, z: Down) with origin fixed relative to earth.
	MAV_FRAME_MISSION = 2, // NOT a coordinate frame, indicates a mission command.
	MAV_FRAME_GLOBAL_RELATIVE_ALT = 3, // Global (WGS84) coordinate frame + altitude relative to the home position. First value / x: latitude, second value / y: longitude, third value / z: positive altitude with 0 being at the altitude of the home location.
	MAV_FRAME_LOCAL_ENU = 4, // ENU local tangent frame (x: East, y: North, z: Up) with origin fixed relative to earth.
	MAV_FRAME_GLOBAL_INT = 5, // Global (WGS84) coordinate frame (scaled) + MSL altitude. First value / x: latitude in degrees*1E7, second value / y: longitude in degrees*1E7, third value / z: positive altitude over mean sea level (MSL).
	MAV_FRAME_GLOBAL_RELATIVE_ALT_INT = 6, // Global (WGS84) coordinate frame (scaled) + altitude relative to the home position. First value / x: latitude in degrees*1E7, second value / y: longitude in degrees*1E7, third value / z: positive altitude with 0 being at the altitude of the home location.
	MAV_FRAME_LOCAL_OFFSET_NED = 7, // NED local tangent frame (x: North, y: East, z: Down) with origin that travels with the vehicle.
	MAV_FRAME_BODY_NED = 8, // Same as MAV_FRAME_LOCAL_NED when used to represent position values. Same as MAV_FRAME_BODY_FRD when used with velocity/accelaration values.
	MAV_FRAME_BODY_OFFSET_NED = 9, // This is the same as MAV_FRAME_BODY_FRD.
	MAV_FRAME_GLOBAL_TERRAIN_ALT = 10, // Global (WGS84) coordinate frame with AGL altitude (at the waypoint coordinate). First value / x: latitude in degrees, second value / y: longitude in degrees, third value / z: positive altitude in meters with 0 being at ground level in terrain model.
	MAV_FRAME_GLOBAL_TERRAIN_ALT_INT = 11, // Global (WGS84) coordinate frame (scaled) with AGL altitude (at the waypoint coordinate). First value / x: latitude in degrees*1E7, second value / y: longitude in degrees*1E7, third value / z: positive altitude in meters with 0 being at ground level in terrain model.
	MAV_FRAME_BODY_FRD = 12, // FRD local tangent frame (x: Forward, y: Right, z: Down) with origin that travels with vehicle. The forward axis is aligned to the front of the vehicle in the horizontal plane.
	MAV_FRAME_RESERVED_13 = 13, // MAV_FRAME_BODY_FLU - Body fixed frame of reference, Z-up (x: Forward, y: Left, z: Up).
	MAV_FRAME_RESERVED_14 = 14, // MAV_FRAME_MOCAP_NED - Odometry local coordinate frame of data given by a motion capture system, Z-down (x: North, y: East, z: Down).
	MAV_FRAME_RESERVED_15 = 15, // MAV_FRAME_MOCAP_ENU - Odometry local coordinate frame of data given by a motion capture system, Z-up (x: East, y: North, z: Up).
	MAV_FRAME_RESERVED_16 = 16, // MAV_FRAME_VISION_NED - Odometry local coordinate frame of data given by a vision estimation system, Z-down (x: North, y: East, z: Down).
	MAV_FRAME_RESERVED_17 = 17, // MAV_FRAME_VISION_ENU - Odometry local coordinate frame of data given by a vision estimation system, Z-up (x: East, y: North, z: Up).
	MAV_FRAME_RESERVED_18 = 18, // MAV_FRAME_ESTIM_NED - Odometry local coordinate frame of data given by an estimator running onboard the vehicle, Z-down (x: North, y: East, z: Down).
	MAV_FRAME_RESERVED_19 = 19, // MAV_FRAME_ESTIM_ENU - Odometry local coordinate frame of data given by an estimator running onboard the vehicle, Z-up (x: East, y: North, z: Up).
	MAV_FRAME_LOCAL_FRD = 20, // FRD local tangent frame (x: Forward, y: Right, z: Down) with origin fixed relative to earth. The forward axis is aligned to the front of the vehicle in the horizontal plane.
	MAV_FRAME_LOCAL_FLU = 21, // FLU local tangent frame (x: Forward, y: Left, z: Up) with origin fixed relative to earth. The forward axis is aligned to the front of the vehicle in the horizontal plane.
	MAV_FRAME_ENUM_END = 22, // 
}