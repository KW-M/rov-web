import { LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG, LIVEKIT_BACKEND_ROOM_CONFIG, ConnectionStates, SIMPLEPEER_BASE_CONFIG, SIMPLEPEER_CAPTURE_CONFIG } from './shared/consts';
import { asyncExpBackoff, changesSubscribe, waitforCondition } from './shared/util';
import { backendHandleWebrtcMsgRcvd } from './msgHandler'
import { SimplePeerConnection } from "./shared/simplePeer"
import { URL_PARAMS } from "./constsInternal";
import { log, logDebug, logInfo, logWarn, logError } from "./shared/logging"
import type { TrackPublishOptions, VideoCaptureOptions, VideoSenderStats } from "livekit-client";
import { LivekitPublisherConnection } from './livekitPubConn';
import nStore from './shared/libraries/nStore';
import { type ComputedRtpStats } from './shared/videoStatsParser';
import { ResponseBackendMetadata, RovResponse } from './shared/protobufs/rov_actions';

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
    private _simplePeerConnections: Map<string, SimplePeerConnection> = new Map();
    private _simplePeerCameraStream: MediaStream | null = null;

    // keeps track of the current parameters of the video stream being sent to all simplePeer clients/users.
    simplePeerCameraOptions = nStore<MediaStreamConstraints>(SIMPLEPEER_CAPTURE_CONFIG);

    // // video stats for the cloud livekit connection & simplePeer connections
    // livekitVideoStats = nStore<ComputedSenderStats | null>(null);
    // simplePeerVideoStats = nStore<Map<string, ComputedSenderStats>>(new Map());

    // interval id for checking video stats loop
    _videoStatsIntervalId: NodeJS.Timeout | null = null;

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
            const { senderId, msg } = msgObj;
            backendHandleWebrtcMsgRcvd(senderId, msg)
        })
        changesSubscribe(this._cloudLivekitConnection.connectionState, (state) => {
            log("Cloud Conn State Changed: " + state)
            if (state == ConnectionStates.connected) {
                // twitchStream.startStream()
                // this._cloudLivekitConnection
            }
        })
        changesSubscribe(this._cloudLivekitConnection.participantConnectionEvents, (evt) => {
            log("Cloud Conn Participant Event: ", evt)
        })

        // Initlize (but don't start) the local livekit connection:
        // this._localLivekitConnection.init({
        //     hostUrl: LIVEKIT_LOCAL_ENDPOINT,
        //     publishVideo: true,
        //     reconnectAttempts: 300,
        //     roomConnectionConfig: LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG,
        //     roomConfig: LIVEKIT_BACKEND_ROOM_CONFIG
        // })

        // changesSubscribe(this._localLivekitConnection.latestRecivedDataMessage, (msgObj) => {
        //     if (!msgObj) return;
        //     const { senderId, msg } = msgObj;
        //     backendHandleWebrtcMsgRcvd(senderId, msg)
        // })
        // changesSubscribe(this._localLivekitConnection.connectionState, (state) => {
        //     log("Local Conn State Changed: " + state)
        // })
        // changesSubscribe(this._localLivekitConnection.participantConnectionEvents, (evt) => {
        //     log("Local Conn Participant Event: ", evt)
        // })
    }

    public async start(livekitSetup: InternalLivekitSetupOptions) {
        let lastCloudConnState = this._cloudLivekitConnection.connectionState.get();
        this._cloudLivekitConnection.connectionState.subscribe((state) => {
            if (state === ConnectionStates.failed || state === ConnectionStates.init) {
                logInfo("Creating & Starting Livekit Room: " + livekitSetup.RovName)
                const backoff = asyncExpBackoff(this._cloudLivekitConnection.startRoom, this._cloudLivekitConnection, 10, 1000, 1.3);
                backoff(livekitSetup.RovName, livekitSetup.APIKey, livekitSetup.SecretKey).catch((e) => { logError(e); log("Too many errors: Triggering Page Reload"); window.location.reload() });
            }
            lastCloudConnState = state;
        })

        logInfo("Connection Manager Started")
        await waitforCondition(() => this._cloudLivekitConnection && this._cloudLivekitConnection.connectionState && this._cloudLivekitConnection.connectionState.get() === ConnectionStates.connected)
        this.onConnectedActions();
    }

    onConnectedActions() {
        this.sendVideoStatsUpdate();
        this._videoStatsIntervalId = setInterval(() => {
            this.sendVideoStatsUpdate();
        }, 1000)
    }

    public async sendVideoStatsUpdate() {
        const lkStats = await this._cloudLivekitConnection.getVideoStats().catch((e) => { logWarn("LK: Error getting RTP video stats: ", e); return { allStats: [String(e)] } as ComputedRtpStats }) as ComputedRtpStats;
        if (!lkStats) return;
        this.sendMessage({
            body: {
                oneofKind: "livekitVideoStats",
                livekitVideoStats: {
                    enabled: !!this._cloudLivekitConnection.camTrack && this._cloudLivekitConnection._roomConn?.localParticipant.videoTrackPublications.size > 0,
                    allowBackupCodec: !!this._cloudLivekitConnection._videoPublishOptions?.backupCodec,
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
                }
            }
        }, false, [])
        const spCameraOpts = this.simplePeerCameraOptions.get();
        for (const [userId, spConn] of this._simplePeerConnections) {
            if (!spConn || spConn.connectionState.get() !== ConnectionStates.connected) continue;
            const spStats = await spConn.getStats().catch((e) => { logWarn("SP: Error getting rtc video stats for user " + userId + ":", e); return null });
            if (!spStats) continue;
            this.sendMessage({
                body: {
                    oneofKind: "simplePeerVideoStats",
                    simplePeerVideoStats: {
                        enabled: !!spConn,
                        codec: "h264",
                        baseStream: {
                            width: Number((spCameraOpts.video as MediaTrackConstraints)?.width),
                            height: Number((spCameraOpts.video as MediaTrackConstraints)?.height),
                            fps: Number((spCameraOpts.video as MediaTrackConstraints)?.frameRate),
                            maxBitrate: Number(0),
                        },
                        stats: { ...spStats }
                    }
                }
            }, false, [userId])
        }
    }

    public setLivekitVideoOptions(enabled: boolean, captureOptions?: VideoCaptureOptions, publishOptions?: TrackPublishOptions) {
        this._cloudLivekitConnection.enableCamera(enabled, captureOptions, publishOptions);
    }

    createSimplePeer(userId: string, firstSignalMsg?: string) {
        // Stop any existing simplePeer connection to this user
        const existing = this._simplePeerConnections.get(userId);
        if (existing) {
            logWarn("SP: createSimplePeer() err - Connection already exists for user: " + userId);
            return existing;
        }
        //     existing.stop();
        //     this._simplePeerConnections.delete(userId);
        // }

        // Create a new simplePeer connection
        const spConn = new SimplePeerConnection();
        this._simplePeerConnections.set(userId, spConn);
        if (firstSignalMsg) spConn.ingestSignalingMsg(firstSignalMsg);
        changesSubscribe(spConn.latestRecivedDataMessage, (msg) => {
            if (msg) backendHandleWebrtcMsgRcvd(userId, msg)
        })
        changesSubscribe(spConn.outgoingSignalingMessages, (msg) => {
            this.sendMessage({ body: { oneofKind: "simplePeerSignal", simplePeerSignal: { message: msg ?? "" } } }, true, [userId])
        })
        return spConn;
    }

    public setPreviewVideoElement(stream: MediaStream) {
        const videoElement = document.getElementById("preview_video") as HTMLVideoElement;
        if (videoElement) videoElement.srcObject = stream;
    }

    public async startSimplePeerConnection(userId: string) {
        // Get a separate video stream for simplePeer
        if (!this._simplePeerCameraStream) {
            this._simplePeerCameraStream = await asyncExpBackoff(navigator.mediaDevices.getUserMedia, navigator.mediaDevices, 10, 1000, 1.3)(this.simplePeerCameraOptions.get())

        }

        this.setPreviewVideoElement(this._simplePeerCameraStream);
        const spConn = this._simplePeerConnections.get(userId);
        if (!spConn) throw new Error("SimplePeer Connection not created for user: " + userId);

        await spConn.start(Object.assign({}, SIMPLEPEER_BASE_CONFIG, {
            initiator: false,
            streams: [this._simplePeerCameraStream]
        }), false)
    }

    public async setSimplePeerVideoOptions(enabled: boolean, userId: string, captureOptions?: VideoCaptureOptions, publishOptions?: TrackPublishOptions) {
        if (enabled) {
            console.log("Setting SimplePeer Video Options for " + userId + ":", captureOptions, publishOptions);
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
            const newCameraStream = await navigator.mediaDevices.getUserMedia(this.simplePeerCameraOptions.get());
            const oldStream = this._simplePeerCameraStream;
            this._simplePeerCameraStream = newCameraStream;
            this.setPreviewVideoElement(this._simplePeerCameraStream);
            let spConn = this._simplePeerConnections.get(userId)
            if (!spConn) {
                spConn = this.createSimplePeer(userId);
                spConn.start(Object.assign({}, SIMPLEPEER_BASE_CONFIG, {
                    initiator: false,
                    streams: [this._simplePeerCameraStream]
                }), false)
            } else {
                spConn.changeMediaStream(this._simplePeerCameraStream);
            }
            // spConn.setCodecPreferences([publishOptions?.videoCodec || "vp9"]);
        } else {
            this._simplePeerCameraStream?.getTracks().forEach((track) => track.stop())
            this._simplePeerCameraStream = null;
        }
    }

    public async ingestSimplePeerSignalMsg(userId: string, signalMsg: string) {
        const spConn = this._simplePeerConnections.get(userId);
        // log("SP: Ingesting Signalling Message from " + userId + ":", spConn ? spConn.connectionState.get() : "No SP Conn");
        if (spConn === undefined) {
            this.createSimplePeer(userId, signalMsg);
            await this.startSimplePeerConnection(userId);
        } else {
            spConn.ingestSignalingMsg(signalMsg);
        }
    }

    public async sendMessage(msg: RovResponse, reliable: boolean, toUserIds: string[]) {
        if (!msg) return false;
        if (this._cloudLivekitConnection.connectionState.get() !== ConnectionStates.connected) {
            if (URL_PARAMS.DEBUG_MODE) logDebug("LK: Message Not Sent, Livekit Not Connected",);
            return false;
        }

        if (URL_PARAMS.DEBUG_MODE) logDebug("LK/SP: " + (toUserIds.length == 0 ? "Broadcasting msg " : "Sending msg to [" + toUserIds.join(", ") + "]") + (reliable ? "reliably" : "unreliably") + ":", RovResponse.toJson(msg));
        msg.backendMetadata = ResponseBackendMetadata.create({}); // Strip out backend metadata if present
        const msgBytes = RovResponse.toBinary(msg)

        // Send the message via the cloud livekit connection (for simplicity we don't use simplePeer for sending messages to pilot etc..)
        await this._cloudLivekitConnection.sendMessage(msgBytes, reliable, toUserIds);
        return true;
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
