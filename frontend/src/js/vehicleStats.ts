import { default as nStore, type nStoreT } from "../../../shared/js/libraries/nStore";
import { FlightMode, FlightmodeNameMap, MavState } from "../../../shared/js/mavlink2RestMessages";
import { rov_actions_proto } from "../../../shared/js/protobufs/rovActionsProto";

export const networkLatencyMs: nStoreT<number> = nStore(0);
export const internalTempC: nStoreT<number> = nStore(0);
export const autopilotLoad: nStoreT<number> = nStore(0);
export const autopilotErrorCount: nStoreT<number> = nStore(0);
export const autopilotMode: nStoreT<FlightMode> = nStore(FlightMode.unknown);
export const autopilotMavState: nStoreT<MavState> = nStore(MavState.MAV_STATE_UNINIT);

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
