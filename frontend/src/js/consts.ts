import type { Placement } from '@popperjs/core';

/** Token used by the frontend to list available livekit rooms, it does not have any other permissions, but lasts almost indefinately
 * START_LIVEKIT_FRONTEND_TOKEN. */
export const LIVEKIT_LIST_ONLY_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tTGlzdCI6dHJ1ZSwicm9vbUpvaW4iOmZhbHNlLCJjYW5QdWJsaXNoIjpmYWxzZSwiY2FuU3Vic2NyaWJlIjpmYWxzZSwiY2FuUHVibGlzaERhdGEiOmZhbHNlfSwiaWF0IjoxNjc4NzI4ODY1LCJuYmYiOjE2Nzg3Mjg4NjUsImV4cCI6MTExMzk1Mjg4NjUsImlzcyI6IkFQSWtvRTdtM1pxZDVkSiIsInN1YiI6Imx0IiwianRpIjoibHQifQ.6mVaD452mZMSgXKWG7QDkxR__2v76urjJnJ66TjJGjs"
/* END_LIVEKIT_FRONTEND_TOKEN */

export const ROV_PEERID_BASE = "ROV-";
export const EMOJI_MAP = ["🏔", "🏎", "🚃", "🕤", "🐔", "🛤", "🚖", "🎿", "🐼", "🙏", "🏨", "💞", "🐺", "👽", "🎯", "🏊", "🍘", "🍕", "🎡", "🐋", "🍒", "🐜", "💫", "🏑", "💥", "⛰", "🎬", "🐝", "👎", "🚓", "💵", "📡", "🏤", "📍", "🍔", "🌐", "🏧", "👈", "💺", "🛺", "😳", "🌌", "🥋", "🐚", "🐄", "🎓", "🚵", "🔑", "🛖", "🕍", "💿", "🎚", "🐫", "🌍", "🌔", "🍓", "🤾", "💧", "🍌", "🍚", "💯", "🥘", "⌛", "🔬", "🛣", "🌊", "🏰", "🎫", "🌈", "👶", "🚫", "🚑", "📊", "💐", "📠", "👠", "🎤", "🚨", "🎢", "🐽", "🍞", "🚄", "🐂", "🍸", "🚗", "👑", "🦽", "🎹", "🚿", "⌚", "🎾", "🤿", "🚪", "🍇", "🐻", "👦", "🛟", "🥌", "🃏", "🏜", "🐗", "🚜", "🍫", "🚌", "🌅", "🪁", "🌳", "🚕", "🚛", "🚇", "🍵", "🔔", "🛶", "👏", "💚", "🤼", "🏄", "🐙", "😄", "🌄", "🎸", "🌆", "👙", "👇", "⛲", "👄", "🍩", "🩼", "🛳", "🔉", "💦", "🏃", "🛵", "🌼", "🏩", "🎅", "💏", "🌵", "🏠", "🍆", "🍺", "⭐", "🐣", "🏥", "💻", "🎮", "🎲", "👅", "⛱", "🏙", "📰", "📯", "🎥", "🍏", "🎊", "👢", "🐩", "🍍", "📼", "📺", "🚅", "⚽", "🚙", "📘", "🍎", "🚚", "🚀", "🐊", "🎺", "👧", "🚝", "🧡", "⛳", "🔕", "👃", "🛞", "👂", "🏇", "🍁", "🔫", "🎵", "🐢", "🖱", "🤺", "🔆", "🐈", "💔", "🚣", "🤣", "🪕", "🔦", "🙈", "🛷", "📸", "🎟", "🌽", "🚠", "🗼", "📢", "🍗", "🗜", "💋", "🎗", "📷", "🥛", "📫", "🎃", "💡", "🗿", "🐌", "🥁", "🎍", "🥝", "📚", "🍪", "🍟", "🏦", "💢", "🌬", "🍷", "😼", "🔩", "🚴", "🕋", "🎆", "👛", "🌿", "🚔", "🎽", "📞", "🏚", "🏵", "🧦", "🐬", "💭", "🎩", "⛵", "⛺", "🔧", "💼", "👻", "🛻", "🏝", "🍼", "👾", "🚋", "🐍", "🐸", "🍐", "🌠", "📽", "⛔", "🍰", "🪂", "💉", "📖", "🔍", "💎", "⛄", "🏘", "🚲", "📻", "🌀", "👉", "🎳", "📌", "🏹", "🔥", "🏀", "💾", "⛪", "🏍", "💙", "🏈", "🏕", "💪", "💒", "👆", "🍨", "🛫", "🐎", "🐀", "🚆", "👊", "😈", "🏟", "🐴", "💩", "👐", "🔮", "🐓", "💨", "🎁", "🔨", "🍬", "📆", "💣", "🚉", "👓", "🎀", "🎻", "🐇", "🏁", "🎪", "📟", "🎂", "🕌", "🚽", "🌁", "💃", "💘", "😠", "🤹", "👔", "💀", "🚮", "🪀", "📣", "🚈", "🏖", "📝", "💊", "🚒", "🎈", "🪲", "🥊", "☁", "🗻", "🏞", "⛷", "💰", "🎨", "🌇", "😎", "🚊", "🛼", "🚦", "🛴", "💬", "👍", "🛀", "👩", "🐛", "👌", "👫", "🎭", "🎷", "👕", "🌮", "🍃", "🎱", "🗾", "🕠", "🚢", "💈", "🍂", "🚧", "👼", "🔢", "🐧", "🐖", "🍄", "🎠", "👜", "🐨", "🛬", "🛹", "🍤", "🚍", "🤽", "🎄", "🐒", "🚥", "🐕", "⛩", "🚡", "🎑", "👰", "🔭", "⛽", "🎇", "😮", "🏯", "🍀", "⛑", "🔋", "⛅", "😌", "🌹", "😭", "🚘", "🧩", "🏆", "🍑", "👤", "🛥", "🐁", "🛰", "💍", "🛩"];
export const MEMORABLE_PEER_ID_OFFSET = 74646;

// FOR A PEERJS SERVER RUNNING IN THE CLOUD (peerjs cloud or elsewhere)
export const peerServerCloudOptions = {
    host: "0.peerjs.com",
    secure: true,
    path: '/',
    port: 443,
}

// FOR A PEERJS SERVER RUNNING ON THE ROV Raspberry Pi:
export const peerServerLocalOptions = {
    host: 'raspberrypi.local', // or whatever ip the raspberrypi is at
    path: '/',
    secure: false,
    port: 9000,
}

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

// export enum LOADING_MSG_TYPES {
//     all = "all"
//     default = "Loading..."
//     ip-scan": "Scanning for ROV IP address...",
//     "internet-check": "Checking internet access...",
//     "server-connecting": "Connecting to peer server...",
//     "server-reconnecting": "Reconnecting to peer server...",
//     "webrtc-connecting": "Searching for ROV...",
//     "webrtc-reconnecting": "Reconnecting to ROV...",
//     "reloading-site": "Reloading site...",
//     "awaiting-video-call": "Waiting for livestream...",
//     "awaiting-rov-reconnect": "Waiting for ROV to reconnect...",
// }

/****** GAMEPAD RELATED ***********/

// export const TOUCHED_BUTTON_EQUIVELANT_VALUE = 0.5;
export type GpadBtnConfig = { btnName: string, helpLabel: string, tooltipPlacement: Placement, holdAllowed?: boolean, remoteAction?: string, localAction?: string }
export const GAME_CONTROLLER_BUTTON_CONFIG: GpadBtnConfig[] = [
    { btnName: "button_1", helpLabel: "TBD", tooltipPlacement: "left" },
    { btnName: "button_2", remoteAction: 'record', helpLabel: "Start/Stop Recording", tooltipPlacement: "left" },
    { btnName: "button_3", remoteAction: 'photo', helpLabel: "Take Photo", tooltipPlacement: "left" },
    { btnName: "button_4", remoteAction: 'lights', helpLabel: "Toggle Lights", tooltipPlacement: "left" },
    { btnName: "shoulder_button_front_left", helpLabel: "TBD", tooltipPlacement: "right" },
    { btnName: "shoulder_button_front_right", remoteAction: 'claw_open', helpLabel: "TBD", tooltipPlacement: "left" },
    { btnName: "shoulder_trigger_back_left", remoteAction: 'claw_close', helpLabel: "Open Claw", holdAllowed: true, tooltipPlacement: "right" },
    { btnName: "shoulder_trigger_back_right", remoteAction: 'claw_close', helpLabel: "Close Claw", holdAllowed: true, tooltipPlacement: "left" },
    { btnName: "select_button", helpLabel: "Show/Hide Gamepad Help", tooltipPlacement: "right" },
    { btnName: "start_button", helpLabel: "Show/Hide Gamepad Help", tooltipPlacement: "left" },
    { btnName: "stick_button_left", helpLabel: "Move Forward/Back & Turn", tooltipPlacement: "right" },
    { btnName: "stick_button_right", helpLabel: "Move Up/Down & Left/Right", tooltipPlacement: "left" },
    { btnName: "d_pad_up", remoteAction: 'exposure_plus', helpLabel: "Increase Camera Brightness", holdAllowed: true, tooltipPlacement: "right" },
    { btnName: "d_pad_down", remoteAction: 'exposure_minus', helpLabel: "Decreases Camera Brightness", holdAllowed: true, tooltipPlacement: "right" },
    { btnName: "d_pad_left", remoteAction: 'v_quality_plus', helpLabel: "Decrease Video Quality (reduces latency)", holdAllowed: true, tooltipPlacement: "right" },
    { btnName: "d_pad_right", remoteAction: 'v_quality_minus', helpLabel: "Increase Video Quality (increases latency)", holdAllowed: true, tooltipPlacement: "right" },
    // { btnName: "vendor", helpLabel: "TBD", tooltipPlacement: "top" }, // note that the vendor button is often used by windows / android, so we can't use it.
];


export const ONSCREEN_GPAD_BUTTON_LABELS = [
    "button_1",
    "button_2",
    "button_3",
    "button_4",
    "shoulder_button_front_left",
    "shoulder_button_front_right",
    "shoulder_trigger_back_left",
    "shoulder_trigger_back_right",
    "select_button",
    "start_button",
    "stick_button_left",
    "stick_button_right",
    "d_pad_up",
    "d_pad_down",
    "d_pad_left",
    "d_pad_right",
    /* "vendor" */ // generally not available to browsers because it is used by OS vendors (eg: Xbox Game Bar, Steam HUD).
];


export const ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS = "touched", ONSCREEN_GPAD_BUTTON_PRESSED_CLASS = "pressed";
