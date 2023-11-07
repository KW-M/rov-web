import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {IcarousFmsState} from '../enums/icarous-fms-state';
/*
ICAROUS heartbeat
*/
// status See the FMS_STATE enum. uint8_t
export class IcarousHeartbeat extends MAVLinkMessage {
	public status!: IcarousFmsState;
	public _message_id: number = 42000;
	public _message_name: string = 'ICAROUS_HEARTBEAT';
	public _crc_extra: number = 227;
	public _message_fields: [string, string, boolean][] = [
		['status', 'uint8_t', false],
	];
}