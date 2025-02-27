import { PRESET_SVG_GPAD_BTN_IDS, PRESET_SVG_GPAD_BTN_TAP_TARGET_IDS, standardGpadButtonMap, type wrapperButtonConfig } from "virtual-gamepad-lib";
import type { PopupSettings } from "../components/Popup/types";
import { SECONDS_IN_DAY, SIMPLEPEER_BASE_CONFIG } from "./shared/consts";
import { getBooleanQueryParam, getIntegerQueryParam, getStringQueryParam } from "./shared/urlParameters";
import type { SimplePeerOptions } from "@thaunknown/simple-peer/index.js";

/** Token used by the frontend to list available livekit rooms, it does not have any other permissions, but lasts effectively forever (20 years) */
// START_LIVEKIT_FRONTEND_TOKEN
export const LIVEKIT_LIST_ONLY_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tTGlzdCI6dHJ1ZSwicm9vbUpvaW4iOmZhbHNlLCJjYW5QdWJsaXNoIjpmYWxzZSwiY2FuU3Vic2NyaWJlIjpmYWxzZSwiY2FuUHVibGlzaERhdGEiOmZhbHNlLCJjYW5VcGRhdGVPd25NZXRhZGF0YSI6ZmFsc2V9LCJpYXQiOjE2OTE0NTEzNDEsIm5iZiI6MTY5MTQ1MTM0MSwiZXhwIjoxMTE1MjI1MTM0MSwiaXNzIjoiQVBJSGQ3Qm9hOVJVVWlUIiwic3ViIjoibHQiLCJqdGkiOiJsdCJ9.X5fI6ceu2aLf0bc-h3PKc-u2PRzSAgVZEpK5FjScRGQ"
// END_LIVEKIT_FRONTEND_TOKEN

export const PING_INTERVAL = 1000 // 1 second in ms
export const MOVE_MSG_TIMEOUT = 100 // 0.8 seconds in ms

export enum ConnectionState {
    connecting = "Connecting",
    connected = "Connected",
    reconnecting = "Reconnecting",
    disconnected = "Disconnected",
}

export enum ConnectionTransitions {
    ON_CONNECTED = "ON_CONNECTED",
    ON_DISCONNECTED = "ON_DISCONNECTED",
    ON_DESTROY = "ON_DESTROY",
}

export type EventHandlerStore = {
    [key: string]: (e?: any) => void;
}

export const URL_PARAMS = {
    DEBUG_MODE: false,
    SHOW_REMOTE_LOGS: true,
    LIVEKIT_CLOUD_ENDPOINT: 'https://rov-web.livekit.cloud',
    LIVEKIT_LOCAL_ENDPOINT: 'http://localhost:7880',
}

const _URL_PARAMS = {}
Object.defineProperties(URL_PARAMS, {
    DEBUG_MODE: { get: () => _URL_PARAMS["DEBUG_MODE"] ?? (_URL_PARAMS["DEBUG_MODE"] = getBooleanQueryParam("DEBUG_MODE", false)) },
    SHOW_REMOTE_LOGS: { get: () => _URL_PARAMS["SHOW_REMOTE_LOGS"] ?? (_URL_PARAMS["SHOW_REMOTE_LOGS"] = getBooleanQueryParam("SHOW_REMOTE_LOGS", true)) },
    LIVEKIT_CLOUD_ENDPOINT: { get: () => _URL_PARAMS["LIVEKIT_CLOUD_ENDPOINT"] ?? (_URL_PARAMS["LIVEKIT_CLOUD_ENDPOINT"] = getStringQueryParam("LIVEKIT_CLOUD_URL", 'https://rov-web.livekit.cloud')) },
    LIVEKIT_LOCAL_ENDPOINT: { get: () => _URL_PARAMS["LIVEKIT_LOCAL_ENDPOINT"] ?? (_URL_PARAMS["LIVEKIT_LOCAL_ENDPOINT"] = getStringQueryParam("LIVEKIT_LOCAL_URL", 'http://localhost:7880')) },
})

export const SIMPLEPEER_PILOT_CONFIG: SimplePeerOptions & { iceRestartEnabled: string | false, iceFailureRecoveryTimeout: number } = Object.assign({}, SIMPLEPEER_BASE_CONFIG, {
    initiator: true, offerOptions: { offerToReceiveVideo: true, offerToReciveAudio: false }
})

/******* UI RELATED CONSTANTS ********/

export enum LOADING_MESSAGE {
    clearAll = "all",
    default = "Loading...",
    ipScan = "Scanning for ROV IP address...",
    internetCheck = "Checking internet access...",
    serverConnecting = "Connecting to peer server...",
    serverReconnecting = "Reconnecting to peer server...",
    webrtcConnecting = "Searching for ROV...",
    webrtcReconnecting = "Reconnecting to ROV...",
    reloadingSite = "Reloading site...",
    awaitingVideoCall = "Waiting for livestream...",
    awaitingRovReconnect = "Waiting for ROV to reconnect...",
}

/****** GAMEPAD RELATED ***********/

export const GPAD_STANDARD_BUTTON_INDEX_TO_MAVLINK_INDEX = {
    [standardGpadButtonMap.A]: 0,
    [standardGpadButtonMap.B]: 1,
    [standardGpadButtonMap.X]: 2,
    [standardGpadButtonMap.Y]: 3,
    [standardGpadButtonMap.LShoulder]: 9,
    [standardGpadButtonMap.RShoulder]: 10,
    // [standardGpadButtonMap.LT]: -1,
    // [standardGpadButtonMap.RT]: -1,
    [standardGpadButtonMap.Back]: 4,
    [standardGpadButtonMap.Start]: 6,
    [standardGpadButtonMap.LStick]: 7,
    [standardGpadButtonMap.RStick]: 8,
    [standardGpadButtonMap.DPadUp]: 11,
    [standardGpadButtonMap.DPadDown]: 12,
    [standardGpadButtonMap.DPadLeft]: 13,
    [standardGpadButtonMap.DPadRight]: 14,
    [standardGpadButtonMap.Vendor]: 5,
}


// export const TOUCHED_BUTTON_EQUIVELANT_VALUE = 0.5;
export type GpadBtnConfig = { btnName: string, helpLabel: string, tooltipPlacement: string } & wrapperButtonConfig
export const GAME_CONTROLLER_BUTTON_CONFIG: GpadBtnConfig[] = [
    { btnName: "button_1", helpLabel: "Take Control", tooltipPlacement: "left", fireWhileHolding: false },
    { btnName: "button_2", helpLabel: "Record Video", tooltipPlacement: "left", fireWhileHolding: false },
    { btnName: "button_3", helpLabel: "Take Photo", tooltipPlacement: "left", fireWhileHolding: false },
    { btnName: "button_4", helpLabel: "Change Fly Mode", tooltipPlacement: "left", fireWhileHolding: false },
    { btnName: "shoulder_button_front_left", helpLabel: "Less Throttle", tooltipPlacement: "right", fireWhileHolding: true, },
    { btnName: "shoulder_button_front_right", helpLabel: "More Throttle", tooltipPlacement: "left", fireWhileHolding: true, },
    { btnName: "shoulder_trigger_back_left", helpLabel: "Open Claw", fireWhileHolding: true, tooltipPlacement: "right" },
    { btnName: "shoulder_trigger_back_right", helpLabel: "Close Claw", fireWhileHolding: true, tooltipPlacement: "left" },
    { btnName: "select_button", helpLabel: "Tutorial", tooltipPlacement: "right", fireWhileHolding: false },
    { btnName: "start_button", helpLabel: "Move-Roll Toggle", tooltipPlacement: "left", fireWhileHolding: false },
    { btnName: "stick_button_left", helpLabel: "Move Forward-Back & Turn", tooltipPlacement: "right", fireWhileHolding: false },
    { btnName: "stick_button_right", helpLabel: "Move Up-Down & Left-Right", tooltipPlacement: "left", fireWhileHolding: false },
    { btnName: "d_pad_up", helpLabel: "Look Up", fireWhileHolding: true, tooltipPlacement: "right" },
    { btnName: "d_pad_down", helpLabel: "Look Down", fireWhileHolding: true, tooltipPlacement: "right" },
    { btnName: "d_pad_left", helpLabel: "Dim Lights", fireWhileHolding: true, tooltipPlacement: "right" },
    { btnName: "d_pad_right", helpLabel: "Bright Lights", fireWhileHolding: true, tooltipPlacement: "right" },
    // { btnName: "vendor", helpLabel: "TBD", tooltipPlacement: "top" }, // note that the vendor button is often used by windows / android, so we can't use it.
];


// export const ONSCREEN_GPAD_BUTTON_LABELS = PRESET_SVG_GPAD_BTN_IDS
// [
//     "button_1",
//     "button_2",
//     "button_3",
//     "button_4",
//     "shoulder_button_front_left",
//     "shoulder_button_front_right",
//     "shoulder_trigger_back_left",
//     "shoulder_trigger_back_right",
//     "select_button",
//     "start_button",
//     "stick_button_left",
//     "stick_button_right",
//     "d_pad_up",
//     "d_pad_down",
//     "d_pad_left",
//     "d_pad_right",
//     /* "vendor" */ // generally not available to browsers because it is used by OS vendors (eg: Xbox Game Bar, Steam HUD).
// ];


// export const ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS = "touched", ONSCREEN_GPAD_BUTTON_PRESSED_CLASS = "pressed";
