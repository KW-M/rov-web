// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { OsdParamConfigError } from "./OsdParamConfigError";
import type { OsdParamConfigType } from "./OsdParamConfigType";

export interface OSD_PARAM_SHOW_CONFIG_REPLY_DATA {
  request_id: number;
  min_value: number;
  max_value: number;
  increment: number;
  result: OsdParamConfigError;
  param_id: Array<number>;
  config_type: OsdParamConfigType;
}
