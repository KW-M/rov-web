import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Offsets and calibrations values for hardware sensors. This makes it easier to debug the calibration process.
*/
// mag_ofs_x Magnetometer X offset. int16_t
// mag_ofs_y Magnetometer Y offset. int16_t
// mag_ofs_z Magnetometer Z offset. int16_t
// mag_declination Magnetic declination. float
// raw_press Raw pressure from barometer. int32_t
// raw_temp Raw temperature from barometer. int32_t
// gyro_cal_x Gyro X calibration. float
// gyro_cal_y Gyro Y calibration. float
// gyro_cal_z Gyro Z calibration. float
// accel_cal_x Accel X calibration. float
// accel_cal_y Accel Y calibration. float
// accel_cal_z Accel Z calibration. float
export class SensorOffsets extends MAVLinkMessage {
	public mag_ofs_x!: number;
	public mag_ofs_y!: number;
	public mag_ofs_z!: number;
	public mag_declination!: number;
	public raw_press!: number;
	public raw_temp!: number;
	public gyro_cal_x!: number;
	public gyro_cal_y!: number;
	public gyro_cal_z!: number;
	public accel_cal_x!: number;
	public accel_cal_y!: number;
	public accel_cal_z!: number;
	public _message_id: number = 150;
	public _message_name: string = 'SENSOR_OFFSETS';
	public _crc_extra: number = 134;
	public _message_fields: [string, string, boolean][] = [
		['mag_declination', 'float', false],
		['raw_press', 'int32_t', false],
		['raw_temp', 'int32_t', false],
		['gyro_cal_x', 'float', false],
		['gyro_cal_y', 'float', false],
		['gyro_cal_z', 'float', false],
		['accel_cal_x', 'float', false],
		['accel_cal_y', 'float', false],
		['accel_cal_z', 'float', false],
		['mag_ofs_x', 'int16_t', false],
		['mag_ofs_y', 'int16_t', false],
		['mag_ofs_z', 'int16_t', false],
	];
}