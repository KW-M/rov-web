// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { MavOdidCategoryEu } from "./MavOdidCategoryEu";
import type { MavOdidClassEu } from "./MavOdidClassEu";
import type { MavOdidClassificationType } from "./MavOdidClassificationType";
import type { MavOdidOperatorLocationType } from "./MavOdidOperatorLocationType";

export interface OPEN_DRONE_ID_SYSTEM_DATA {
  operator_latitude: number;
  operator_longitude: number;
  area_ceiling: number;
  area_floor: number;
  operator_altitude_geo: number;
  timestamp: number;
  area_count: number;
  area_radius: number;
  target_system: number;
  target_component: number;
  id_or_mac: Array<number>;
  operator_location_type: MavOdidOperatorLocationType;
  classification_type: MavOdidClassificationType;
  category_eu: MavOdidCategoryEu;
  class_eu: MavOdidClassEu;
}