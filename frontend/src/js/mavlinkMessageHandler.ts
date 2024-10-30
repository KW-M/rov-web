import { depthM, internalTempC, pressureMbar, updateSensorValues, waterTempC } from "./sensors"
import { autopilotArmed, updateAutopilotErrorCountDisplay, updateAutopilotFlightModeDisplay, updateAutopilotLoadDisplay, updateAutopilotStatusDisplay, updateBatteryDisplay } from "./vehicleStats";
import { ToastSeverity, showToastMessage } from "./toastMessageManager";
import { SEA_LEVEL_PRESSURE } from "./shared/consts";
import { URL_PARAMS } from "./frontendConsts";
import type { Package } from "./shared/mavlink2rest-ts/messages/mavlink2rest";
import type { Message } from "./shared/mavlink2rest-ts/messages/mavlink2rest-message";
import { MavModeFlag, MavSeverity, MavState } from "./shared/mavlink2rest-ts/messages/mavlink2rest-enum";
import { log, logDebug } from "./shared/logging";
import { SensorMeasurmentTypes } from "./shared/protobufs/rov_actions";
import { debugModeOn } from "./globalContext";

// import {  MavState, MavModeFlag.MAV_MODE_FLAG_SAFETY_ARMED, MavModeFlag.MAV_MODE_FLAG_MANUAL_INPUT_ENABLED, MavModeFlag.MAV_MODE_FLAG_HIL_ENABLED, MavModeFlag.MAV_MODE_FLAG_STABILIZE_ENABLED, MavModeFlag.MAV_MODE_FLAG_GUIDED_ENABLED, MavModeFlag.MAV_MODE_FLAG_AUTO_ENABLED, MavModeFlag.MAV_MODE_FLAG_TEST_ENABLED, STATUSTEXT } from "./shared/mavlink2RestMessages"

export const handleMavlinkMessage = (msg: Package) => {
    if (!msg.message) return;
    if (!msg.message.type) return logDebug("@ invalid mavlink message rcvd: ", msg);
    const mavMsg = msg.message;
    switch (mavMsg.type) {
        case "HEARTBEAT":
            handleHearbeatRecived(mavMsg as Message.Heartbeat)
            break;
        case "ATTITUDE":
            handleAttitudeRecived(mavMsg as Message.Attitude)
            break;
        case "SYS_STATUS":
            handleSystemStatusRecived(mavMsg as Message.SysStatus)
            break;
        case "STATUSTEXT":
            handleStatusTextRecived(mavMsg as Message.Statustext)
            break;
        case "SCALED_PRESSURE":
            handleScaledPressureRecived(mavMsg as Message.ScaledPressure)
            break;
        case "SCALED_PRESSURE2":
            handleScaledPressure2Recived(mavMsg as Message.ScaledPressure2)
            break;
        default:
            logDebug("@ unhandled mavlink message " + String(mavMsg.type), mavMsg)
    }
}

export const handleHearbeatRecived = (msg: Message.Heartbeat) => {
    if (msg.autopilot.type == "MAV_AUTOPILOT_INVALID") return;
    const currentFlightMode = msg.custom_mode;
    updateAutopilotFlightModeDisplay(currentFlightMode)
    const currentAutopilotState = msg.system_status.type || MavState.MAV_STATE_UNINIT;
    updateAutopilotStatusDisplay(currentAutopilotState)
    const currentFlightFlags = msg.base_mode.bits;
    const armed = (currentFlightFlags & MavModeFlag.MAV_MODE_FLAG_SAFETY_ARMED) > 0;
    autopilotArmed.set(armed)
    const manual_enabled = (currentFlightFlags & MavModeFlag.MAV_MODE_FLAG_MANUAL_INPUT_ENABLED) > 0;
    const hil_enabled = (currentFlightFlags & MavModeFlag.MAV_MODE_FLAG_HIL_ENABLED) > 0;
    const stabilize_enabled = (currentFlightFlags & MavModeFlag.MAV_MODE_FLAG_STABILIZE_ENABLED) > 0;
    const guided_enabled = (currentFlightFlags & MavModeFlag.MAV_MODE_FLAG_GUIDED_ENABLED) > 0;
    const auto_enabled = (currentFlightFlags & MavModeFlag.MAV_MODE_FLAG_AUTO_ENABLED) > 0;
    const test_enabled = (currentFlightFlags & MavModeFlag.MAV_MODE_FLAG_TEST_ENABLED) > 0;

    if (debugModeOn.get()) logDebug("@  autopilot state", currentAutopilotState, "flight mode", currentFlightMode, "armed", armed, "manual_enabled", manual_enabled, "hil_enabled", hil_enabled, "stabilize_enabled", stabilize_enabled, "guided_enabled", guided_enabled, "auto_enabled", auto_enabled, "test_enabled", test_enabled)
}

export const handleAttitudeRecived = (msg: Message.Attitude) => {
    if (debugModeOn.get()) logDebug("@  attitude", msg)
    updateSensorValues({
        measurementUpdates: [
            { measurementType: SensorMeasurmentTypes.yaw_degrees, value: msg.yaw / Math.PI * 180 },
            { measurementType: SensorMeasurmentTypes.pitch_degrees, value: msg.pitch / Math.PI * 180 },
            { measurementType: SensorMeasurmentTypes.roll_degrees, value: msg.roll / Math.PI * 180 },
        ],
    })
}

export const handleScaledPressureRecived = (msg: Message.ScaledPressure) => {
    if (debugModeOn.get()) logDebug("@  scaled pressure", msg)
    pressureMbar.set(msg.press_abs)
    depthM.set((msg.press_abs - SEA_LEVEL_PRESSURE) * 0.009962143853); // milibar to meters of sea water depth
    internalTempC.set(msg.temperature / 100) // 5834
}

export const handleScaledPressure2Recived = (msg: Message.ScaledPressure2) => {
    if (debugModeOn.get()) logDebug("@  scaled pressure 2", msg)
    waterTempC.set(msg.temperature / 100) // 5834
}



export const handleSystemStatusRecived = (msg: Message.SysStatus) => {
    if (debugModeOn.get()) logDebug("@  system status", msg)
    const voltage = msg.voltage_battery / 1000;
    const current = msg.current_battery / 100;
    const all_error_count = msg.errors_comm + msg.errors_count1 + msg.errors_count2 + msg.errors_count3 + msg.errors_count4;
    updateBatteryDisplay(msg.battery_remaining, voltage, current)
    updateAutopilotErrorCountDisplay(all_error_count)
    updateAutopilotLoadDisplay(msg.load)
    // show toast warnings for any errors:
    if (msg.errors_comm > 0) showToastMessage(`${all_error_count} autopilot errors detected!`, 5000, true, ToastSeverity.warning)
    if (voltage < 14 || (msg.battery_remaining > 0 && msg.battery_remaining < 10)) showToastMessage(`Low Battery: ${voltage.toFixed(2)}volts`, 8000, true, ToastSeverity.warning)
    if (current > 30) showToastMessage(`High Current Draw: ${current.toFixed(1)} amps`, 5000, true, ToastSeverity.warning)
}

export const handleStatusTextRecived = (msg: Message.Statustext) => {
    const severity = msg.severity.type
    const text = msg.text.join("")
    if (debugModeOn.get()) logDebug("@  status text", msg)
    const severityMap = {
        [MavSeverity.MAV_SEVERITY_INFO]: ToastSeverity.info,
        [MavSeverity.MAV_SEVERITY_DEBUG]: ToastSeverity.info,
        [MavSeverity.MAV_SEVERITY_NOTICE]: ToastSeverity.info,
        [MavSeverity.MAV_SEVERITY_WARNING]: ToastSeverity.warning,
        [MavSeverity.MAV_SEVERITY_ALERT]: ToastSeverity.warning,
        [MavSeverity.MAV_SEVERITY_CRITICAL]: ToastSeverity.error,
        [MavSeverity.MAV_SEVERITY_EMERGENCY]: ToastSeverity.error,
        [MavSeverity.MAV_SEVERITY_ERROR]: ToastSeverity.error,
    }
    const toastSeverity = severityMap[severity] || ToastSeverity.info;
    showToastMessage(text + " - " + severity, 5000, false, toastSeverity)
}
