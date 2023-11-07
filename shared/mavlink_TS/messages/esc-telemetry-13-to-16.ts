import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
ESC Telemetry Data for ESCs 13 to 16, matching data sent by BLHeli ESCs.
*/
// temperature Temperature. uint8_t
// voltage Voltage. uint16_t
// current Current. uint16_t
// totalcurrent Total current. uint16_t
// rpm RPM (eRPM). uint16_t
// count count of telemetry packets received (wraps at 65535). uint16_t
export class EscTelemetry13To16 extends MAVLinkMessage {
	public temperature!: number;
	public voltage!: number;
	public current!: number;
	public totalcurrent!: number;
	public rpm!: number;
	public count!: number;
	public _message_id: number = 11040;
	public _message_name: string = 'ESC_TELEMETRY_13_TO_16';
	public _crc_extra: number = 132;
	public _message_fields: [string, string, boolean][] = [
		['voltage', 'uint16_t', false],
		['current', 'uint16_t', false],
		['totalcurrent', 'uint16_t', false],
		['rpm', 'uint16_t', false],
		['count', 'uint16_t', false],
		['temperature', 'uint8_t', false],
	];
}