import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {MagCalStatus} from '../enums/mag-cal-status';
/*
Reports progress of compass calibration.
*/
// compass_id Compass being calibrated. uint8_t
// cal_mask Bitmask of compasses being calibrated. uint8_t
// cal_status Calibration Status. uint8_t
// attempt Attempt number. uint8_t
// completion_pct Completion percentage. uint8_t
// completion_mask Bitmask of sphere sections (see http://en.wikipedia.org/wiki/Geodesic_grid). uint8_t
// direction_x Body frame direction vector for display. float
// direction_y Body frame direction vector for display. float
// direction_z Body frame direction vector for display. float
export class MagCalProgress extends MAVLinkMessage {
	public compass_id!: number;
	public cal_mask!: number;
	public cal_status!: MagCalStatus;
	public attempt!: number;
	public completion_pct!: number;
	public completion_mask!: number;
	public direction_x!: number;
	public direction_y!: number;
	public direction_z!: number;
	public _message_id: number = 191;
	public _message_name: string = 'MAG_CAL_PROGRESS';
	public _crc_extra: number = 92;
	public _message_fields: [string, string, boolean][] = [
		['direction_x', 'float', false],
		['direction_y', 'float', false],
		['direction_z', 'float', false],
		['compass_id', 'uint8_t', false],
		['cal_mask', 'uint8_t', false],
		['cal_status', 'uint8_t', false],
		['attempt', 'uint8_t', false],
		['completion_pct', 'uint8_t', false],
		['completion_mask', 'uint8_t', false],
	];
}