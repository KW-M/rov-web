import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
State of autopilot RAM.
*/
// brkval Heap top. uint16_t
// freemem Free memory. uint16_t
// freemem32 Free memory (32 bit). uint32_t
export class Meminfo extends MAVLinkMessage {
	public brkval!: number;
	public freemem!: number;
	public freemem32!: number;
	public _message_id: number = 152;
	public _message_name: string = 'MEMINFO';
	public _crc_extra: number = 208;
	public _message_fields: [string, string, boolean][] = [
		['brkval', 'uint16_t', false],
		['freemem', 'uint16_t', false],
		['freemem32', 'uint32_t', true],
	];
}