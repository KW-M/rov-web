import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
100 Hz gimbal torque command telemetry.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// rl_torque_cmd Roll Torque Command. int16_t
// el_torque_cmd Elevation Torque Command. int16_t
// az_torque_cmd Azimuth Torque Command. int16_t
export class GimbalTorqueCmdReport extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public rl_torque_cmd!: number;
	public el_torque_cmd!: number;
	public az_torque_cmd!: number;
	public _message_id: number = 214;
	public _message_name: string = 'GIMBAL_TORQUE_CMD_REPORT';
	public _crc_extra: number = 69;
	public _message_fields: [string, string, boolean][] = [
		['rl_torque_cmd', 'int16_t', false],
		['el_torque_cmd', 'int16_t', false],
		['az_torque_cmd', 'int16_t', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
	];
}