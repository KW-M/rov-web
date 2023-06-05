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

export const LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG: RoomConnectOptions = {
    autoSubscribe: false,
    maxRetries: 1000,
    peerConnectionTimeout: 45_000, // miliseconds
}

export const LIVEKIT_FRONTEND_ROOM_CONNECTION_CONFIG: RoomConnectOptions = {
    autoSubscribe: true,
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
        resolution: VideoPresets.h1080.resolution,
        // facingMode: 'environment',
        // deviceId: //get device id beforehand
    },

    publishDefaults: {
        videoCodec: "h264",
    },
}
