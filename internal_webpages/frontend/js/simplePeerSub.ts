import { sendLivekitMessage } from "./livekit";
import { SimplePeerConnection } from "../../js/simplePeer"
import { handleFrontendMsgRcvd } from "./msgHandler";


let simplePeerSub: SimplePeerConnection | null = null;
export const initSimplePeerSubscriber = (): SimplePeerConnection => {
    // if (simplePeerPub) simplePeerPub.stop()
    simplePeerSub = new SimplePeerConnection(handleFrontendMsgRcvd, (newState: string) => console.log("SIMPLEPEER new conn state:", newState), (signalData) => {
        sendLivekitMessage(signalData)
    })
    simplePeerSub.start({
        initiator: true,
        trickle: false,
    })
    return simplePeerSub;
}

export const sendSignalingDataToSimplePeerSubscriber = (signalData: Uint8Array) => {
    if (simplePeerSub) simplePeerSub.handleSignalingMsg(signalData);
}
