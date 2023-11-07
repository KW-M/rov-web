import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Raw ADC output.
*/
// adc1 ADC output 1. uint16_t
// adc2 ADC output 2. uint16_t
// adc3 ADC output 3. uint16_t
// adc4 ADC output 4. uint16_t
// adc5 ADC output 5. uint16_t
// adc6 ADC output 6. uint16_t
export class ApAdc extends MAVLinkMessage {
	public adc1!: number;
	public adc2!: number;
	public adc3!: number;
	public adc4!: number;
	public adc5!: number;
	public adc6!: number;
	public _message_id: number = 153;
	public _message_name: string = 'AP_ADC';
	public _crc_extra: number = 188;
	public _message_fields: [string, string, boolean][] = [
		['adc1', 'uint16_t', false],
		['adc2', 'uint16_t', false],
		['adc3', 'uint16_t', false],
		['adc4', 'uint16_t', false],
		['adc5', 'uint16_t', false],
		['adc6', 'uint16_t', false],
	];
}