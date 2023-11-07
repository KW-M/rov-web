import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Write registers reply.
*/
// request_id Request ID - copied from request. uint32_t
// result 0 for success, anything else is failure code. uint8_t
export class DeviceOpWriteReply extends MAVLinkMessage {
	public request_id!: number;
	public result!: number;
	public _message_id: number = 11003;
	public _message_name: string = 'DEVICE_OP_WRITE_REPLY';
	public _crc_extra: number = 64;
	public _message_fields: [string, string, boolean][] = [
		['request_id', 'uint32_t', false],
		['result', 'uint8_t', false],
	];
}