import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Camera vision based attitude and position deltas.
*/
// time_usec Timestamp (synced to UNIX time or since system boot). uint64_t
// time_delta_usec Time since the last reported camera frame. uint64_t
// angle_delta Defines a rotation vector [roll, pitch, yaw] to the current MAV_FRAME_BODY_FRD from the previous MAV_FRAME_BODY_FRD. float
// position_delta Change in position to the current MAV_FRAME_BODY_FRD from the previous FRAME_BODY_FRD rotated to the current MAV_FRAME_BODY_FRD. float
// confidence Normalised confidence value from 0 to 100. float
export class VisionPositionDelta extends MAVLinkMessage {
	public time_usec!: number;
	public time_delta_usec!: number;
	public angle_delta!: number;
	public position_delta!: number;
	public confidence!: number;
	public _message_id: number = 11011;
	public _message_name: string = 'VISION_POSITION_DELTA';
	public _crc_extra: number = 106;
	public _message_fields: [string, string, boolean][] = [
		['time_usec', 'uint64_t', false],
		['time_delta_usec', 'uint64_t', false],
		['angle_delta', 'float', false],
		['position_delta', 'float', false],
		['confidence', 'float', false],
	];
}