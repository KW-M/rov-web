
import { ConnectionState } from "./consts"
import { DataConnectionMachine } from "./dataConnectionMachine"
import { MediaConnectionMachine } from "./mediaConnectionMachine"
import { OurPeerMachine } from "./ourPeerMachine"
import { getROVName } from "./rovUtil"
import { Queue } from "./util"

class RovConnection {
    rovPeerId = null
    peer = null
    trusted = false

    dataConnections = []
    mediaConnections = []
    msgQueue = new Queue()
    connectedDataConnIndex = 0;
    overallState = "Disconnected"
    onOverallStateChangeCallback = (state) => { };
    onMesssageRecivedCallback = (msg) => { };
    reconnectFailureCount = 0;

    constructor(rovPeerId, thisPeer, onMesssageRecivedCallback, onOverallStateChangeCallback) {
        this.rovPeerId = rovPeerId;
        this.peer = thisPeer
        this.onMesssageRecivedCallback = (msg) => { onMesssageRecivedCallback(msg, this.rovPeerId) };
        this.onOverallStateChangeCallback = (overallState) => { onOverallStateChangeCallback(overallState, this.rovPeerId) };
        // this.mediaConnections = [new DataConnectionMachine(thisPeer, this.rovPeerId, console.log)]; /// --- change
    }

    start() {
        if (this.dataConnections.length == 0) {
            let dc = new DataConnectionMachine(this.peer, this.rovPeerId, this.dcStateChange.bind(this), this.onMesssageRecivedCallback)
            this.dataConnections = [dc];
            dc.start();
        }

        if (this.mediaConnections.length == 0) {
            // setup media connection machine/s
            let mc = new MediaConnectionMachine(this.peer, this.rovPeerId, this.mcStateChange.bind(this))
            this.mediaConnections = [mc] /// --- change
            mc.start()
        }
    }

    /* sends all messages in the messageQueue for this rov */
    emptyMsgQueue() {
        if (this.overallState != ConnectionState.connected) return;
        queueLoop: while (!this.msgQueue.isEmpty()) {
            let msg = this.msgQueue.peak(); // get the next message in the queue
            // loop through all dataConnections, starting with this.connectedDataConnIndex and try to send the message
            for (let i = 0; i < this.dataConnections.length; i++) {
                const dcIndex = (this.connectedDataConnIndex + i) % this.dataConnections.length
                const dc = this.dataConnections[dcIndex];
                let success = dc.sendMessage(msg)
                if (success) {
                    this.msgQueue.pop();  // remove the message from the queue
                    this.connectedDataConnIndex = dcIndex;
                    continue queueLoop;
                }
            }
            break queueLoop;
        }
    }


    sendMessage(msg) {
        this.msgQueue.push(msg);
        this.emptyMsgQueue();
    }

    stateChangeHandler(c) {
        let states = c.activeConnList.map((conn) => { return conn.currentState })
        let connectedCount = 0;

        for (let i = 0; i < states.length; i++) {
            const stateName = states[i];
            if (stateName == "Connected") {
                connectedCount++;
                if (connectedCount > 1) {
                    c.activeConnList[i].cleanup();
                    c.activeConnList.splice(i, 1)
                }
                this.reconnectFailureCount = 0;
            } else if (stateName == "Reconnecting" && states.length <= 1) {
                let conn = c.newConnectionFunc();
                c.activeConnList = [...c.activeConnList, conn];
                conn.start()
            } else if (stateName == "Destroyed") {
                // let oldDC = connDetails.activeConnList[i];
                this.reconnectFailureCount++;
                c.activeConnList.splice(i, 1)
                if (this.reconnectFailureCount >= 3) {
                    this.reconnectFailureCount = 0;
                    console.info("Rov media connection Too Many Failures, exiting...")
                } else if (c.activeConnList.length === 0) {
                    // start over with one dataConnection
                    let conn = c.newConnectionFunc();
                    this.dataConnections = [conn];
                    conn.start();
                }
            }
        }

        return connectedCount;
    }

    dcStateChange() {
        let states = this.dataConnections.map((dc) => { return dc.currentState })
        let connectedCount = 0;

        console.log(this.rovPeerId + "_DC_StateChange", states)

        for (let i = 0; i < states.length; i++) {
            const stateName = states[i];
            if (stateName == "Connected") {
                connectedCount++;
                if (connectedCount > 1) {
                    this.dataConnections[i].cleanup();
                    this.dataConnections.splice(i, 1)
                }
                this.reconnectFailureCount = 0;
            } else if (stateName == "Reconnecting" && states.length <= 1) {
                let dc = new DataConnectionMachine(this.peer, this.rovPeerId, this.dcStateChange.bind(this), this.onMesssageRecivedCallback)
                this.dataConnections = [...this.dataConnections, dc];
                dc.start()
            } else if (stateName == "Destroyed") {
                // let oldDC = this.dataConnections[i];
                this.reconnectFailureCount++;
                this.dataConnections.splice(i, 1)
                if (this.reconnectFailureCount >= 3) {
                    this.reconnectFailureCount = 0;
                    console.info("Rov connection Too Many Failures, exiting...")
                } else if (this.dataConnections.length === 0) {
                    this.start() // start over with one dataConnection
                }
            }
        }

        if (connectedCount > 0 && this.overallState != "Connected") {
            this.overallState = "Connected";
            this.onOverallStateChangeCallback(this.overallState)
            this.emptyMsgQueue();
        } else if (this.overallState != "Connecting" && (states.indexOf("Connecting") != -1 || states.indexOf("Reconnecting") != -1)) {
            this.overallState = "Connecting";
            this.onOverallStateChangeCallback(this.overallState)
        } else if (this.overallState != "Disconnected") {
            this.overallState = "Disconnected";
            this.onOverallStateChangeCallback(this.overallState)
        }
    }

    mcStateChange() {
        let states = this.mediaConnections.map((dc) => { return dc.currentState })
        let connectedCount = 0;

        console.log(this.rovPeerId + "MC_StateChange", states)

        for (let i = 0; i < states.length; i++) {
            const stateName = states[i];
            if (stateName == "Connected") {
                connectedCount++;
                if (connectedCount > 1) {
                    this.mediaConnections[i].cleanup();
                    this.mediaConnections.splice(i, 1)
                }
                this.reconnectFailureCount = 0;
            } else if (stateName == "Reconnecting" && states.length <= 1) {
                let dc = new MediaConnectionMachine(this.peer, this.rovPeerId, this.mcStateChange.bind(this), this.onMesssageRecivedCallback)
                this.mediaConnections = [...this.mediaConnections, dc];
                dc.start()
            } else if (stateName == "Destroyed") {
                // let oldDC = this.mediaConnections[i];
                this.reconnectFailureCount++;
                this.mediaConnections.splice(i, 1)
                if (this.reconnectFailureCount >= 3) {
                    this.reconnectFailureCount = 0;
                    console.info("Rov media connection Too Many Failures, exiting...")
                } else if (this.mediaConnections.length === 0) {
                    this.start() // start over with one dataConnection
                }
            }
        }
    }

    switchOutThisPeer(thisPeer) {
        this.peer = thisPeer

        // setup data connection machine/s
        let dc = new DataConnectionMachine(this.peer, this.rovPeerId, this.dcStateChange.bind(this), this.onMesssageRecivedCallback)
        this.dataConnections = [...this.dataConnections, dc];
        dc.start()

        // setup media connection machine/s
        let mc = new MediaConnectionMachine(this.peer, this.rovPeerId, this.mcStateChange.bind(this))
        this.mediaConnections = [...this.mediaConnections, mc] /// --- change
        mc.start()
    }

    cleanup() {
        this.dataConnections.forEach((dc) => {
            dc.sendEventToMachine("ON_DESTROY");
        })

        this.mediaConnections.forEach((mc) => {
            mc.sendEventToMachine("ON_DESTROY");
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


    currentTargetRovId = getROVName(0);
    ourPeer = []
    reconnectFailureCount = 0;
    onMessageRecivedCallback = (msg) => { console.info("msg recived:" + msg) }

    constructor() { }

    start() {
        if (this.ourPeer.length == 0) {
            let newPeer = new OurPeerMachine(this.peerConnStateChange.bind(this))
            this.ourPeer = [newPeer];
            newPeer.start()
        }
    }

    peerConnStateChange() {
        let states = this.ourPeer.map((peer) => { return peer.currentState })
        console.log("PeerStatesChange: ", states)

        let connectedCount = 0;
        for (let i = 0; i < states.length; i++) {
            const stateName = states[i];

            let newPeer = null;
            if (stateName == "Connected") {
                if (connectedCount > 0) {
                    this.ourPeer[i].cleanup();
                    this.ourPeer.splice(i, 1)
                } else {
                    this.connectToRov(this.currentTargetRovId);
                }
                this.reconnectFailureCount = 0;
                connectedCount++;
            } else if (stateName == "Reconnecting" && states.length <= 1) {
                newPeer = new OurPeerMachine(this.peerConnStateChange.bind(this))
                this.ourPeer = [...this.ourPeer, newPeer];
            } else if (stateName == "Destroyed") {
                this.reconnectFailureCount++;
                // let oldPeer = this.ourPeer[i];
                this.ourPeer.splice(i, 1);
                if (this.reconnectFailureCount >= 3) {
                    this.reconnectFailureCount = 0;
                    console.log("Our Peer Too Many Failures, exiting...")
                } else if (this.ourPeer.length === 0) {
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

    }

    rovConnStateChange(state, rovId) {
        if (rovId == this.currentTargetRovId) {
            console.log("RovConnStateChange: ", state)
        }
    }

    connectToRov(rovPeerId) {
        let rovConn = this.ROVs[rovPeerId];
        if (rovConn === undefined) {
            rovConn = this.ROVs[rovPeerId] = new RovConnection(rovPeerId, this.ourPeer[0], this.onMessageRecivedCallback.bind(this), this.rovConnStateChange.bind(this))
        }
        rovConn.start();
    }

    disconnectFromRov(rovPeerId) {
        this.ROVs[rovPeerId].cleanup();
        delete this.ROVs[rovPeerId];
    }

    sendMessageToRov(msg, rovPeerId) {
        this.ROVs[rovPeerId].sendMessage(msg)
    }

    sendMessageToCurrentRov(msg) {
        this.sendMessageToRov(msg, this.currentTargetRovId)
    }
}
