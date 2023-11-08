import { MAVLinkMessage } from '@ifrunistuttgart/node-mavlink';
import { readInt64LE, readUInt64LE } from '@ifrunistuttgart/node-mavlink';
import { MissionState } from '../enums/mission-state';
/*
Message that announces the sequence number of the current active mission item. The MAV will fly towards this mission item.
*/
// seq Sequence uint16_t
// total Total number of mission items on vehicle (on last item, sequence == total). If the autopilot stores its home location as part of the mission this will be excluded from the total. 0: Not supported, UINT16_MAX if no mission is present on the vehicle. uint16_t
// mission_state Mission state machine state. MISSION_STATE_UNKNOWN if state reporting not supported. uint8_t
// mission_mode Vehicle is in a mode that can execute mission items or suspended. 0: Unknown, 1: In mission mode, 2: Suspended (not in mission mode). uint8_t
export class MissionCurrent extends MAVLinkMessage {
	public seq!: number;
	public total!: number;
	public mission_state!: MissionState;
	public mission_mode!: number;
	public _message_id: number = 42;
	public _message_name: string = 'MISSION_CURRENT';
	public _crc_extra: number = 28;
	public _message_fields: [string, string, boolean][] = [
		['seq', 'uint16_t', false],
		['total', 'uint16_t', true],
		['mission_state', 'uint8_t', true],
		['mission_mode', 'uint8_t', true],
	];
}
