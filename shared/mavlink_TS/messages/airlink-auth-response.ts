import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {AirlinkAuthResponseType} from '../enums/airlink-auth-response-type';
/*
Response to the authorization request
*/
// resp_type Response type uint8_t
export class AirlinkAuthResponse extends MAVLinkMessage {
	public resp_type!: AirlinkAuthResponseType;
	public _message_id: number = 52001;
	public _message_name: string = 'AIRLINK_AUTH_RESPONSE';
	public _crc_extra: number = 239;
	public _message_fields: [string, string, boolean][] = [
		['resp_type', 'uint8_t', false],
	];
}