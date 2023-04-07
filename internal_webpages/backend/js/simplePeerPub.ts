import { SimplePeerConnection } from "../../js/simplepeer"
import { handleBackendMsgRcvd } from "./msgHandler"
import { sendLivekitMessage } from "./livekit"


let simplePeerPub: SimplePeerConnection | null = null;
export const initSimplePeerPublisher = (mediaStream: MediaStream): SimplePeerConnection => {
    // if (simplePeerPub) simplePeerPub.stop()
    simplePeerPub = new SimplePeerConnection(handleBackendMsgRcvd, (newState: string) => console.log("SIMPLEPEER new conn state:", newState), (signalData) => {
        sendLivekitMessage(new Uint8Array(signalData))
    })
    simplePeerPub.start({
        initiator: false,
        trickle: false,
        streams: [mediaStream]
    })
    return simplePeerPub;
}

export const sendSignalingDataToSimplePeerPublisher = (signalData: Uint8Array) => {
    if (simplePeerPub) simplePeerPub.handleSignalingMsg(signalData);
}
