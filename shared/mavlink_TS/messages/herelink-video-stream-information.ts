import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Information about video stream
*/
// camera_id Video Stream ID (1 for first, 2 for second, etc.) uint8_t
// status Number of streams available. uint8_t
// framerate Frame rate. float
// resolution_h Horizontal resolution. uint16_t
// resolution_v Vertical resolution. uint16_t
// bitrate Bit rate. uint32_t
// rotation Video image rotation clockwise. uint16_t
// uri Video stream URI (TCP or RTSP URI ground station should connect to) or port number (UDP port ground station should listen to). char
export class HerelinkVideoStreamInformation extends MAVLinkMessage {
	public camera_id!: number;
	public status!: number;
	public framerate!: number;
	public resolution_h!: number;
	public resolution_v!: number;
	public bitrate!: number;
	public rotation!: number;
	public uri!: string;
	public _message_id: number = 50002;
	public _message_name: string = 'HERELINK_VIDEO_STREAM_INFORMATION';
	public _crc_extra: number = 181;
	public _message_fields: [string, string, boolean][] = [
		['framerate', 'float', false],
		['bitrate', 'uint32_t', false],
		['resolution_h', 'uint16_t', false],
		['resolution_v', 'uint16_t', false],
		['rotation', 'uint16_t', false],
		['camera_id', 'uint8_t', false],
		['status', 'uint8_t', false],
		['uri', 'char', false],
	];
}