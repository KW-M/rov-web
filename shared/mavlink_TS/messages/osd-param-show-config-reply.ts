import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {OsdParamConfigError} from '../enums/osd-param-config-error';
import {OsdParamConfigType} from '../enums/osd-param-config-type';
/*
Read configured OSD parameter reply.
*/
// request_id Request ID - copied from request. uint32_t
// result Config error type. uint8_t
// param_id Onboard parameter id, terminated by NULL if the length is less than 16 human-readable chars and WITHOUT null termination (NULL) byte if the length is exactly 16 chars - applications have to provide 16+1 bytes storage if the ID is stored as string char
// config_type Config type. uint8_t
// min_value OSD parameter minimum value. float
// max_value OSD parameter maximum value. float
// increment OSD parameter increment. float
export class OsdParamShowConfigReply extends MAVLinkMessage {
	public request_id!: number;
	public result!: OsdParamConfigError;
	public param_id!: string;
	public config_type!: OsdParamConfigType;
	public min_value!: number;
	public max_value!: number;
	public increment!: number;
	public _message_id: number = 11036;
	public _message_name: string = 'OSD_PARAM_SHOW_CONFIG_REPLY';
	public _crc_extra: number = 177;
	public _message_fields: [string, string, boolean][] = [
		['request_id', 'uint32_t', false],
		['min_value', 'float', false],
		['max_value', 'float', false],
		['increment', 'float', false],
		['result', 'uint8_t', false],
		['param_id', 'char', false],
		['config_type', 'uint8_t', false],
	];
}