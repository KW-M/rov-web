export enum GimbalDeviceCapFlags {
	GIMBAL_DEVICE_CAP_FLAGS_HAS_RETRACT = 1, // Gimbal device supports a retracted position.
	GIMBAL_DEVICE_CAP_FLAGS_HAS_NEUTRAL = 2, // Gimbal device supports a horizontal, forward looking position, stabilized.
	GIMBAL_DEVICE_CAP_FLAGS_HAS_ROLL_AXIS = 4, // Gimbal device supports rotating around roll axis.
	GIMBAL_DEVICE_CAP_FLAGS_HAS_ROLL_FOLLOW = 8, // Gimbal device supports to follow a roll angle relative to the vehicle.
	GIMBAL_DEVICE_CAP_FLAGS_HAS_ROLL_LOCK = 16, // Gimbal device supports locking to a roll angle (generally that's the default with roll stabilized).
	GIMBAL_DEVICE_CAP_FLAGS_HAS_PITCH_AXIS = 32, // Gimbal device supports rotating around pitch axis.
	GIMBAL_DEVICE_CAP_FLAGS_HAS_PITCH_FOLLOW = 64, // Gimbal device supports to follow a pitch angle relative to the vehicle.
	GIMBAL_DEVICE_CAP_FLAGS_HAS_PITCH_LOCK = 128, // Gimbal device supports locking to a pitch angle (generally that's the default with pitch stabilized).
	GIMBAL_DEVICE_CAP_FLAGS_HAS_YAW_AXIS = 256, // Gimbal device supports rotating around yaw axis.
	GIMBAL_DEVICE_CAP_FLAGS_HAS_YAW_FOLLOW = 512, // Gimbal device supports to follow a yaw angle relative to the vehicle (generally that's the default).
	GIMBAL_DEVICE_CAP_FLAGS_HAS_YAW_LOCK = 1024, // Gimbal device supports locking to an absolute heading, i.e., yaw angle relative to North (earth frame, often this is an option available).
	GIMBAL_DEVICE_CAP_FLAGS_SUPPORTS_INFINITE_YAW = 2048, // Gimbal device supports yawing/panning infinetely (e.g. using slip disk).
	GIMBAL_DEVICE_CAP_FLAGS_SUPPORTS_YAW_IN_EARTH_FRAME = 4096, // Gimbal device supports yaw angles and angular velocities relative to North (earth frame). This usually requires support by an autopilot via AUTOPILOT_STATE_FOR_GIMBAL_DEVICE. Support can go on and off during runtime, which is reported by the flag GIMBAL_DEVICE_FLAGS_CAN_ACCEPT_YAW_IN_EARTH_FRAME.
	GIMBAL_DEVICE_CAP_FLAGS_HAS_RC_INPUTS = 8192, // Gimbal device supports radio control inputs as an alternative input for controlling the gimbal orientation.
	GIMBAL_DEVICE_CAP_FLAGS_ENUM_END = 8193, // 
}