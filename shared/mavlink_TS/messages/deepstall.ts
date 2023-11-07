import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {DeepstallStage} from '../enums/deepstall-stage';
/*
Deepstall path planning.
*/
// landing_lat Landing latitude. int32_t
// landing_lon Landing longitude. int32_t
// path_lat Final heading start point, latitude. int32_t
// path_lon Final heading start point, longitude. int32_t
// arc_entry_lat Arc entry point, latitude. int32_t
// arc_entry_lon Arc entry point, longitude. int32_t
// altitude Altitude. float
// expected_travel_distance Distance the aircraft expects to travel during the deepstall. float
// cross_track_error Deepstall cross track error (only valid when in DEEPSTALL_STAGE_LAND). float
// stage Deepstall stage. uint8_t
export class Deepstall extends MAVLinkMessage {
	public landing_lat!: number;
	public landing_lon!: number;
	public path_lat!: number;
	public path_lon!: number;
	public arc_entry_lat!: number;
	public arc_entry_lon!: number;
	public altitude!: number;
	public expected_travel_distance!: number;
	public cross_track_error!: number;
	public stage!: DeepstallStage;
	public _message_id: number = 195;
	public _message_name: string = 'DEEPSTALL';
	public _crc_extra: number = 120;
	public _message_fields: [string, string, boolean][] = [
		['landing_lat', 'int32_t', false],
		['landing_lon', 'int32_t', false],
		['path_lat', 'int32_t', false],
		['path_lon', 'int32_t', false],
		['arc_entry_lat', 'int32_t', false],
		['arc_entry_lon', 'int32_t', false],
		['altitude', 'float', false],
		['expected_travel_distance', 'float', false],
		['cross_track_error', 'float', false],
		['stage', 'uint8_t', false],
	];
}