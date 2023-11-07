import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {SecureCommandOp} from '../enums/secure-command-op';
/*
Send a secure command. Data should be signed with a private key corresponding with a public key known to the recipient. Signature should be over the concatenation of the sequence number (little-endian format), the operation (little-endian format) the data and the session key. For SECURE_COMMAND_GET_SESSION_KEY the session key should be zero length. The data array consists of the data followed by the signature. The sum of the data_length and the sig_length cannot be more than 220. The format of the data is command specific.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// sequence Sequence ID for tagging reply. uint32_t
// operation Operation being requested. uint32_t
// data_length Data length. uint8_t
// sig_length Signature length. uint8_t
// data Signed data. uint8_t
export class SecureCommand extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public sequence!: number;
	public operation!: SecureCommandOp;
	public data_length!: number;
	public sig_length!: number;
	public data!: number;
	public _message_id: number = 11004;
	public _message_name: string = 'SECURE_COMMAND';
	public _crc_extra: number = 11;
	public _message_fields: [string, string, boolean][] = [
		['sequence', 'uint32_t', false],
		['operation', 'uint32_t', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
		['data_length', 'uint8_t', false],
		['sig_length', 'uint8_t', false],
		['data', 'uint8_t', false],
	];
}