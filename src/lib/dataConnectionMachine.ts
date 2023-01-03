import type Peer from "peerjs";
import type { DataConnection } from "peerjs";
// import { PeerErrorType } from "peerjs";
import type { EventHandlerStore } from "./consts";
import { ConnectionState } from "./consts";

const INITIAL_CONNECTION_TIMEOUT = 12000; // 12 seconds
const CONNECTION_TIMEOUT = 2000; // 1.5 seconds
const RETRY_CONNECTION_TIMEOUT = 5000; // 5 seconds

// FOR CONVERTING TEXT TO/FROM BINARY FOR SENDING OVER THE WEBRTC DATACHANNEL
const messageEncoder = new TextEncoder(); // always utf-8
const messageDecoder = new TextDecoder(); // always utf-8

export class DataConnectionMachine {
    closed: boolean = false;
    rovPeerId: string = null;
    currentPeer: Peer = null;
    dataConnection: DataConnection = null;
    lastRecivedMessageTime = 0;
    connectionTimeoutId: number = -1;
    currentState: ConnectionState = ConnectionState.disconnected;
    onMessageRecived: (msg: Uint8Array) => void;
    onStateChange: (c: ConnectionState) => void;
    eventHandlers: EventHandlerStore = null;

    constructor(currentPeer, rovPeerId, onMessageRecivedCallback, onStateChangeCallback) {
        this.onMessageRecived = onMessageRecivedCallback;
        this.onStateChange = onStateChangeCallback;
        this.currentPeer = currentPeer;
        this.rovPeerId = rovPeerId;
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
            console.warn("start called on running DataConnectionMachine");
            return;
        }
        this.eventHandlers = {};

        // connect to the rov
        this._changeState(ConnectionState.connecting);
        console.info("Connecting to rov peer: " + this.rovPeerId)
        this.dataConnection = this.currentPeer.connect(this.rovPeerId, {
            reliable: true,
            serialization: 'none',
        });

        if (!this.dataConnection) {
            console.warn("Failed to connect to peer: " + this.rovPeerId);
            this.connectionTimeoutId = window.setTimeout(() => {
                this.restart();
            }, INITIAL_CONNECTION_TIMEOUT);
            return;
        }

        // setup a timeout in case the connection takes too long
        this.connectionTimeoutId = window.setTimeout(() => {
            this.restart();
        }, INITIAL_CONNECTION_TIMEOUT);
        console.log("Setting connection timeout", this.connectionTimeoutId);

        // setup the connection event listeners:
        this.dataConnection.on('open', this.eventHandlers['onOpen'] = () => {
            console.info("DataConnection Open!");
            this._changeState(ConnectionState.connected);
            this.resetConnectionTimeout(); // reset the timeout because the connection is open
        });


        this.dataConnection.on('iceStateChanged', this.eventHandlers['onIceChange'] = (e) => {
            console.info("DATACHANNEL_ICE_CHANGE:", e);
        });

        this.dataConnection.on('error', this.eventHandlers['onError'] = (err) => {
            console.warn("!!!UNHANDLED!! DATACHANNEL_ERROR:", err);
            this.restart();
        });

        this.dataConnection.on('close', this.eventHandlers['onClose'] = () => {
            console.warn("!!UNHANDLED!! DATACHANNEL_CLOSE:");
            this.restart();
        });

        this.currentPeer.on('error', this.eventHandlers['onPeerError'] = (err) => {
            if (err.type == "peer-unavailable")  // setup a timeout to retry in a few seconds if the rov can't be found
                this.connectionTimeoutId = window.setTimeout(() => {
                    this.restart();
                }, CONNECTION_TIMEOUT);
        })

        this.dataConnection.on('data', this.eventHandlers['onData'] = (encodedMessage) => {
            this._changeState(ConnectionState.connected);
            this.resetConnectionTimeout();
            // const message = messageDecoder.decode(encodedMessage);
            this.onMessageRecived(encodedMessage)
        });
    }

    resetConnectionTimeout() {
        window.clearTimeout(this.connectionTimeoutId);
        this.connectionTimeoutId = setTimeout(() => {
            this._changeState(ConnectionState.reconnecting);
            this.connectionTimeoutId = setTimeout(() => {
                this.restart();
            }, RETRY_CONNECTION_TIMEOUT);
        }, CONNECTION_TIMEOUT);
    }

    sendMessage(msgBytes: Uint8Array) {
        if (this.dataConnection && this.dataConnection.open && this.currentState == ConnectionState.connected) {
            // const encodedMessage = messageEncoder.encode(msg);
            this.dataConnection.send(msgBytes);
            return true;
        }
        return false
    }

    cleanup() {
        console.debug("Cleaning up data connection", this.rovPeerId, this.connectionTimeoutId);
        window.clearTimeout(this.connectionTimeoutId)
        if (!this.eventHandlers) return;
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
