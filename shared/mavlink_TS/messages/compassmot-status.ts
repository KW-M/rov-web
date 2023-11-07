import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Status of compassmot calibration.
*/
// throttle Throttle. uint16_t
// current Current. float
// interference Interference. uint16_t
// CompensationX Motor Compensation X. float
// CompensationY Motor Compensation Y. float
// CompensationZ Motor Compensation Z. float
export class CompassmotStatus extends MAVLinkMessage {
	public throttle!: number;
	public current!: number;
	public interference!: number;
	public CompensationX!: number;
	public CompensationY!: number;
	public CompensationZ!: number;
	public _message_id: number = 177;
	public _message_name: string = 'COMPASSMOT_STATUS';
	public _crc_extra: number = 240;
	public _message_fields: [string, string, boolean][] = [
		['current', 'float', false],
		['CompensationX', 'float', false],
		['CompensationY', 'float', false],
		['CompensationZ', 'float', false],
		['throttle', 'uint16_t', false],
		['interference', 'uint16_t', false],
	];
}