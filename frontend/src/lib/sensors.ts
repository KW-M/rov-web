import type { nStoreT } from "./libraries/nStore";
import nStore from "./libraries/nStore";
import { rov_actions_proto } from "../../../shared/js/protobufs/rovActionsProto";

export const networkLatencyMs: nStoreT<number> = nStore(0);
export const depthM: nStoreT<number> = nStore(0);
export const waterTempC: nStoreT<number> = nStore(0);
export const internalTempC: nStoreT<number> = nStore(0);
export const pressureMbar: nStoreT<number> = nStore(0);
export const rovHeading: nStoreT<number> = nStore(0);
export const rovPitch: nStoreT<number> = nStore(0);
export const rovRoll: nStoreT<number> = nStore(0);

const SEA_LEVEL_PRESSURE = 1013.25; // mbar

export function updateSensorValues(sensorUpdates: rov_actions_proto.ISensorUpdatesResponse) {
    for (let update of sensorUpdates.MeasurementUpdates) {
        if (update.MeasurementType == rov_actions_proto.SensorMeasurmentTypes.pressure_mbar) {
            pressureMbar.set(update.Value)
            depthM.set((update.Value - SEA_LEVEL_PRESSURE) * 0.009962143853); // milibar to meters of sea water depth
        } else if (update.MeasurementType == rov_actions_proto.SensorMeasurmentTypes.water_temp_celsius) {
            waterTempC.set(update.Value)
        } else if (update.MeasurementType == rov_actions_proto.SensorMeasurmentTypes.internal_temp_celsius) {
            internalTempC.set(update.Value)
        } else if (update.MeasurementType == rov_actions_proto.SensorMeasurmentTypes.yaw_degrees) {
            rovHeading.set(update.Value)
        } else if (update.MeasurementType == rov_actions_proto.SensorMeasurmentTypes.pitch_degrees) {
            rovPitch.set(update.Value)
        } else if (update.MeasurementType == rov_actions_proto.SensorMeasurmentTypes.roll_degrees) {
            rovRoll.set(update.Value)
        }
    }
}
