export enum MavOdidDescType {
	MAV_ODID_DESC_TYPE_TEXT = 0, // Free-form text description of the purpose of the flight.
	MAV_ODID_DESC_TYPE_EMERGENCY = 1, // Optional additional clarification when status == MAV_ODID_STATUS_EMERGENCY.
	MAV_ODID_DESC_TYPE_EXTENDED_STATUS = 2, // Optional additional clarification when status != MAV_ODID_STATUS_EMERGENCY.
	MAV_ODID_DESC_TYPE_ENUM_END = 3, // 
}