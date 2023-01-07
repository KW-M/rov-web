import { generateStateChangeFunction, getRandomName } from "./util";
// import { writable } from "svelte/store";
import { createMachine, interpret } from "xstate";
import { peerServerCloudOptions } from "./consts";
import Peer from "peerjs";
import { get } from "svelte/store";
import { debugPageModeActive, ourPeerId } from "./globalContext";
import { showToastMessage } from "./ui";



export class OurPeerMachine {

    eventHandlers = {};
    /** @type NodeJS.Timeout */
    connectionTimeout;
    runningMachine = null;
    peer = null;
    ourPeerId = null
    onStateChangeCallback = (state) => { }

    xstateMachineLayout = createMachine({
        predictableActionArguments: true,
        preserveActionOrder: true,
        "id": "DataConnection",
        "initial": "Connecting",
        "states": {
            "Connecting": {
                "entry": "onConnectingFunction",
                "on": {
                    "ON_CONNECTED": {
                        "target": "Connected",
                    },
                    "ON_DESTROY": {
                        "target": "Destroyed"
                    }
                }
            },
            "Reconnecting": {
                "entry": "onReConnectingFunction",
                "on": {
                    "ON_CONNECTED": {
                        "target": "Connected",
                    },
                    "ON_DESTROY": {
                        "target": "Destroyed"
                    }
                }
            },
            "Connected": {
                "entry": "onConnectedFunction",
                "on": {
                    "ON_DISCONNECTED": {
                        "target": "Reconnecting"
                    },
                    "ON_DESTROY": {
                        "target": "Destroyed"
                    }
                }
            },
            "Destroyed": {
                "entry": "onDestoyedFunction",
                "type": "final"
            }
        }
    }, {
        "actions": {
            "onConnectingFunction": () => { this.onConnecting() },
            "onReConnectingFunction": () => { this.onReConnecting() },
            "onConnectedFunction": () => { this.onConnected() },
            "onDestoyedFunction": () => { this.cleanup() }
        }
    })

    constructor(onStateChangeCallback) {
        this.currentState = this.xstateMachineLayout.config.initial
        this.onStateChangeCallback = onStateChangeCallback
    }

    start() {
        this.runningMachine = interpret(this.xstateMachineLayout, { devTools: debugPageModeActive.get() })
        this.runningMachine.onTransition((e) => { this.currentState = e.value; this.onStateChangeCallback(this.currentState) })
        this.runningMachine.start();

        // get our peerid
        this.ourPeerId = ourPeerId.get();
        if (!this.ourPeerId) {
            this.ourPeerId = getRandomName();
            localStorage.setItem('ourPeerId', this.ourPeerId); // save for future runs
            ourPeerId.set(this.ourPeerId);
        }

        // setup our peer
        let token = localStorage.getItem('peerToken');
        let peerOptions = token ? { ...peerServerCloudOptions, token } : peerServerCloudOptions;
        this.peer = new Peer(this.ourPeerId, peerOptions)
        console.log("Our PeerToken:", this.peer.options.token);
        if (!token && this.peer.options.token) localStorage.setItem('peerToken', this.peer.options.token);


        // setup the connection event listeners:
        this.eventHandlers['onOpen'] = () => { this.sendEventToMachine('ON_CONNECTED'); showToastMessage("OurPeer Open!"); };
        this.peer.on('open', this.eventHandlers['onOpen']);

        this.eventHandlers['onError'] = (err) => {
            if (err.type == "peer-unavailable") return; // ignore because this error will be handled by the dataConnectionMachine
            else if (err.type == "unavailable-id") {
                showToastMessage("peer id " + this.ourPeerId + " already taken")
                this.ourPeerId = getRandomName();
                ourPeerId.set(this.ourPeerId);
            } else if (err.type == "webrtc" && err.message.indexOf("No remoteDescription") == -1) {
                showToastMessage("Webrtc Error: " + err.message)
            } else {
                console.log("!!!UNHANDLED!! OURPEER_ERROR:" + err.message + " | " + err.type);
            }
            this.sendEventToMachine("ON_DESTROY")
        };
        this.peer.on('error', this.eventHandlers['onError']);

        this.eventHandlers['onClose'] = (event) => { console.warn("!!UNHANDLED!! OURPEER_CLOSE:", event); this.sendEventToMachine("ON_DESTROY") };
        this.peer.on('close', this.eventHandlers['onClose']);

        this.eventHandlers['onDisconnected'] = (event) => { console.warn("!!UNHANDLED!! OURPEER_CLOSE:", event); this.sendEventToMachine("ON_DISCONNECTED") };
        this.peer.on('disconnected', this.eventHandlers['onDisconnected']);
    }

    sendEventToMachine(eventName) {
        if (this.runningMachine) {
            this.runningMachine.send(eventName)
        }
    }

    onConnecting() {
        console.log("OnConnecting....");
        // setup a timeout in case the connection takes too long
        this.connectionTimeout = setTimeout(() => {
            this.sendEventToMachine('ON_DESTROY');
        }, 12000); // 12 seconds
    }

    onReConnecting() {
        console.log("OnReConnecting....");
        this.peer.reconnect();
        this.onConnecting();
    }

    onConnected() {
        clearTimeout(this.connectionTimeout)
        this.connectionTimeout = undefined;
    }

    cleanup() {
        clearTimeout(this.connectionTimeout)
        this.runningMachine.stop()
        this.currentState = "Destroyed"
        this.onStateChangeCallback(this.currentState)
        if (!this.peer) return;
        this.peer.off('open', this.eventHandlers['onOpen']);
        this.peer.off('error', this.eventHandlers['onError']);
        this.peer.off('close', this.eventHandlers['onClose']);
        this.peer.off('disconnected', this.eventHandlers['onDisconnected']);
        this.peer.destroy();
        this.peer = null;
    }

}
