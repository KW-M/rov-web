import { generateStateChangeFunction } from "./util";
import { createMachine, interpret } from "xstate";
import { get } from "svelte/store";
import { debugXstateMode } from "./globalContext";

// FOR CONVERTING TEXT TO/FROM BINARY FOR SENDING OVER THE WEBRTC DATACHANNEL
const messageEncoder = new TextEncoder(); // always utf-8
const messageDecoder = new TextDecoder(); // always utf-8

// debug
let showToastMessage = (msg) => {
    console.info("Toast: " + msg)
}

export class DataConnectionMachine {
    eventHandlers = {};
    currentPeer = null;
    rovPeerId = null;
    currentState = null
    connectionTimeout;    /** @type NodeJS.Timeout */
    runningMachine = null;
    lastRecivedMessageTime = 0;
    onStateChangeCallback = (state) => { };
    onMessageRecivedCallback = (msg) => { };

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
            "onConnectingFunction": this.onConnecting.bind(this),
            "onConnectedFunction": this.onConnected.bind(this),
            "onDestoyedFunction": this.cleanup.bind(this)
        }
    })


    constructor(currentPeer, rovPeerId, onStateChangeCallback, onMessageRecivedCallback) {
        this.currentState = null //this.xstateMachineLayout.config.initial;
        this.onStateChangeCallback = onStateChangeCallback;
        this.onMessageRecivedCallback = onMessageRecivedCallback;
        this.currentPeer = currentPeer;
        this.rovPeerId = rovPeerId;
        console.log("DataConnectionMachine created")
    }

    start() {
        this.runningMachine = interpret(this.xstateMachineLayout, { devTools: get(debugXstateMode) })
        this.runningMachine.onTransition((e) => {
            if (this.currentState == e.value) return;
            this.currentState = e.value;
            this.onStateChangeCallback(this.currentState)
        })
        this.runningMachine.start();

        this.dataConnection = this.currentPeer.connect(this.rovPeerId, {
            reliable: true,
            serialization: 'none',
        });

        // connect to the rov
        console.info("connecting to rov peer: " + this.rovPeerId)

        // setup the connection event listeners:
        this.eventHandlers['onOpen'] = () => { this.sendEventToMachine('ON_CONNECTED'); showToastMessage("Rov datachannel Open!"); };
        this.dataConnection.on('open', this.eventHandlers['onOpen']);

        this.eventHandlers['onError'] = (err) => { console.warn("!!!UNHANDLED!! DATACHANNEL_ERROR:", err); this.sendEventToMachine("ON_DESTROY") };
        this.dataConnection.on('error', this.eventHandlers['onError']);

        this.eventHandlers['onClose'] = (event) => { console.warn("!!UNHANDLED!! DATACHANNEL_CLOSE:", event); this.sendEventToMachine("ON_DESTROY") };
        this.dataConnection.on('close', this.eventHandlers['onClose']);

        this.eventHandlers['onPeerError'] = (err) => { if (err.type == "peer-unavailable") { this.sendEventToMachine("ON_DESTROY") } };
        this.currentPeer.on('error', this.eventHandlers['onPeerError']);

        this.eventHandlers['onData'] = (encodedMessage) => {
            this.lastRecivedMessageTime = Date.now();
            this.sendEventToMachine("ON_CONNECTED");
            const message = messageDecoder.decode(encodedMessage);
            this.onMessageRecivedCallback(message)
        };
        this.dataConnection.on('data', this.eventHandlers['onData']);
    }

    sendEventToMachine(eventName) {
        if (this.runningMachine) {
            this.runningMachine.send(eventName)
        }
    }

    onConnecting() {
        // setup a timeout in case the connection takes too long
        this.connectionTimeout = setTimeout(() => {
            this.sendEventToMachine('ON_DESTROY');
        }, 8000); // 8 seconds
    }

    onConnected() {
        clearInterval(this.disconnectPollInterval)
        clearTimeout(this.connectionTimeout)
        this.connectionTimeout = undefined;

        this.disconnectPollInterval = setInterval(() => {
            let connected = (Date.now() - this.lastRecivedMessageTime) < 1500;
            if (connected && this.connectionTimeout != undefined) {
                clearTimeout(this.connectionTimeout)
                this.connectionTimeout = undefined;
            } else if (!connected && this.connectionTimeout == undefined) {
                this.sendEventToMachine('ON_DISCONNECTED');
                this.connectionTimeout = setTimeout(() => {
                    this.sendEventToMachine('ON_DESTROY');
                }, 8000); // 8 seconds
            }
        }, 1000)
    }

    sendMessage(msg) {
        if (this.dataConnection && this.currentState == "Connected") {
            const encodedMessage = messageEncoder.encode(msg);
            return this.dataConnection.send(encodedMessage) || true;
        } else {
            return false
        }
    }

    cleanup() {
        clearTimeout(this.connectionTimeout)
        clearTimeout(this.disconnectPollInterval)
        this.runningMachine.stop()
        this.currentState = "Destroyed"
        this.onStateChangeCallback(this.currentState)
        if (this.currentPeer) {
            this.currentPeer.off('error', this.eventHandlers['onPeerError']);
        }
        if (this.dataConnection) {
            this.dataConnection.off('open', this.eventHandlers['onOpen']);
            this.dataConnection.off('error', this.eventHandlers['onError']);
            this.dataConnection.off('close', this.eventHandlers['onClose']);
            this.dataConnection.off('data', this.eventHandlers['onData']);
            this.dataConnection.close();
        }
        this.eventHandlers = null;
    }

}


//
