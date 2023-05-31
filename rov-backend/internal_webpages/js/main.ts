import { connectionManager } from "./connectionManager"
import { iRovWebSocketRelay } from "./websocketRelay";
import { rov_actions_proto } from "../../../shared/js/protobufs/rovActionsProto";
import type { LivekitSetupOptions } from "../../../shared/js/livekit/adminActions";


const urlParams = new URLSearchParams(location.search);
const livekitConfig: LivekitSetupOptions = {
    ForceLocal: (urlParams.get("ForceLocal") || "").toLowerCase() === 'true',
    RovRoomName: urlParams.get("RovRoomName"),
    CloudAPIKey: urlParams.get("CloudAPIKey"),
    CloudSecretKey: urlParams.get("CloudSecretKey"),
    LocalAPIKey: urlParams.get("LocalAPIKey"),
    LocalSecretKey: urlParams.get("LocalSecretKey"),
}
for (const key in livekitConfig) if (livekitConfig[key] == undefined) throw new Error("Missing some required livekit setup url query params.");
connectionManager.start(livekitConfig)
iRovWebSocketRelay.start(function (messageEvent: MessageEvent<Uint8Array>) {
    // Callback to handle messages being received from the iROV python

    // TODO we want to properly unpackage all the metadata from the protobu
    const msgProto = rov_actions_proto.RovResponse.decode(messageEvent.data)

    // send this stuff to livekit
    connectionManager.sendMessage(msgProto, true, []) // TODO: REPLACE THIS WITH THE ACTUAL USER ID & Data trasport method
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
