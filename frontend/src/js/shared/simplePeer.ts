import { ConnectionStates, DECODE_TXT, ENCODE_TXT } from './consts';
import type { nStoreT } from './libraries/nStore';
import nStore from './libraries/nStore';
import SimplePeer from '@thaunknown/simple-peer';
import type SimplePeerT from 'simple-peer';
import { log, logDebug, logInfo, logWarn, logError } from "./logging"

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

let globalConnId = 0;

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
    remoteVideoStreams = nStore<Map<string, MediaStream | null>>(new Map());

    // the simplepeer instance used for this connection.
    _p: SimplePeerT.Instance;
    // the configuration used for the simplepeer instance.
    _spConfig: any = null;
    // a queue of messages to be sent out over the data channel.
    _msgSendQueue: ArrayBufferLike[] = [];
    // how many times we have attempted to reconnect to the livekit server after a disconnect (resets on successful reconnect)
    _reconnectAttemptCount: number;
    // flag used durring shutdown/cleanup to stop it from automatically reconnecting
    _shouldReconnect: boolean;
    // flag used to track if this side is the initiator (user) or not.
    _initiator: boolean = false;
    // the unique id of this connection.
    _connectionId: number = -1;
    // keeps track of how many signaling messages have been sent out.
    _signalMsgSendCounter: number = 0;
    // keeps track of how many signaling messages have been recived.
    _signalMsgRecivedCounter: number = 0;
    // keeps track of the js interval id used for the WebRTC GetStats call.
    _StatsGatherInterval: number;


    constructor() { }

    start(simplePeerOpts: any, autoReconnect: boolean = true, reconnectAttemptCount: number = 0) {
        this._shouldReconnect = autoReconnect;
        this._spConfig = Object.assign({}, simplePeerOpts, SimplePeer.config);
        logDebug("SP starting with opts: ", this._spConfig)
        if (this._spConfig.initiator) this._connectionId = globalConnId++;
        this._p = new SimplePeer(this._spConfig);
        this._p._debug = (...args: any[]) => logDebug("SIMPLEPEER DEBUG: " + args[0], ...args.slice(1));
        this._reconnectAttemptCount = reconnectAttemptCount;
        this._initiator = this._spConfig.initiator || false;
        this.connectionState.set(ConnectionStates.connecting);

        // this._StatsGatherInterval = setInterval(async () => {
        //     if (this._p) {
        //         const peerConnection = (this._p as any)._pc as RTCPeerConnection;
        //         const stats = await peerConnection.getStats(null)
        //         logDebug("SP stats: ", stats)
        //     }
        // }, 4000) as any as number;

        this._p.on('signal', (signalData: Object) => {
            this._signalMsgSendCounter++;
            if (this._connectionId === -1) return logWarn("SP sending signal message when connectionId is null, this should not happen!")
            signalData = Object.assign({}, signalData, { connId: this._connectionId, msgNum: this._signalMsgSendCounter });
            logDebug("SP signal out", signalData)
            this.outgoingSignalingMessages.set(JSON.stringify(signalData));
        })

        this._p.on('connect', () => {
            // wait for 'connect' event before using the data channel
            logInfo("SP Connected")
            this._emptyMsgQueue();
            this._reconnectAttemptCount = 0;
            this.connectionState.set(ConnectionStates.connected);
        })

        this._p.on('data', data => {
            // got a data channel message
            if (false) logDebug('SP got a dc message: ', data)
            this.lastMsgRecivedTimestamp = Date.now();
            this.latestRecivedDataMessage.set(data);
        })

        this._p.on('stream', (stream: MediaStream) => {
            // got remote video stream, now let's show it in a video tag
            logInfo('SP got video stream: ', stream)
            this.remoteVideoStreams.update((streams) => {
                streams.set(stream.id, stream);
                return streams;
            })
        })

        // Called when the peer connection has closed.
        this._p.on('close', () => {
            // this.resetConnectionStats(); // TODO: check if this is the right place to reset the connection stats.
            logWarn('SP connection closed')
            // this.remoteVideoStreams.set(new Map());
            // if (!this._shouldReconnect) {
            //     this.resetConnectionStats();
            //     this.connectionState.set(ConnectionStates.disconnectedOk);
            // }
            this.stop();
        })


        // Fired when a fatal error occurs. Usually, this means bad signaling data was received from the remote peer.
        this._p.on('error', (err: SimplePeerError) => {
            this.resetConnectionStats();
            logError('SP error ', err)
            this.remoteVideoStreams.set(new Map());
            this._shouldReconnect = false;
            clearInterval(this._StatsGatherInterval);

            // this.currentVideoStream.set(null);
            // if (this._shouldReconnect) {
            //     this.connectionState.set(ConnectionStates.reconnecting);
            //     this._reconnectAttemptCount++;
            //     if (this._reconnectAttemptCount < 10) {
            //         setTimeout(() => {
            //             if (!this._shouldReconnect) return;
            //             if (this._p && !this._p.destroyed && !this._p.destroying) {
            //                 this._p.reconnect();
            //             } else {
            //                 if (this._p) this._p.destroy();
            //                 this.start(simplePeerOpts, this._shouldReconnect, this._reconnectAttemptCount);
            //             }
            //         }, 2000);
            //         return
            //     } else {
            //         logError('SP failed to reconnect after 10 attempts, giving up.')
            //     }
            // }
            // this._p.destroy();
            this.connectionState.set(ConnectionStates.failed);
        })
    }

    resetConnectionStats() {
        this._connectionId = -1//Math.round(3600 * Math.random()).toString(36);
        this._signalMsgRecivedCounter = 0;
        this._signalMsgSendCounter = 0;
    }

    stop() {
        logDebug("SP Stop", this._connectionId, globalConnId, this._p?.destroyed, this._p?.destroying)
        this.resetConnectionStats();
        this.connectionState.set(ConnectionStates.disconnectedOk);
        this.remoteVideoStreams.set(new Map());
        this._shouldReconnect = false;
        clearInterval(this._StatsGatherInterval);
        if (this._p) this._p.destroy();
    }

    restart(connectionId?: number, signalingMsg?: string) {
        logDebug("SP Restart", this._connectionId, globalConnId, this._p?.destroyed, this._p?.destroying)
        this.stop();
        this._connectionId = connectionId || -1;
        this.start(this._spConfig, this._shouldReconnect, this._reconnectAttemptCount);
        if (signalingMsg) this.ingestSignalingMsg(signalingMsg);
    }

    ingestSignalingMsg(signalingMsg: string) {
        try {
            const signal = JSON.parse(signalingMsg);
            logInfo("SP signal in", signal, signal.connId, this._connectionId)
            if (this._p.destroyed) return this.restart(signal.connId, signalingMsg);
            if (this._connectionId === -1) this._connectionId = signal.connId;
            else if (signal.connId < this._connectionId) {
                log("SP Err Older Remote ConnId!", signal.connId, "<", this._connectionId);
                return
            } else if (signal.connId > this._connectionId) {
                if (this._initiator) {
                    log("SP Err Newer Remote ConnId!", signal.connId, ">", this._connectionId);
                } else this.restart(signal.connId, signalingMsg);

                return;
            }
            if (signal.msgNum <= this._signalMsgRecivedCounter) {
                log("SP Invalid MsgNum Order!", signal.msgNum, "<=", this._signalMsgRecivedCounter); return;
            }
            this._signalMsgRecivedCounter = signal.msgNum;
            this._p.signal(signal)
        } catch (err) {
            logWarn("failed to parse & ingest simplepeer signalling message: ", signalingMsg, err.message)
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
                logError("failed to send message over simplepeer data channel: ", err.message)
                this._msgSendQueue.unshift(msg);
            }
        }
    }
}
