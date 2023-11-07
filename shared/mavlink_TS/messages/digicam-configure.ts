import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Configure on-board Camera Control System.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// mode Mode enumeration from 1 to N //P, TV, AV, M, etc. (0 means ignore). uint8_t
// shutter_speed Divisor number //e.g. 1000 means 1/1000 (0 means ignore). uint16_t
// aperture F stop number x 10 //e.g. 28 means 2.8 (0 means ignore). uint8_t
// iso ISO enumeration from 1 to N //e.g. 80, 100, 200, Etc (0 means ignore). uint8_t
// exposure_type Exposure type enumeration from 1 to N (0 means ignore). uint8_t
// command_id Command Identity (incremental loop: 0 to 255). //A command sent multiple times will be executed or pooled just once. uint8_t
// engine_cut_off Main engine cut-off time before camera trigger (0 means no cut-off). uint8_t
// extra_param Extra parameters enumeration (0 means ignore). uint8_t
// extra_value Correspondent value to given extra_param. float
export class DigicamConfigure extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public mode!: number;
	public shutter_speed!: number;
	public aperture!: number;
	public iso!: number;
	public exposure_type!: number;
	public command_id!: number;
	public engine_cut_off!: number;
	public extra_param!: number;
	public extra_value!: number;
	public _message_id: number = 154;
	public _message_name: string = 'DIGICAM_CONFIGURE';
	public _crc_extra: number = 84;
	public _message_fields: [string, string, boolean][] = [
		['extra_value', 'float', false],
		['shutter_speed', 'uint16_t', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
		['mode', 'uint8_t', false],
		['aperture', 'uint8_t', false],
		['iso', 'uint8_t', false],
		['exposure_type', 'uint8_t', false],
		['command_id', 'uint8_t', false],
		['engine_cut_off', 'uint8_t', false],
		['extra_param', 'uint8_t', false],
	];
}