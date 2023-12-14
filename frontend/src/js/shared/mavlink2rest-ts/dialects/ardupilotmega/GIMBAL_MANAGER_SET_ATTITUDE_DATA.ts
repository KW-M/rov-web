// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { GimbalManagerFlags } from "./GimbalManagerFlags";

export interface GIMBAL_MANAGER_SET_ATTITUDE_DATA {
  flags: GimbalManagerFlags;
  q: Array<number>;
  angular_velocity_x: number;
  angular_velocity_y: number;
  angular_velocity_z: number;
  target_system: number;
  target_component: number;
  gimbal_device_id: number;
}
