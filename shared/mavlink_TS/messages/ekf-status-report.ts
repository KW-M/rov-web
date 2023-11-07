import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {EkfStatusFlags} from '../enums/ekf-status-flags';
/*
EKF Status message including flags and variances.
*/
// flags Flags. uint16_t
// velocity_variance Velocity variance. float
// pos_horiz_variance Horizontal Position variance. float
// pos_vert_variance Vertical Position variance. float
// compass_variance Compass variance. float
// terrain_alt_variance Terrain Altitude variance. float
// airspeed_variance Airspeed variance. float
export class EkfStatusReport extends MAVLinkMessage {
	public flags!: EkfStatusFlags;
	public velocity_variance!: number;
	public pos_horiz_variance!: number;
	public pos_vert_variance!: number;
	public compass_variance!: number;
	public terrain_alt_variance!: number;
	public airspeed_variance!: number;
	public _message_id: number = 193;
	public _message_name: string = 'EKF_STATUS_REPORT';
	public _crc_extra: number = 71;
	public _message_fields: [string, string, boolean][] = [
		['velocity_variance', 'float', false],
		['pos_horiz_variance', 'float', false],
		['pos_vert_variance', 'float', false],
		['compass_variance', 'float', false],
		['terrain_alt_variance', 'float', false],
		['flags', 'uint16_t', false],
		['airspeed_variance', 'float', true],
	];
}