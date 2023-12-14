// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { GpsFixType } from "./GpsFixType";

export interface GPS2_RAW_DATA {
  time_usec: bigint;
  lat: number;
  lon: number;
  alt: number;
  dgps_age: number;
  eph: number;
  epv: number;
  vel: number;
  cog: number;
  fix_type: GpsFixType;
  satellites_visible: number;
  dgps_numch: number;
}
