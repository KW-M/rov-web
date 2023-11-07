import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {GoproCommand} from '../enums/gopro-command';
/*
Request to set a GOPRO_COMMAND with a desired.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// cmd_id Command ID. uint8_t
// value Value. uint8_t
export class GoproSetRequest extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public cmd_id!: GoproCommand;
	public value!: number;
	public _message_id: number = 218;
	public _message_name: string = 'GOPRO_SET_REQUEST';
	public _crc_extra: number = 17;
	public _message_fields: [string, string, boolean][] = [
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
		['cmd_id', 'uint8_t', false],
		['value', 'uint8_t', false],
	];
}