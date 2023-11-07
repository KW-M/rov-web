import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {MavDistanceSensor} from '../enums/mav-distance-sensor';
import {MavFrame} from '../enums/mav-frame';
/*
Obstacle located as a 3D vector.
*/
// time_boot_ms Timestamp (time since system boot). uint32_t
// sensor_type Class id of the distance sensor type. uint8_t
// frame Coordinate frame of reference. uint8_t
// obstacle_id Unique ID given to each obstacle so that its movement can be tracked. Use UINT16_MAX if object ID is unknown or cannot be determined. uint16_t
// x X position of the obstacle. float
// y Y position of the obstacle. float
// z Z position of the obstacle. float
// min_distance Minimum distance the sensor can measure. float
// max_distance Maximum distance the sensor can measure. float
export class ObstacleDistance3d extends MAVLinkMessage {
	public time_boot_ms!: number;
	public sensor_type!: MavDistanceSensor;
	public frame!: MavFrame;
	public obstacle_id!: number;
	public x!: number;
	public y!: number;
	public z!: number;
	public min_distance!: number;
	public max_distance!: number;
	public _message_id: number = 11037;
	public _message_name: string = 'OBSTACLE_DISTANCE_3D';
	public _crc_extra: number = 130;
	public _message_fields: [string, string, boolean][] = [
		['time_boot_ms', 'uint32_t', false],
		['x', 'float', false],
		['y', 'float', false],
		['z', 'float', false],
		['min_distance', 'float', false],
		['max_distance', 'float', false],
		['obstacle_id', 'uint16_t', false],
		['sensor_type', 'uint8_t', false],
		['frame', 'uint8_t', false],
	];
}