// Available Mavlink Messages
// https://gist.github.com/patrickelectric/26a407c4e7749cdaa58d06b52212cb1e

export enum MAV_MODE_FLAG {
    MAV_MODE_FLAG_CUSTOM_MODE_ENABLED = 1,   // 0b00000001 Reserved for future use.
    MAV_MODE_FLAG_TEST_ENABLED = 2,          // 0b00000010 system has a test mode enabled. This flag is intended for temporary system tests and should not be used for stable implementations.
    MAV_MODE_FLAG_AUTO_ENABLED = 4,          // 0b00000100 autonomous mode enabled, system finds its own goal positions. Guided flag can be set or not, depends on the actual implementation.
    MAV_MODE_FLAG_GUIDED_ENABLED = 8,        // 0b00001000 guided mode enabled, system flies waypoints / mission items.
    MAV_MODE_FLAG_STABILIZE_ENABLED = 16,    // 0b00010000 system stabilizes electronically its attitude (and optionally position). It needs however further control inputs to move around.
    MAV_MODE_FLAG_HIL_ENABLED = 32,          // 0b00100000 hardware in the loop simulation. All motors / actuators are blocked, but internal software is full operational.
    MAV_MODE_FLAG_MANUAL_INPUT_ENABLED = 64, // 0b01000000 remote control input is enabled.
    MAV_MODE_FLAG_SAFETY_ARMED = 128,        // 0b10000000 MAV safety set to armed. Motors are enabled / running / can start. Ready to fly. Additional note: this flag is to be ignore when sent in the command MAV_CMD_DO_SET_MODE and MAV_CMD_COMPONENT_ARM_DISARM shall be used instead. The flag can still be used to report the armed state.
    MAV_MODE_FLAG_ENUM_END = 129,             //
}

// Binary for bitmasks
export const b00000001 = 1 | 0; // 0b00000001
export const b00000010 = 2 | 0; // 0b00000010
export const b00000100 = 4 | 0; // 0b00000100
export const b00001000 = 8 | 0; // 0b00001000
export const b00010000 = 16 | 0; // 0b00010000
export const b00100000 = 32 | 0; // 0b00100000
export const b01000000 = 64 | 0; // 0b01000000
export const b10000000 = 128 | 0; // 0b10000000

export interface mavlink2RestMessageBody {
    type: string
    target_system?: number
    target_component?: number
    [x: string]: unknown; // any other fields
}

export interface mavlink2RestFullMessage {
    header: {
        system_id: number,
        component_id: number,
        sequence: number,
    },
    message: mavlink2RestMessageBody
}

export interface mavlinkLongMessage extends mavlink2RestMessageBody {
    type: "COMMAND_LONG"
    command: {
        type: string
    },
    target_system: number,
    target_component: number,
    confirmation: 1 | 0,
    param1: number,
    param2?: number,
    param3?: number,
    param4?: number,
    param5?: number,
    param6?: number,
    param7?: number,
}


export interface ARDUSUB_HEARTBEAT extends mavlink2RestMessageBody {
    "autopilot": {
        "type": "MAV_AUTOPILOT_ARDUPILOTMEGA"
    },
    "base_mode": {
        "bits": 81 | number
    },
    "custom_mode": 19 | number, // This is the flight mode
    "mavlink_version": 3 | number,
    "mavtype": {
        "type": "MAV_TYPE_SUBMARINE"
    },
    "system_status": {
        "type": "MAV_STATE_CRITICAL" | "MAV_STATE_ACTIVE" // https://mavlink.io/en/messages/common.html#MAV_STATE
    },
    "type": "HEARTBEAT"
}


export interface SYS_STATUS extends mavlink2RestMessageBody {
    "battery_remaining": -1 | number, // -1 = Battery remaining unknown
    "current_battery": 50 | number, // 0.5 Amps
    "voltage_battery": 16057 | number, // 16.057 Volts
    "drop_rate_comm": 0 | number,
    "errors_comm": 0 | number,
    "errors_count1": 0 | number,
    "errors_count2": 0 | number,
    "errors_count3": 0 | number,
    "errors_count4": 0 | number,
    "load": 399 | number,
    "onboard_control_sensors_enabled": {
        "bits": 35691567 | number
    },
    "onboard_control_sensors_health": {
        "bits": 53517327 | number
    },
    "onboard_control_sensors_present": {
        "bits": 52493359 | number
    },
    "type": "SYS_STATUS"
}

export interface COMMAND_ACK extends mavlink2RestMessageBody {
    "command": {
        "type": "MAV_CMD_DO_SET_MODE" | string, // the original command
    },
    "progress": 0 | number,
    "result": {
        "type": "MAV_RESULT_UNSUPPORTED" | "MAV_RESULT_ACCEPTED" | string
    },
    "result_param2": 0 | number,
    "target_component": 0 | number,
    "target_system": 0 | number,
    "type": "COMMAND_ACK"
}

export const addMessageHeader = (msg: mavlink2RestMessageBody, sequence: number = 0): mavlink2RestFullMessage => {
    return {
        header: {
            system_id: 254,
            component_id: 240,
            sequence: sequence,
        },
        message: msg
    }
}

export const arm = (force: boolean) => {
    return addMessageHeader({
        type: "COMMAND_LONG",
        command: { type: "MAV_CMD_COMPONENT_ARM_DISARM" },
        target_system: 1,
        target_component: 1,
        confirmation: 1,
        param1: 1,
        param2: force ? 21196 : 0,
    } as mavlinkLongMessage)
}

export const disarm = (force: boolean) => {
    return addMessageHeader({
        type: "COMMAND_LONG",
        command: { type: "MAV_CMD_COMPONENT_ARM_DISARM" },
        target_system: 1,
        target_component: 1,
        confirmation: 1,
        param1: 0,
        param2: force ? 21196 : 0,
    } as mavlinkLongMessage)
}

export enum FlightMode {
    manual = 19,
    stabilize = 0,
    acrobatic = 1,
    depth_hold = 2,
    surface = 9,
    // stabilize =  param1:1, param2:0
    // acro = param1:1, param2:1
    // alt_hold = param1:1, param2:2
    // auto = param1:1, param2:3
    // guided = param1:1, param2:4
    // surface = param1:1, param2:9
    // manual = param1:1, param2:19
    // poshold (unsupported) =  param1:1, param2:16
    // circle (unsupported) =  param1:1, param2:7
}


export const setMode = (mode: FlightMode) => {
    return addMessageHeader({
        type: "COMMAND_LONG",
        command: { type: "MAV_CMD_DO_SET_MODE" },
        param1: 1,
        param2: Number(mode),
        target_system: 1,
        target_component: 1,
        confirmation: 1,
    } as mavlinkLongMessage)
}

export const heartbeat = () => {
    return addMessageHeader({
        type: "HEARTBEAT",
        mavtype: { type: "MAV_TYPE_GCS" },
        autopilot: { type: "MAV_AUTOPILOT_INVALID" },
        base_mode: { bits: 209 },
        custom_mode: 0,
        system_status: { type: "MAV_STATE_ACTIVE" },
        mavlink_version: 1,
    } as mavlink2RestMessageBody)
}

export const manualControl = (x: number, y: number, z: number, r: number) => {
    return addMessageHeader({
        type: "MANUAL_CONTROL",
        x: x,
        y: y,
        z: z,
        r: r,
        buttons: 0,
        target_system: 1,
    } as mavlink2RestMessageBody)
}
