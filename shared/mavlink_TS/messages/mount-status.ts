import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {MavMountMode} from '../enums/mav-mount-mode';
/*
Message with some status from autopilot to GCS about camera or antenna mount.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// pointing_a Pitch. int32_t
// pointing_b Roll. int32_t
// pointing_c Yaw. int32_t
// mount_mode Mount operating mode. uint8_t
export class MountStatus extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public pointing_a!: number;
	public pointing_b!: number;
	public pointing_c!: number;
	public mount_mode!: MavMountMode;
	public _message_id: number = 158;
	public _message_name: string = 'MOUNT_STATUS';
	public _crc_extra: number = 134;
	public _message_fields: [string, string, boolean][] = [
		['pointing_a', 'int32_t', false],
		['pointing_b', 'int32_t', false],
		['pointing_c', 'int32_t', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
		['mount_mode', 'uint8_t', true],
	];
}