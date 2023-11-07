import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Raw RC Data
*/
// rc_raw  uint8_t
export class CubepilotRawRc extends MAVLinkMessage {
	public rc_raw!: number;
	public _message_id: number = 50001;
	public _message_name: string = 'CUBEPILOT_RAW_RC';
	public _crc_extra: number = 246;
	public _message_fields: [string, string, boolean][] = [
		['rc_raw', 'uint8_t', false],
	];
}