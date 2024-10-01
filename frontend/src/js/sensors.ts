import { SEA_LEVEL_PRESSURE } from "./shared/consts";
import { default as nStore, type nStoreT } from "./shared/libraries/nStore";
import { SensorMeasurmentTypes, type SensorUpdatesResponse } from "./shared/protobufs/rov_actions";

export const networkLatencyMs: nStoreT<number> = nStore(Infinity);
export const depthM: nStoreT<number> = nStore(Infinity);
export const waterTempC: nStoreT<number> = nStore(Infinity);
export const internalTempC: nStoreT<number> = nStore(Infinity);
export const piCPUTempC: nStoreT<number> = nStore(Infinity);
export const pressureMbar: nStoreT<number> = nStore(Infinity);
export const rovHeading: nStoreT<number> = nStore(0);
export const rovPitch: nStoreT<number> = nStore(0);
export const rovRoll: nStoreT<number> = nStore(0);


const pressureToDepth = (mbar: number) => {
    return (mbar - SEA_LEVEL_PRESSURE) * 0.009962143853; // milibar to meters of sea water depth
}

export function updateSensorValues(sensorUpdates: SensorUpdatesResponse) {
    for (let update of sensorUpdates.measurementUpdates) {
        if (update.measurementType == SensorMeasurmentTypes.pressure_mbar) {
            pressureMbar.set(update.value)
            depthM.set(pressureToDepth(update.value));
        } else if (update.measurementType == SensorMeasurmentTypes.water_temp_celsius) {
            waterTempC.set(update.value)
        } else if (update.measurementType == SensorMeasurmentTypes.internal_temp_celsius) {
            internalTempC.set(update.value)
        } else if (update.measurementType == SensorMeasurmentTypes.yaw_degrees) {
            rovHeading.set(update.value)
        } else if (update.measurementType == SensorMeasurmentTypes.pitch_degrees) {
            rovPitch.set(update.value)
        } else if (update.measurementType == SensorMeasurmentTypes.roll_degrees) {
            rovRoll.set(update.value)
        }
    }
}

// export function updateSensorValues(sensorUpdates: any) {

// }
