import { SEA_LEVEL_PRESSURE } from "./shared/consts";
import { default as nStore, type nStoreT } from "./shared/libraries/nStore";
import { rov_actions_proto } from "./shared/protobufs/rovActionsProto";

export const networkLatencyMs: nStoreT<number> = nStore(Infinity);
export const depthM: nStoreT<number> = nStore(Infinity);
export const waterTempC: nStoreT<number> = nStore(Infinity);
export const internalTempC: nStoreT<number> = nStore(Infinity);
export const piCPUTempC: nStoreT<number> = nStore(Infinity);
export const pressureMbar: nStoreT<number> = nStore(Infinity);
export const rovHeading: nStoreT<number> = nStore(0);
export const rovPitch: nStoreT<number> = nStore(0);
export const rovRoll: nStoreT<number> = nStore(0);



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

// export function updateSensorValues(sensorUpdates: any) {

// }
