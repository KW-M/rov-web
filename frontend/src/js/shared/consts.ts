import { type RoomConnectOptions, DefaultReconnectPolicy, type RoomOptions } from "livekit-client"
import { MAVLinkType } from "./mavlink2rest-ts/messages/mavlink2rest-enum";
import type { SimplePeerOptions } from "@thaunknown/simple-peer/index.js";

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

    // IMPORTANT: stops tracks when unpublishing - this is important for changing the camera resolution settings.
    stopLocalTrackOnUnpublish: true,

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
            maxBitrate: 7_000_000,
            maxFramerate: 60,
            priority: "high",
        },
        backupCodec: true,
        simulcast: false,
        degradationPreference: "maintain-framerate",
        // backupCodec: {
        //     codec: "h264",
        //     encoding: {
        //         maxBitrate: 700_000,
        //         maxFramerate: 24,
        //         priority: "low",
        //     }
        // },

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

export const SIMPLEPEER_BASE_CONFIG: SimplePeerOptions & { iceRestartEnabled: string | false, iceFailureRecoveryTimeout: number } = {
    trickle: true,
    config: {
        bundlePolicy: "balanced",
        iceTransportPolicy: "all",
    } as RTCConfiguration,
    iceRestartEnabled: false,
    iceFailureRecoveryTimeout: 100000,
}
