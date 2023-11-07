import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {GoproHeartbeatStatus} from '../enums/gopro-heartbeat-status';
import {GoproCaptureMode} from '../enums/gopro-capture-mode';
import {GoproHeartbeatFlags} from '../enums/gopro-heartbeat-flags';
/*
Heartbeat from a HeroBus attached GoPro.
*/
// status Status. uint8_t
// capture_mode Current capture mode. uint8_t
// flags Additional status bits. uint8_t
export class GoproHeartbeat extends MAVLinkMessage {
	public status!: GoproHeartbeatStatus;
	public capture_mode!: GoproCaptureMode;
	public flags!: GoproHeartbeatFlags;
	public _message_id: number = 215;
	public _message_name: string = 'GOPRO_HEARTBEAT';
	public _crc_extra: number = 101;
	public _message_fields: [string, string, boolean][] = [
		['status', 'uint8_t', false],
		['capture_mode', 'uint8_t', false],
		['flags', 'uint8_t', false],
	];
}