import type { nStoreT } from "./libraries/nStore";
import nStore from "./libraries/nStore";
import { rov_action_api } from "./proto/rovActionsCompiled";

export const networkLatencyMs: nStoreT<number> = nStore(0);
export const depthM: nStoreT<number> = nStore(0);
export const waterTempC: nStoreT<number> = nStore(0);
export const internalTempC: nStoreT<number> = nStore(0);
export const pressureMbar: nStoreT<number> = nStore(0);
export const rovHeading: nStoreT<number> = nStore(0);
export const rovPitch: nStoreT<number> = nStore(0);
export const rovRoll: nStoreT<number> = nStore(0);

const SEA_LEVEL_PRESSURE = 1013.25; // mbar

export function updateSensorValues(updates: rov_action_api.IMeasurement[]) {
    for (let update of updates) {
        if (update.MeasurementType == rov_action_api.SensorMeasurmentTypes.pressure_mbar) {
            pressureMbar.set(update.Value)
            depthM.set((update.Value - SEA_LEVEL_PRESSURE) * 0.009962143853); // milibar to meters of sea water depth
        } else if (update.MeasurementType == rov_action_api.SensorMeasurmentTypes.water_temp_celsius) {
            waterTempC.set(update.Value)
        } else if (update.MeasurementType == rov_action_api.SensorMeasurmentTypes.internal_temp_celsius) {
            internalTempC.set(update.Value)
        } else if (update.MeasurementType == rov_action_api.SensorMeasurmentTypes.yaw_degrees) {
            rovHeading.set(update.Value)
        } else if (update.MeasurementType == rov_action_api.SensorMeasurmentTypes.pitch_degrees) {
            rovPitch.set(update.Value)
        } else if (update.MeasurementType == rov_action_api.SensorMeasurmentTypes.roll_degrees) {
            rovRoll.set(update.Value)
        }
    }
}
