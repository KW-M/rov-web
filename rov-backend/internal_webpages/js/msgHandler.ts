import { rov_actions_proto } from "../../../shared/js/protobufs/rovActionsProto";
import { internalConnManager } from "./internalConnManager";
import { iRovWebSocketRelay } from "./websocketRelay";


function handleInternalWebpageActions(senderId: string, msgProto: rov_actions_proto.RovAction) {
    if (msgProto.SimplepeerSignal) {
        internalConnManager.ingestSimplePeerSignallingMsg(senderId, msgProto.SimplepeerSignal.Message)
        return true;
    } else return false;
}

/*
    Intended to handle messages coming FROM Livekit/The Internet
    TODO We wish to send this data to the iROV python code
*/
export function backendHandleWebrtcMsgRcvd(senderId: string, msgBytes: ArrayBufferLike) {
    let data = new Uint8Array(msgBytes)
    if (!data || data.length === 0) return;

    // Decode the protobuf object from bytes
    const msgProto = rov_actions_proto.RovAction.decode(data)
    console.debug("Rcvd Msg: ", msgProto.toJSON());
    if (handleInternalWebpageActions(senderId, msgProto)) return;

    // Stuff the protobuff object with metadata
    msgProto.BackendMetadata = msgProto.BackendMetadata || new rov_actions_proto.ActionBackendMetadata()
    msgProto.BackendMetadata.FromUserId = senderId
    const newMessage = rov_actions_proto.RovAction.encode(msgProto).finish()

    // Send the re-packaged up message bytes to the iROV python via webSocketRelay
    if (iRovWebSocketRelay.isConnected) iRovWebSocketRelay.sendMessage(newMessage)
}
