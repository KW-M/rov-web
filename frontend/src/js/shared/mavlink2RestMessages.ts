// Available Mavlink Messages
// https://gist.github.com/patrickelectric/26a407c4e7749cdaa58d06b52212cb1e
import type { Package, Message } from "./mavlink2rest-ts/messages/mavlink2rest";
import type { Message as MavMessages } from "./mavlink2rest-ts/messages/mavlink2rest-message";
import { MavState, MavMode, MavModeFlag, MavType, MavAutopilot, MAVLinkType } from "./mavlink2rest-ts/messages/mavlink2rest-enum";
import { log, logInfo } from "./logging";
import { unixTimeNow } from "./time";

// export enum MAV_MODE_FLAG {
//     MAV_MODE_FLAG_CUSTOM_MODE_ENABLED = 1,   // 0b00000001 Reserved for future use.
//     MAV_MODE_FLAG_TEST_ENABLED = 2,          // 0b00000010 system has a test mode enabled. This flag is intended for temporary system tests and should not be used for stable implementations.
//     MAV_MODE_FLAG_AUTO_ENABLED = 4,          // 0b00000100 autonomous mode enabled, system finds its own goal positions. Guided flag can be set or not, depends on the actual implementation.
//     MAV_MODE_FLAG_GUIDED_ENABLED = 8,        // 0b00001000 guided mode enabled, system flies waypoints / mission items.
//     MAV_MODE_FLAG_STABILIZE_ENABLED = 16,    // 0b00010000 system stabilizes electronically its attitude (and optionally position). It needs however further control inputs to move around.
//     MAV_MODE_FLAG_HIL_ENABLED = 32,          // 0b00100000 hardware in the loop simulation. All motors / actuators are blocked, but internal software is full operational.
//     MAV_MODE_FLAG_MANUAL_INPUT_ENABLED = 64, // 0b01000000 remote control input is enabled.
//     MAV_MODE_FLAG_SAFETY_ARMED = 128,        // 0b10000000 MAV safety set to armed. Motors are enabled / running / can start. Ready to fly. Additional note: this flag is to be ignore when sent in the command MAV_CMD_DO_SET_MODE and MAV_CMD_COMPONENT_ARM_DISARM shall be used instead. The flag can still be used to report the armed state.
//     MAV_MODE_FLAG_ENUM_END = 129,             //
// }

// Binary for bitmasks
export const b00000001 = 1 | 0; // 0b00000001
export const b00000010 = 2 | 0; // 0b00000010
export const b00000100 = 4 | 0; // 0b00000100
export const b00001000 = 8 | 0; // 0b00001000
export const b00010000 = 16 | 0; // 0b00010000
export const b00100000 = 32 | 0; // 0b00100000
export const b01000000 = 64 | 0; // 0b01000000
export const b10000000 = 128 | 0; // 0b10000000


// export const MAV_MODE_FLAG_SAFETY_ARMED = b10000000;
// export const MAV_MODE_FLAG_MANUAL_INPUT_ENABLED = b01000000;
// export const MAV_MODE_FLAG_HIL_ENABLED = b00100000;
// export const MAV_MODE_FLAG_STABILIZE_ENABLED = b00010000;
// export const MAV_MODE_FLAG_GUIDED_ENABLED = b00001000;
// export const MAV_MODE_FLAG_AUTO_ENABLED = b00000100;
// export const MAV_MODE_FLAG_TEST_ENABLED = b00000010;
// export const MAV_MODE_FLAG_CUSTOM_MODE_ENABLED = b00000001;


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

// export const FlightmodeNameMap = {
//     [FlightMode.manual]: "Manual",
//     [FlightMode.stabilize]: "Stabilize",
//     [FlightMode.acrobatic]: "Acrobatic",
//     [FlightMode.depth_hold]: "Depth Hold",
//     [FlightMode.surface]: "Surface",
//     [FlightMode.unknown]: "Unknown",
// }

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
}

let globalMavlinkSequence = -1;
export const addMessageHeader = (msg: Message, sequence: number = 0): Package => {
    return {
        header: {
            system_id: 255,
            component_id: 190,
            sequence: (globalMavlinkSequence++ % 255),
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
    } as MavMessages.CommandLong)
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
    } as MavMessages.CommandLong)
}

export const requestMessage = (messageID: number) => {
    return addMessageHeader({
        type: "COMMAND_LONG",
        command: { type: "MAV_CMD_REQUEST_MESSAGE" },
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
    } as MavMessages.CommandLong)
}

/**
 *
 * @param messageID
 * @param interval (Stream interval in microseconds)
 * @returns
 */
export const setMessageInterval = (messageID: number = 1.0, interval: number = 333333.34375) => {
    return addMessageHeader({
        type: "COMMAND_LONG",
        command: { type: "MAV_CMD_SET_MESSAGE_INTERVAL" },
        target_system: 1,
        target_component: 1,
        confirmation: 1,
        param1: messageID,
        param2: interval,
        "param3": 0,
        "param4": 0,
        "param5": 0,
        "param6": 0,
        "param7": 0,
    } as MavMessages.CommandLong)
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
    } as MavMessages.CommandLong)
}

export const heartbeat = () => {
    return addMessageHeader({
        type: MAVLinkType.HEARTBEAT,
        custom_mode: 0,
        mavtype: { type: MavType.MAV_TYPE_GCS },
        autopilot: { type: MavAutopilot.MAV_AUTOPILOT_INVALID },
        base_mode: { bits: MavModeFlag.MAV_MODE_FLAG_SAFETY_ARMED | MavModeFlag.MAV_MODE_FLAG_MANUAL_INPUT_ENABLED }, // comes out to 192
        system_status: { type: MavState.MAV_STATE_ACTIVE },
        mavlink_version: 3,
        confirmation: 0,
    } as MavMessages.Heartbeat)
}

export const manualControl = (x: number, y: number, z: number, r: number, buttonBitmask: number) => {
    return addMessageHeader({
        type: "MANUAL_CONTROL",
        x: Math.floor(x), // X is forward in the ROV
        y: Math.floor(y), // Y is left/right in the ROV
        z: Math.floor(z), // Z is up/down in the ROV
        r: Math.floor(r), // R is yaw in the ROV
        buttons: buttonBitmask,
        target: 1,
    } as MavMessages.ManualControl)
}

export const servoPositionControl = (servo: number, position: number, group: number) => {
    const controls: number[] = Array(8).fill(0);
    controls[servo] = position;
    return addMessageHeader({
        type: "SET_ACTUATOR_CONTROL_TARGET",
        group_mlx: group,
        controls,
        time_usec: unixTimeNow() * 1000,
        target_component: 1,
        target_system: 1,
    } as MavMessages.SetActuatorControlTarget)
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

const awhuuuuu = {
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
            "counter": 6,
            "first_update": "2023-12-10T18:03:36.747230107+00:00",
            "frequency": 0.2068965584039688,
            "last_update": "2023-12-10T18:04:06.183663703+00:00"
        }
    }
}
