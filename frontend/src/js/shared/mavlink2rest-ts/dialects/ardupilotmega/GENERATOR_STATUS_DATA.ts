// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { MavGeneratorStatusFlag } from "./MavGeneratorStatusFlag";

export interface GENERATOR_STATUS_DATA {
  status: MavGeneratorStatusFlag;
  battery_current: number;
  load_current: number;
  power_generated: number;
  bus_voltage: number;
  bat_current_setpoint: number;
  runtime: number;
  time_until_maintenance: number;
  generator_speed: number;
  rectifier_temperature: number;
  generator_temperature: number;
}