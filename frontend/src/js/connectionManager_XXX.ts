
import { get } from "svelte/store"
import { ConnectionState } from "./consts"
import { ourPeerId, peerServerConnState, rovDataChannelConnState, rovPeerIdEndNumber, rovVideoStreamConnState } from "./globalContext"
import { OurPeerMachine } from "./ourPeerMachine_XXX"
import { getROVName } from "./rovUtil"
import { showToastMessage } from "./ui"
import { RovConnection } from "./rovConnection_XXX"
import { rovMessageHandler } from "./rovMessageHandler"
import { RovActions } from "./rovActions"




export class ConnectionManagerClass {
    ROVs: { [rovId: string]: RovConnection } = {};
    currentTargetRovId: string = getROVName(rovPeerIdEndNumber.get());
    ourPeerMachines: OurPeerMachine[] = []
    overallPeerServerState: ConnectionState = ConnectionState.disconnected;
    reconnectFailureCount: number = 0;
    onMessageRecivedCallback = (msg: Uint8Array) => { console.debug("msg recived:" + msg) }

    constructor(onMessageRecivedCallback: (msg: Uint8Array) => void) {
        this.onMessageRecivedCallback = onMessageRecivedCallback;
    }

    start() {
        if (this.ourPeerMachines.length !== 0) return;
        const newPeerMachine = new OurPeerMachine(this.peerConnStateChange.bind(this))
        this.ourPeerMachines = [newPeerMachine];
        newPeerMachine.start()
    }

    getThisPeerId() {
        return ourPeerId.get()
    }

    peerConnStateChange() {
        let states = this.ourPeerMachines.map((peerMachine) => { return peerMachine.currentState })
        console.debug("PeerStatesChange: ", states)

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
            }

            // else if (stateName == ConnectionState.reconnecting && states.length <= 1) {
            //     newPeer = new OurPeerMachine(this.peerConnStateChange.bind(this))
            //     this.ourPeerMachines = [...this.ourPeerMachines, newPeer];
            // } else if (stateName == "Destroyed") {
            //     this.reconnectFailureCount++;
            //     // let oldPeer = this.ourPeer[i];
            //     this.ourPeerMachines.splice(i, 1);
            //     if (this.reconnectFailureCount >= 3) {
            //         this.reconnectFailureCount = 0;
            //         showToastMessage("Our Peer has Too Many Failures, try reloading the page...")
            //     } else if (this.ourPeerMachines.length === 0) {
            //         this.start() // start over with one peer
            //     }
            // }

            // if (newPeer) {
            //     newPeer.start()
            //     for (const rovId in this.ROVs) {
            //         const switchOutThisPeer = this.ROVs[rovId].switchOutThisPeer;
            //         if (switchOutThisPeer) switchOutThisPeer(newPeer)
            //     }
            // }
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
        // console.info(rovId + " Conn State: dc:" + overallDCState + " mc:" + overallMCState)
        if (rovId == this.currentTargetRovId) {
            rovDataChannelConnState.set(overallDCState);
            rovVideoStreamConnState.set(overallMCState);
            if (overallDCState == ConnectionState.connected) {
                RovActions.refreshAllSensorData();
                // begin_video_stream();
            }
        }
    }

    messageRecived(msg: Uint8Array, rovId) {
        if (rovId === this.currentTargetRovId) {
            this.onMessageRecivedCallback(msg)
        } else {
            console.warn("Message Recived from wrong ROV Peer " + rovId, msg)
        }
    }

    connectToRov(rovPeerId) {
        if (!this.ROVs[rovPeerId]) {
            this.ROVs[rovPeerId] = new RovConnection(rovPeerId, this.ourPeerMachines[0], this.messageRecived.bind(this), this.rovConnStateChange.bind(this))
        }
        this.ROVs[rovPeerId].start();
    }

    connectToCurrentTargetRov() {
        this.currentTargetRovId = getROVName(rovPeerIdEndNumber.get());
        this.connectToRov(this.currentTargetRovId);
    }

    disconnectFromRov(rovPeerId) {
        if (rovPeerId == this.currentTargetRovId) {
            rovDataChannelConnState.set(ConnectionState.disconnected);
            rovVideoStreamConnState.set(ConnectionState.disconnected);
        }
        if (this.ROVs[rovPeerId] === undefined) {
            console.warn("Tried to disconnect from a rov that is not connected: ", rovPeerId)
            return;
        }
        this.ROVs[rovPeerId].close();
        delete this.ROVs[rovPeerId];
    }

    disconnectFromCurrentRov() {
        this.disconnectFromRov(this.currentTargetRovId);
    }

    sendMessageToRov(msg, rovPeerId, skipQueue = false) {
        this.ROVs[rovPeerId].sendMessage(msg, null, skipQueue);
    }

    sendMessageToCurrentRov(msg, skipQueue = false) {
        this.sendMessageToRov(msg, this.currentTargetRovId, skipQueue)
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

export const connectionManager = new ConnectionManagerClass(rovMessageHandler.handleRecivedMessage.bind(rovMessageHandler));
