import { ConnectionState } from "./consts"
import { DataConnectionMachine } from "./dataConnectionMachine"
import { rovDataChannelConnState, rovVideoStreamConnState } from "./globalContext"
import { MediaConnectionMachine } from "./mediaConnectionMachine"
import type { OurPeerMachine } from "./ourPeerMachine"
import { Queue } from "./util"

type msgQueueItem = { msgBytes: Uint8Array, onSendCallback: (msgBytes: Uint8Array) => void }
type MsgRecivedCallback = (msg: Uint8Array, rovPeerId: string) => void;
type StateChangeCallback = (dcState: ConnectionState, mcState: ConnectionState, rovPeerId: string) => void;

export class RovConnection {
    closed: boolean = false
    rovPeerId: string;
    ourPeerMachine: OurPeerMachine;
    // trusted: boolean = false // not yet used
    dataConnection: DataConnectionMachine = null;
    mediaConnection: MediaConnectionMachine = null;
    msgQueue = new Queue() // stores objects in the pair of {msg:str, onSendCallback:function}
    connectionFailureCount = 0;
    onMesssageRecived: MsgRecivedCallback;
    onOverallStateChange: StateChangeCallback;

    constructor(rovPeerId, thisPeer, onMesssageRecived: MsgRecivedCallback, onOverallStateChange: StateChangeCallback) {
        this.rovPeerId = rovPeerId;
        this.ourPeerMachine = thisPeer
        this.onMesssageRecived = (msg: Uint8Array) => onMesssageRecived(msg, rovPeerId);
        this.onOverallStateChange = onOverallStateChange;
    }

    start() {
        // setup media connection machine
        if (this.mediaConnection) this.mediaConnection.cleanup();
        let mc = this.mediaConnection = new MediaConnectionMachine(this.ourPeerMachine.peer, this.rovPeerId, this.mcStateChange.bind(this))
        mc.start();

        // setup data connection machine
        if (this.dataConnection) this.dataConnection.cleanup();
        let dc = this.dataConnection = new DataConnectionMachine(this.ourPeerMachine.peer, this.rovPeerId, this.onMesssageRecived, this.dcStateChange.bind(this))
        dc.start();
    }

    _sendMsgToRov(msgObj: msgQueueItem) {
        const dc = this.dataConnection;
        let success = dc.sendMessage(msgObj.msgBytes)
        if (success) {
            if (msgObj.onSendCallback) msgObj.onSendCallback(msgObj.msgBytes);
            return true
        } else {
            console.info(`Failed to send \"{}\" to rov: {}`, msgObj.msgBytes, this.rovPeerId)
        }
        return false
    }

    /* sends all messages in the messageQueue for this rov */
    emptyMsgQueue() {
        if (this.dataConnection.currentState != ConnectionState.connected) return;
        while (!this.msgQueue.isEmpty()) {
            let msgObj = this.msgQueue.peak(); // get the next message in the queue
            // loop through all dataConnections, starting with this.connectedDataConnIndex and try to send the message
            // will return false if it fails to send the message
            if (!this._sendMsgToRov(msgObj)) break;
            this.msgQueue.pop();  // remove the message from the queue
        }
    }


    sendMessage(msgBytes: Uint8Array, onSendCallback?: () => void, skipQueue = false) {
        let msgObj: msgQueueItem = { msgBytes: msgBytes, onSendCallback: onSendCallback }
        if (skipQueue) {
            this._sendMsgToRov(msgObj)
        } else {
            this.msgQueue.push(msgObj);
            setTimeout(this.emptyMsgQueue.bind(this), 0);
        }
    }

    dcStateChange(state: ConnectionState) {
        if (this.closed) return;
        rovDataChannelConnState.set(state)
        console.debug("dcStateChange", state)
        this.onOverallStateChange(this.dataConnection.currentState, this.mediaConnection.currentState, this.rovPeerId)
        if (state == ConnectionState.connected) {
            this.emptyMsgQueue();
            this.connectionFailureCount = 0;
        } else if (state == ConnectionState.reconnecting) {
            this.connectionFailureCount++;
        } else if (state == ConnectionState.disconnected) {
            this.close()
            // this.connectionFailureCount++;
            // this.mediaConnection.restart()
        }

    }

    mcStateChange(state: ConnectionState) {
        if (this.closed) return;
        rovVideoStreamConnState.set(state)
        console.debug("mcStateChange", state)
        if (state == ConnectionState.connected) {
            // yay
        } else if (state == ConnectionState.reconnecting) {
            this.connectionFailureCount++;
        } else if (state == ConnectionState.disconnected) {
            this.close()
        }
    }

    _checkForTooManyFailures() {
        if (this.connectionFailureCount > 5) {
            console.info("Too many connection failures, closing connection")
            this.close()
        }
    }

    switchOutThisPeer(thisPeer) {
        this.ourPeerMachine = thisPeer
        // this.mediaConnection.setCurrentPeer(thisPeer.peer)
        this.dataConnection.setCurrentPeer(thisPeer.peer)
    }

    close() {
        console.info("Closing Rov Connection: ", this.rovPeerId)
        this.closed = true;
        this.mediaConnection.close();
        this.dataConnection.close();
    }
}
