import { VideoPresets, type RoomConnectOptions, DefaultReconnectPolicy, type RoomOptions } from "livekit-client"

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

export const LIVEKIT_CLOUD_ENDPOINT = 'https://rov-web.livekit.cloud'
export const LIVEKIT_LOCAL_ENDPOINT = 'http://localhost:7880'
export const PROXY_PREFIX = 'proxy:';
export const SECONDS_IN_DAY = 60 * 60 * 24;

export const LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG: RoomConnectOptions = {
    autoSubscribe: false,
    maxRetries: 2,
    peerConnectionTimeout: 30_000, // miliseconds
}

export const LIVEKIT_FRONTEND_ROOM_CONNECTION_CONFIG: RoomConnectOptions = {
    autoSubscribe: false,
    maxRetries: 6,
    peerConnectionTimeout: 15_000, // miliseconds
}


export const LIVEKIT_BACKEND_ROOM_CONFIG: RoomOptions = {

    // specify how offten to retry connection when it fails.
    reconnectPolicy: new DefaultReconnectPolicy(),

    // optimize publishing bandwidth and CPU for published tracks
    dynacast: true,

    // default capture settings
    videoCaptureDefaults: {
        resolution: {
            width: 800,
            height: 600,
            frameRate: 15,
        },
        // facingMode: 'environment',
        // deviceId: //get device id beforehand
    },

    publishDefaults: {
        videoCodec: "h264",
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