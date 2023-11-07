import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Request messages.
*/
// ReqMessageId Message ID to request. Supports any message in this 10000-10099 range uint32_t
export class UavionixAdsbGet extends MAVLinkMessage {
	public ReqMessageId!: number;
	public _message_id: number = 10006;
	public _message_name: string = 'UAVIONIX_ADSB_GET';
	public _crc_extra: number = 193;
	public _message_fields: [string, string, boolean][] = [
		['ReqMessageId', 'uint32_t', false],
	];
}