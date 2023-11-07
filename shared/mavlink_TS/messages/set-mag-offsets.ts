import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Set the magnetometer offsets
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// mag_ofs_x Magnetometer X offset. int16_t
// mag_ofs_y Magnetometer Y offset. int16_t
// mag_ofs_z Magnetometer Z offset. int16_t
export class SetMagOffsets extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public mag_ofs_x!: number;
	public mag_ofs_y!: number;
	public mag_ofs_z!: number;
	public _message_id: number = 151;
	public _message_name: string = 'SET_MAG_OFFSETS';
	public _crc_extra: number = 219;
	public _message_fields: [string, string, boolean][] = [
		['mag_ofs_x', 'int16_t', false],
		['mag_ofs_y', 'int16_t', false],
		['mag_ofs_z', 'int16_t', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
	];
}