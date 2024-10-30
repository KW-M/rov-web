import { ConnectionStates, DECODE_TXT, ENCODE_TXT } from './consts';
import type { nStoreT } from './libraries/nStore';
import nStore from './libraries/nStore';
import SimplePeer from '@thaunknown/simple-peer/index.js';
import type SimplePeerT from 'simple-peer';
import { log, logDebug, logInfo, logWarn, logError } from "./logging"
import { waitfor } from './util';
import { RtpStatsParser } from './videoStatsParser';
import { perfUnixTimeNow, unixTimeNow } from './time';

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

type VideoStatsPrevState = {
    bytesSent: number,
    framesSent: number,
    packetsSent: number,
    timestamp: number,
}


type SignalData = SimplePeerT.SignalData & {
    connId: number,
    msgNum: number,
}

let startCount = 0;
export class SimplePeerConnection {

    // timestamp in ms which is updated whenever a message is recived from another participant.
    lastMsgRecivedTimestamp: number;
    // subscribe to get updates on the state of the webrtc connection overall.
    connectionState = nStore<ConnectionStates>(ConnectionStates.init); // TODO
    // subscribe to get new data messages as they are recived from the rov each message is an array of bytes.
    latestRecivedDataMessage = nStore<Uint8Array | null>(null);
    // subscribe to get notified when the simplePeer connection is sending out a new signaling message to establish or maintain a connection.
    // thses messages should be sent to the other party via a already established side channel like a livekit or websocket data connection.
    outgoingSignalingMessages = nStore<string | null>(null);
    // the current video track being sent/recived through simplePeer.
    remoteVideoStreams = nStore<Map<string, MediaStream | null>>(new Map());

    // the simplePeer instance used for this connection.
    _p: SimplePeer | null = null;
    // the configuration used for the simplePeer instance.
    _spConfig: any = null;
    // a queue of signal messages recived to be processed by simplePeer.
    _incomingSignalQueue: SignalData[] = [];
    // keeps track of how many signaling messages have been processed.
    _consecutiveSignalMsgsProcessed: number = 0;

    // a queue of messages to be sent out over the data channel.
    _msgSendQueue: ArrayBufferLike[] = [];
    // how many times we have attempted to reconnect to the livekit server after a disconnect (resets on successful reconnect)
    _reconnectAttemptCount: number;
    // flag used durring shutdown/cleanup to stop it from automatically reconnecting
    _shouldReconnect: boolean;
    // flag used to signal that the connection is being stopped (to avoid injesting additional signalling messages durring this).
    _stopping: boolean = false;
    // flag used to track if this side is the initiator (user) or not.
    _initiator: boolean = false;
    // the unique id of this connection.
    _connectionId: number = -1;
    // keeps track of how many signaling messages have been sent out.
    _signalMsgSendCounter: number = 0;
    // keeps track of how many signaling messages have been recived.
    _signalMsgRecivedCounter: number = 0;
    // keeps track of the stats
    _videoStatsParser: RtpStatsParser = new RtpStatsParser();



    constructor(simplePeerOpts: SimplePeerT.Options, streams: MediaStream[] = []) {
        this._spConfig = Object.assign({}, simplePeerOpts, SimplePeer.config, { streams }) as SimplePeerT.Options;
    }

    setStreamsEnabled(enabled: boolean) {
        if (this.remoteVideoStreams.get().size === 0) return;
        this.remoteVideoStreams.update((streams) => {
            streams.forEach((stream) => {
                if (stream) stream.getTracks().forEach((track) => track.enabled = enabled)
            })
            return streams;
        })
    }

    resetVideoStreamMap() {
        let streams = this.remoteVideoStreams.get();
        this.remoteVideoStreams.set(new Map());
        streams.forEach((stream) => {
            if (stream) stream.getTracks().forEach((track) => track.stop())
        })
    }

    start(autoReconnect: boolean = true, reconnectAttemptCount: number = 0, streams: MediaStream[] = []) {
        if (this._p) this.stop();
        this._stopping = false;
        this._shouldReconnect = autoReconnect;
        if (streams.length !== 0) this._spConfig.streams = streams
        logWarn("SP: starting with opts: ", this._spConfig, startCount++)
        if (this._spConfig.initiator) this._connectionId = perfUnixTimeNow();
        this._signalMsgRecivedCounter = 0;
        this._signalMsgSendCounter = 0;
        this._p = new SimplePeer(this._spConfig) as any as SimplePeerT.Instance;
        if (!this._p) return logError("Failed to create SimplePeer instance!");

        this._p._debug = (...args: any[]) => logDebug("SIMPLEPEER DEBUG: " + args[0], ...args.slice(1));
        this._reconnectAttemptCount = reconnectAttemptCount;
        this._initiator = this._spConfig.initiator || false;
        this.connectionState.set(ConnectionStates.connecting);

        this._p.on('signal', (signalData: Object) => {
            if (this._connectionId === -1) {
                logError("SP sending signal message when connectionId is -1, this should not happen!")
                return;
            }

            signalData = Object.assign({}, signalData, { connId: this._connectionId, msgNum: this._signalMsgSendCounter });
            this._signalMsgSendCounter++;
            logDebug("SP: signal out", signalData)
            this.outgoingSignalingMessages.set(JSON.stringify(signalData));
        })

        this._p.on('connect', () => {
            // wait for 'connect' event before using the data channel
            logInfo("SP: Connected!")
            // this._emptySendMsgQueue();
            this._reconnectAttemptCount = 0;
            this.connectionState.set(ConnectionStates.connected);
        })

        this._p.on('data', data => {
            this.lastMsgRecivedTimestamp = unixTimeNow();
            this.latestRecivedDataMessage.set(data);
        })

        this._p.on('stream', (stream: MediaStream) => {
            stream.addEventListener
            // got remote video stream, now let's show it in a video tag
            logInfo('SP got video stream: ', stream)
            this.remoteVideoStreams.update((streams) => {
                streams = new Map();
                streams.set(stream.id, stream);
                return streams;
            })
        })
        this._p.on('iceStateChange', (iceConnectionState: string, iceGatheringState: string) => {
            logInfo(`SP: ICE State - connection: ${iceConnectionState}, gathering: ${iceGatheringState}`)
            if (iceConnectionState === 'connected' || iceConnectionState === 'completed') {
                this.setStreamsEnabled(true)
            } else {
                this.setStreamsEnabled(false)
            }
        })
        // Called when the peer connection has closed.
        this._p.on('close', () => {
            if (!this._initiator) this.resetConnectionStats(); // TODO: check if this is the right place to reset the connection stats.
            logWarn('SP connection closed')
            this.resetVideoStreamMap();
            if (!this._shouldReconnect) {
                // this.resetConnectionStats();
                this.connectionState.set(ConnectionStates.disconnectedOk);
            }
            // this.stop();
        })

        this._p.on("end", () => {
            this.resetVideoStreamMap()
            logInfo("SP: connection ended")
        })
        this._p.on("pause", () => { logInfo("SP: connection paused") })


        // Fired when a fatal error occurs. Usually, this means bad signaling data was received from the remote peer.
        this._p.on('error', (err: SimplePeerError) => {
            // this.resetConnectionStats();
            logError('SP: ERROR ', err)
            this.resetVideoStreamMap();
            this._shouldReconnect = false;

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

        this._processSignalMsgQueue();
    }

    stop() {
        this._stopping = true;
        this.resetConnectionStats();
        this.connectionState.set(ConnectionStates.disconnectedOk);
        // this.remoteVideoStreams.set(new Map());
        this._shouldReconnect = false;
        logWarn("SP: Stop", this._connectionId, this._p?.destroyed, this._p?.destroying)
        if (this._p) this._p.destroy();
        this._p = null;
    }

    restartIce() {
        if (!this._p) return;
        this._p.restartIce();
    }

    async restart(connectionId?: number, signalingMsg?: string) {
        // TODO implement exponential backoff
        logDebug("SP Restart", this._reconnectAttemptCount, connectionId, this._connectionId, this._p?.destroyed, this._p?.destroying)
        this._reconnectAttemptCount++;
        this.stop();
        this._connectionId = connectionId || -1;
        await waitfor(500 * this._reconnectAttemptCount)
        logDebug("SP Restart2", this._spConfig)
        this.start(this._shouldReconnect, this._reconnectAttemptCount);
        if (signalingMsg) this.ingestSignalingMsg(signalingMsg);
    }


    resetConnectionStats() {
        // this._connectionId = -1//Math.round(3600 * Math.random()).toString(36);
        this._signalMsgRecivedCounter = 0;
        this._signalMsgSendCounter = 0;
        this._consecutiveSignalMsgsProcessed = 0;
    }

    changeMediaStream(stream: MediaStream) {
        if (!this._p || this._stopping === true) return;
        try {
            logDebug("SP: changeMediaStream replacing track", stream.getVideoTracks()[0].getSettings())
            const existingStream = this._p.streams[0];
            const existingTrack = existingStream.getVideoTracks()[0];
            this._p.replaceTrack(existingTrack, stream.getVideoTracks()[0], existingStream);
            // existingTrack.stop();
        } catch (err) {
            logError("SP: changeMediaStream failed to replace track trying stream remove+add", err.message)
            for (const existingStreams of this._p.streams) {
                this._p.removeStream(existingStreams);
            }
            this._p.addStream(stream);
        }
    }

    setCodecPreferences(codecs: string[]) {
        // this should be called on the RECEIVING side of the media connection.
        const availReceiveCodecs = RTCRtpReceiver.getCapabilities("video")?.codecs || [];
        const sortedCodecs = this.sortCodecsByMimeTypes(availReceiveCodecs, codecs);
        logInfo("SP: availReceiveCodecs", availReceiveCodecs, "sortedCodecs", sortedCodecs)
        if (!this._p) return;

        const transceivers = this._p?._pc?.getTransceivers() as RTCRtpTransceiver[] || [];
        for (const transceiver of transceivers) {
            transceiver.setCodecPreferences(sortedCodecs);
        }
        this._p.negotiate();

        // setTimeout(() => {
        //             const transceivers = this._p?._pc?.getTransceivers() as RTCRtpTransceiver[] || [];
        //     for (const transceiver of transceivers) {
        //         const recvrParams = transceiver.receiver.getParameters();
        //         const sendrParams = transceiver.sender.getParameters();
        //         this._p.getStats((err, stats) => { console.log("SP: stats", stats) });
        //         logInfo("SP: rcvrParams", recvrParams, "sendrParams", sendrParams)
        //     }
        // }, 2000)

    }

    getCodecPreferences() {
        // this should be called on the RECEIVING side of the media connection.
        if (!this._p) return;
        const transceivers = this._p?._pc?.getTransceivers() as RTCRtpTransceiver[] || [];
        for (const transceiver of transceivers) {
            const recvrParams = transceiver.receiver.getParameters();
            if (recvrParams.codecs) return recvrParams.codecs.map((codec) => codec.mimeType);
        }
    }

    async getStats() {
        if (!this._p || !this._p._pc) return;
        const stats = await new Promise((resolve, reject) => {
            if (!this._p || !this._p._pc) reject("No active simplePeer instance found!")
            this._p.getStats((err, stats) => {
                if (err) reject(err);
                resolve(stats);
            })
        }) as any[];
        return this._videoStatsParser.parse(stats);
    }

    getPlayoutDelay() {
        // this should be called on the RECEIVING side of the media connection.
        if (!this._p) return;
        const transceivers = this._p?._pc?.getTransceivers() as RTCRtpTransceiver[] || [];
        for (const transceiver of transceivers) {
            if (!transceiver.receiver) continue;
            const receiver = transceiver.receiver as RTCRtpReceiver & { playoutDelayHint?: number, jitterBufferTarget?: number };
            if (receiver.playoutDelayHint) return receiver.playoutDelayHint;
            else if (receiver.jitterBufferTarget) return receiver.jitterBufferTarget / 1000;
        }
        return 0;
    }

    setPlayoutDelay(delay: number) {
        // this should be called on the RECEIVING side of the media connection.
        if (!this._p) return;
        const transceivers = this._p?._pc?.getTransceivers() as RTCRtpTransceiver[] || [];
        for (const transceiver of transceivers) {
            if (!transceiver.receiver) continue;
            const receiver = transceiver.receiver as RTCRtpReceiver & { playoutDelayHint?: number, jitterBufferTarget?: number };
            if (receiver.playoutDelayHint !== undefined) {
                if (receiver.playoutDelayHint !== delay) {
                    logDebug("SP: Setting playoutDelayHint to " + delay); receiver.playoutDelayHint = delay;
                }
            } else if (receiver.jitterBufferTarget !== undefined) {
                if (receiver.jitterBufferTarget !== delay) {
                    logDebug("SP: Setting jitterBufferTarget to " + delay); receiver.jitterBufferTarget = delay * 1000;
                }
            }
        }

    }

    sortCodecsByMimeTypes(codecs: RTCRtpCodec[], preferredOrder: string[]) {
        // function taken from https://blog.mozilla.org/webrtc/cross-browser-support-for-choosing-webrtc-codecs/
        return codecs.sort((a, b) => {
            const indexA = preferredOrder.indexOf(a.mimeType.toLowerCase());
            const indexB = preferredOrder.indexOf(b.mimeType.toLowerCase());
            const orderA = indexA >= 0 ? indexA : Number.MAX_VALUE;
            const orderB = indexB >= 0 ? indexB : Number.MAX_VALUE;
            return orderA - orderB;
        });
    }

    ingestSignalingMsg(signalMsg: string) {
        try {
            const signal = JSON.parse(signalMsg) as SignalData;
            if (signal.msgNum === undefined || signal.connId === undefined) {
                return logWarn("SP: Ignoring Invalid Signal Message (no connId or msgNum)!", signal);
            } else if (signal.connId > this._connectionId) {
                logWarn("SP: Found Newer connid, fastforwarding!", signal.connId, this._connectionId);
                this._consecutiveSignalMsgsProcessed = 0;
                this._connectionId = signal.connId;
                this._incomingSignalQueue = [];
                if (this._spConfig && !this._initiator) return this.restart(signal.connId, signalMsg);
            } else if (signal.connId < this._connectionId) {
                logWarn("SP: Ignoring Signal Message For Old connid (connId mismatch)!", signal.connId, this._connectionId);
                return;
            }
            logInfo("SP: signal queued", signal, signal.msgNum, this._consecutiveSignalMsgsProcessed, signal.connId, this._connectionId)
            this._incomingSignalQueue.push(signal);
        } catch (err) {
            logWarn("SP: Failed to parse json signal message: ", signalMsg, err.message)
        };
        this._processSignalMsgQueue();
    }

    sendMessage(data: ArrayBufferLike) {
        this._msgSendQueue.push(data)
        this._emptyMsgQueue();
    }

    _processSignalMsgQueue() {
        if (!this._p || this._stopping === true) return;
        // console.log("SP: processing signal queue", this._incomingSignalQueue.length - 1, this._consecutiveSignalMsgsProcessed)
        for (let i = 0; i < this._incomingSignalQueue.length; i++) {
            // console.log("SP: processing signal q msg", i, "/", this._incomingSignalQueue.length - 1, this._consecutiveSignalMsgsProcessed)
            if (this._incomingSignalQueue.length === 0) return;
            const signalIndex = this._incomingSignalQueue.findIndex((signal) => signal?.msgNum === this._consecutiveSignalMsgsProcessed);
            if (signalIndex === -1) return;
            const signal = this._incomingSignalQueue[signalIndex];

            // here we know the signal is for the current connection and is the next consecutive message.
            logInfo("SP: signal in", signal, signal.msgNum, this._consecutiveSignalMsgsProcessed, signal.connId, this._connectionId)
            this._incomingSignalQueue.splice(signalIndex, 1);
            i--;
            this._p.signal(signal)
            this._consecutiveSignalMsgsProcessed++;
        }
    }

    _emptyMsgQueue() {
        if (!this._p || !this._p.connected) return false;
        const len = this._msgSendQueue.length
        while (this._msgSendQueue.length > 0) {
            const msg = this._msgSendQueue.shift() as ArrayBufferLike;
            try {
                this._p.send(msg);
            } catch (err) {
                logError("failed to send message over simplePeer data channel: ", err.message)
                this._msgSendQueue.unshift(msg);
            }
        }
    }
}
