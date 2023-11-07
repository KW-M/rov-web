import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Flight Identification for ADSB-Out vehicles.
*/
// flight_id Flight Identification: 8 ASCII characters, '0' through '9', 'A' through 'Z' or space. Spaces (0x20) used as a trailing pad character, or when call sign is unavailable. Reflects Control message setting. This is null-terminated. char
export class UavionixAdsbOutCfgFlightid extends MAVLinkMessage {
	public flight_id!: string;
	public _message_id: number = 10005;
	public _message_name: string = 'UAVIONIX_ADSB_OUT_CFG_FLIGHTID';
	public _crc_extra: number = 103;
	public _message_fields: [string, string, boolean][] = [
		['flight_id', 'char', false],
	];
}