import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Reports the on/off state of relays, as controlled by MAV_CMD_DO_SET_RELAY.
*/
// time_boot_ms Timestamp (time since system boot). uint32_t
// on Relay states.  Relay instance numbers are represented as individual bits in this mask by offset. uint16_t
// present Relay present.  Relay instance numbers are represented as individual bits in this mask by offset.  Bits will be true if a relay instance is configured. uint16_t
export class RelayStatus extends MAVLinkMessage {
	public time_boot_ms!: number;
	public on!: number;
	public present!: number;
	public _message_id: number = 376;
	public _message_name: string = 'RELAY_STATUS';
	public _crc_extra: number = 199;
	public _message_fields: [string, string, boolean][] = [
		['time_boot_ms', 'uint32_t', false],
		['on', 'uint16_t', false],
		['present', 'uint16_t', false],
	];
}