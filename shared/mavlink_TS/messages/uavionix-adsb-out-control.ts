import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {UavionixAdsbOutControlState} from '../enums/uavionix-adsb-out-control-state';
import {UavionixAdsbEmergencyStatus} from '../enums/uavionix-adsb-emergency-status';
import {UavionixAdsbXbit} from '../enums/uavionix-adsb-xbit';
/*
Control message with all data sent in UCP control message.
*/
// state ADS-B transponder control state flags uint8_t
// baroAltMSL Barometric pressure altitude (MSL) relative to a standard atmosphere of 1013.2 mBar and NOT bar corrected altitude (m * 1E-3). (up +ve). If unknown set to INT32_MAX int32_t
// squawk Mode A code (typically 1200 [0x04B0] for VFR) uint16_t
// emergencyStatus Emergency status uint8_t
// flight_id Flight Identification: 8 ASCII characters, '0' through '9', 'A' through 'Z' or space. Spaces (0x20) used as a trailing pad character, or when call sign is unavailable. char
// x_bit X-Bit enable (military transponders only) uint8_t
export class UavionixAdsbOutControl extends MAVLinkMessage {
	public state!: UavionixAdsbOutControlState;
	public baroAltMSL!: number;
	public squawk!: number;
	public emergencyStatus!: UavionixAdsbEmergencyStatus;
	public flight_id!: string;
	public x_bit!: UavionixAdsbXbit;
	public _message_id: number = 10007;
	public _message_name: string = 'UAVIONIX_ADSB_OUT_CONTROL';
	public _crc_extra: number = 71;
	public _message_fields: [string, string, boolean][] = [
		['baroAltMSL', 'int32_t', false],
		['squawk', 'uint16_t', false],
		['state', 'uint8_t', false],
		['emergencyStatus', 'uint8_t', false],
		['flight_id', 'char', false],
		['x_bit', 'uint8_t', false],
	];
}