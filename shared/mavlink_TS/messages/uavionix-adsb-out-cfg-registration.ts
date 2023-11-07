import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Aircraft Registration.
*/
// registration Aircraft Registration (ASCII string A-Z, 0-9 only), e.g. "N8644B ". Trailing spaces (0x20) only. This is null-terminated. char
export class UavionixAdsbOutCfgRegistration extends MAVLinkMessage {
	public registration!: string;
	public _message_id: number = 10004;
	public _message_name: string = 'UAVIONIX_ADSB_OUT_CFG_REGISTRATION';
	public _crc_extra: number = 133;
	public _message_fields: [string, string, boolean][] = [
		['registration', 'char', false],
	];
}