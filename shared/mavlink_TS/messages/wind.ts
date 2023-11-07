import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Wind estimation.
*/
// direction Wind direction (that wind is coming from). float
// speed Wind speed in ground plane. float
// speed_z Vertical wind speed. float
export class Wind extends MAVLinkMessage {
	public direction!: number;
	public speed!: number;
	public speed_z!: number;
	public _message_id: number = 168;
	public _message_name: string = 'WIND';
	public _crc_extra: number = 1;
	public _message_fields: [string, string, boolean][] = [
		['direction', 'float', false],
		['speed', 'float', false],
		['speed_z', 'float', false],
	];
}