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


/** ----- rov api ----------- */

export enum RovApiAction {
    ping = "ping",
    password_attempt = "password_attempt",
    authtoken_attempt = "authtoken_attempt",
    take_control = "take_control",
    move = "move",
    begin_video_stream = "begin_video_stream",
    take_photo = "take_photo",
    start_video_rec = "start_video_rec",
    stop_video_rec = "stop_video_rec",
    toogle_lights = "toogle_lights",
    shutdown_rov = "shutdown_rov",
    reboot_rov = "reboot_rov",
    enable_wifi = "enable_wifi",
    disable_wifi = "disable_wifi",
    rov_status_report = "rov_status_report",
    restart_rov_services = "restart_rov_services",
    rov_logs = "rov_logs",
}

export interface RovApiActionInterface {
    action: RovApiAction;
    val: string;
    cid: string;
}

export enum RovApiResponseStatus {
    done = "done",
    error = "error",
    pong = "pong",
    sensorUpdate = "sensor-update",
    passwordRequired = "password-required",
    passwordAccepted = "password-accepted",
    passwordInvalid = "password-invalid",
    tokenAccepted = "token-accepted",
    // tokenInvalid = "token-invalid", // Not implemented
    driverChanged = "driver-changed",
    // clientConnected = "client-connected", // Not implemented
    // clientDisconnected = "client-disconnected", // Not implemented
}

export interface RovApiResponseInterface {
    status: RovApiResponseStatus; // lowercase string with dashes separating words
    val: string | number; // value for the status
    cid: string; // response continuity id (used to match up requests and responses)
}


/******* UI RELATED CONSTANTS ********/

export const LOADING_MESSAGES = {
    "default": "Loading...",
    "ip-scan": "Scanning for ROV IP address...",
    "internet-check": "Checking internet access...",
    "server-connecting": "Connecting to peer server...",
    "server-reconnecting": "Reconnecting to peer server...",
    "webrtc-connecting": "Searching for ROV...",
    "webrtc-reconnecting": "Reconnecting to ROV...",
    "reloading-site": "Reloading site...",
    "awaiting-video-call": "Waiting for livestream...",
    "awaiting-rov-reconnect": "Waiting for ROV to reconnect...",
}

/****** GAMEPAD RELATED ***********/

// export const TOUCHED_BUTTON_EQUIVELANT_VALUE = 0.5;
export const GAME_CONTROLLER_BUTTON_CONFIG = [
    { btnName: "button_1", remoteAction: 'lights', helpLabel: "TODO: Lights" },
    { btnName: "button_2", remoteAction: 'record', helpLabel: "TODO: Start/Stop Recording" },
    { btnName: "button_3", remoteAction: 'photo', helpLabel: "TODO: Take Phtoto" },
    { btnName: "button_4", remoteAction: null, helpLabel: "Nothing" },
    { btnName: "shoulder_btn_front_left", remoteAction: null, localAction: null, helpLabel: "Nothing" },
    { btnName: "shoulder_btn_front_right", remoteAction: 'claw_open', helpLabel: "TODO: Open Claw", holdAllowed: true, },
    { btnName: "shoulder_trigger_back_left", remoteAction: null, helpLabel: "Nothing" },
    { btnName: "shoulder_trigger_back_right", remoteAction: 'claw_close', helpLabel: "TODO: Close Claw", holdAllowed: true, },
    { btnName: "select", remoteAction: null, helpLabel: "Show/Hide Gamepad Help" },
    { btnName: "start", remoteAction: null, helpLabel: "Show/Hide Gamepad Help" },
    { btnName: "stick_button_left", remoteAction: null, helpLabel: "TODO: Lock Vertical Thruster" },
    { btnName: "stick_button_right", remoteAction: null, helpLabel: "TODO: Lock Horizontal" },
    { btnName: "d_pad_up", remoteAction: 'exposure_plus', helpLabel: "TODO: Increase Camera Brightness", holdAllowed: true, },
    { btnName: "d_pad_down", remoteAction: 'exposure_minus', helpLabel: "TODO: Decreases Camera Brightness", holdAllowed: true, },
    { btnName: "d_pad_left", remoteAction: 'v_quality_plus', helpLabel: "TODO: Decrease Video Quality (reduces latency)", holdAllowed: true, },
    { btnName: "d_pad_right", remoteAction: 'v_quality_minus', helpLabel: "TODO: Increase Video Quality (increases latency)", holdAllowed: true, },
    { btnName: "vendor", remoteAction: null, helpLabel: "Nothing" }, // note that the vendor button is often used by windows / android, so we can't use it.
];


export const ONSCREEN_GPAD_BUTTON_LABELS = [
    "button_1",
    "button_2",
    "button_3",
    "button_4",
    "shoulder_btn_front_left",
    "shoulder_btn_front_right",
    "shoulder_trigger_back_left",
    "shoulder_trigger_back_right",
    "select",
    "start",
    "stick_button_left",
    "stick_button_right",
    "d_pad_up",
    "d_pad_down",
    "d_pad_left",
    "d_pad_right"
]

export const ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS = "touched", ONSCREEN_GPAD_BUTTON_PRESSED_CLASS = "pressed";
