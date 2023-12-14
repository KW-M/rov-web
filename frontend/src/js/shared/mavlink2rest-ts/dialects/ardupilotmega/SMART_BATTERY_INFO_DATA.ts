// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { MavBatteryFunction } from "./MavBatteryFunction";
import type { MavBatteryType } from "./MavBatteryType";

export interface SMART_BATTERY_INFO_DATA {
  capacity_full_specification: number;
  capacity_full: number;
  cycle_count: number;
  weight: number;
  discharge_minimum_voltage: number;
  charging_minimum_voltage: number;
  resting_minimum_voltage: number;
  id: number;
  battery_function: MavBatteryFunction;
  mavtype: MavBatteryType;
  serial_number: Array<number>;
  device_name: Array<number>;
}
