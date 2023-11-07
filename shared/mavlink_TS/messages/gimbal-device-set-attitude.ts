import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {GimbalDeviceFlags} from '../enums/gimbal-device-flags';
/*
Low level message to control a gimbal device's attitude.
	  This message is to be sent from the gimbal manager to the gimbal device component.
	  The quaternion and angular velocities can be set to NaN according to use case.
	  For the angles encoded in the quaternion and the angular velocities holds:
	  If the flag GIMBAL_DEVICE_FLAGS_YAW_IN_VEHICLE_FRAME is set, then they are relative to the vehicle heading (vehicle frame).
	  If the flag GIMBAL_DEVICE_FLAGS_YAW_IN_EARTH_FRAME is set, then they are relative to absolute North (earth frame).
	  If neither of these flags are set, then (for backwards compatibility) it holds:
	  If the flag GIMBAL_DEVICE_FLAGS_YAW_LOCK is set, then they are relative to absolute North (earth frame),
	  else they are relative to the vehicle heading (vehicle frame).
	  Setting both GIMBAL_DEVICE_FLAGS_YAW_IN_VEHICLE_FRAME and GIMBAL_DEVICE_FLAGS_YAW_IN_EARTH_FRAME is not allowed.
	  These rules are to ensure backwards compatibility.
	  New implementations should always set either GIMBAL_DEVICE_FLAGS_YAW_IN_VEHICLE_FRAME or GIMBAL_DEVICE_FLAGS_YAW_IN_EARTH_FRAME.
*/
// target_system System ID uint8_t
// target_component Component ID uint8_t
// flags Low level gimbal flags. uint16_t
// q Quaternion components, w, x, y, z (1 0 0 0 is the null-rotation). The frame is described in the message description. Set fields to NaN to be ignored. float
// angular_velocity_x X component of angular velocity (positive: rolling to the right). The frame is described in the message description. NaN to be ignored. float
// angular_velocity_y Y component of angular velocity (positive: pitching up). The frame is described in the message description. NaN to be ignored. float
// angular_velocity_z Z component of angular velocity (positive: yawing to the right). The frame is described in the message description. NaN to be ignored. float
export class GimbalDeviceSetAttitude extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public flags!: GimbalDeviceFlags;
	public q!: number;
	public angular_velocity_x!: number;
	public angular_velocity_y!: number;
	public angular_velocity_z!: number;
	public _message_id: number = 284;
	public _message_name: string = 'GIMBAL_DEVICE_SET_ATTITUDE';
	public _crc_extra: number = 99;
	public _message_fields: [string, string, boolean][] = [
		['q', 'float', false],
		['angular_velocity_x', 'float', false],
		['angular_velocity_y', 'float', false],
		['angular_velocity_z', 'float', false],
		['flags', 'uint16_t', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
	];
}