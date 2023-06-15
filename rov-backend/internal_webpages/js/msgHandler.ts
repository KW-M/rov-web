import { rov_actions_proto } from "../../../shared/js/protobufs/rovActionsProto";
import { receiveProxiedMsg } from "../../../shared/js/proxyReciever";
import { connectionManager } from "./connectionManager";
import { iRovWebSocketRelay } from "./websocketRelay";


function handleInternalWebpageActions(senderId: string, msgProto: rov_actions_proto.RovAction) {
    if (msgProto.SimplepeerSignal) {
        connectionManager.ingestSimplePeerSignallingMsg(senderId, msgProto.SimplepeerSignal.Message)
    }
}

/*
    Intended to handle messages coming FROM Livekit/The Internet
    TODO We wish to send this data to the iROV python code
*/
export function backendHandleWebrtcMsgRcvd(senderId: string, msgBytes: ArrayBufferLike) {
    let data = new Uint8Array(msgBytes)
    if (!data || data.length === 0) return;
    console.log("GOT DC DATA:", data);

    // Do some protobuf here to properly package the data up for iROV (stuff in the Sender Id)
    const msgProto = rov_actions_proto.RovAction.decode(data)
    msgProto.BackendMetadata = msgProto.BackendMetadata || new rov_actions_proto.ActionBackendMetadata()
    msgProto.BackendMetadata.FromUserID = senderId
    handleInternalWebpageActions(senderId, msgProto)
    const newMessage = rov_actions_proto.RovAction.encode(msgProto).finish()

    // Send the packaged up message to the iROV via webSocketRelay
    if (iRovWebSocketRelay.isConnected) iRovWebSocketRelay.sendMessage(newMessage)

    // sendSignalingDataToSimplePeerPublisher(data);
    // receiveProxiedMsg(msgBytes);
}
