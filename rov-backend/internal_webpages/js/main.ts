import { internalConnManager } from "./internalConnManager"
import { iRovWebSocketRelay } from "./websocketRelay";
import { rov_actions_proto } from "../../../shared/js/protobufs/rovActionsProto";
import type { LivekitSetupOptions } from "../../../shared/js/livekit/adminActions";
import { twitchStream } from "./twitchStream";
import { SECONDS_IN_DAY } from "../../../shared/js/consts";
import { getLongTermStarterAccessToken } from "../../../shared/js/livekit/livekitTokens";


/// ------- DEBUGGING STUFF: -----------
window["getLongTermStarterAccessToken"] = getLongTermStarterAccessToken
// DISABLE VITE HOT MOUDLE RELOADING:
if (import.meta.hot) {
    import.meta.hot.accept(() => import.meta.hot.invalidate())
}
//// ------------------------------------

// Get Setup Options from URL Query Params
const urlParams = new URLSearchParams(location.search);
const livekitConfig: LivekitSetupOptions = {
    RovName: urlParams.get("RovName"),
    RovControlPassword: urlParams.get("RovControlPassword"),
    LivekitAPIKey: urlParams.get("LivekitApiKey"),
    LivekitSecretKey: urlParams.get("LivekitSecretKey"),
    TwitchStreamKey: urlParams.get("TwitchStreamKey") || "None", // Twitch Stream Key (For Streaming, duh)
    EnableLivekitLocal: (urlParams.get("ForceLocal") || "false").toLowerCase() === 'true',
    EnableLivekitCloud: (urlParams.get("EnableCloud") || "true").toLowerCase() === 'true',
    PythonWebsocketPort: parseInt(urlParams.get("PythonWebsocketPort")) || 0,
    AuthTokenTimeout: parseInt(urlParams.get("AuthTokenTimeout")) || SECONDS_IN_DAY,
}
for (const key in livekitConfig) if (livekitConfig[key] == undefined) throw new Error("Missing required url query parameter: " + key);

// Start Livekit
internalConnManager.start(livekitConfig)

// Initialize Twitch Stream
if (livekitConfig.TwitchStreamKey !== "None") {
    twitchStream.init(livekitConfig.TwitchStreamKey, livekitConfig.RovName, livekitConfig.LivekitAPIKey, livekitConfig.LivekitSecretKey)
    window.addEventListener("beforeunload", () => twitchStream.stopStream()) // Stop Twitch Stream when page is closed
}

// Data Logging
const startLogging = async () => {
    try {
        const response = await fetch('http://localhost:5000/start_logging', { method: 'POST' });
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
};

const stopLogging = async () => {
    try {
        const response = await fetch('http://localhost:5000/stop_logging', { method: 'POST' });
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
};

// Start Backend/Python Websocket Communication
if (livekitConfig.PythonWebsocketPort != 0) iRovWebSocketRelay.start("ws://localhost:" + livekitConfig.PythonWebsocketPort, (msgBytes: Uint8Array) => {
    /*Callback to handle messages being received from the iROV python*/


    // Decode protobuf object from bytes
    if (msgBytes.length === 0) return;
    const msgProto = rov_actions_proto.RovResponse.decode(msgBytes)

    // Extract metadata from protobuf object
    if (!msgProto.BackendMetadata) return console.error("No BackendMetadata in message from iROV", msgProto.toJSON(), msgBytes);
    const targetUserIds = msgProto.BackendMetadata.TargetUserIds
    const transportMethod = msgProto.BackendMetadata.TransportMethod
    const isReliable = transportMethod == rov_actions_proto.DataTransportMethod.LivekitReliable

    // Send message on using livekit:
    internalConnManager.sendMessage(msgProto, isReliable, targetUserIds)

    // If ROV is online start logging
    if (msgProto.RovOnline) startLogging();
    
    window.addEventListener("beforeunload", () => stopLogging()); // Stop data logging when page is closed
});




// console.log(getFrontendAccessToken(urlParams.get("LivekitApiKey"), urlParams.get("LivekitSecretKey"), "PERSON" + Date.now().toString()))



// setSendProxyMessageCallback((data) => {
//     console.log("Sending Msg Through proxy. JK! ", DECODE_TXT(data));
// })
// let msg = JSON.stringify({
//     url: 'http://wow.com',
//     body: new Array(...ENCODE_TXT("ALL")),
//     type: proxyMessageTypes.socketMsg
// })
// console.log("smg", msg)
// // await waitfor(5000);

// msg = JSON.stringify({
//     url: 'http://wow.com',
//     body: new Array(...ENCODE_TXT("BO")),
//     type: proxyMessageTypes.socketMsg
// })
// console.log("smg", msg)
