import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Message to control a camera mount, directional antenna, etc.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// input_a Pitch (centi-degrees) or lat (degE7), depending on mount mode. int32_t
// input_b Roll (centi-degrees) or lon (degE7) depending on mount mode. int32_t
// input_c Yaw (centi-degrees) or alt (cm) depending on mount mode. int32_t
// save_position If "1" it will save current trimmed position on EEPROM (just valid for NEUTRAL and LANDING). uint8_t
export class MountControl extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public input_a!: number;
	public input_b!: number;
	public input_c!: number;
	public save_position!: number;
	public _message_id: number = 157;
	public _message_name: string = 'MOUNT_CONTROL';
	public _crc_extra: number = 21;
	public _message_fields: [string, string, boolean][] = [
		['input_a', 'int32_t', false],
		['input_b', 'int32_t', false],
		['input_c', 'int32_t', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
		['save_position', 'uint8_t', false],
	];
}