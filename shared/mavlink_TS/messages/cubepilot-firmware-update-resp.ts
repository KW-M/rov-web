import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
offset response to encapsulated data.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// offset FW Offset. uint32_t
export class CubepilotFirmwareUpdateResp extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public offset!: number;
	public _message_id: number = 50005;
	public _message_name: string = 'CUBEPILOT_FIRMWARE_UPDATE_RESP';
	public _crc_extra: number = 152;
	public _message_fields: [string, string, boolean][] = [
		['offset', 'uint32_t', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
	];
}