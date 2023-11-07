import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Control on-board Camera Control System to take shots.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// session 0: stop, 1: start or keep it up //Session control e.g. show/hide lens. uint8_t
// zoom_pos 1 to N //Zoom's absolute position (0 means ignore). uint8_t
// zoom_step -100 to 100 //Zooming step value to offset zoom from the current position. int8_t
// focus_lock 0: unlock focus or keep unlocked, 1: lock focus or keep locked, 3: re-lock focus. uint8_t
// shot 0: ignore, 1: shot or start filming. uint8_t
// command_id Command Identity (incremental loop: 0 to 255)//A command sent multiple times will be executed or pooled just once. uint8_t
// extra_param Extra parameters enumeration (0 means ignore). uint8_t
// extra_value Correspondent value to given extra_param. float
export class DigicamControl extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public session!: number;
	public zoom_pos!: number;
	public zoom_step!: number;
	public focus_lock!: number;
	public shot!: number;
	public command_id!: number;
	public extra_param!: number;
	public extra_value!: number;
	public _message_id: number = 155;
	public _message_name: string = 'DIGICAM_CONTROL';
	public _crc_extra: number = 22;
	public _message_fields: [string, string, boolean][] = [
		['extra_value', 'float', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
		['session', 'uint8_t', false],
		['zoom_pos', 'uint8_t', false],
		['zoom_step', 'int8_t', false],
		['focus_lock', 'uint8_t', false],
		['shot', 'uint8_t', false],
		['command_id', 'uint8_t', false],
		['extra_param', 'uint8_t', false],
	];
}