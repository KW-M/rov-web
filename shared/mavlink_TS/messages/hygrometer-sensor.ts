import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Temperature and humidity from hygrometer.
*/
// id Hygrometer ID uint8_t
// temperature Temperature int16_t
// humidity Humidity uint16_t
export class HygrometerSensor extends MAVLinkMessage {
	public id!: number;
	public temperature!: number;
	public humidity!: number;
	public _message_id: number = 12920;
	public _message_name: string = 'HYGROMETER_SENSOR';
	public _crc_extra: number = 20;
	public _message_fields: [string, string, boolean][] = [
		['temperature', 'int16_t', false],
		['humidity', 'uint16_t', false],
		['id', 'uint8_t', false],
	];
}