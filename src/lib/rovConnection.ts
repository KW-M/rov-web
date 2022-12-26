import { ConnectionState } from "./consts"
import { DataConnectionMachine } from "./dataConnectionMachine"
import { rovDataChannelConnState, rovVideoStreamConnState } from "./globalContext"
import { MediaConnectionMachine } from "./mediaConnectionMachine"
import type { OurPeerMachine } from "./ourPeerMachine"
import { Queue } from "./util"

export class RovConnection {
    closed: boolean = false
    rovPeerId: string;
    ourPeerMachine: OurPeerMachine;
    // trusted: boolean = false // not yet used
    dataConnection: DataConnectionMachine = null;
    mediaConnection: MediaConnectionMachine = null;
    msgQueue = new Queue() // stores objects in the pair of {msg:str, onSendCallback:function}
    connectionFailureCount = 0;
    onMesssageRecived: (msg: string, rovPeerId: string) => void;

    constructor(rovPeerId, thisPeer, onMesssageRecivedCallback, onOverallStateChangeCallback) {
        this.rovPeerId = rovPeerId;
        this.ourPeerMachine = thisPeer
        this.onMesssageRecived = (msg) => onMesssageRecivedCallback(msg, rovPeerId);
        // this.onOverallStateChange = () => { console.log("onOverallStateChangeCallback", onOverallStateChangeCallback); onOverallStateChangeCallback(this.overallDCState, this.overallMCState, this.rovPeerId) };
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

    _sendMsgToRov(msgObj) {
        const dc = this.dataConnection;
        let success = dc.sendMessage(msgObj.msg)
        if (success) {
            console.debug(`Msg sent to rov: ${this.rovPeerId}`, msgObj.msg, msgObj.onSendCallback)
            if (msgObj.onSendCallback) msgObj.onSendCallback(msgObj.msg);
            return true
        } else {
            console.info(`Failed to send \"{}\" to rov: {}`, msgObj.msg, this.rovPeerId)
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


    sendMessage(msg: string | object, onSendCallback?: () => void, skipQueue = false) {
        if (typeof (msg) !== "string") msg = JSON.stringify(msg);
        let msgObj = { msg: msg, onSendCallback: onSendCallback }
        if (skipQueue) {
            this._sendMsgToRov(msgObj)
        } else {
            console.debug(`Adding msg to queue:`, msg)
            this.msgQueue.push(msgObj);
            setTimeout(this.emptyMsgQueue.bind(this), 0);
        }
    }

    dcStateChange(state: ConnectionState) {
        if (this.closed) return;
        rovDataChannelConnState.set(state)
        console.debug("dcStateChange", state)
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
        // this.mediaConnection.close();
        this.dataConnection.close();
    }
}
