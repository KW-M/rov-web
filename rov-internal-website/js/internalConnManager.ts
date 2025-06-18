import { LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG, LIVEKIT_BACKEND_ROOM_CONFIG, ConnectionStates, SIMPLEPEER_BASE_CONFIG } from './shared/consts';
import { SIMPLEPEER_CAPTURE_CONFIG, URL_PARAMS } from "./constsInternal";
import { asyncExpBackoff, changesSubscribe, waitforCondition } from './shared/util';
import { backendHandleWebrtcMsgRcvd } from './msgHandler'
import { SimplePeerConnection } from "./shared/simplePeer"
import { log, logDebug, logInfo, logWarn, logError } from "./shared/logging"
import type { TrackPublishOptions, VideoCaptureOptions, VideoSenderStats } from "livekit-client";
import { LivekitPublisherConnection } from './livekitPubConn';
import nStore from './shared/libraries/nStore';
import { type ComputedRtpStats } from './shared/videoStatsParser';
import { LivekitVideoStatsResponse, ResponseBackendMetadata, RovAction, RovResponse, SimplePeerVideoStatsResponse } from './shared/protobufs/rov_actions';
import { twitchStream } from './twitchStream';
// import { SimpleMessageBroker } from './shared/reliableMessageBroker';
import { base64encode } from '@protobuf-ts/runtime';

export interface InternalLivekitSetupOptions {
    RovName: string,
    APIKey: string,
    SecretKey: string,
    LivekitCloudURL: string,
    LivekitLocalURL: string,
}

/** InternalConnectionManager
 * consolidates all the internet-facing connections of the internal webpage into one place
 * messages from any connection are passed to the msgHandler
 * outgoing messages to each user are sent through whichever connection to that user which was most recently active.
 */
class InternalConnectionManager {
    private _cloudLivekitConnection: LivekitPublisherConnection = new LivekitPublisherConnection();
    // private _reliableMessageBrokers: Map<string, SimpleMessageBroker<RovResponse, RovAction>> = new Map();
    private _simplePeerConnections: Map<string, SimplePeerConnection> = new Map();
    private _simplePeerCameraStream: MediaStream | null = null;

    // keeps track of the current parameters of the video stream being sent to all simplePeer clients/users.
    simplePeerCameraOptions = nStore<MediaStreamConstraints>(SIMPLEPEER_CAPTURE_CONFIG);

    _cancelGetUserMedia: null | (() => void) = null;

    // // video stats for the cloud livekit connection & simplePeer connections
    // livekitVideoStats = nStore<ComputedSenderStats | null>(null);
    // simplePeerVideoStats = nStore<Map<string, ComputedSenderStats>>(new Map());

    // interval id for checking video stats loop
    _videoStatsIntervalId: NodeJS.Timeout | null = null;

    // video element for displaying the preview video stream for debugging simple peer camera stream
    _debugVideoElement: HTMLVideoElement | null = null;

    constructor() {
        // Initlize (but don't start) the cloud livekit connection:
        this._cloudLivekitConnection.init({
            hostUrl: URL_PARAMS.LIVEKIT_CLOUD_ENDPOINT,
            publishVideo: true,
            reconnectAttempts: 300,
            roomConnectionConfig: LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG,
            roomConfig: LIVEKIT_BACKEND_ROOM_CONFIG,
            tokenEncryptionPassword: URL_PARAMS.ROV_CONTROL_PASSWORD
        })
        changesSubscribe(this._cloudLivekitConnection.latestRecivedDataMessage, (msgObj) => {
            if (!msgObj) return;
            const { senderId, msgBytes } = msgObj;
            let data = new Uint8Array(msgBytes);
            if (!data || data.length === 0) return;
            const msg = RovAction.fromBinary(new Uint8Array(data));
            // let reliableMessageBroker = this.getReliableMessageBroker(senderId);
            // let reliableMsg = msg.sequenceNum != 0;
            // if (reliableMsg) {
            //     reliableMessageBroker.receive(msg, msg.sequenceNum);
            // } else {
            // backendHandleWebrtcMsgRcvd(senderId, msg)
            // }
            backendHandleWebrtcMsgRcvd(senderId, msg)
        })
        changesSubscribe(this._cloudLivekitConnection.participantConnectionEvents, (evt) => {
            log("Cloud Conn Participant Event: ", evt)
        })
    }



    onConnectedActions() {
        // twitchStream.startStream();
        this.sendPeriodicVideoStats();
        this.initSimplepeerCameraStream();
    }

    onReconnectedActions() {
        this.sendPeriodicVideoStats();
    }

    onDisconnectedActions() {
        // clearInterval(this._videoStatsIntervalId!);
    }

    /** Setup the separate camera video stream used for simplePeer connections */
    initSimplepeerCameraStream() {
        if (this._cancelGetUserMedia) this._cancelGetUserMedia();
        const { promise, cancel } = asyncExpBackoff({
            fn: () => navigator.mediaDevices.getUserMedia(this.simplePeerCameraOptions.get()),
            exponent: 1.3,
            maxRetries: 10,
            initialDelay: 500,
        })
        this._cancelGetUserMedia = cancel;
        promise.then((stream) => {
            logDebug("SP: Camera Stream Initialized: ", Object.assign({}, stream), stream, stream.active)
            if (this._debugVideoElement) this._debugVideoElement.srcObject = stream;
            this._simplePeerCameraStream = stream;
            this._cancelGetUserMedia = null;
            this._simplePeerConnections.forEach((spConn) => {
                spConn.changeMediaStream(stream);
            })
        }).catch((e) => {
            logError("Error getting separate camera stream for simplePeer: ", e)
            this._cancelGetUserMedia = null;
        })
        return this._simplePeerCameraStream
    }

    public async start(livekitSetup: InternalLivekitSetupOptions) {
        let starting = false;

        const startLivekitRoom = () => {
            if (starting) return;
            starting = true;
            logInfo("Creating & Starting Livekit Room: " + livekitSetup.RovName)
            const { promise } = asyncExpBackoff({
                fn: () => this._cloudLivekitConnection.startRoom(livekitSetup.RovName, livekitSetup.APIKey, livekitSetup.SecretKey),
                exponent: 1.3,
                maxRetries: 10,
                initialDelay: 1000,
            })
            promise.then(() => {
                logInfo("Livekit Room Started: " + livekitSetup.RovName)
                starting = false;
            }).catch((e) => {
                logError(e);
                log("Too many room startup errors: Triggering Page Reload");
                window.location.reload()
            })
        }

        startLivekitRoom();
        changesSubscribe(this._cloudLivekitConnection.connectionState, (state, prevState) => {
            if (state === ConnectionStates.failed || state === ConnectionStates.init || state === ConnectionStates.disconnectedOk) {
                startLivekitRoom();
            } else if (state === ConnectionStates.connected && prevState === ConnectionStates.init) {
                this.onConnectedActions();
            } else if (state === ConnectionStates.connected) {
                this.onReconnectedActions();
            } else {
                this.onDisconnectedActions();
            }
        })
    }

    sendPeriodicVideoStats() {
        this.sendVideoStatsUpdate();
        clearInterval(this._videoStatsIntervalId!);
        this._videoStatsIntervalId = setInterval(() => {
            if (this._simplePeerCameraStream?.active !== true && this._cancelGetUserMedia === null) this.initSimplepeerCameraStream();
            this.sendVideoStatsUpdate()
            this.sendMessage(RovResponse.create({ body: { oneofKind: 'heartbeat', heartbeat: {} } }), true, [])
        }, 1000)
    }

    public async sendVideoStatsUpdate() {
        const lkStats = await this._cloudLivekitConnection.getVideoStats().catch((e) => { logWarn("LK: Error getting RTP video stats: ", e); return { allStats: [String(e)] } as ComputedRtpStats }) as ComputedRtpStats;

        this.sendMessage(RovResponse.create({
            body: {
                oneofKind: "livekitVideoStats",
                livekitVideoStats: LivekitVideoStatsResponse.create({
                    enabled: this._cloudLivekitConnection.isVideoActive() && this._cloudLivekitConnection._roomConn?.localParticipant.videoTrackPublications.size > 0,
                    allowBackupCodec: !!(this._cloudLivekitConnection._videoPublishOptions?.backupCodec),
                    baseStream: {
                        width: this._cloudLivekitConnection._videoCaptureOptions?.resolution?.width ?? 0,
                        height: this._cloudLivekitConnection._videoCaptureOptions?.resolution?.height ?? 0,
                        fps: this._cloudLivekitConnection._videoCaptureOptions?.resolution?.frameRate ?? 0,
                        maxBitrate: this._cloudLivekitConnection._videoPublishOptions?.videoEncoding?.maxBitrate ?? 0,
                    },
                    codec: this._cloudLivekitConnection._videoPublishOptions?.videoCodec || "unknown",
                    simulcastLayers: this._cloudLivekitConnection._videoPublishOptions?.videoSimulcastLayers?.map((preset) => {
                        return {
                            width: preset.width,
                            height: preset.height,
                            maxBitrate: preset.encoding?.maxBitrate ?? 0,
                            fps: preset.encoding?.maxFramerate ?? 0,
                        }
                    }) || [],
                    stats: { ...lkStats }
                })
            }
        }), false, []).catch((e) => logWarn("LK: Error sending video stats update: ", e))
        const spCameraOpts = this.simplePeerCameraOptions.get();
        for (const [userId, spConn] of this._simplePeerConnections) {
            if (!spConn || spConn.connectionState.get() !== ConnectionStates.connected) continue;
            const enabled = spConn && !([ConnectionStates.disconnectedOk, ConnectionStates.failed].includes(spConn.connectionState.get()));
            const spStats = await spConn.getStats().catch((e) => { logWarn("SP: Error getting rtc video stats for user " + userId + ":", e); return {} as ComputedRtpStats });
            this.sendMessage(RovResponse.create({
                body: {
                    oneofKind: "simplePeerVideoStats",
                    simplePeerVideoStats: SimplePeerVideoStatsResponse.create({
                        enabled: enabled,
                        codec: spStats?.senderLayerStats[0]?.videoCodec || "unknown",
                        baseStream: {
                            width: Number((spCameraOpts.video as MediaTrackConstraints)?.width),
                            height: Number((spCameraOpts.video as MediaTrackConstraints)?.height),
                            fps: Number((spCameraOpts.video as MediaTrackConstraints)?.frameRate),
                            maxBitrate: Number(0),
                        },
                        stats: { ...spStats }
                    })
                }
            }), false, [userId]).catch((e) => logWarn("SP: Error sending video stats update to user " + userId + ":", e))
        }
    }

    public setLivekitVideoOptions(enabled: boolean, captureOptions?: VideoCaptureOptions, publishOptions?: TrackPublishOptions) {
        if (enabled) this._cloudLivekitConnection.enableCamera(captureOptions, publishOptions);
        else this._cloudLivekitConnection.disableCamera();
    }

    createSimplePeer(userId: string, firstSignalMsg?: string) {
        // Stop any existing simplePeer connection to this user
        const existing = this._simplePeerConnections.get(userId);
        if (existing) {
            logWarn("SP: createSimplePeer() err - Connection already exists for user: " + userId);
            return existing;
        }

        // Create a new simplePeer connection
        const streams = this._simplePeerCameraStream ? [this._simplePeerCameraStream] : [];
        const spConn = new SimplePeerConnection(SIMPLEPEER_BASE_CONFIG, streams);
        this._simplePeerConnections.set(userId, spConn);
        if (firstSignalMsg) spConn.ingestSignalingMsg(firstSignalMsg);
        changesSubscribe(spConn.latestRecivedDataMessage, (msgBytes) => {
            if (!msgBytes || msgBytes.length === 0) return;
            backendHandleWebrtcMsgRcvd(userId, RovAction.fromBinary(new Uint8Array(msgBytes)));
        })
        changesSubscribe(spConn.outgoingSignalingMessages, (msg) => {
            this.sendMessage(RovResponse.create({ body: { oneofKind: "simplePeerSignal", simplePeerSignal: { message: msg ?? "" } } }), true, [userId])
        })
        changesSubscribe(spConn.connectionState, (state) => {
            log("SP: Connection State Changed for " + userId + ":", state)
            if (state === ConnectionStates.disconnectedOk || state === ConnectionStates.failed) {
                this.sendMessage(RovResponse.create({
                    body: {
                        oneofKind: "simplePeerVideoStats",
                        simplePeerVideoStats: SimplePeerVideoStatsResponse.create({
                            enabled: false,
                        })
                    }
                }), false, [userId]).catch((e) => logWarn("SP: Error sending sp diabled update to user " + userId + ":", e))
            }
        })
        return spConn;
    }

    public setDebugVideoElement(videoElem: HTMLVideoElement | null) {
        this._debugVideoElement = videoElem;
        if (videoElem) videoElem.srcObject = this._simplePeerCameraStream || null;
    }

    public async setSimplePeerVideoOptions(enabled: boolean, userId: string, captureOptions?: VideoCaptureOptions, publishOptions?: TrackPublishOptions) {
        if (enabled) {
            this.simplePeerCameraOptions.update((opts) => {
                const video = (opts?.video ? opts.video : SIMPLEPEER_CAPTURE_CONFIG.video) as MediaTrackConstraints;
                return {
                    ...opts,
                    video: {
                        ...opts.video as MediaTrackConstraints,
                        width: captureOptions?.resolution?.width || video.width || 1920,
                        height: captureOptions?.resolution?.height || video.height || 1080,
                        frameRate: captureOptions?.resolution?.frameRate || video.frameRate || 60,
                    },
                }
            });
            this.initSimplepeerCameraStream();
            let spConn = this._simplePeerConnections.get(userId)
            if (!spConn) spConn = this.createSimplePeer(userId);
        } else {
            if (this._cancelGetUserMedia) this._cancelGetUserMedia();
            this._simplePeerCameraStream?.getTracks().forEach((track) => track.stop())
            this._simplePeerCameraStream = null;
        }
    }

    public async ingestSimplePeerSignalMsg(userId: string, signalMsg: string) {
        const spConn = this._simplePeerConnections.get(userId);
        // log("SP: Ingesting Signalling Message from " + userId + ":", spConn ? spConn.connectionState.get() : "No SP Conn");
        if (spConn === undefined) {
            this.createSimplePeer(userId, signalMsg);
        } else {
            spConn.ingestSignalingMsg(signalMsg);
        }
    }

    public async _sendMsgRaw(msg: RovResponse, reliable: boolean, toUserIds: string[]) {
        const msgBytes = RovResponse.toBinary(msg)

        if (this._cloudLivekitConnection.connectionState.get() === ConnectionStates.connected) {
            // Send the message via the cloud livekit connection (for simplicity we don't use simplePeer for sending messages to pilot & other users)
            await this._cloudLivekitConnection.sendMessage(msgBytes, reliable, toUserIds);
            if (URL_PARAMS.DEBUG_MODE) logDebug("LK: SENT MSG: ", msg, msg.body.oneofKind, toUserIds);
            return true;
        } else {
            // Otherwise return false indicating the message was not sent
            if (URL_PARAMS.DEBUG_MODE) logDebug("LK: Message Not Sent, Livekit Not Connected",);
            return false;
        }
    }

    public async sendMessage(msg: RovResponse, reliable: boolean, toUserIds: string[]) {
        if (!msg) return false;
        return this._sendMsgRaw(msg, reliable, toUserIds);
        // if (reliable) {
        //     toUserIds = toUserIds ?? this._cloudLivekitConnection.getParticipantIds()
        //     for (const userId of toUserIds) {
        //         this.getReliableMessageBroker(userId).send(msg);
        //     }
        //     return true;
        // } else {
        //     return this._sendMsgRaw(msg, reliable, toUserIds);
        // }
    }

    public async stop() {
        clearInterval(this._videoStatsIntervalId!);
        this._cloudLivekitConnection.close();
        for (const spConn of this._simplePeerConnections.values()) {
            spConn.stop();
        }
    }

}


export const internalConnManager = new InternalConnectionManager();
