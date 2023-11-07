import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {CameraStatusTypes} from '../enums/camera-status-types';
/*
Camera Event.
*/
// time_usec Image timestamp (since UNIX epoch, according to camera clock). uint64_t
// target_system System ID. uint8_t
// cam_idx Camera ID. uint8_t
// img_idx Image index. uint16_t
// event_id Event type. uint8_t
// p1 Parameter 1 (meaning depends on event_id, see CAMERA_STATUS_TYPES enum). float
// p2 Parameter 2 (meaning depends on event_id, see CAMERA_STATUS_TYPES enum). float
// p3 Parameter 3 (meaning depends on event_id, see CAMERA_STATUS_TYPES enum). float
// p4 Parameter 4 (meaning depends on event_id, see CAMERA_STATUS_TYPES enum). float
export class CameraStatus extends MAVLinkMessage {
	public time_usec!: number;
	public target_system!: number;
	public cam_idx!: number;
	public img_idx!: number;
	public event_id!: CameraStatusTypes;
	public p1!: number;
	public p2!: number;
	public p3!: number;
	public p4!: number;
	public _message_id: number = 179;
	public _message_name: string = 'CAMERA_STATUS';
	public _crc_extra: number = 189;
	public _message_fields: [string, string, boolean][] = [
		['time_usec', 'uint64_t', false],
		['p1', 'float', false],
		['p2', 'float', false],
		['p3', 'float', false],
		['p4', 'float', false],
		['img_idx', 'uint16_t', false],
		['target_system', 'uint8_t', false],
		['cam_idx', 'uint8_t', false],
		['event_id', 'uint8_t', false],
	];
}