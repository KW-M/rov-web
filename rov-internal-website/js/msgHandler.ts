import { arm, disarm, heartbeat, manualControl, setMode } from "./shared/mavlink2RestMessages";
import { rov_actions_proto } from "./shared/protobufs/rovActionsProto";
import { internalConnManager } from "./internalConnManager";
import { irovMavlinkInterface } from "./mavlinkWebsocket";
import { iRovWebSocketRelay } from "./websocketRelay";
import { shutdownROV } from "./blueosAPIs/commander";

let designated_driver_user_id: string | null = null
function handleInternalWebpageActions(senderId: string, msgProto: rov_actions_proto.RovAction) {
    if (msgProto.SimplepeerSignal && msgProto.SimplepeerSignal.Message) {
        internalConnManager.ingestSimplePeerSignallingMsg(senderId, msgProto.SimplepeerSignal.Message)
        return true;
    } else if (msgProto.Move) {
        if (designated_driver_user_id && designated_driver_user_id !== senderId) return false;
        let x = (msgProto.Move.VelocityX || 0) * 1000 // X is forward in the ROV
        let y = (msgProto.Move.VelocityY || 0) * 1000 // Y is left/right in the ROV)
        let z = (msgProto.Move.VelocityZ || 0) * 500 + 500
        let r = (msgProto.Move.AngularVelocityYaw || 0) * 500
        let buttonBitmask = msgProto.Move.ButtonBitmask || 0
        irovMavlinkInterface.sendMessage(manualControl(x, y, z, r, buttonBitmask))
        return true;
    } else if (msgProto.ShutdownRov) {
        shutdownROV("poweroff").then((msg) => {
            internalConnManager.sendMessage(rov_actions_proto.RovResponse.create({
                ExchangeId: msgProto.ExchangeId,
                Done: { Message: msg }
            }), false, [])
        }).catch((err) => {
            internalConnManager.sendMessage(rov_actions_proto.RovResponse.create({
                ExchangeId: msgProto.ExchangeId,
                Error: { Message: err.message }
            }), false, [])
        })
        return true;
    } else if (msgProto.RebootRov) {
        shutdownROV("reboot")
    } else if (msgProto.SetAutopilotMode) {
        irovMavlinkInterface.sendMessage(setMode(msgProto.SetAutopilotMode.mode))
        return true;
    } else if (msgProto.Disarm) {
        irovMavlinkInterface.sendMessage(disarm(true))
        return true;
    } else if (msgProto.TakeControl) {
        designated_driver_user_id = senderId;
        internalConnManager.sendMessage(rov_actions_proto.RovResponse.create({
            DriverChanged: { DriverPeerId: senderId }
        }), false, [])
        irovMavlinkInterface.sendMessage(arm(true))
        return true;
    } else if (msgProto.Ping) {
        internalConnManager.sendMessage(rov_actions_proto.RovResponse.create({
            Pong: { Time: msgProto.Ping.Time }
        }), false, [senderId])
        irovMavlinkInterface.sendMessage(heartbeat())
        return true;
    }
    else {
        console.debug("Unhandled Message Recived: ", msgProto.toJSON());
        return false;
    }
}

/*
    Intended to handle messages coming FROM Livekit/The Internet
*/
export function backendHandleWebrtcMsgRcvd(senderId: string, msgBytes: ArrayBufferLike) {
    let data = new Uint8Array(msgBytes)
    if (!data || data.length === 0) return;

    // Decode the protobuf object from bytes
    const msgProto = rov_actions_proto.RovAction.decode(data)
    if (handleInternalWebpageActions(senderId, msgProto)) return;

    // Stuff the protobuff object with metadata
    msgProto.BackendMetadata = msgProto.BackendMetadata || new rov_actions_proto.ActionBackendMetadata()
    msgProto.BackendMetadata.FromUserId = senderId
    const newMessage = rov_actions_proto.RovAction.encode(msgProto).finish()

    // Send the re-packaged up message bytes to the iROV python via webSocketRelay
    if (iRovWebSocketRelay.isConnected) iRovWebSocketRelay.sendMessage(newMessage)
}
