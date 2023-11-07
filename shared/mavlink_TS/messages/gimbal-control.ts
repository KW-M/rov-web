import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Control message for rate gimbal.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// demanded_rate_x Demanded angular rate X. float
// demanded_rate_y Demanded angular rate Y. float
// demanded_rate_z Demanded angular rate Z. float
export class GimbalControl extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public demanded_rate_x!: number;
	public demanded_rate_y!: number;
	public demanded_rate_z!: number;
	public _message_id: number = 201;
	public _message_name: string = 'GIMBAL_CONTROL';
	public _crc_extra: number = 205;
	public _message_fields: [string, string, boolean][] = [
		['demanded_rate_x', 'float', false],
		['demanded_rate_y', 'float', false],
		['demanded_rate_z', 'float', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
	];
}