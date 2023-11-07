import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {MavCmd} from '../enums/mav-cmd';
import {MavResult} from '../enums/mav-result';
/*
Report status of a command. Includes feedback whether the command was executed. The command microservice is documented at https://mavlink.io/en/services/command.html
*/
// command Command ID (of acknowledged command). uint16_t
// result Result of command. uint8_t
// progress Also used as result_param1, it can be set with a enum containing the errors reasons of why the command was denied or the progress percentage or 255 if unknown the progress when result is MAV_RESULT_IN_PROGRESS. uint8_t
// result_param2 Additional parameter of the result, example: which parameter of MAV_CMD_NAV_WAYPOINT caused it to be denied. int32_t
// target_system System which requested the command to be executed uint8_t
// target_component Component which requested the command to be executed uint8_t
export class CommandAck extends MAVLinkMessage {
	public command!: MavCmd;
	public result!: MavResult;
	public progress!: number;
	public result_param2!: number;
	public target_system!: number;
	public target_component!: number;
	public _message_id: number = 77;
	public _message_name: string = 'COMMAND_ACK';
	public _crc_extra: number = 143;
	public _message_fields: [string, string, boolean][] = [
		['command', 'uint16_t', false],
		['result', 'uint8_t', false],
		['progress', 'uint8_t', true],
		['result_param2', 'int32_t', true],
		['target_system', 'uint8_t', true],
		['target_component', 'uint8_t', true],
	];
}