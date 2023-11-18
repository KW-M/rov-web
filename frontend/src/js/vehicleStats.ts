import nStore from "./shared/libraries/nStore";
import { FlightMode, FlightmodeNameMap, MavState } from "./shared/mavlink2RestMessages";
import { showToastMessage } from "./toastMessageManager";

export const networkLatencyMs = nStore<number>(0);
export const batteryPercent = nStore<number>(0);
export const batteryVoltage = nStore<number>(0);
export const batteryCurrent = nStore<number>(0);

export const autopilotLoad = nStore<number>(0);
export const autopilotErrorCount = nStore<number>(0);
export const autopilotMode = nStore<FlightMode>(FlightMode.unknown);
export const autopilotMavState = nStore<MavState>(MavState.MAV_STATE_UNINIT);
export const autopilotArmed = nStore<boolean>(false);

export const cpuTempC = nStore<number>(0);
export const cpuUsagePercent = nStore<number>(0);
export const memUsagePercent = nStore<number>(0);
export const diskUsagePercent = nStore<number>(0);

export function updateSystemMonitorDisplay(cpuTemp: number, cpuUsage: number, MemUsage: number, DiskUsage: number, warnings: string[]) {
    cpuTempC.set(cpuTemp);
    cpuUsagePercent.set(cpuUsage);
    memUsagePercent.set(MemUsage);
    diskUsagePercent.set(DiskUsage);
    warnings.forEach((warning) => {
        console.warn("System Monitor Warning: " + warning)
        showToastMessage(warning, 5000)
    });
}

export function updateBatteryDisplay(percent: number, voltage: number, current: number) {
    batteryPercent.set(percent);
    batteryVoltage.set(voltage);
    batteryCurrent.set(current);
}

export function updateLatencyDisplay(latencyMs: number) {
    networkLatencyMs.set(latencyMs);
}

export function updateAutopilotFlightModeDisplay(mode: FlightMode) {
    if (mode in FlightmodeNameMap) {
        autopilotMode.set(mode);
    } else {
        console.warn("Unknown flight mode number recived: ", mode);
        autopilotMode.set(FlightMode.unknown)
    }
}

export function updateAutopilotStatusDisplay(status: MavState) {
    autopilotMavState.set(status);
}

export function updateAutopilotLoadDisplay(load: number) {
    autopilotLoad.set(load);
}

export function updateAutopilotErrorCountDisplay(errorCount: number) {
    autopilotErrorCount.set(errorCount);
}
