import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Update the data in the OPEN_DRONE_ID_SYSTEM message with new location information. This can be sent to update the location information for the operator when no other information in the SYSTEM message has changed. This message allows for efficient operation on radio links which have limited uplink bandwidth while meeting requirements for update frequency of the operator location.
*/
// target_system System ID (0 for broadcast). uint8_t
// target_component Component ID (0 for broadcast). uint8_t
// operator_latitude Latitude of the operator. If unknown: 0 (both Lat/Lon). int32_t
// operator_longitude Longitude of the operator. If unknown: 0 (both Lat/Lon). int32_t
// operator_altitude_geo Geodetic altitude of the operator relative to WGS84. If unknown: -1000 m. float
// timestamp 32 bit Unix Timestamp in seconds since 00:00:00 01/01/2019. uint32_t
export class OpenDroneIdSystemUpdate extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public operator_latitude!: number;
	public operator_longitude!: number;
	public operator_altitude_geo!: number;
	public timestamp!: number;
	public _message_id: number = 12919;
	public _message_name: string = 'OPEN_DRONE_ID_SYSTEM_UPDATE';
	public _crc_extra: number = 7;
	public _message_fields: [string, string, boolean][] = [
		['operator_latitude', 'int32_t', false],
		['operator_longitude', 'int32_t', false],
		['operator_altitude_geo', 'float', false],
		['timestamp', 'uint32_t', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
	];
}