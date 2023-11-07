import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {CameraFeedbackFlags} from '../enums/camera-feedback-flags';
/*
Camera Capture Feedback.
*/
// time_usec Image timestamp (since UNIX epoch), as passed in by CAMERA_STATUS message (or autopilot if no CCB). uint64_t
// target_system System ID. uint8_t
// cam_idx Camera ID. uint8_t
// img_idx Image index. uint16_t
// lat Latitude. int32_t
// lng Longitude. int32_t
// alt_msl Altitude (MSL). float
// alt_rel Altitude (Relative to HOME location). float
// roll Camera Roll angle (earth frame, +-180). float
// pitch Camera Pitch angle (earth frame, +-180). float
// yaw Camera Yaw (earth frame, 0-360, true). float
// foc_len Focal Length. float
// flags Feedback flags. uint8_t
// completed_captures Completed image captures. uint16_t
export class CameraFeedback extends MAVLinkMessage {
	public time_usec!: number;
	public target_system!: number;
	public cam_idx!: number;
	public img_idx!: number;
	public lat!: number;
	public lng!: number;
	public alt_msl!: number;
	public alt_rel!: number;
	public roll!: number;
	public pitch!: number;
	public yaw!: number;
	public foc_len!: number;
	public flags!: CameraFeedbackFlags;
	public completed_captures!: number;
	public _message_id: number = 180;
	public _message_name: string = 'CAMERA_FEEDBACK';
	public _crc_extra: number = 52;
	public _message_fields: [string, string, boolean][] = [
		['time_usec', 'uint64_t', false],
		['lat', 'int32_t', false],
		['lng', 'int32_t', false],
		['alt_msl', 'float', false],
		['alt_rel', 'float', false],
		['roll', 'float', false],
		['pitch', 'float', false],
		['yaw', 'float', false],
		['foc_len', 'float', false],
		['img_idx', 'uint16_t', false],
		['target_system', 'uint8_t', false],
		['cam_idx', 'uint8_t', false],
		['flags', 'uint8_t', false],
		['completed_captures', 'uint16_t', true],
	];
}