// @ts-ignore
import { generateStateChangeFunction } from "./util";
import { createMachine, interpret } from "xstate";
import { get } from "svelte/store";
import { debugPageModeActive, rovMainVideoTrack, rovVideoStream } from "./globalContext";
import { showToastMessage } from "./ui";

// FOR CONVERTING TEXT TO/FROM BINARY FOR SENDING OVER THE WEBRTC DATACHANNEL
// @ts-ignore
const messageEncoder = new TextEncoder(); // always utf-8
// @ts-ignore
const messageDecoder = new TextDecoder(); // always utf-8


export class MediaConnectionMachine {
    eventHandlers = {};
    currentPeer = null;
    connectionTimeout;    /** @type NodeJS.Timeout */
    runningMachine = null;
    mediaChannel = null;
    mainTrack = null;
    // @ts-ignore
    onStateChangeCallback = (state) => { };
    lastRecivedFrameTime = 0;

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


    constructor(currentPeer, rovPeerId, onStateChangeCallback) {
        this.currentState = this.xstateMachineLayout.config.initial;
        this.onStateChangeCallback = onStateChangeCallback;
        this.currentPeer = currentPeer;
        this.rovPeerId = rovPeerId;
        this.mediaChannel = null
    }

    start() {
        this.runningMachine = interpret(this.xstateMachineLayout, { devTools: debugPageModeActive.get() })
        this.runningMachine.onTransition((e) => {
            if (this.currentState == e.value) return;
            this.currentState = e.value;
            this.onStateChangeCallback(this.currentState)
        })
        this.runningMachine.start();

        // connect to the rov
        console.info("Waiting for rov peer to call: " + this.rovPeerId)

        // setup the connection event listeners:
        this.eventHandlers['onCall'] = (mediaChannel) => {
            console.info("Rov peer called us, answering call")
            if (this.mediaChannel) {
                console.warn("Already have a media channel, closing it")
                this.cleanupMediaChannel();
            }
            this.mediaChannel = mediaChannel;
            mediaChannel.answer();

            this.eventHandlers['onStream'] = (rovVidStream) => {
                rovVideoStream.set(rovVidStream);
                this.sendEventToMachine('ON_CONNECTED');
                this.mainTrack = rovVidStream.getVideoTracks()[0];
                console.log("MediaChannel got Stream: ", rovVidStream, this.mainTrack)


                // this.mainTrack.onmute = (e) => { //https://stackoverflow.com/questions/69537765/how-to-detect-a-frozen-video-stream-in-webrtc
                //     console.info("Track Muted: " + e)
                // }

                // this.mainTrack.onunmute = (e) => { //https://stackoverflow.com/questions/69537765/how-to-detect-a-frozen-video-stream-in-webrtc
                //     console.info("Track UnMuted: " + e)
                // }

                // setInterval(() => {
                //     if (!rovVideoStream) return;
                //     rovVideoStream.getVideoTracks().forEach(videoTrack => {
                //         if (videoTrack.readyState != "live" || this.mainTrack.muted) {
                //             console.log("VFrozen video stream detected!");
                //         }
                //     });
                // }, 300);

                // setInterval(() => {
                //     console.info("MediaChannel: ", mediaChannel)
                // }, 1000);


                this.eventHandlers['onStreamMute'] = () => {
                    // showToastMessage("Frozen video stream detected!", 1000);
                    console.count("MediaChannel: onStreamMute")
                };
                this.mainTrack.addEventListener("mute", this.eventHandlers['onStreamMute']);

                rovVideoStream.set(rovVidStream);
                // rovMainVideoTrack.set(this.mainTrack);

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
        console.log("calll handler setup: ", this.currentPeer)
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
        // this.currentPeer.off('call', this.eventHandlers['onCall']);

        this.connectionTimeout = undefined;
        this.disconnectPollInterval = setInterval(() => {
            //     let connected = true;/// (Date.now() - this.lastRecivedFrameTime) < 500;
            //     if (connected && this.connectionTimeout != undefined) {
            //         clearTimeout(this.connectionTimeout)
            //         this.connectionTimeout = undefined;
            //     } else if (!connected && this.connectionTimeout == undefined) {
            //         this.sendEventToMachine('ON_DISCONNECTED');
            //         this.connectionTimeout = setTimeout(() => {
            //             this.sendEventToMachine('ON_DESTROY');
            //         }, 8000); // 8 seconds
            //     }
        }, 1000)
    }

    cleanupMediaChannel() {
        if (this.mediaChannel) {
            this.mediaChannel.off('stream', this.eventHandlers['onStream']);
            this.mediaChannel.off('error', this.eventHandlers['onError']);
            this.mediaChannel.off('close', this.eventHandlers['onClose']);
            this.mediaChannel.close();
        }
        if (this.mainTrack) {
            this.mainTrack.removeEventListener("mute", this.eventHandlers['onStreamMute']);
            this.mainTrack.ended = true;
        }
    }

    cleanup() {
        clearTimeout(this.connectionTimeout)
        clearTimeout(this.disconnectPollInterval)
        this.runningMachine.stop()
        this.currentState = "Destroyed"
        this.onStateChangeCallback(this.currentState)
        if (!this.eventHandlers) return;
        if (this.currentPeer) {
            this.currentPeer.off('call', this.eventHandlers['onCall']);
        }
        this.cleanupMediaChannel();
        this.eventHandlers = null;
    }

}


//