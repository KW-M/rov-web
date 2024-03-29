// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { HighresImuUpdatedFlags } from "./HighresImuUpdatedFlags";

export interface HIGHRES_IMU_DATA {
  time_usec: bigint;
  xacc: number;
  yacc: number;
  zacc: number;
  xgyro: number;
  ygyro: number;
  zgyro: number;
  xmag: number;
  ymag: number;
  zmag: number;
  abs_pressure: number;
  diff_pressure: number;
  pressure_alt: number;
  temperature: number;
  fields_updated: HighresImuUpdatedFlags;
}
