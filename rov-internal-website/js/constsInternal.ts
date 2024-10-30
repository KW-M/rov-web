import { SECONDS_IN_DAY, SIMPLEPEER_BASE_CONFIG } from "./shared/consts.ts";
import { getBooleanQueryParam, getIntegerQueryParam, getStringQueryParam } from "./shared/urlParameters.ts";
import type { SimplePeerOptions } from "@thaunknown/simple-peer/index.js";

export const URL_PARAMS = {
    DEBUG_MODE: getBooleanQueryParam("DEBUG_MODE", false),
    SEND_LOGS: getBooleanQueryParam("SEND_LOGS", false),
    ROV_NAME: getStringQueryParam("ROV_NAME", 'Default-ROV'),
    ROV_CONTROL_PASSWORD: getStringQueryParam("ROV_CONTROL_PASSWORD", ""),
    LIVEKIT_API_KEY: getStringQueryParam("LIVEKIT_API_KEY"),
    LIVEKIT_SECRET_KEY: getStringQueryParam("LIVEKIT_SECRET_KEY"),
    TWITCH_STREAM_KEY: getStringQueryParam("TWITCH_STREAM_KEY", "None"),
    PYTHON_WEBSOCKET_PORT: getIntegerQueryParam("PYTHON_WEBSOCKET_PORT", 0),
    AUTH_TOKEN_TIMEOUT: getIntegerQueryParam("AUTH_TOKEN_TIMEOUT", SECONDS_IN_DAY),
    BLUEOS_APIS_ENDPOINT: getStringQueryParam("BLUEOS_APIS_ENDPOINT", ""), // EG: http://blueos.local
    LIVEKIT_CLOUD_ENDPOINT: getStringQueryParam("LIVEKIT_CLOUD_URL", 'https://rov-web.livekit.cloud'),
    LIVEKIT_LOCAL_ENDPOINT: getStringQueryParam("LIVEKIT_LOCAL_URL", 'http://localhost:7880'),
}

export const CLAW_SERVO_PIN = 18;



export const SIMPLEPEER_ROV_CONFIG: SimplePeerOptions & { iceRestartEnabled: string | false, iceFailureRecoveryTimeout: number } = Object.assign({}, SIMPLEPEER_BASE_CONFIG, {
    initiator: false,
    offerOptions: {
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
    }
})

export const SIMPLEPEER_CAPTURE_CONFIG: MediaStreamConstraints = {
    video: {
        width: 1920,
        height: 1080,
        frameRate: 60,
        facingMode: 'environment',
    },
    audio: false,
}
