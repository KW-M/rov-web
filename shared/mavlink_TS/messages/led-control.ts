import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Control vehicle LEDs.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// instance Instance (LED instance to control or 255 for all LEDs). uint8_t
// pattern Pattern (see LED_PATTERN_ENUM). uint8_t
// custom_len Custom Byte Length. uint8_t
// custom_bytes Custom Bytes. uint8_t
export class LedControl extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public instance!: number;
	public pattern!: number;
	public custom_len!: number;
	public custom_bytes!: number;
	public _message_id: number = 186;
	public _message_name: string = 'LED_CONTROL';
	public _crc_extra: number = 72;
	public _message_fields: [string, string, boolean][] = [
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
		['instance', 'uint8_t', false],
		['pattern', 'uint8_t', false],
		['custom_len', 'uint8_t', false],
		['custom_bytes', 'uint8_t', false],
	];
}