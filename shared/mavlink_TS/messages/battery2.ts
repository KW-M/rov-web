import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
2nd Battery status
*/
// voltage Voltage. uint16_t
// current_battery Battery current, -1: autopilot does not measure the current. int16_t
export class Battery2 extends MAVLinkMessage {
	public voltage!: number;
	public current_battery!: number;
	public _message_id: number = 181;
	public _message_name: string = 'BATTERY2';
	public _crc_extra: number = 174;
	public _message_fields: [string, string, boolean][] = [
		['voltage', 'uint16_t', false],
		['current_battery', 'int16_t', false],
	];
}