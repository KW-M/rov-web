import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Start firmware update with encapsulated data.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// size FW Size. uint32_t
// crc FW CRC. uint32_t
export class CubepilotFirmwareUpdateStart extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public size!: number;
	public crc!: number;
	public _message_id: number = 50004;
	public _message_name: string = 'CUBEPILOT_FIRMWARE_UPDATE_START';
	public _crc_extra: number = 240;
	public _message_fields: [string, string, boolean][] = [
		['size', 'uint32_t', false],
		['crc', 'uint32_t', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
	];
}