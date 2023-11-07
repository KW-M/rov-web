export enum MissionState {
	MISSION_STATE_UNKNOWN = 0, // The mission status reporting is not supported.
	MISSION_STATE_NO_MISSION = 1, // No mission on the vehicle.
	MISSION_STATE_NOT_STARTED = 2, // Mission has not started. This is the case after a mission has uploaded but not yet started executing.
	MISSION_STATE_ACTIVE = 3, // Mission is active, and will execute mission items when in auto mode.
	MISSION_STATE_PAUSED = 4, // Mission is paused when in auto mode.
	MISSION_STATE_COMPLETE = 5, // Mission has executed all mission items.
	MISSION_STATE_ENUM_END = 6, // 
}