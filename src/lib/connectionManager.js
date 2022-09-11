
import { get } from "svelte/store"
import { ConnectionState, ConnectionTransitions, RovApiAction } from "./consts"
import { DataConnectionMachine } from "./dataConnectionMachine"
import { ourPeerId, peerServerConnState, rovDataChannelConnState, rovPeerIdEndNumber, rovVideoStreamConnState } from "./globalContext"
import { MediaConnectionMachine } from "./mediaConnectionMachine"
import { OurPeerMachine } from "./ourPeerMachine"
import { getROVName } from "./rovUtil"
import { Queue } from "./util"

class RovConnection {
    rovPeerId = null
    ourPeerMachine = null
    trusted = false

    dataConnections = []
    mediaConnections = []
    msgQueue = new Queue() // stores objects in the pair of {msg:str, onSendCallback:function}
    connectedDataConnIndex = 0;
    overallDCState = null
    overallMCState = null
    onOverallStateChange = (state) => { };
    onMesssageRecivedCallback = (msg) => { };
    reconnectFailureCount = 0;

    constructor(rovPeerId, thisPeer, onMesssageRecivedCallback, onOverallStateChangeCallback) {
        this.rovPeerId = rovPeerId;
        this.ourPeerMachine = thisPeer
        this.onMesssageRecivedCallback = (msg) => { onMesssageRecivedCallback(msg, this.rovPeerId) };
        this.onOverallStateChange = () => { console.log("onOverallStateChangeCallback", onOverallStateChangeCallback); onOverallStateChangeCallback(this.overallDCState, this.overallMCState, this.rovPeerId) };
        console.log("Rov constructor", rovPeerId, onOverallStateChangeCallback)
    }

    start() {
        if (this.dataConnections.length == 0) {
            let dc = new DataConnectionMachine(this.ourPeerMachine.peer, this.rovPeerId, this.dcStateChange.bind(this), this.onMesssageRecivedCallback)
            this.dataConnections = [dc];
            dc.start();
        }

        if (this.mediaConnections.length == 0) {
            // setup media connection machine/s
            let mc = new MediaConnectionMachine(this.ourPeerMachine.peer, this.rovPeerId, this.mcStateChange.bind(this))
            this.mediaConnections = [mc]
            mc.start();
            this.sendMessage({ action: RovApiAction.begin_video_stream })
        }
    }

    /* sends all messages in the messageQueue for this rov */
    emptyMsgQueue() {
        console.info("emptying msg queue for rov: ", this.rovPeerId)
        if (this.overallDCState != ConnectionState.connected) return;
        queueLoop: while (!this.msgQueue.isEmpty()) {
            let msgObj = this.msgQueue.peak(); // get the next message in the queue
            // loop through all dataConnections, starting with this.connectedDataConnIndex and try to send the message
            for (let i = 0; i < this.dataConnections.length; i++) {
                const dcIndex = (this.connectedDataConnIndex + i) % this.dataConnections.length
                const dc = this.dataConnections[dcIndex];
                let success = dc.sendMessage(msgObj.msg)
                if (success) {
                    console.info(`Msg sent to rov: ${this.rovPeerId}`, msgObj.msg)
                    if (msgObj.onSendCallback) msgObj.onSendCallback(msgObj.msg);
                    this.msgQueue.pop();  // remove the message from the queue
                    this.connectedDataConnIndex = dcIndex;
                    continue queueLoop;
                } else {
                    console.info(`Failed to send \"{}\" to rov: {}`, msgObj.msg, this.rovPeerId)
                }
            }
            break queueLoop;
        }
    }


    sendMessage(msg, onSendCallback) {
        if (typeof (msg) !== "string") {
            msg = JSON.stringify(msg)
        }
        console.info(`Adding msg to queue:`, msg)
        this.msgQueue.push({ msg: msg, onSendCallback: onSendCallback });
        this.emptyMsgQueue();
    }

    stateChangeHandler(connListName, newConnectionFunc, startConnectionFunc) {

        if (this[connListName] == null || this[connListName].length == 0) return [-1, []];
        let states = this[connListName].map((conn) => { return conn.currentState })
        let connectedCount = 0;

        console.log(connListName, states);

        for (let i = 0; i < states.length; i++) {
            const stateName = states[i];
            if (stateName == ConnectionState.connected) {
                connectedCount++;
                if (connectedCount > 1) {
                    this[connListName][i].cleanup();
                    this[connListName].splice(i, 1)
                }
                this.reconnectFailureCount = 0;
            } else if (stateName == ConnectionState.reconnecting && states.length <= 1) {
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

        console.log("Returning states")
        return [connectedCount, states];
    }

    dcStateChange() {
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
        if (this.dataConnections.length == 0) return;
        let [connectedCount, states] = this.stateChangeHandler(
            "mediaConnections",
            () => { return new MediaConnectionMachine(this.ourPeerMachine.peer, this.rovPeerId, this.mcStateChange.bind(this)) },
            (mc) => { mc.start(); this.sendMessage({ action: RovApiAction.begin_video_stream }) }
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

        // setup data connection machine/s
        let dc = new DataConnectionMachine(this.ourPeerMachine.peer, this.rovPeerId, this.dcStateChange.bind(this), this.onMesssageRecivedCallback)
        this.dataConnections = [...this.dataConnections, dc];
        dc.start()

        // setup media connection machine/s
        let mc = new MediaConnectionMachine(this.ourPeerMachine.peer, this.rovPeerId, this.mcStateChange.bind(this))
        this.mediaConnections = [...this.mediaConnections, mc] /// --- change
        mc.start()
        this.sendMessage({ action: RovApiAction.begin_video_stream })
    }

    cleanup() {
        console.info("Cleaning up RovConnection: ", this.rovPeerId)
        this.dataConnections.forEach((dc) => {
            dc.cleanup();
        })

        this.mediaConnections.forEach((mc) => {
            mc.cleanup();
        })
    }
}


export class ConnectionManager {
    ROVs = {
        /* "rov-1": {
            trusted: false,
            DataConnections: [],
            MediaConnections: []
        } */
    }


    currentTargetRovId = getROVName(get(rovPeerIdEndNumber));
    ourPeerMachines = []
    overallPeerServerState = ConnectionState.disconnected;
    reconnectFailureCount = 0;
    onMessageRecivedCallback = (msg) => { console.info("msg recived:" + msg) }

    constructor(onMessageRecivedCallback) {
        this.onMessageRecivedCallback = onMessageRecivedCallback;
    }

    start() {
        if (this.ourPeerMachines.length == 0) {
            let newPeerMachine = new OurPeerMachine(this.peerConnStateChange.bind(this))
            this.ourPeerMachines = [newPeerMachine];
            newPeerMachine.start()
        }
    }

    getThisPeerId() {
        return get(ourPeerId)
    }

    peerConnStateChange() {
        let states = this.ourPeerMachines.map((peerMachine) => { return peerMachine.currentState })
        console.log("PeerStatesChange: ", states)

        let connectedCount = 0;
        for (let i = 0; i < states.length; i++) {
            const stateName = states[i];

            let newPeer = null;
            if (stateName == ConnectionState.connected) {
                connectedCount++;
                if (connectedCount > 1) {
                    this.ourPeerMachines[i].cleanup();
                    this.ourPeerMachines.splice(i, 1)
                } else {
                    this.connectToCurrentTargetRov();
                }
                this.reconnectFailureCount = 0;
            } else if (stateName == ConnectionState.reconnecting && states.length <= 1) {
                newPeer = new OurPeerMachine(this.peerConnStateChange.bind(this))
                this.ourPeerMachines = [...this.ourPeerMachines, newPeer];
            } else if (stateName == "Destroyed") {
                this.reconnectFailureCount++;
                // let oldPeer = this.ourPeer[i];
                this.ourPeerMachines.splice(i, 1);
                if (this.reconnectFailureCount >= 3) {
                    this.reconnectFailureCount = 0;
                    console.log("Our Peer Too Many Failures, exiting...")
                } else if (this.ourPeerMachines.length === 0) {
                    this.start() // start over with one peer
                }
            }

            if (newPeer) {
                newPeer.start()
                for (const rovId in this.ROVs) {
                    const switchOutThisPeer = this.ROVs[rovId].switchOutThisPeer;
                    if (switchOutThisPeer) switchOutThisPeer(newPeer)
                }
            }
        }

        if (connectedCount == -1) return;
        console.debug("peer states:", states, connectedCount)
        if (connectedCount > 0) {
            if (this.overallPeerServerState == ConnectionState.connected) return;
            peerServerConnState.set(ConnectionState.connected);

        } else if (states.indexOf(ConnectionState.reconnecting) != -1) {
            if (this.overallPeerServerState == ConnectionState.reconnecting) return;
            peerServerConnState.set(ConnectionState.reconnecting);

        } else if (states.indexOf(ConnectionState.connecting) != -1) {
            if (this.overallPeerServerState == ConnectionState.connecting) return;
            peerServerConnState.set(ConnectionState.connecting);

        } else if (this.overallPeerServerState != ConnectionState.disconnected) {
            peerServerConnState.set(ConnectionState.disconnected);
        }

    }

    rovConnStateChange(overallDCState, overallMCState, rovId) {
        console.info(rovId + " Conn State: dc:" + overallDCState + " mc:" + overallMCState)
        if (rovId == this.currentTargetRovId) {
            console.info("Current Rov " + rovId + " state changed")
            rovDataChannelConnState.set(overallDCState);
            rovVideoStreamConnState.set(overallMCState);
        }
    }

    messageRecived(msg, rovId) {
        if (rovId === this.currentTargetRovId) {
            this.onMessageRecivedCallback(msg)
        }
    }

    connectToRov(rovPeerId) {
        if (!this.ROVs[rovPeerId]) {
            console.log("new Rov: ", rovPeerId, this.rovConnStateChange.bind(this))
            this.ROVs[rovPeerId] = new RovConnection(rovPeerId, this.ourPeerMachines[0], this.messageRecived.bind(this), this.rovConnStateChange.bind(this))
        }
        this.ROVs[rovPeerId].start();
    }

    connectToCurrentTargetRov() {
        this.currentTargetRovId = getROVName(get(rovPeerIdEndNumber));
        this.connectToRov(this.currentTargetRovId);
    }

    disconnectFromRov(rovPeerId) {
        if (rovPeerId == this.currentTargetRovId) {
            rovDataChannelConnState.set(ConnectionState.disconnected);
            rovVideoStreamConnState.set(ConnectionState.disconnected);
        }
        if (this.ROVs[rovPeerId] === undefined) return;
        this.ROVs[rovPeerId].cleanup();
        delete this.ROVs[rovPeerId];
    }

    disconnectFromCurrentRov() {
        this.disconnectFromRov(this.currentTargetRovId);
    }

    sendMessageToRov(msg, rovPeerId) {
        this.ROVs[rovPeerId].sendMessage(msg)
    }

    sendMessageToCurrentRov(msg) {
        this.sendMessageToRov(msg, this.currentTargetRovId)
    }

    cleanup() {
        for (const rovId in this.ROVs) {
            this.disconnectFromRov(rovId)
        }
        for (const peerMachine of this.ourPeerMachines) {
            peerMachine.cleanup()
        }
        this.ourPeerMachines = []
    }
}
