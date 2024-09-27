import nStore from "./shared/libraries/nStore";
import { logWarn } from "./shared/logging";
import { FlightMode } from "./shared/mavlink2RestMessages";
import { MavState } from "./shared/mavlink2rest-ts/messages/mavlink2rest-enum";
import { ToastSeverity, showToastMessage } from "./toastMessageManager";

export const networkLatencyMs = nStore<number>(Infinity);
export const batteryPercent = nStore<number>(Infinity);
export const batteryVoltage = nStore<number>(Infinity);
export const batteryCurrent = nStore<number>(Infinity);

export const autopilotLoad = nStore<number>(Infinity);
export const autopilotErrorCount = nStore<number>(0);
export const autopilotMode = nStore<FlightMode>(FlightMode.unknown);
export const autopilotMavState = nStore<MavState>(MavState.MAV_STATE_UNINIT);
export const autopilotArmed = nStore<boolean>(false);

export const cpuTempC = nStore<number>(Infinity);
export const cpuUsagePercent = nStore<number>(Infinity);
export const memUsagePercent = nStore<number>(Infinity);
export const diskUsagePercent = nStore<number>(Infinity);

export function updateSystemMonitorDisplay(cpuTemp: number, cpuUsage: number, MemUsage: number, DiskUsage: number, warnings: string[]) {
    cpuTempC.set(cpuTemp);
    cpuUsagePercent.set(cpuUsage);
    memUsagePercent.set(MemUsage);
    diskUsagePercent.set(DiskUsage);
    warnings.forEach((warning) => {
        logWarn("System Monitor Warning: " + warning)
        showToastMessage(warning, 5000, true, ToastSeverity.warning)
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

    autopilotMode.set(mode);
    // if (mode in FlightmodeNameMap) {
    // } else {
    //     showToastMessage("ROV is in unknown flight mode: " + String(mode), 4000, true, ToastSeverity.warning);
    //     autopilotMode.set(FlightMode.unknown)
    // }
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
