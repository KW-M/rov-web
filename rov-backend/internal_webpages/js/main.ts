import { connectionManager } from "./connectionManager"
import { iRovWebSocketRelay } from "./websocketRelay";
import { rov_actions_proto } from "../../../shared/js/protobufs/rovActionsProto";
import type { LivekitSetupOptions } from "../../../shared/js/livekit/adminActions";


const urlParams = new URLSearchParams(location.search);
const livekitConfig: LivekitSetupOptions = {
    RovRoomName: urlParams.get("RovRoomName"),
    CloudAPIKey: urlParams.get("CloudAPIKey"),
    CloudSecretKey: urlParams.get("CloudSecretKey"),
    LocalAPIKey: urlParams.get("LocalAPIKey") || "N/A",
    LocalSecretKey: urlParams.get("LocalSecretKey") || "N/A",
    EnableLivekitLocal: (urlParams.get("ForceLocal") || "false").toLowerCase() === 'true',
    EnableLivekitCloud: (urlParams.get("EnableCloud") || "true").toLowerCase() === 'true',
}
for (const key in livekitConfig) if (livekitConfig[key] == undefined) throw new Error("Missing some required livekit setup url query params.");
connectionManager.start(livekitConfig)
iRovWebSocketRelay.start(function (messageEvent: MessageEvent<Uint8Array>) {
    // Callback to handle messages being received from the iROV python

    // Unpackage needed metadata from the protobuf object
    const msgProto = rov_actions_proto.RovResponse.decode(messageEvent.data)
    const targetUserIds = msgProto.BackendMetadata.TargetUserIds
    const transportMethod = msgProto.BackendMetadata.TransportMethod
    const isReliable = transportMethod == rov_actions_proto.DataTransportMethod.LivekitReliable

    // send this stuff to livekit
    connectionManager.sendMessage(msgProto, isReliable, targetUserIds)
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
