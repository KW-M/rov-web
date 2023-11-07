import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {MavRemoteLogDataBlockCommands} from '../enums/mav-remote-log-data-block-commands';
/*
Send a block of log data to remote location.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// seqno Log data block sequence number. uint32_t
// data Log data block. uint8_t
export class RemoteLogDataBlock extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public seqno!: MavRemoteLogDataBlockCommands;
	public data!: number;
	public _message_id: number = 184;
	public _message_name: string = 'REMOTE_LOG_DATA_BLOCK';
	public _crc_extra: number = 159;
	public _message_fields: [string, string, boolean][] = [
		['seqno', 'uint32_t', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
		['data', 'uint8_t', false],
	];
}