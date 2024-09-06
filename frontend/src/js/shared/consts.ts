import { type RoomConnectOptions, DefaultReconnectPolicy, type RoomOptions, VideoPresets } from "livekit-client"
import { MAVLinkType } from "./mavlink2rest-ts/messages/mavlink2rest-enum.ts";

declare global {
    interface Window {
        LIVEKIT_LIST_ONLY_TOKEN: string
    }
}

export enum ConnectionStates {
    init = "Init",
    connecting = "Connecting",
    connected = "Connected",
    reconnecting = "Reconnecting",
    disconnectedOk = "Disconnected",
    failed = "Failed",
}

const TE = new TextEncoder();
export const ENCODE_TXT = (txt: string) => TE.encode(txt)
const TD = new TextDecoder();
export const DECODE_TXT = (data: ArrayBufferLike) => TD.decode(data)

export const ENCRYPTED_AUTH_TOKEN_PREFIX = "AUTHTOKEN:";

export const SEA_LEVEL_PRESSURE = 1013.25; // mbar

// export let DEBUG_MODE = false;
// export let ROV_NAME = 'Default-ROV'
// export let ROV_CONTROL_PASSWORD = ''
// export let LIVEKIT_API_KEY = ''
// export let LIVEKIT_SECRET_KEY = ''
// export let TWITCH_STREAM_KEY = 'None'
// export let ENABLE_LIVEKIT_LOCAL = false
// export let ENABLE_LIVEKIT_CLOUD = true
// export let PYTHON_WEBSOCKET_PORT = 0
// export let AUTH_TOKEN_TIMEOUT = 60 * 60 * 24 // 1 day
// export let BLUEOS_APIS_ENDPOINT = 'http://blueos.local'
// export let LIVEKIT_CLOUD_ENDPOINT = 'https://rov-web.livekit.cloud'
// export let LIVEKIT_LOCAL_ENDPOINT = 'http://localhost:7880'

// export function setRuntimeConsts(livekitConfig: LivekitSetupOptions) {



export const PROXY_PREFIX = 'proxy:';
export const SECONDS_IN_DAY = 60 * 60 * 24;
export const FRONTEND_HANDLED_MAVLINK_MESSAGE_TYPES = [
    MAVLinkType.HEARTBEAT, MAVLinkType.ATTITUDE, MAVLinkType.SYS_STATUS, MAVLinkType.STATUSTEXT, MAVLinkType.SCALED_PRESSURE, MAVLinkType.SCALED_PRESSURE2, MAVLinkType.SCALED_PRESSURE3
]

export const LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG: RoomConnectOptions = {
    autoSubscribe: false,
    maxRetries: 2,
    peerConnectionTimeout: 30000, // miliseconds
}

export const LIVEKIT_FRONTEND_ROOM_CONNECTION_CONFIG: RoomConnectOptions = {
    autoSubscribe: false,
    maxRetries: 6,
    peerConnectionTimeout: 15000, // miliseconds
}

export const LIVEKIT_BACKEND_ROOM_CONFIG: RoomOptions = {

    // specify how offten to retry connection when it fails.
    reconnectPolicy: new DefaultReconnectPolicy(),

    // optimize publishing bandwidth and CPU for published tracks
    dynacast: true,

    // adaptive stream only applies to client side receiving video.
    adaptiveStream: false,

    // default capture settings
    videoCaptureDefaults: {
        resolution: {
            width: 1920,
            height: 1080,
            frameRate: 60,
        },
        facingMode: 'environment',
    },

    publishDefaults: {
        videoCodec: "vp9",
        videoEncoding: {
            maxBitrate: 700_000,
            maxFramerate: 60,
            priority: "high",
        },
        backupCodec: false,
        simulcast: false,
        // backupCodec: {
        //     codec: "h264",
        //     encoding: {
        //         maxBitrate: 700_000,
        //         maxFramerate: 24,
        //         priority: "low",
        //     }
        // },

        // simulcast: true,
        // videoSimulcastLayers: [
        //     VideoPresets.h720,
        //     VideoPresets.h360,
        // ]

    },
}


export const LIVEKIT_FRONTEND_ROOM_CONFIG: RoomOptions = {
    // specify how offten to retry connection when it fails.
    reconnectPolicy: new DefaultReconnectPolicy(),
    // optimize publishing bandwidth and CPU for published tracks
    dynacast: true,
    disconnectOnPageLeave: true,
    adaptiveStream: true,


}

export const SIMPLEPEER_BASE_CONFIG = {
    initiator: true,
    trickle: true,
    // @ts-ignore
    config: {
        bundlePolicy: "balanced",
        iceTransportPolicy: "all",
    } as RTCConfiguration,
}
