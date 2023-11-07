import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Read a configured an OSD parameter slot.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// request_id Request ID - copied to reply. uint32_t
// osd_screen OSD parameter screen index. uint8_t
// osd_index OSD parameter display index. uint8_t
export class OsdParamShowConfig extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public request_id!: number;
	public osd_screen!: number;
	public osd_index!: number;
	public _message_id: number = 11035;
	public _message_name: string = 'OSD_PARAM_SHOW_CONFIG';
	public _crc_extra: number = 128;
	public _message_fields: [string, string, boolean][] = [
		['request_id', 'uint32_t', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
		['osd_screen', 'uint8_t', false],
		['osd_index', 'uint8_t', false],
	];
}