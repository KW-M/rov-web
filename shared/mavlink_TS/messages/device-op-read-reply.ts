import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Read registers reply.
*/
// request_id Request ID - copied from request. uint32_t
// result 0 for success, anything else is failure code. uint8_t
// regstart Starting register. uint8_t
// count Count of bytes read. uint8_t
// data Reply data. uint8_t
// bank Bank number. uint8_t
export class DeviceOpReadReply extends MAVLinkMessage {
	public request_id!: number;
	public result!: number;
	public regstart!: number;
	public count!: number;
	public data!: number;
	public bank!: number;
	public _message_id: number = 11001;
	public _message_name: string = 'DEVICE_OP_READ_REPLY';
	public _crc_extra: number = 15;
	public _message_fields: [string, string, boolean][] = [
		['request_id', 'uint32_t', false],
		['result', 'uint8_t', false],
		['regstart', 'uint8_t', false],
		['count', 'uint8_t', false],
		['data', 'uint8_t', false],
		['bank', 'uint8_t', true],
	];
}