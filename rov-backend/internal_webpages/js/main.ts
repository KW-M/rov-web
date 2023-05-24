import { DECODE_TXT, ENCODE_TXT } from "../../../shared/js/consts";
import { waitfor } from "../../../shared/js/util";
import { getMyIpGeolocation } from "./geolocation";
import { connectToLivekit, sendLivekitMessage } from "./livekitPublisher";
import { initSimplePeerPublisher } from "./simplePeerPub";
import { iRovWebSocketRelay } from "./websocketRelay";


const urlParams = new URLSearchParams(location.search);

iRovWebSocketRelay.start(function(messageEvent: MessageEvent<Uint8Array>){
    // Callback to handle messages being received from the iROV python
    
    // TODO we want to properly unpackage all the metadata from the protobuf
    
    // send this stuff to livekit
    sendLivekitMessage(messageEvent.data)
});

connectToLivekit({
    ForceLocal: (urlParams.get("ForceLocal") || "").toLowerCase() === 'true',
    RovRoomName: urlParams.get("RovRoomName"),
    CloudAPIKey: urlParams.get("CloudAPIKey"),
    CloudSecretKey: urlParams.get("CloudSecretKey"),
    LocalAPIKey: urlParams.get("LocalAPIKey"),
    LocalSecretKey: urlParams.get("LocalSecretKey"),
}).then(async () => {
    console.log('connected?');
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
    });
    initSimplePeerPublisher(stream);
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
