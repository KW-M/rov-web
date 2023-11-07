import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Status of secondary AHRS filter if available.
*/
// roll Roll angle. float
// pitch Pitch angle. float
// yaw Yaw angle. float
// altitude Altitude (MSL). float
// lat Latitude. int32_t
// lng Longitude. int32_t
export class Ahrs2 extends MAVLinkMessage {
	public roll!: number;
	public pitch!: number;
	public yaw!: number;
	public altitude!: number;
	public lat!: number;
	public lng!: number;
	public _message_id: number = 178;
	public _message_name: string = 'AHRS2';
	public _crc_extra: number = 47;
	public _message_fields: [string, string, boolean][] = [
		['roll', 'float', false],
		['pitch', 'float', false],
		['yaw', 'float', false],
		['altitude', 'float', false],
		['lat', 'int32_t', false],
		['lng', 'int32_t', false],
	];
}