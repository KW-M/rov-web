import { DECODE_TXT, ENCODE_TXT } from "../../../shared/js/consts";
import { type mavlink2RestFullMessage, type mavlink2RestMessageBody } from "../../../shared/js/mavlink2RestMessages";
import { WebSocketRelay } from "./websocketRelay";

// Available Mavlink Messages
// https://gist.github.com/patrickelectric/26a407c4e7749cdaa58d06b52212cb1e

export class mavlinkInterface {
    mavlinkWebsocket: WebSocketRelay
    onMessage: (msg: mavlink2RestMessageBody) => void;

    constructor() {
        this.mavlinkWebsocket = new WebSocketRelay()
    }

    start(wsUrl: string, onMessage: (msg: any) => void) {
        this.onMessage = onMessage
        this.mavlinkWebsocket.start(wsUrl, (msgBytes: Uint8Array) => {
            /*Callback to handle messages being received from the Mavlink2Rest server */
            this.handleMessage(msgBytes)
        })
    }

    handleMessage(msgBytes: Uint8Array) {
        // Decode json object from bytes
        if (msgBytes.length === 0) return;
        const msgJson = JSON.parse(DECODE_TXT(msgBytes)) as mavlink2RestMessageBody
        this.onMessage(msgJson)
    }

    sendMessage(msg: mavlink2RestFullMessage) {
        this.mavlinkWebsocket.sendMessage(ENCODE_TXT(JSON.stringify(msg)))
    }

}

export const irovMavlinkInterface = new mavlinkInterface()
