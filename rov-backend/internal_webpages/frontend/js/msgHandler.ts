import { receiveProxiedMsg } from "./proxy";
import { sendSignalingDataToSimplePeerSubscriber } from "./simplePeerSub"

export function handleFrontendMsgRcvd(msgBytes: ArrayBufferLike) {
    let data = new Uint8Array(msgBytes)
    if (!data || data.length === 0) return;
    console.log("GOT DC DATA:", data);
    sendSignalingDataToSimplePeerSubscriber(data);
    // receiveProxiedMsg(msgBytes);
}
