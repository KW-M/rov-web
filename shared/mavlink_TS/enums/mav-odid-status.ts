export enum MavOdidStatus {
	MAV_ODID_STATUS_UNDECLARED = 0, // The status of the (UA) Unmanned Aircraft is undefined.
	MAV_ODID_STATUS_GROUND = 1, // The UA is on the ground.
	MAV_ODID_STATUS_AIRBORNE = 2, // The UA is in the air.
	MAV_ODID_STATUS_EMERGENCY = 3, // The UA is having an emergency.
	MAV_ODID_STATUS_REMOTE_ID_SYSTEM_FAILURE = 4, // The remote ID system is failing or unreliable in some way.
	MAV_ODID_STATUS_ENUM_END = 5, // 
}