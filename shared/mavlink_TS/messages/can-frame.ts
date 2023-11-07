import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
A forwarded CAN frame as requested by MAV_CMD_CAN_FORWARD.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// bus bus number uint8_t
// len Frame length uint8_t
// id Frame ID uint32_t
// data Frame data uint8_t
export class CanFrame extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public bus!: number;
	public len!: number;
	public id!: number;
	public data!: number;
	public _message_id: number = 386;
	public _message_name: string = 'CAN_FRAME';
	public _crc_extra: number = 132;
	public _message_fields: [string, string, boolean][] = [
		['id', 'uint32_t', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
		['bus', 'uint8_t', false],
		['len', 'uint8_t', false],
		['data', 'uint8_t', false],
	];
}