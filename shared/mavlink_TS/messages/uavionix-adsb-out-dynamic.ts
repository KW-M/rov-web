import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {UavionixAdsbOutDynamicGpsFix} from '../enums/uavionix-adsb-out-dynamic-gps-fix';
import {UavionixAdsbEmergencyStatus} from '../enums/uavionix-adsb-emergency-status';
import {UavionixAdsbOutDynamicState} from '../enums/uavionix-adsb-out-dynamic-state';
/*
Dynamic data used to generate ADS-B out transponder data (send at 5Hz)
*/
// utcTime UTC time in seconds since GPS epoch (Jan 6, 1980). If unknown set to UINT32_MAX uint32_t
// gpsLat Latitude WGS84 (deg * 1E7). If unknown set to INT32_MAX int32_t
// gpsLon Longitude WGS84 (deg * 1E7). If unknown set to INT32_MAX int32_t
// gpsAlt Altitude (WGS84). UP +ve. If unknown set to INT32_MAX int32_t
// gpsFix 0-1: no fix, 2: 2D fix, 3: 3D fix, 4: DGPS, 5: RTK uint8_t
// numSats Number of satellites visible. If unknown set to UINT8_MAX uint8_t
// baroAltMSL Barometric pressure altitude (MSL) relative to a standard atmosphere of 1013.2 mBar and NOT bar corrected altitude (m * 1E-3). (up +ve). If unknown set to INT32_MAX int32_t
// accuracyHor Horizontal accuracy in mm (m * 1E-3). If unknown set to UINT32_MAX uint32_t
// accuracyVert Vertical accuracy in cm. If unknown set to UINT16_MAX uint16_t
// accuracyVel Velocity accuracy in mm/s (m * 1E-3). If unknown set to UINT16_MAX uint16_t
// velVert GPS vertical speed in cm/s. If unknown set to INT16_MAX int16_t
// velNS North-South velocity over ground in cm/s North +ve. If unknown set to INT16_MAX int16_t
// VelEW East-West velocity over ground in cm/s East +ve. If unknown set to INT16_MAX int16_t
// emergencyStatus Emergency status uint8_t
// state ADS-B transponder dynamic input state flags uint16_t
// squawk Mode A code (typically 1200 [0x04B0] for VFR) uint16_t
export class UavionixAdsbOutDynamic extends MAVLinkMessage {
	public utcTime!: number;
	public gpsLat!: number;
	public gpsLon!: number;
	public gpsAlt!: number;
	public gpsFix!: UavionixAdsbOutDynamicGpsFix;
	public numSats!: number;
	public baroAltMSL!: number;
	public accuracyHor!: number;
	public accuracyVert!: number;
	public accuracyVel!: number;
	public velVert!: number;
	public velNS!: number;
	public VelEW!: number;
	public emergencyStatus!: UavionixAdsbEmergencyStatus;
	public state!: UavionixAdsbOutDynamicState;
	public squawk!: number;
	public _message_id: number = 10002;
	public _message_name: string = 'UAVIONIX_ADSB_OUT_DYNAMIC';
	public _crc_extra: number = 186;
	public _message_fields: [string, string, boolean][] = [
		['utcTime', 'uint32_t', false],
		['gpsLat', 'int32_t', false],
		['gpsLon', 'int32_t', false],
		['gpsAlt', 'int32_t', false],
		['baroAltMSL', 'int32_t', false],
		['accuracyHor', 'uint32_t', false],
		['accuracyVert', 'uint16_t', false],
		['accuracyVel', 'uint16_t', false],
		['velVert', 'int16_t', false],
		['velNS', 'int16_t', false],
		['VelEW', 'int16_t', false],
		['state', 'uint16_t', false],
		['squawk', 'uint16_t', false],
		['gpsFix', 'uint8_t', false],
		['numSats', 'uint8_t', false],
		['emergencyStatus', 'uint8_t', false],
	];
}