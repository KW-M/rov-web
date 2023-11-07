import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
A fence point. Used to set a point when from GCS -> MAV. Also used to return a point from MAV -> GCS.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// idx Point index (first point is 1, 0 is for return point). uint8_t
// count Total number of points (for sanity checking). uint8_t
// lat Latitude of point. float
// lng Longitude of point. float
export class FencePoint extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public idx!: number;
	public count!: number;
	public lat!: number;
	public lng!: number;
	public _message_id: number = 160;
	public _message_name: string = 'FENCE_POINT';
	public _crc_extra: number = 78;
	public _message_fields: [string, string, boolean][] = [
		['lat', 'float', false],
		['lng', 'float', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
		['idx', 'uint8_t', false],
		['count', 'uint8_t', false],
	];
}