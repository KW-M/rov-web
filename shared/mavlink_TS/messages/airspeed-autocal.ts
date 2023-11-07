import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Airspeed auto-calibration.
*/
// vx GPS velocity north. float
// vy GPS velocity east. float
// vz GPS velocity down. float
// diff_pressure Differential pressure. float
// EAS2TAS Estimated to true airspeed ratio. float
// ratio Airspeed ratio. float
// state_x EKF state x. float
// state_y EKF state y. float
// state_z EKF state z. float
// Pax EKF Pax. float
// Pby EKF Pby. float
// Pcz EKF Pcz. float
export class AirspeedAutocal extends MAVLinkMessage {
	public vx!: number;
	public vy!: number;
	public vz!: number;
	public diff_pressure!: number;
	public EAS2TAS!: number;
	public ratio!: number;
	public state_x!: number;
	public state_y!: number;
	public state_z!: number;
	public Pax!: number;
	public Pby!: number;
	public Pcz!: number;
	public _message_id: number = 174;
	public _message_name: string = 'AIRSPEED_AUTOCAL';
	public _crc_extra: number = 167;
	public _message_fields: [string, string, boolean][] = [
		['vx', 'float', false],
		['vy', 'float', false],
		['vz', 'float', false],
		['diff_pressure', 'float', false],
		['EAS2TAS', 'float', false],
		['ratio', 'float', false],
		['state_x', 'float', false],
		['state_y', 'float', false],
		['state_z', 'float', false],
		['Pax', 'float', false],
		['Pby', 'float', false],
		['Pcz', 'float', false],
	];
}