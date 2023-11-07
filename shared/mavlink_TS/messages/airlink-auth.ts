import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Authorization package
*/
// login Login char
// password Password char
export class AirlinkAuth extends MAVLinkMessage {
	public login!: string;
	public password!: string;
	public _message_id: number = 52000;
	public _message_name: string = 'AIRLINK_AUTH';
	public _crc_extra: number = 13;
	public _message_fields: [string, string, boolean][] = [
		['login', 'char', false],
		['password', 'char', false],
	];
}