import { ConnectionStates, DECODE_TXT, ENCODE_TXT } from './consts';
import type { nStoreT } from './libraries/nStore';
import nStore from './libraries/nStore';
// import SimplePeer from '@thaunknown/simple-peer/full';
import SimplePeer from 'simple-peer';

enum SimplePeerErrorCodes {
    ERR_WEBRTC_SUPPORT = 'ERR_WEBRTC_SUPPORT',
    ERR_CREATE_OFFER = 'ERR_CREATE_OFFER',
    ERR_CREATE_ANSWER = 'ERR_CREATE_ANSWER',
    ERR_SET_LOCAL_DESCRIPTION = 'ERR_SET_LOCAL_DESCRIPTION',
    ERR_SET_REMOTE_DESCRIPTION = 'ERR_SET_REMOTE_DESCRIPTION',
    ERR_ADD_ICE_CANDIDATE = 'ERR_ADD_ICE_CANDIDATE',
    ERR_ICE_CONNECTION_FAILURE = 'ERR_ICE_CONNECTION_FAILURE',
    ERR_SIGNALING = 'ERR_SIGNALING',
    ERR_DATA_CHANNEL = 'ERR_DATA_CHANNEL',
    ERR_CONNECTION_FAILURE = 'ERR_CONNECTION_FAILURE'
}

interface SimplePeerError {
    code: SimplePeerErrorCodes
}

export class SimplePeerConnection {

    // timestamp in ms which is updated whenever a message is recived from another participant.
    lastMsgRecivedTimestamp: number;
    // subscribe to get updates on the state of the webrtc connection overall.
    connectionState = nStore<ConnectionStates>(ConnectionStates.init); // TODO
    // subscribe to get new data messages as they are recived from the rov each message is an array of bytes.
    latestRecivedDataMessage = nStore<Uint8Array | null>(null);
    // subscribe to get notified when the simplepeer connection is sending out a new signaling message to establish or maintain a connection.
    // thses messages should be sent to the other party via a already established side channel like a livekit or websocket data connection.
    outgoingSignalingMessages = nStore<string | null>(null);
    // the current video track being sent/recived through simplepeer.
    currentVideoStream = nStore<MediaStream | null>(null);

    // the simplepeer instance used for this connection.
    _p: SimplePeer;
    // a queue of messages to be sent out over the data channel.
    _msgSendQueue: ArrayBufferLike[] = [];
    // how many times we have attempted to reconnect to the livekit server after a disconnect (resets on successful reconnect)
    _reconnectAttemptCount: number;
    // flag used durring shutdown/cleanup to stop it from automatically reconnecting
    _shouldReconnect: boolean;

    constructor() { }

    async start(simplePeerOpts: any, autoReconnect: boolean = true) {
        this._shouldReconnect = autoReconnect;
        simplePeerOpts = Object.assign({}, simplePeerOpts, SimplePeer.config);
        this._p = new SimplePeer(simplePeerOpts);
        this._p._debug = (...args: any[]) => console.debug("SIMPLEPEER DEBUG: " + args[0], ...args.slice(1));
        this._reconnectAttemptCount = 0;

        this.connectionState.set(ConnectionStates.connecting);

        this._p.on('signal', (signalData: Object) => {
            console.info("SIMPLEPEER: signal out", signalData)
            this.outgoingSignalingMessages.set(JSON.stringify(signalData));
        })

        this._p.on('connect', () => {
            // wait for 'connect' event before using the data channel
            console.count("SIMPLEPEER: Connected")
            this._emptyMsgQueue();
            this._reconnectAttemptCount = 0;
            this.connectionState.set(ConnectionStates.connected);
        })

        this._p.on('data', data => {
            // got a data channel message
            console.log('SIMPLEPEER: got a dc message: ', data)
            this.lastMsgRecivedTimestamp = Date.now();
            this.latestRecivedDataMessage.set(data);
        })

        this._p.on('stream', (stream: MediaStream) => {
            // got remote video stream, now let's show it in a video tag
            console.info('SIMPLEPEER: got video stream: ', stream)
            this.currentVideoStream.set(stream);
            for (let track of stream.getTracks()) {
                if (track.kind === 'video') {
                    track.onmute = () => this.currentVideoStream.set(null);
                    track.onunmute = () => this.currentVideoStream.set(stream);
                    track.onended = () => this.currentVideoStream.set(null);
                    break;
                }
            }
        })

        // Called when the peer connection has closed.
        this._p.on('close', () => {
            console.log('SIMPLEPEER: connection closed')
            this.currentVideoStream.set(null);
            if (!this._shouldReconnect) {
                this.connectionState.set(ConnectionStates.disconnectedOk);
            }
        })


        // Fired when a fatal error occurs. Usually, this means bad signaling data was received from the remote peer.
        this._p.on('error', (err: SimplePeerError) => {
            console.error('SIMPLEPEER: error ', err)
            this.currentVideoStream.set(null);
            if (this._shouldReconnect) {
                this.connectionState.set(ConnectionStates.reconnecting);
                this._reconnectAttemptCount++;
                if (this._reconnectAttemptCount < 10) {
                    setTimeout(() => {
                        this._p.reconnect();
                    }, 2000);
                    return
                } else {
                    console.error('SIMPLEPEER: failed to reconnect after 10 attempts, giving up.')
                }
            }
            this._p.destroy();
            this.connectionState.set(ConnectionStates.failed);
        })
    }

    stop() {
        this.connectionState.set(ConnectionStates.disconnectedOk);
        this.currentVideoStream.set(null);
        this._shouldReconnect = false;
        if (this._p) this._p.destroy();
    }

    ingestSignalingMsg(signalingMsg: string) {
        try {
            const signal = JSON.parse(signalingMsg);
            if (this._p.destroyed) return;
            console.info("SIMPLEPEER: signal in", signal)
            this._p.signal(signal)
        } catch (err) {
            console.warn("failed to parse & ingest simplepeer signalling message: ", signalingMsg, err.message)
        };
    }

    sendMessage(data: ArrayBufferLike) {
        this._msgSendQueue.push(data)
        this._emptyMsgQueue();
    }

    _emptyMsgQueue() {
        if (!this._p || !this._p.connected) return false;
        const len = this._msgSendQueue.length
        while (this._msgSendQueue.length > 0) {
            const msg = this._msgSendQueue.shift() as ArrayBufferLike;
            try {
                this._p.send(msg);
            } catch (err) {
                console.error("failed to send message over simplepeer data channel: ", err.message)
                this._msgSendQueue.unshift(msg);
            }
        }
    }
}
