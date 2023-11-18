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


export const MAV_MODE_FLAG_SAFETY_ARMED = b10000000;
export const MAV_MODE_FLAG_MANUAL_INPUT_ENABLED = b01000000;
export const MAV_MODE_FLAG_HIL_ENABLED = b00100000;
export const MAV_MODE_FLAG_STABILIZE_ENABLED = b00010000;
export const MAV_MODE_FLAG_GUIDED_ENABLED = b00001000;
export const MAV_MODE_FLAG_AUTO_ENABLED = b00000100;
export const MAV_MODE_FLAG_TEST_ENABLED = b00000010;
export const MAV_MODE_FLAG_CUSTOM_MODE_ENABLED = b00000001;


export enum FlightMode {
    unknown = -1,
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

export const FlightmodeNameMap = {
    [FlightMode.manual]: "Manual",
    [FlightMode.stabilize]: "Stabilize",
    [FlightMode.acrobatic]: "Acrobatic",
    [FlightMode.depth_hold]: "Depth Hold",
    [FlightMode.surface]: "Surface",
    [FlightMode.unknown]: "Unknown",
}

export enum MavState {
    MAV_STATE_UNINIT = 0, // Uninitialized system, state is unknown.
    MAV_STATE_BOOT = 1, // System is booting up.
    MAV_STATE_CALIBRATING = 2, // System is calibrating and not flight-ready.
    MAV_STATE_STANDBY = 3, // System is grounded and on standby. It can be launched any time.
    MAV_STATE_ACTIVE = 4, // System is active and might be already airborne. Motors are engaged.
    MAV_STATE_CRITICAL = 5, // System is in a non-normal flight mode. It can however still navigate.
    MAV_STATE_EMERGENCY = 6, // System is in a non-normal flight mode. It lost control over parts or over the whole airframe. It is in mayday and going down.
    MAV_STATE_POWEROFF = 7, // System just initialized its power-down sequence, will shut down now.
    MAV_STATE_FLIGHT_TERMINATION = 8, // System is terminating itself.
    MAV_STATE_ENUM_END = 9, //
}

export const MavStateNameMap = {
    [MavState.MAV_STATE_UNINIT]: "Uninitialized",
    [MavState.MAV_STATE_BOOT]: "Booting",
    [MavState.MAV_STATE_CALIBRATING]: "Calibrating",
    [MavState.MAV_STATE_STANDBY]: "Standby",
    [MavState.MAV_STATE_ACTIVE]: "Active",
    [MavState.MAV_STATE_CRITICAL]: "Critical Failsafe",
    [MavState.MAV_STATE_EMERGENCY]: "Emergency",
    [MavState.MAV_STATE_POWEROFF]: "Powering Off",
    [MavState.MAV_STATE_FLIGHT_TERMINATION]: "Flight Termination",
    [MavState.MAV_STATE_ENUM_END]: "Unknown",
}

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
        "type": "MAV_AUTOPILOT_ARDUPILOTMEGA" | "MAV_AUTOPILOT_INVALID" | string
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
        "type": "MAV_STATE_STANDBY" | "MAV_STATE_CRITICAL" | "MAV_STATE_ACTIVE" | string // https://mavlink.io/en/messages/common.html#MAV_STATE
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

export interface ATTITUDE extends mavlink2RestMessageBody {
    "pitch": number, // 0.3690577447414398 rad?
    "pitchspeed": number,
    "roll": number,
    "rollspeed": number,
    "yaw": number,
    "yawspeed": number // 0.003902553580701351 ? rad/s
    "time_boot_ms": number,
    "type": "ATTITUDE"
}

export const addMessageHeader = (msg: mavlink2RestMessageBody, sequence: number = 0): mavlink2RestFullMessage => {
    return {
        header: {
            system_id: 255,
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
        confirmation: 0,
        param1: 1,
        param2: 0,// force ? 21196 : 0,
        "param3": 0,
        "param4": 0,
        "param5": 0,
        "param6": 0,
        "param7": 0,
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
        param2: 0,//force ? 21196 : 0,
        "param3": 0,
        "param4": 0,
        "param5": 0,
        "param6": 0,
        "param7": 0,
    } as mavlinkLongMessage)
}


export const setMode = (mode?: FlightMode | null) => {
    mode = mode || FlightMode.manual;
    return addMessageHeader({
        type: "COMMAND_LONG",
        command: { type: "MAV_CMD_DO_SET_MODE" },
        param1: 1,
        param2: Number(mode),
        "param3": 0,
        "param4": 0,
        "param5": 0,
        "param6": 0,
        "param7": 0,
        target_system: 1,
        target_component: 1,
        confirmation: 1,
    } as mavlinkLongMessage)
}

export const heartbeat = () => {
    return addMessageHeader({
        type: "HEARTBEAT",
        custom_mode: 0,
        mavtype: { type: "MAV_TYPE_GCS" },
        autopilot: { type: "MAV_AUTOPILOT_INVALID" },
        base_mode: { bits: 192 },
        system_status: { type: "MAV_STATE_ACTIVE" },
        mavlink_version: 1,
        confirmation: 0,
    } as mavlink2RestMessageBody)
}

export const manualControl = (x: number, y: number, z: number, r: number) => {
    return addMessageHeader({
        type: "MANUAL_CONTROL",
        x: Math.floor(x),
        y: Math.floor(y),
        z: Math.floor(z),
        r: Math.floor(r),
        buttons: 0,
        target: 1,
    } as mavlink2RestMessageBody)
}


export const STATUSTEXT = {
    "message": {
        "chunk_seq": 0,
        "id": 0,
        "severity": {
            "type": "MAV_SEVERITY_WARNING"
        },
        "text": [
            "M",
            "Y",
            "G",
            "C",
            "S",
            ":",
            " ",
            "2",
            "5",
            "5",
            ",",
            " ",
            "h",
            "e",
            "a",
            "r",
            "t",
            "b",
            "e",
            "a",
            "t",
            " ",
            "l",
            "o",
            "s",
            "t",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000",
            "\u0000"
        ],
        "type": "STATUSTEXT"
    },
    "status": {
        "time": {
            "counter": 168,
            "first_update": "2023-11-16T22:59:33.963356924+00:00",
            "frequency": 0.034292712807655334,
            "last_update": "2023-11-17T00:21:13.323946735+00:00"
        }
    }
}


const aafusk_from_ardupilot_compoentID194 = {
    "message": {
        "command": {
            "type": "MAV_CMD_REQUEST_MESSAGE"
        },
        "confirmation": 0,
        "param1": 148.0,
        "param2": 0.0,
        "param3": 0.0,
        "param4": 0.0,
        "param5": 0.0,
        "param6": 0.0,
        "param7": 0.0,
        "target_component": 1,
        "target_system": 1,
        "type": "COMMAND_LONG"
    },
    "status": {
        "time": {
            "counter": 1,
            "first_update": "2023-11-16T22:59:44.338751693+00:00",
            "frequency": 0.0,
            "last_update": "2023-11-16T22:59:44.338915544+00:00"
        }
    }
}


const aafusk_from_GCS_compoentnID0 = {
    "message": {
        "command": {
            "type": "MAV_CMD_SET_MESSAGE_INTERVAL"
        },
        "confirmation": 0,
        "param1": 1.0,
        "param2": 333333.34375,
        "param3": 0.0,
        "param4": 0.0,
        "param5": 0.0,
        "param6": 0.0,
        "param7": 0.0,
        "target_component": 0,
        "target_system": 1,
        "type": "COMMAND_LONG"
    },
    "status": {
        "time": {
            "counter": 2,
            "first_update": "2023-11-16T22:59:43.657246242+00:00",
            "frequency": null,
            "last_update": "2023-11-16T22:59:43.657618735+00:00"
        }
    }
}
