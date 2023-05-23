import { receiveProxiedMsg } from "../../../shared/js/proxyReciever";
import { sendSignalingDataToSimplePeerPublisher } from "./simplePeerPub";

export function handleBackendMsgRcvd(msgBytes: ArrayBufferLike) {
    let data = new Uint8Array(msgBytes)
    if (!data || data.length === 0) return;
    console.log("GOT DC DATA:", data);
    sendSignalingDataToSimplePeerPublisher(data);
    // receiveProxiedMsg(msgBytes);
}
