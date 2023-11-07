import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Status of third AHRS filter if available. This is for ANU research group (Ali and Sean).
*/
// roll Roll angle. float
// pitch Pitch angle. float
// yaw Yaw angle. float
// altitude Altitude (MSL). float
// lat Latitude. int32_t
// lng Longitude. int32_t
// v1 Test variable1. float
// v2 Test variable2. float
// v3 Test variable3. float
// v4 Test variable4. float
export class Ahrs3 extends MAVLinkMessage {
	public roll!: number;
	public pitch!: number;
	public yaw!: number;
	public altitude!: number;
	public lat!: number;
	public lng!: number;
	public v1!: number;
	public v2!: number;
	public v3!: number;
	public v4!: number;
	public _message_id: number = 182;
	public _message_name: string = 'AHRS3';
	public _crc_extra: number = 229;
	public _message_fields: [string, string, boolean][] = [
		['roll', 'float', false],
		['pitch', 'float', false],
		['yaw', 'float', false],
		['altitude', 'float', false],
		['lat', 'int32_t', false],
		['lng', 'int32_t', false],
		['v1', 'float', false],
		['v2', 'float', false],
		['v3', 'float', false],
		['v4', 'float', false],
	];
}