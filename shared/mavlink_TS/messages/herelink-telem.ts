import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Herelink Telemetry
*/
// rssi  uint8_t
// snr  int16_t
// rf_freq  uint32_t
// link_bw  uint32_t
// link_rate  uint32_t
// cpu_temp  int16_t
// board_temp  int16_t
export class HerelinkTelem extends MAVLinkMessage {
	public rssi!: number;
	public snr!: number;
	public rf_freq!: number;
	public link_bw!: number;
	public link_rate!: number;
	public cpu_temp!: number;
	public board_temp!: number;
	public _message_id: number = 50003;
	public _message_name: string = 'HERELINK_TELEM';
	public _crc_extra: number = 62;
	public _message_fields: [string, string, boolean][] = [
		['rf_freq', 'uint32_t', false],
		['link_bw', 'uint32_t', false],
		['link_rate', 'uint32_t', false],
		['snr', 'int16_t', false],
		['cpu_temp', 'int16_t', false],
		['board_temp', 'int16_t', false],
		['rssi', 'uint8_t', false],
	];
}