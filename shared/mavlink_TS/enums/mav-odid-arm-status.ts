export enum MavOdidArmStatus {
	MAV_ODID_ARM_STATUS_GOOD_TO_ARM = 0, // Passing arming checks.
	MAV_ODID_ARM_STATUS_PRE_ARM_FAIL_GENERIC = 1, // Generic arming failure, see error string for details.
	MAV_ODID_ARM_STATUS_ENUM_END = 2, // 
}