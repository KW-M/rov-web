import { MAVLinkMessage } from '@ifrunistuttgart/node-mavlink';
import { readInt64LE, readUInt64LE } from '@ifrunistuttgart/node-mavlink';
import { CanFilterOp } from '../enums/can-filter-op';
/*
Modify the filter of what CAN messages to forward over the mavlink. This can be used to make CAN forwarding work well on low bandwith links. The filtering is applied on bits 8 to 24 of the CAN id (2nd and 3rd bytes) which corresponds to the DroneCAN message ID for DroneCAN. Filters with more than 16 IDs can be constructed by sending multiple CAN_FILTER_MODIFY messages.
*/
// target_system System ID. uint8_t
// target_component Component ID. uint8_t
// bus bus number uint8_t
// operation what operation to perform on the filter list. See CAN_FILTER_OP enum. uint8_t
// num_ids number of IDs in filter list uint8_t
// ids filter IDs, length num_ids uint16_t
export class CanFilterModify extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public bus!: number;
	public operation!: CanFilterOp;
	public num_ids!: number;
	public ids!: number;
	public _message_id: number = 388;
	public _message_name: string = 'CAN_FILTER_MODIFY';
	public _crc_extra: number = 8;
	public _message_fields: [string, string, boolean][] = [
		['ids', 'uint16_t', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
		['bus', 'uint8_t', false],
		['operation', 'uint8_t', false],
		['num_ids', 'uint8_t', false],
	];
}
