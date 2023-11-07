import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Rangefinder reporting.
*/
// distance Distance. float
// voltage Raw voltage if available, zero otherwise. float
export class Rangefinder extends MAVLinkMessage {
	public distance!: number;
	public voltage!: number;
	public _message_id: number = 173;
	public _message_name: string = 'RANGEFINDER';
	public _crc_extra: number = 83;
	public _message_fields: [string, string, boolean][] = [
		['distance', 'float', false],
		['voltage', 'float', false],
	];
}