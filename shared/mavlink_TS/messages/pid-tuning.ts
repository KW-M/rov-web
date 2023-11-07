import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {PidTuningAxis} from '../enums/pid-tuning-axis';
/*
PID tuning information.
*/
// axis Axis. uint8_t
// desired Desired rate. float
// achieved Achieved rate. float
// FF FF component. float
// P P component. float
// I I component. float
// D D component. float
// SRate Slew rate. float
// PDmod P/D oscillation modifier. float
export class PidTuning extends MAVLinkMessage {
	public axis!: PidTuningAxis;
	public desired!: number;
	public achieved!: number;
	public FF!: number;
	public P!: number;
	public I!: number;
	public D!: number;
	public SRate!: number;
	public PDmod!: number;
	public _message_id: number = 194;
	public _message_name: string = 'PID_TUNING';
	public _crc_extra: number = 98;
	public _message_fields: [string, string, boolean][] = [
		['desired', 'float', false],
		['achieved', 'float', false],
		['FF', 'float', false],
		['P', 'float', false],
		['I', 'float', false],
		['D', 'float', false],
		['axis', 'uint8_t', false],
		['SRate', 'float', true],
		['PDmod', 'float', true],
	];
}