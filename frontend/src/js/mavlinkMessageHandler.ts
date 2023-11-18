import { type ARDUSUB_HEARTBEAT, type ATTITUDE, type SYS_STATUS, MavState, type mavlink2RestFullMessage, MAV_MODE_FLAG_SAFETY_ARMED, MAV_MODE_FLAG_MANUAL_INPUT_ENABLED, MAV_MODE_FLAG_HIL_ENABLED, MAV_MODE_FLAG_STABILIZE_ENABLED, MAV_MODE_FLAG_GUIDED_ENABLED, MAV_MODE_FLAG_AUTO_ENABLED, MAV_MODE_FLAG_TEST_ENABLED } from "./shared/mavlink2RestMessages"
import { rov_actions_proto } from "./shared/protobufs/rovActionsProto"
import { updateSensorValues } from "./sensors"
import { autopilotArmed, updateAutopilotErrorCountDisplay, updateAutopilotFlightModeDisplay, updateAutopilotLoadDisplay, updateAutopilotStatusDisplay, updateBatteryDisplay } from "./vehicleStats";
import { showToastMessage } from "./toastMessageManager";

export const handleMavlinkMessage = (msg: mavlink2RestFullMessage) => {
    if (!msg.message || !msg.message.type) return console.log("@ invalid mavlink message", msg);
    const mavMsg = msg.message;
    switch (mavMsg.type) {
        case "HEARTBEAT":
            handleHearbeatRecived(mavMsg as ARDUSUB_HEARTBEAT)
            break;
        case "ATTITUDE":
            handleAttitudeRecived(mavMsg as ATTITUDE)
            break;
        case "SYS_STATUS":
            handleSystemStatusRecived(mavMsg as SYS_STATUS)
            break;
        default:
            console.log("@ unhandled mavlink message", mavMsg.type)
    }
}

export const handleHearbeatRecived = (msg: ARDUSUB_HEARTBEAT) => {
    if (msg.autopilot.type == "MAV_AUTOPILOT_INVALID") return;
    const currentFlightMode = msg.custom_mode;
    updateAutopilotFlightModeDisplay(currentFlightMode)
    const currentAutopilotState = MavState[msg.system_status.type] || MavState.MAV_STATE_ENUM_END;
    updateAutopilotStatusDisplay(currentAutopilotState)
    const currentFlightFlags = msg.base_mode.bits;
    const armed = (currentFlightFlags & MAV_MODE_FLAG_SAFETY_ARMED) > 0;
    autopilotArmed.set(armed)
    const manual_enabled = (currentFlightFlags & MAV_MODE_FLAG_MANUAL_INPUT_ENABLED) > 0;
    const hil_enabled = (currentFlightFlags & MAV_MODE_FLAG_HIL_ENABLED) > 0;
    const stabilize_enabled = (currentFlightFlags & MAV_MODE_FLAG_STABILIZE_ENABLED) > 0;
    const guided_enabled = (currentFlightFlags & MAV_MODE_FLAG_GUIDED_ENABLED) > 0;
    const auto_enabled = (currentFlightFlags & MAV_MODE_FLAG_AUTO_ENABLED) > 0;
    const test_enabled = (currentFlightFlags & MAV_MODE_FLAG_TEST_ENABLED) > 0;

    console.log("@ autopilot state", currentAutopilotState, "flight mode", currentFlightMode, "armed", armed, "manual_enabled", manual_enabled, "hil_enabled", hil_enabled, "stabilize_enabled", stabilize_enabled, "guided_enabled", guided_enabled, "auto_enabled", auto_enabled, "test_enabled", test_enabled)
}

export const handleAttitudeRecived = (msg: ATTITUDE) => {
    console.log("@ attitude", msg)
    updateSensorValues({
        MeasurementUpdates: [
            { MeasurementType: rov_actions_proto.SensorMeasurmentTypes.yaw_degrees, Value: msg.yaw / Math.PI * 180 },
            { MeasurementType: rov_actions_proto.SensorMeasurmentTypes.pitch_degrees, Value: msg.pitch / Math.PI * 180 },
            { MeasurementType: rov_actions_proto.SensorMeasurmentTypes.roll_degrees, Value: msg.roll / Math.PI * 180 },
        ],
    })
}


export const handleSystemStatusRecived = (msg: SYS_STATUS) => {
    console.log("@ system status", msg)
    const voltage = msg.voltage_battery / 1000;
    const current = msg.current_battery / 100;
    const all_error_count = msg.errors_comm + msg.errors_count1 + msg.errors_count2 + msg.errors_count3 + msg.errors_count4;
    updateBatteryDisplay(msg.battery_remaining, voltage, current)
    updateAutopilotErrorCountDisplay(all_error_count)
    updateAutopilotLoadDisplay(msg.load)
    // show toast warnings for any errors:
    if (msg.errors_comm > 0) showToastMessage(`${all_error_count} autopilot errors detected!`, 5000)
    if (voltage < 13.5 || (msg.battery_remaining > 0 && msg.battery_remaining < 10)) showToastMessage(`Low Battery: ${voltage.toFixed(2)}volts`, 8000)
    if (current > 20) showToastMessage(`High Current Draw: ${current.toFixed(1)} amps`, 5000)
}
