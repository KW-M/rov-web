import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {UavionixAdsbOutStatusState} from '../enums/uavionix-adsb-out-status-state';
import {UavionixAdsbOutStatusNicNacp} from '../enums/uavionix-adsb-out-status-nic-nacp';
import {UavionixAdsbOutStatusFault} from '../enums/uavionix-adsb-out-status-fault';
/*
Status message with information from UCP Heartbeat and Status messages.
*/
// state ADS-B transponder status state flags uint8_t
// squawk Mode A code (typically 1200 [0x04B0] for VFR) uint16_t
// NIC_NACp Integrity and Accuracy of traffic reported as a 4-bit value for each field (NACp 7:4, NIC 3:0) and encoded by Containment Radius (HPL) and Estimated Position Uncertainty (HFOM), respectively uint8_t
// boardTemp Board temperature in C uint8_t
// fault ADS-B transponder fault flags uint8_t
// flight_id Flight Identification: 8 ASCII characters, '0' through '9', 'A' through 'Z' or space. Spaces (0x20) used as a trailing pad character, or when call sign is unavailable. char
export class UavionixAdsbOutStatus extends MAVLinkMessage {
	public state!: UavionixAdsbOutStatusState;
	public squawk!: number;
	public NIC_NACp!: UavionixAdsbOutStatusNicNacp;
	public boardTemp!: number;
	public fault!: UavionixAdsbOutStatusFault;
	public flight_id!: string;
	public _message_id: number = 10008;
	public _message_name: string = 'UAVIONIX_ADSB_OUT_STATUS';
	public _crc_extra: number = 240;
	public _message_fields: [string, string, boolean][] = [
		['squawk', 'uint16_t', false],
		['state', 'uint8_t', false],
		['NIC_NACp', 'uint8_t', false],
		['boardTemp', 'uint8_t', false],
		['fault', 'uint8_t', false],
		['flight_id', 'char', false],
	];
}