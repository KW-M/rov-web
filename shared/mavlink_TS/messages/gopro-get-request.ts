import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {GoproCommand} from '../enums/gopro-command';
/*
Request a GOPRO_COMMAND response from the GoPro.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// cmd_id Command ID. uint8_t
export class GoproGetRequest extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public cmd_id!: GoproCommand;
	public _message_id: number = 216;
	public _message_name: string = 'GOPRO_GET_REQUEST';
	public _crc_extra: number = 50;
	public _message_fields: [string, string, boolean][] = [
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
		['cmd_id', 'uint8_t', false],
	];
}