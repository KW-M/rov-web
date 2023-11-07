import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {IcarousTrackBandTypes} from '../enums/icarous-track-band-types';
/*
Kinematic multi bands (track) output from Daidalus
*/
// numBands Number of track bands int8_t
// type1 See the TRACK_BAND_TYPES enum. uint8_t
// min1 min angle (degrees) float
// max1 max angle (degrees) float
// type2 See the TRACK_BAND_TYPES enum. uint8_t
// min2 min angle (degrees) float
// max2 max angle (degrees) float
// type3 See the TRACK_BAND_TYPES enum. uint8_t
// min3 min angle (degrees) float
// max3 max angle (degrees) float
// type4 See the TRACK_BAND_TYPES enum. uint8_t
// min4 min angle (degrees) float
// max4 max angle (degrees) float
// type5 See the TRACK_BAND_TYPES enum. uint8_t
// min5 min angle (degrees) float
// max5 max angle (degrees) float
export class IcarousKinematicBands extends MAVLinkMessage {
	public numBands!: number;
	public type1!: IcarousTrackBandTypes;
	public min1!: number;
	public max1!: number;
	public type2!: IcarousTrackBandTypes;
	public min2!: number;
	public max2!: number;
	public type3!: IcarousTrackBandTypes;
	public min3!: number;
	public max3!: number;
	public type4!: IcarousTrackBandTypes;
	public min4!: number;
	public max4!: number;
	public type5!: IcarousTrackBandTypes;
	public min5!: number;
	public max5!: number;
	public _message_id: number = 42001;
	public _message_name: string = 'ICAROUS_KINEMATIC_BANDS';
	public _crc_extra: number = 239;
	public _message_fields: [string, string, boolean][] = [
		['min1', 'float', false],
		['max1', 'float', false],
		['min2', 'float', false],
		['max2', 'float', false],
		['min3', 'float', false],
		['max3', 'float', false],
		['min4', 'float', false],
		['max4', 'float', false],
		['min5', 'float', false],
		['max5', 'float', false],
		['numBands', 'int8_t', false],
		['type1', 'uint8_t', false],
		['type2', 'uint8_t', false],
		['type3', 'uint8_t', false],
		['type4', 'uint8_t', false],
		['type5', 'uint8_t', false],
	];
}