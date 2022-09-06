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

export class MediaConnectionMachine {
    eventHandlers = {};
    currentPeer = null;
    connectionTimeout;    /** @type NodeJS.Timeout */
    runningMachine = null;
    mediaChannel = null;
    mainTrack = null;
    onStateChangeCallback = (state) => { };
    lastRecivedFrameTime = 0;

    xstateMachineLayout = createMachine({
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
        this.currentState = this.xstateMachineLayout.config.initial;
        this.onStateChangeCallback = onStateChangeCallback;
        this.onMessageRecivedCallback = onMessageRecivedCallback;
        this.currentPeer = currentPeer;
        this.rovPeerId = rovPeerId;
    }

    start() {
        this.runningMachine = interpret(this.xstateMachineLayout, { devTools: get(debugXstateMode) })
        this.runningMachine.onTransition((e) => { this.currentState = e.value; this.onStateChangeCallback(this.currentState) })
        this.runningMachine.start();

        // connect to the rov
        console.info("Waiting for rov peer to call: " + this.rovPeerId)

        // setup the connection event listeners:
        this.eventHandlers['onCall'] = (mediaChannel) => {
            this.eventHandlers['onStream'] = (stream) => {
                this.mainTrack = stream;

                stream.onmute((e) => { //https://stackoverflow.com/questions/69537765/how-to-detect-a-frozen-video-stream-in-webrtc
                    console.info("Stream Muted: " + e)
                })
                console.log("MediaChannel got Stream: ", stream)
                this.sendEventToMachine('ON_CONNECTED');
            };
            mediaChannel.on('stream', this.eventHandlers['onStream']);

            this.eventHandlers['onError'] = (e) => {
                console.log("MediaChannel Error: ", e)
                this.sendEventToMachine('ON_DESTROY');
            };
            mediaChannel.on('error', this.eventHandlers['onError']);

            this.eventHandlers['onClose'] = () => {
                this.sendEventToMachine('ON_DESTROY');
            };
            mediaChannel.on('close', this.eventHandlers['onClose']);
        }
        this.currentPeer.on('call', this.eventHandlers['onCall']);

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
            let connected = true;/// (Date.now() - this.lastRecivedFrameTime) < 500;
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

    cleanup() {
        clearTimeout(this.connectionTimeout)
        clearTimeout(this.disconnectPollInterval)
        this.runningMachine.stop()
        this.currentState = "Destroyed"
        this.onStateChangeCallback(this.currentState)
        this.currentPeer.off('call', this.eventHandlers['onCall']);
        if (this.mediaChannel) {
            this.mediaChannel.off('stream', this.eventHandlers['onStream']);
            this.mediaChannel.off('error', this.eventHandlers['onError']);
            this.mediaChannel.off('close', this.eventHandlers['onClose']);
            this.mediaChannel.close();
        }
        // if (this.mainTrack) {
        //     this.mainTrack.removeEventListener("onmute", this.eventHandlers['onStreamMute']);
        //     this.mainTrack.removeEventListener("ended")
        //     this.mainTrack.ended = true;
        // }
        this.eventHandlers = null;
    }

}


//
