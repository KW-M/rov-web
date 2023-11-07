import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {SecureCommandOp} from '../enums/secure-command-op';
import {MavResult} from '../enums/mav-result';
/*
Reply from secure command.
*/
// sequence Sequence ID from request. uint32_t
// operation Operation that was requested. uint32_t
// result Result of command. uint8_t
// data_length Data length. uint8_t
// data Reply data. uint8_t
export class SecureCommandReply extends MAVLinkMessage {
	public sequence!: number;
	public operation!: SecureCommandOp;
	public result!: MavResult;
	public data_length!: number;
	public data!: number;
	public _message_id: number = 11005;
	public _message_name: string = 'SECURE_COMMAND_REPLY';
	public _crc_extra: number = 93;
	public _message_fields: [string, string, boolean][] = [
		['sequence', 'uint32_t', false],
		['operation', 'uint32_t', false],
		['result', 'uint8_t', false],
		['data_length', 'uint8_t', false],
		['data', 'uint8_t', false],
	];
}