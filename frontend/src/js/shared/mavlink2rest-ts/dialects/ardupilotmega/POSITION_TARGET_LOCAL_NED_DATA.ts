// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { MavFrame } from "./MavFrame";
import type { PositionTargetTypemask } from "./PositionTargetTypemask";

export interface POSITION_TARGET_LOCAL_NED_DATA {
  time_boot_ms: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  afx: number;
  afy: number;
  afz: number;
  yaw: number;
  yaw_rate: number;
  type_mask: PositionTargetTypemask;
  coordinate_frame: MavFrame;
}
