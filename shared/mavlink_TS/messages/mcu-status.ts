import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
The MCU status, giving MCU temperature and voltage. The min and max voltages are to allow for detecting power supply instability.
*/
// id MCU instance uint8_t
// MCU_temperature MCU Internal temperature int16_t
// MCU_voltage MCU voltage uint16_t
// MCU_voltage_min MCU voltage minimum uint16_t
// MCU_voltage_max MCU voltage maximum uint16_t
export class McuStatus extends MAVLinkMessage {
	public id!: number;
	public MCU_temperature!: number;
	public MCU_voltage!: number;
	public MCU_voltage_min!: number;
	public MCU_voltage_max!: number;
	public _message_id: number = 11039;
	public _message_name: string = 'MCU_STATUS';
	public _crc_extra: number = 142;
	public _message_fields: [string, string, boolean][] = [
		['MCU_temperature', 'int16_t', false],
		['MCU_voltage', 'uint16_t', false],
		['MCU_voltage_min', 'uint16_t', false],
		['MCU_voltage_max', 'uint16_t', false],
		['id', 'uint8_t', false],
	];
}