import { internalConnManager } from "./internalConnManager"
import { iRovWebSocketRelay } from "./websocketRelay";
import { rov_actions_proto } from "../../../shared/js/protobufs/rovActionsProto";
import type { LivekitSetupOptions } from "../../../shared/js/livekit/adminActions";
import { twitchStream } from "./twitchStream";

// DISABLE VITE HOT MOUDLE RELOADING:
if (import.meta.hot)
    import.meta.hot.accept(() => import.meta.hot.invalidate())

const urlParams = new URLSearchParams(location.search);
const livekitConfig: LivekitSetupOptions = {
    RovRoomName: urlParams.get("RovRoomName"),
    CloudAPIKey: urlParams.get("CloudAPIKey"),
    CloudSecretKey: urlParams.get("CloudSecretKey"),
    LocalAPIKey: urlParams.get("LocalAPIKey") || "N/A",
    LocalSecretKey: urlParams.get("LocalSecretKey") || "N/A",
    TwitchStreamKey: urlParams.get("TwitchStreamKey"), // Twitch Stream Key (For Streaming, duh)
    EnableLivekitLocal: (urlParams.get("ForceLocal") || "false").toLowerCase() === 'true',
    EnableLivekitCloud: (urlParams.get("EnableCloud") || "true").toLowerCase() === 'true',
    EnableBackendWebsocket: (urlParams.get("EnableBackendWebsocket") || "true").toLowerCase() === 'true',
}
for (const key in livekitConfig) if (livekitConfig[key] == undefined) throw new Error("Missing some required livekit setup url query params.");

// Initialize Twitch Stream
twitchStream.innit(livekitConfig.TwitchStreamKey, livekitConfig.RovRoomName, livekitConfig.CloudAPIKey, livekitConfig.CloudSecretKey)

// Start Livekit
internalConnManager.start(livekitConfig)

window.onbeforeunload = () => { twitchStream.stopStream() } // Stop Twitch Stream when page is closed

// Start Backend/Python Websocket Communication
if (livekitConfig.EnableBackendWebsocket) iRovWebSocketRelay.start((msgBytes: Uint8Array) => {
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
});




// console.log(getFrontendAccessToken(urlParams.get("CloudAPIKey"), urlParams.get("CloudSecretKey"), "PERSON" + Date.now().toString()))



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
