import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
ESC Telemetry Data for ESCs 21 to 24, matching data sent by BLHeli ESCs.
*/
// temperature Temperature. uint8_t
// voltage Voltage. uint16_t
// current Current. uint16_t
// totalcurrent Total current. uint16_t
// rpm RPM (eRPM). uint16_t
// count count of telemetry packets received (wraps at 65535). uint16_t
export class EscTelemetry21To24 extends MAVLinkMessage {
	public temperature!: number;
	public voltage!: number;
	public current!: number;
	public totalcurrent!: number;
	public rpm!: number;
	public count!: number;
	public _message_id: number = 11042;
	public _message_name: string = 'ESC_TELEMETRY_21_TO_24';
	public _crc_extra: number = 201;
	public _message_fields: [string, string, boolean][] = [
		['voltage', 'uint16_t', false],
		['current', 'uint16_t', false],
		['totalcurrent', 'uint16_t', false],
		['rpm', 'uint16_t', false],
		['count', 'uint16_t', false],
		['temperature', 'uint8_t', false],
	];
}