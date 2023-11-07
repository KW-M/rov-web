import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {LimitsState} from '../enums/limits-state';
import {LimitModule} from '../enums/limit-module';
/*
Status of AP_Limits. Sent in extended status stream when AP_Limits is enabled.
*/
// limits_state State of AP_Limits. uint8_t
// last_trigger Time (since boot) of last breach. uint32_t
// last_action Time (since boot) of last recovery action. uint32_t
// last_recovery Time (since boot) of last successful recovery. uint32_t
// last_clear Time (since boot) of last all-clear. uint32_t
// breach_count Number of fence breaches. uint16_t
// mods_enabled AP_Limit_Module bitfield of enabled modules. uint8_t
// mods_required AP_Limit_Module bitfield of required modules. uint8_t
// mods_triggered AP_Limit_Module bitfield of triggered modules. uint8_t
export class LimitsStatus extends MAVLinkMessage {
	public limits_state!: LimitsState;
	public last_trigger!: number;
	public last_action!: number;
	public last_recovery!: number;
	public last_clear!: number;
	public breach_count!: number;
	public mods_enabled!: LimitModule;
	public mods_required!: LimitModule;
	public mods_triggered!: LimitModule;
	public _message_id: number = 167;
	public _message_name: string = 'LIMITS_STATUS';
	public _crc_extra: number = 144;
	public _message_fields: [string, string, boolean][] = [
		['last_trigger', 'uint32_t', false],
		['last_action', 'uint32_t', false],
		['last_recovery', 'uint32_t', false],
		['last_clear', 'uint32_t', false],
		['breach_count', 'uint16_t', false],
		['limits_state', 'uint8_t', false],
		['mods_enabled', 'uint8_t', false],
		['mods_required', 'uint8_t', false],
		['mods_triggered', 'uint8_t', false],
	];
}