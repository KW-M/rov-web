import { SECONDS_IN_DAY } from "./shared/consts.ts";
import { getBooleanQueryParam, getIntegerQueryParam, getStringQueryParam } from "./shared/urlParameters.ts";

export const URL_PARAMS = {
    DEBUG_MODE: getBooleanQueryParam("DEBUG_MODE", false),
    SEND_LOGS: getBooleanQueryParam("SEND_LOGS", false),
    ROV_NAME: getStringQueryParam("ROV_NAME", 'Default-ROV'),
    ROV_CONTROL_PASSWORD: getStringQueryParam("ROV_CONTROL_PASSWORD"),
    LIVEKIT_API_KEY: getStringQueryParam("LIVEKIT_API_KEY"),
    LIVEKIT_SECRET_KEY: getStringQueryParam("LIVEKIT_SECRET_KEY"),
    TWITCH_STREAM_KEY: getStringQueryParam("TWITCH_STREAM_KEY", "None"),
    PYTHON_WEBSOCKET_PORT: getIntegerQueryParam("PYTHON_WEBSOCKET_PORT", 0),
    AUTH_TOKEN_TIMEOUT: getIntegerQueryParam("AUTH_TOKEN_TIMEOUT", SECONDS_IN_DAY),
    BLUEOS_APIS_ENDPOINT: getStringQueryParam("BLUEOS_APIS_ENDPOINT", ""), // EG: http://blueos.local
    LIVEKIT_CLOUD_ENDPOINT: getStringQueryParam("LIVEKIT_CLOUD_URL", 'https://rov-web.livekit.cloud'),
    LIVEKIT_LOCAL_ENDPOINT: getStringQueryParam("LIVEKIT_LOCAL_URL", 'http://localhost:7880'),
}
