import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Status of DCM attitude estimator.
*/
// omegaIx X gyro drift estimate. float
// omegaIy Y gyro drift estimate. float
// omegaIz Z gyro drift estimate. float
// accel_weight Average accel_weight. float
// renorm_val Average renormalisation value. float
// error_rp Average error_roll_pitch value. float
// error_yaw Average error_yaw value. float
export class Ahrs extends MAVLinkMessage {
	public omegaIx!: number;
	public omegaIy!: number;
	public omegaIz!: number;
	public accel_weight!: number;
	public renorm_val!: number;
	public error_rp!: number;
	public error_yaw!: number;
	public _message_id: number = 163;
	public _message_name: string = 'AHRS';
	public _crc_extra: number = 127;
	public _message_fields: [string, string, boolean][] = [
		['omegaIx', 'float', false],
		['omegaIy', 'float', false],
		['omegaIz', 'float', false],
		['accel_weight', 'float', false],
		['renorm_val', 'float', false],
		['error_rp', 'float', false],
		['error_yaw', 'float', false],
	];
}