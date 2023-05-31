import { receiveProxiedMsg } from "../../../shared/js/proxyReciever";
import { WebSocketRelay } from "../../../shared/js/websocketRelay";
import { sendSignalingDataToSimplePeerPublisher } from "./simplePeerPub";
import { iRovWebSocketRelay } from "./websocketRelay";

/*
    Intended to handle messages coming FROM Livekit/The Internet
    TODO We wish to send this data to the iROV python code
*/
export function backendHandleWebrtcMsgRcvd(msgBytes: ArrayBufferLike) {
    let data = new Uint8Array(msgBytes)
    if (!data || data.length === 0) return;
    console.log("GOT DC DATA:", data);

    // TODO do some protobuf here to properly package the data up for iROV

    // Send the packaged up message to the iROV via webSocketRelay
    iRovWebSocketRelay.sendMessage(data)

    // sendSignalingDataToSimplePeerPublisher(data);
    // receiveProxiedMsg(msgBytes);
}
