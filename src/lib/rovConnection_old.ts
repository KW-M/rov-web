import { ConnectionState, ConnectionTransitions, RovApiAction } from "./consts"
import { DataConnectionMachine } from "./dataConnectionMachine"
import { ourPeerId, peerServerConnState, rovDataChannelConnState, rovPeerIdEndNumber, rovVideoStreamConnState } from "./globalContext"
import { MediaConnectionMachine } from "./mediaConnectionMachine"
import { OurPeerMachine } from "./ourPeerMachine"
import { getROVName } from "./rovUtil"
import { showToastMessage } from "./ui"
import { Queue } from "./util"

export class RovConnection {
    rovPeerId: string;
    ourPeerMachine: OurPeerMachine;
    // trusted: boolean = false // not yet used
    cleanupHappening: boolean = false

    dataConnections: DataConnectionMachine[] = []
    mediaConnections: MediaConnectionMachine[] = []
    msgQueue = new Queue() // stores objects in the pair of {msg:str, onSendCallback:function}
    connectedDataConnIndex = 0;
    overallDCState: ConnectionState = ConnectionState.disconnected
    overallMCState: ConnectionState = ConnectionState.disconnected
    onOverallStateChange = () => { };
    onMesssageRecivedCallback = (msg) => { };
    reconnectFailureCount = 0;

    constructor(rovPeerId, thisPeer, onMesssageRecivedCallback, onOverallStateChangeCallback) {
        this.rovPeerId = rovPeerId;
        this.ourPeerMachine = thisPeer
        this.onMesssageRecivedCallback = (msg) => {
            this.dataConnections.forEach((dc) => { dc.setLastRecivedMessageTime() })
            onMesssageRecivedCallback(msg, this.rovPeerId)
        };
        this.onOverallStateChange = () => { console.log("onOverallStateChangeCallback", onOverallStateChangeCallback); onOverallStateChangeCallback(this.overallDCState, this.overallMCState, this.rovPeerId) };
        console.log("Rov constructor", rovPeerId, onOverallStateChangeCallback)
    }

    start() {
        if (this.mediaConnections.length == 0) {
            // setup media connection machine/s
            let mc = new MediaConnectionMachine(this.ourPeerMachine.peer, this.rovPeerId, this.mcStateChange.bind(this))
            this.mediaConnections = [mc]
            mc.start();
            // this.sendMessage({ action: RovApiAction.begin_video_stream })
        }

        if (this.dataConnections.length == 0) {
            let dc = new DataConnectionMachine(this.ourPeerMachine.peer, this.rovPeerId, this.dcStateChange.bind(this), this.onMesssageRecivedCallback)
            this.dataConnections = [dc];
            dc.start();
        }


    }

    sendMsgDirectlyToRov(msgObj) {
        for (let i = 0; i < this.dataConnections.length; i++) {
            const dcIndex = (this.connectedDataConnIndex + i) % this.dataConnections.length
            const dc = this.dataConnections[dcIndex];
            let success = dc.sendMessage(msgObj.msg)
            if (success) {
                console.debug(`Msg sent to rov: ${this.rovPeerId}`, msgObj.msg, msgObj.onSendCallback)
                if (msgObj.onSendCallback) msgObj.onSendCallback(msgObj.msg);
                this.msgQueue.pop();  // remove the message from the queue
                this.connectedDataConnIndex = dcIndex;
                return true
            } else {
                console.info(`Failed to send \"{}\" to rov: {}`, msgObj.msg, this.rovPeerId)
            }
        }
        return false
    }

    /* sends all messages in the messageQueue for this rov */
    emptyMsgQueue() {
        if (this.overallDCState != ConnectionState.connected) return;
        queueLoop: while (!this.msgQueue.isEmpty()) {
            let msgObj = this.msgQueue.peak(); // get the next message in the queue
            // loop through all dataConnections, starting with this.connectedDataConnIndex and try to send the message
            // will return false if it fails to send the message
            if (!this.sendMsgDirectlyToRov(msgObj)) break queueLoop;
        }
    }


    sendMessage(msg: string | object, onSendCallback?: () => void, skipQueue = false) {
        if (typeof (msg) !== "string") msg = JSON.stringify(msg);
        let msgObj = { msg: msg, onSendCallback: onSendCallback }

        if (skipQueue) {
            this.sendMsgDirectlyToRov(msgObj)
        } else {
            console.debug(`Adding msg to queue:`, msg)
            this.msgQueue.push(msgObj);
            setTimeout(this.emptyMsgQueue.bind(this), 0);
        }
    }

    stateChangeHandler(connListName, newConnectionFunc, startConnectionFunc) {

        if (this[connListName] == null || this[connListName].length == 0) return [-1, []];
        let states = this[connListName].map((conn) => { return conn.currentState })
        let connectedCount = 0;

        for (let i = 0; i < states.length; i++) {
            const stateName = states[i];
            if (stateName == ConnectionState.connected) {
                connectedCount++;
                if (connectedCount > 1) {
                    this[connListName][i].cleanup();
                    this[connListName].splice(i, 1)
                }
                this.reconnectFailureCount = 0;
            }

            else if (stateName == ConnectionState.reconnecting && states.length <= 1) {
                let conn = newConnectionFunc();
                this[connListName].push(conn);
                startConnectionFunc(conn);
            } else if (stateName == "Destroyed") {
                // let oldDC = connDetails.activeConnList[i];
                this.reconnectFailureCount++;
                this[connListName].splice(i, 1)
                if (this.reconnectFailureCount >= 5) {
                    this.reconnectFailureCount = 0;
                    console.info("Rov " + connListName + " Too Many Failures, exiting...")
                    return [0, []]//[0, []]
                } else if (this[connListName].length === 0) {
                    // start over with one dataConnection
                    let conn = newConnectionFunc();
                    this[connListName] = [conn];
                    startConnectionFunc(conn);
                    return [-1, []] // return -1 to indicate that we are starting over
                }
            }
        }

        return [connectedCount, states];
    }

    dcStateChange() {
        if (this.cleanupHappening || this.dataConnections.length == 0) return;
        let [connectedCount, states] = this.stateChangeHandler(
            "dataConnections",
            () => { return new DataConnectionMachine(this.ourPeerMachine.peer, this.rovPeerId, this.dcStateChange.bind(this), this.onMesssageRecivedCallback.bind(this)) },
            (dc) => { dc.start() }
        )

        if (connectedCount == -1) return;
        console.debug("dc states:", states, connectedCount)
        if (connectedCount > 0) {
            if (this.overallDCState == ConnectionState.connected) return;
            this.overallDCState = ConnectionState.connected;
            this.onOverallStateChange()
            this.emptyMsgQueue();
        } else if (states.indexOf(ConnectionState.reconnecting) != -1) {
            if (this.overallDCState == ConnectionState.reconnecting) return;
            this.overallDCState = ConnectionState.reconnecting;
            this.onOverallStateChange()
        } else if (states.indexOf(ConnectionState.connecting) != -1) {
            if (this.overallDCState == ConnectionState.connecting) return;
            this.overallDCState = ConnectionState.connecting;
            this.onOverallStateChange()
        } else if (this.overallDCState != ConnectionState.disconnected) {
            this.overallDCState = ConnectionState.disconnected;
            this.onOverallStateChange()
            if (this.overallMCState != ConnectionState.disconnected) {
                this.mediaConnections.forEach((mc) => { mc.cleanup() })
            }
        }
    }

    mcStateChange() {
        if (this.cleanupHappening || this.dataConnections.length == 0) return;
        let [connectedCount, states] = this.stateChangeHandler(
            "mediaConnections",
            () => { return new MediaConnectionMachine(this.ourPeerMachine.peer, this.rovPeerId, this.mcStateChange.bind(this)) },
            (mc) => {
                mc.start();
                // this.sendMessage({ action: RovApiAction.begin_video_stream })
            }
        )

        if (connectedCount == -1) return;
        console.debug("mc states:", states, connectedCount)
        if (connectedCount > 0) {
            if (this.overallMCState == ConnectionState.connected) return;
            this.overallMCState = ConnectionState.connected;
            this.onOverallStateChange()
        } else if (states.indexOf(ConnectionState.reconnecting) != -1) {
            if (this.overallMCState == ConnectionState.reconnecting) return;
            this.overallMCState = ConnectionState.reconnecting;
            this.onOverallStateChange()
        } else if (states.indexOf(ConnectionState.connecting) != -1) {
            if (this.overallMCState == ConnectionState.connecting) return;
            this.overallMCState = ConnectionState.connecting;
            this.onOverallStateChange()
        } else if (this.overallMCState != ConnectionState.disconnected) {
            this.overallMCState = ConnectionState.disconnected;
            this.onOverallStateChange()
        }
    }

    switchOutThisPeer(thisPeer) {
        this.ourPeerMachine = thisPeer

        // setup media connection machine/s
        let mc = new MediaConnectionMachine(this.ourPeerMachine.peer, this.rovPeerId, this.mcStateChange.bind(this))
        this.mediaConnections = [...this.mediaConnections, mc] /// --- change
        mc.start()
        // this.sendMessage({ action: RovApiAction.begin_video_stream })

        // setup data connection machine/s
        let dc = new DataConnectionMachine(this.ourPeerMachine.peer, this.rovPeerId, this.dcStateChange.bind(this), this.onMesssageRecivedCallback)
        this.dataConnections = [...this.dataConnections, dc];
        dc.start()


    }

    cleanup() {
        console.info("Cleaning up RovConnection: ", this.rovPeerId)
        this.cleanupHappening = true;

        this.dataConnections.forEach((dc) => {
            dc.cleanup();
        })

        this.mediaConnections.forEach((mc) => {
            mc.cleanup();
        })
    }
}
