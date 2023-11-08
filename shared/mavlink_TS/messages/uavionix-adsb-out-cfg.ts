import { MAVLinkMessage } from '@ifrunistuttgart/node-mavlink';
import { readInt64LE, readUInt64LE } from '@ifrunistuttgart/node-mavlink';
import { AdsbEmitterType } from '../enums/adsb-emitter-type';
import { UavionixAdsbOutCfgAircraftSize } from '../enums/uavionix-adsb-out-cfg-aircraft-size';
import { UavionixAdsbOutCfgGpsOffsetLat } from '../enums/uavionix-adsb-out-cfg-gps-offset-lat';
import { UavionixAdsbOutCfgGpsOffsetLon } from '../enums/uavionix-adsb-out-cfg-gps-offset-lon';
import { UavionixAdsbOutRfSelect } from '../enums/uavionix-adsb-out-rf-select';
/*
Static data to configure the ADS-B transponder (send within 10 sec of a POR and every 10 sec thereafter)
*/
// ICAO Vehicle address (24 bit) uint32_t
// callsign Vehicle identifier (8 characters, null terminated, valid characters are A-Z, 0-9, " " only) char
// emitterType Transmitting vehicle type. See ADSB_EMITTER_TYPE enum uint8_t
// aircraftSize Aircraft length and width encoding (table 2-35 of DO-282B) uint8_t
// gpsOffsetLat GPS antenna lateral offset (table 2-36 of DO-282B) uint8_t
// gpsOffsetLon GPS antenna longitudinal offset from nose [if non-zero, take position (in meters) divide by 2 and add one] (table 2-37 DO-282B) uint8_t
// stallSpeed Aircraft stall speed in cm/s uint16_t
// rfSelect ADS-B transponder reciever and transmit enable flags uint8_t
export class UavionixAdsbOutCfg extends MAVLinkMessage {
	public ICAO!: number;
	public callsign!: string;
	public emitterType!: AdsbEmitterType;
	public aircraftSize!: UavionixAdsbOutCfgAircraftSize;
	public gpsOffsetLat!: UavionixAdsbOutCfgGpsOffsetLat;
	public gpsOffsetLon!: UavionixAdsbOutCfgGpsOffsetLon;
	public stallSpeed!: number;
	public rfSelect!: UavionixAdsbOutRfSelect;
	public _message_id: number = 10001;
	public _message_name: string = 'UAVIONIX_ADSB_OUT_CFG';
	public _crc_extra: number = 209;
	public _message_fields: [string, string, boolean][] = [
		['ICAO', 'uint32_t', false],
		['stallSpeed', 'uint16_t', false],
		['callsign', 'char', false],
		['emitterType', 'uint8_t', false],
		['aircraftSize', 'uint8_t', false],
		['gpsOffsetLat', 'uint8_t', false],
		['gpsOffsetLon', 'uint8_t', false],
		['rfSelect', 'uint8_t', false],
	];
}
