import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {GimbalDeviceFlags} from '../enums/gimbal-device-flags';
import {GimbalDeviceErrorFlags} from '../enums/gimbal-device-error-flags';
/*
Message reporting the status of a gimbal device.
	  This message should be broadcast by a gimbal device component at a low regular rate (e.g. 5 Hz).
	  For the angles encoded in the quaternion and the angular velocities holds:
	  If the flag GIMBAL_DEVICE_FLAGS_YAW_IN_VEHICLE_FRAME is set, then they are relative to the vehicle heading (vehicle frame).
	  If the flag GIMBAL_DEVICE_FLAGS_YAW_IN_EARTH_FRAME is set, then they are relative to absolute North (earth frame).
	  If neither of these flags are set, then (for backwards compatibility) it holds:
	  If the flag GIMBAL_DEVICE_FLAGS_YAW_LOCK is set, then they are relative to absolute North (earth frame),
	  else they are relative to the vehicle heading (vehicle frame).
	  Other conditions of the flags are not allowed.
	  The quaternion and angular velocities in the other frame can be calculated from delta_yaw and delta_yaw_velocity as
	  q_earth = q_delta_yaw * q_vehicle and w_earth = w_delta_yaw_velocity + w_vehicle (if not NaN).
	  If neither the GIMBAL_DEVICE_FLAGS_YAW_IN_VEHICLE_FRAME nor the GIMBAL_DEVICE_FLAGS_YAW_IN_EARTH_FRAME flag is set,
	  then (for backwards compatibility) the data in the delta_yaw and delta_yaw_velocity fields are to be ignored.
	  New implementations should always set either GIMBAL_DEVICE_FLAGS_YAW_IN_VEHICLE_FRAME or GIMBAL_DEVICE_FLAGS_YAW_IN_EARTH_FRAME,
	  and always should set delta_yaw and delta_yaw_velocity either to the proper value or NaN.
*/
// target_system System ID uint8_t
// target_component Component ID uint8_t
// time_boot_ms Timestamp (time since system boot). uint32_t
// flags Current gimbal flags set. uint16_t
// q Quaternion components, w, x, y, z (1 0 0 0 is the null-rotation). The frame is described in the message description. float
// angular_velocity_x X component of angular velocity (positive: rolling to the right). The frame is described in the message description. NaN if unknown. float
// angular_velocity_y Y component of angular velocity (positive: pitching up). The frame is described in the message description. NaN if unknown. float
// angular_velocity_z Z component of angular velocity (positive: yawing to the right). The frame is described in the message description. NaN if unknown. float
// failure_flags Failure flags (0 for no failure) uint32_t
// delta_yaw Yaw angle relating the quaternions in earth and body frames (see message description). NaN if unknown. float
// delta_yaw_velocity Yaw angular velocity relating the angular velocities in earth and body frames (see message description). NaN if unknown. float
// gimbal_device_id This field is to be used if the gimbal manager and the gimbal device are the same component and hence have the same component ID. This field is then set a number between 1-6. If the component ID is separate, this field is not required and must be set to 0. uint8_t
export class GimbalDeviceAttitudeStatus extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public time_boot_ms!: number;
	public flags!: GimbalDeviceFlags;
	public q!: number;
	public angular_velocity_x!: number;
	public angular_velocity_y!: number;
	public angular_velocity_z!: number;
	public failure_flags!: GimbalDeviceErrorFlags;
	public delta_yaw!: number;
	public delta_yaw_velocity!: number;
	public gimbal_device_id!: number;
	public _message_id: number = 285;
	public _message_name: string = 'GIMBAL_DEVICE_ATTITUDE_STATUS';
	public _crc_extra: number = 137;
	public _message_fields: [string, string, boolean][] = [
		['time_boot_ms', 'uint32_t', false],
		['q', 'float', false],
		['angular_velocity_x', 'float', false],
		['angular_velocity_y', 'float', false],
		['angular_velocity_z', 'float', false],
		['failure_flags', 'uint32_t', false],
		['flags', 'uint16_t', false],
		['target_system', 'uint8_t', false],
		['target_component', 'uint8_t', false],
		['delta_yaw', 'float', true],
		['delta_yaw_velocity', 'float', true],
		['gimbal_device_id', 'uint8_t', true],
	];
}