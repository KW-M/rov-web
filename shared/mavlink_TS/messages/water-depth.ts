import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Water depth
*/
// time_boot_ms Timestamp (time since system boot) uint32_t
// id Onboard ID of the sensor uint8_t
// healthy Sensor data healthy (0=unhealthy, 1=healthy) uint8_t
// lat Latitude int32_t
// lng Longitude int32_t
// alt Altitude (MSL) of vehicle float
// roll Roll angle float
// pitch Pitch angle float
// yaw Yaw angle float
// distance Distance (uncorrected) float
// temperature Water temperature float
export class WaterDepth extends MAVLinkMessage {
	public time_boot_ms!: number;
	public id!: number;
	public healthy!: number;
	public lat!: number;
	public lng!: number;
	public alt!: number;
	public roll!: number;
	public pitch!: number;
	public yaw!: number;
	public distance!: number;
	public temperature!: number;
	public _message_id: number = 11038;
	public _message_name: string = 'WATER_DEPTH';
	public _crc_extra: number = 47;
	public _message_fields: [string, string, boolean][] = [
		['time_boot_ms', 'uint32_t', false],
		['lat', 'int32_t', false],
		['lng', 'int32_t', false],
		['alt', 'float', false],
		['roll', 'float', false],
		['pitch', 'float', false],
		['yaw', 'float', false],
		['distance', 'float', false],
		['temperature', 'float', false],
		['id', 'uint8_t', false],
		['healthy', 'uint8_t', false],
	];
}