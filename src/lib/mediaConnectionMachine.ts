
import type Peer from "peerjs";
import type { MediaConnection } from "peerjs";
import type { EventHandlerStore } from "./consts";
import { rovVideoStream } from "./globalContext";
import { ConnectionState } from "./consts";

const FROZEN_VIDEO_TIMEOUT = 6000;

export class MediaConnectionMachine {
    closed: boolean = false;
    rovPeerId: string = null;
    currentPeer: Peer = null;
    lastRecivedFrameTime: number = 0;
    frozenVideoTimeoutId: number = null; //
    mediaChannel: MediaConnection = null;
    mainTrack: MediaStreamTrack = null;
    currentState: ConnectionState = ConnectionState.disconnected;
    onStateChange: (c: ConnectionState) => void;
    eventHandlers: EventHandlerStore = null;

    constructor(currentPeer, rovPeerId, onStateChangeCallback) {
        this.onStateChange = onStateChangeCallback;
        this.currentPeer = currentPeer;
        this.rovPeerId = rovPeerId;
        this.mediaChannel = null
    }

    setCurrentPeer(currentPeer) {
        this.currentPeer = currentPeer;
    }

    restart() {
        if (!this.closed) {
            this._changeState(ConnectionState.reconnecting);
            this.cleanup();
            this.start();
        }
    }

    start() {
        if (this.closed || this.eventHandlers != null) {
            console.warn("Start() called on running MediaConnectionMachine");
            return;
        }
        this.eventHandlers = {};
        console.info("Waiting for " + this.rovPeerId + " to media call us...")

        // setup the connection event listeners:
        this.eventHandlers['onCall'] = (mediaChannel) => {
            window.clearTimeout(this.frozenVideoTimeoutId);

            // ignore calls that did not come from the current rov:
            console.info(mediaChannel.peer + " media called us!")
            if (this.mediaChannel && this.mediaChannel.peer != this.rovPeerId) return;
            console.info(mediaChannel.peer + " media called us- acceping!")

            // close out any old connection
            if (this.mediaChannel) this.cleanup();
            this.eventHandlers = {};
            this.mediaChannel = mediaChannel;

            // answer the call
            mediaChannel.answer();

            // get event listeners fror when a video/audio stream is recieved
            console.log('streamb4', this.eventHandlers)
            mediaChannel.on('stream', this.eventHandlers['onStream'] = (videoStream) => {
                rovVideoStream.set(videoStream);
                this.mainTrack = videoStream.getVideoTracks()[0];
                this._changeState(ConnectionState.connected);

                this.mainTrack.addEventListener("mute", this.eventHandlers['onStreamMute'] = () => {
                    console.info("Frozen video stream timeout started!");
                    this.frozenVideoTimeoutId = setTimeout(() => {
                        console.info("Frozen video stream timeout reached!");
                        this.cleanup();
                    }, FROZEN_VIDEO_TIMEOUT)
                });

                this.mainTrack.addEventListener("unmute", this.eventHandlers['onStreamUnMute'] = () => {
                    console.info("Frozen video stream timeout cleared!");
                    clearTimeout(this.frozenVideoTimeoutId);
                });
            });

            mediaChannel.on('error', this.eventHandlers['onError'] = (e) => {
                console.log("MediaChannel Error: ", e)
                this.restart();
            });

            mediaChannel.on('close', this.eventHandlers['onClose'] = (e) => {
                this.restart();
            });

        }
        this.currentPeer.on('call', this.eventHandlers['onCall']);
    }

    cleanup() {
        console.debug("Cleaning up media connection", this.rovPeerId, this.frozenVideoTimeoutId);
        if (!this.eventHandlers) return;
        if (this.currentPeer) {
            this.currentPeer.off('call', this.eventHandlers['onCall']);
        }
        if (this.mediaChannel) {
            this.mediaChannel.off('stream', this.eventHandlers['onStream']);
            this.mediaChannel.off('error', this.eventHandlers['onError']);
            this.mediaChannel.off('close', this.eventHandlers['onClose']);
            this.mediaChannel.close();
            this.mediaChannel = null;
        }
        if (this.mainTrack) {
            this.mainTrack.removeEventListener("mute", this.eventHandlers['onStreamMute']);
            this.mainTrack.removeEventListener("unmute", this.eventHandlers['onStreamMute']);
            // this.mainTrack.ended = true;
            this.mainTrack = null;
        }
        this.eventHandlers = null;
    }

    close() {
        this.closed = true;
        this.cleanup();
    }

    _changeState(newState: ConnectionState) {
        if (this.currentState != newState) {
            this.currentState = newState;
            this.onStateChange(newState);
        }
    }

}


//
