import { DECODE_TXT, ENCODE_TXT } from "./shared/consts";
import { type mavlink2RestFullMessage, type mavlink2RestMessageBody } from "./shared/mavlink2RestMessages";
import { WebSocketRelay } from "./websocketRelay";

// Available Mavlink Messages
// https://gist.github.com/patrickelectric/26a407c4e7749cdaa58d06b52212cb1e

export class mavlinkInterface {
    mavlinkWebsocket: WebSocketRelay
    onMessage: (msg: mavlink2RestFullMessage) => void;

    constructor() {
        this.mavlinkWebsocket = new WebSocketRelay()
    }

    start(wsUrl: string, onMessage: (msg: mavlink2RestFullMessage) => void, onConnected?: () => void) {
        this.onMessage = onMessage
        if (onConnected) this.mavlinkWebsocket.onConnectedFn = onConnected;
        this.mavlinkWebsocket.start(wsUrl, (msgData) => {
            /*Callback to handle messages being received from the Mavlink2Rest server */
            this.handleMessage(msgData as string)
        })
    }

    handleMessage(msgData: string | Uint8Array) {
        // Decode json object from bytes
        if (msgData.length === 0) return;
        const msgTxt = msgData instanceof Uint8Array ? DECODE_TXT(msgData) : msgData as string
        try {
            if (msgTxt.startsWith("Ok")) return;
            const msgJson = JSON.parse(msgTxt) as mavlink2RestFullMessage
            this.onMessage(msgJson)
        } catch (e) {
            console.error("Failed to parse recived mavlink2rest json: " + msgTxt, e)
        }
    }

    sendMessage(msg: mavlink2RestFullMessage) {
        this.mavlinkWebsocket.sendMessage(JSON.stringify(msg))
    }

}

export const irovMavlinkInterface = new mavlinkInterface()
