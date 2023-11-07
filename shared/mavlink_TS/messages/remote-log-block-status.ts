import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {MavRemoteLogDataBlockStatuses} from '../enums/mav-remote-log-data-block-statuses';
/*
Send Status of each log block that autopilot board might have sent.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// seqno Log data block sequence number. uint32_t
// status Log data block status. uint8_t
export class RemoteLogBlockStatus extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public seqno!: number;
	public status!: MavRemoteLogDataBlockStatuses;
	public _message_id: number = 185;
	public _message_name: string = 'REMOTE_LOG_BLOCK_STATUS';
	public _crc_extra: number = 186;
	public _message_fields: [string, string, boolean][] = [
		['seqno', 'uint32_t', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
		['status', 'uint8_t', false],
	];
}