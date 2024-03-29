// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { AttitudeTargetTypemask } from "./AttitudeTargetTypemask";

export interface ATTITUDE_TARGET_DATA {
  time_boot_ms: number;
  q: Array<number>;
  body_roll_rate: number;
  body_pitch_rate: number;
  body_yaw_rate: number;
  thrust: number;
  type_mask: AttitudeTargetTypemask;
}
