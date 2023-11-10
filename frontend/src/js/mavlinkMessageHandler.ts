import { FlightmodeNameMap, type ARDUSUB_HEARTBEAT, type ATTITUDE, type SYS_STATUS, type mavlink2RestMessageBody, MavStateHumanReadable, MavState } from "../../../shared/js/mavlink2RestMessages"
import { rov_actions_proto } from "../../../shared/js/protobufs/rovActionsProto"
import { updateSensorValues } from "./sensors"
import { updateAutopilotErrorCountDisplay, updateAutopilotFlightModeDisplay, updateAutopilotLoadDisplay, updateAutopilotStatusDisplay } from "./vehicleStats";

export const handleHearbeatRecived = (msg: ARDUSUB_HEARTBEAT) => {
    if (msg.autopilot.type == "MAV_AUTOPILOT_INVALID") return;
    const currentFlightMode = msg.custom_mode;
    updateAutopilotFlightModeDisplay(currentFlightMode)
    const currentAutopilotState = MavState[msg.system_status.type] || MavState.MAV_STATE_ENUM_END;
    updateAutopilotStatusDisplay(currentAutopilotState)
}

export const handleAttitudeRecived = (msg: ATTITUDE) => {
    updateSensorValues({
        MeasurementUpdates: [
            { MeasurementType: rov_actions_proto.SensorMeasurmentTypes.yaw_degrees, Value: msg.yaw / Math.PI * 180 },
            { MeasurementType: rov_actions_proto.SensorMeasurmentTypes.pitch_degrees, Value: msg.pitch / Math.PI * 180 },
            { MeasurementType: rov_actions_proto.SensorMeasurmentTypes.roll_degrees, Value: msg.roll / Math.PI * 180 },
        ],
    })
}


export const handleSystemStatusRecived = (msg: SYS_STATUS) => {
    updateSensorValues({
        MeasurementUpdates: [
            { MeasurementType: rov_actions_proto.SensorMeasurmentTypes.battery_voltage, Value: msg.voltage_battery / 1000 },
            { MeasurementType: rov_actions_proto.SensorMeasurmentTypes.battery_current_amps, Value: msg.current_battery / 100 },
        ],
    })
    updateAutopilotErrorCountDisplay(msg.drop_rate_comm + msg.errors_comm + msg.errors_count1 + msg.errors_count2 + msg.errors_count3 + msg.errors_count4)
    updateAutopilotLoadDisplay(msg.load)
}
