import { LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG, DECODE_TXT, ENCODE_TXT, PROXY_PREFIX, LIVEKIT_BACKEND_ROOM_CONFIG, ConnectionStates, SIMPLEPEER_BASE_CONFIG, SIMPLEPEER_CAPTURE_CONFIG } from './shared/consts';
import { asyncExpBackoff, changesSubscribe, getWebsocketURL, waitfor, waitforCondition } from './shared/util';
import { getPublisherAccessToken } from './shared/livekit/livekitTokens';
import { backendHandleWebrtcMsgRcvd } from './msgHandler'
import { SimplepeerConnection } from "./shared/simplepeer"
import { rov_actions_proto } from "./shared/protobufs/rovActionsProto";
import { twitchStream } from "./twitchStream";
import { URL_PARAMS } from "./constsInternal";
import { log, logDebug, logInfo, logWarn, logError } from "./shared/logging"
import type { TrackPublishOptions, VideoCaptureOptions, VideoSenderStats } from "livekit-client";
import { LivekitPublisherConnection } from './livekitPubConn';
import nStore from './shared/libraries/nStore';

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
    private _simplepeerConnections: Map<string, SimplepeerConnection> = new Map();
    private _simplepeerCameraStream: MediaStream | null = null;
    private _videoStatsCheckTimer: NodeJS.Timeout | null = null;

    // keeps track of the current parameters of the video stream being sent to all simplepeer clients/users.
    simplepeerCameraOptions = nStore<MediaStreamConstraints>(SIMPLEPEER_CAPTURE_CONFIG);

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
        this._videoStatsCheckTimer = setInterval(() => {
            this.sendVideoStatsUpdate();
        }, 1000)
    }

    public subscribeToVideoStats(callback: (stats: VideoSenderStats[]) => void) {
        this._cloudLivekitConnection.videoStats.subscribe(callback);
    }

    public async sendVideoStatsUpdate() {
        const lkStats = await this._cloudLivekitConnection.getVideoStats().catch((e) => { logWarn("LK: Error getting RTP video stats: ", e); return [e] });;
        this.sendMessage({
            LivekitVideoStats: {
                Enabled: !!this._cloudLivekitConnection.camTrack && this._cloudLivekitConnection._roomConn?.localParticipant.videoTrackPublications.size > 0,
                RtcSenderStatsJson: JSON.stringify(lkStats),
                AllowBackupCodec: !!this._cloudLivekitConnection._videoPublishOptions?.backupCodec,
                BaseStream: {
                    Width: this._cloudLivekitConnection._videoCaptureOptions?.resolution?.width,
                    Height: this._cloudLivekitConnection._videoCaptureOptions?.resolution?.height,
                    Fps: this._cloudLivekitConnection._videoCaptureOptions?.resolution?.frameRate,
                    MaxBitrate: this._cloudLivekitConnection._videoPublishOptions?.videoEncoding?.maxBitrate,
                },
                Codec: rov_actions_proto.VideoCodec[this._cloudLivekitConnection._videoPublishOptions?.videoCodec?.toUpperCase() || "unknown"],
                SimulcastLayers: this._cloudLivekitConnection._videoPublishOptions?.videoSimulcastLayers?.map((preset) => {
                    return {
                        Width: preset.width,
                        Height: preset.height,
                        MaxBitrate: preset.encoding?.maxBitrate,
                        Fps: preset.encoding?.maxFramerate,
                    }
                }) || [],
            }
        }, false, [])
        const spCameraOpts = this.simplepeerCameraOptions.get();
        for (const [userId, spConn] of this._simplepeerConnections) {
            const spStats = await spConn.getStats().catch((e) => { logWarn("SP: Error getting rtc video stats for user " + userId + ":", e); return [e] });
            this.sendMessage({
                SimplepeerVideoStats: {
                    Enabled: !!spConn,
                    RtcSenderStatsJson: JSON.stringify(spStats),
                    BaseStream: {
                        Width: Number((spCameraOpts.video as MediaTrackConstraints)?.width),
                        Height: Number((spCameraOpts.video as MediaTrackConstraints)?.height),
                        Fps: Number((spCameraOpts.video as MediaTrackConstraints)?.frameRate),
                    }
                }
            }, false, [userId])
        }
    }

    public setLivekitVideoOptions(enabled: boolean, captureOptions?: VideoCaptureOptions, publishOptions?: TrackPublishOptions) {
        this._cloudLivekitConnection.enableCamera(enabled, captureOptions, publishOptions);
    }

    createSimplepeer(userId: string, firstSignalMsg?: string) {
        // Stop any existing simplepeer connection to this user
        const existing = this._simplepeerConnections.get(userId);
        if (existing) {
            logWarn("SP: createSimplepeer() err - Connection already exists for user: " + userId);
            return existing;
        }
        //     existing.stop();
        //     this._simplepeerConnections.delete(userId);
        // }

        // Create a new simplepeer connection
        const spConn = new SimplepeerConnection();
        this._simplepeerConnections.set(userId, spConn);
        if (firstSignalMsg) spConn.ingestSignalingMsg(firstSignalMsg);
        changesSubscribe(spConn.latestRecivedDataMessage, (msg) => {
            if (msg) backendHandleWebrtcMsgRcvd(userId, msg)
        })
        changesSubscribe(spConn.outgoingSignalingMessages, (msg) => {
            this.sendMessage({ SimplepeerSignal: { Message: msg } }, true, [userId])
        })
        return spConn;
    }

    public async startSimplepeerConnection(userId: string) {
        // Get a separate video stream for simplepeer
        if (!this._simplepeerCameraStream) {
            this._simplepeerCameraStream = await asyncExpBackoff(navigator.mediaDevices.getUserMedia, navigator.mediaDevices, 10, 1000, 1.3)(this.simplepeerCameraOptions.get())
        }

        const spConn = this._simplepeerConnections.get(userId);
        if (!spConn) throw new Error("Simplepeer Connection not created for user: " + userId);

        await spConn.start(Object.assign({}, SIMPLEPEER_BASE_CONFIG, {
            initiator: false,
            streams: [this._simplepeerCameraStream]
        }), false)
    }

    public async setSimplepeerVideoOptions(enabled: boolean, userId: string, captureOptions?: VideoCaptureOptions, publishOptions?: TrackPublishOptions) {
        if (enabled) {
            console.log("Setting Simplepeer Video Options for " + userId + ":", captureOptions, publishOptions);
            this.simplepeerCameraOptions.update((opts) => {
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
            const newCameraStream = await navigator.mediaDevices.getUserMedia(this.simplepeerCameraOptions.get());
            const oldStream = this._simplepeerCameraStream;
            this._simplepeerCameraStream = newCameraStream;
            let spConn = this._simplepeerConnections.get(userId)
            if (!spConn) {
                spConn = this.createSimplepeer(userId);
                spConn.start(Object.assign({}, SIMPLEPEER_BASE_CONFIG, {
                    initiator: false,
                    streams: [this._simplepeerCameraStream]
                }), false)
            } else {
                spConn.changeMediaStream(this._simplepeerCameraStream);
            }
            // spConn.setCodecPreferences([publishOptions?.videoCodec || "vp9"]);
        } else {
            this._simplepeerCameraStream?.getTracks().forEach((track) => track.stop())
            this._simplepeerCameraStream = null;
        }
    }

    public async ingestSimplepeerSignalMsg(userId: string, signalMsg: string) {
        const spConn = this._simplepeerConnections.get(userId);
        // log("SP: Ingesting Signalling Message from " + userId + ":", spConn ? spConn.connectionState.get() : "No SP Conn");
        if (spConn === undefined) {
            this.createSimplepeer(userId, signalMsg);
            await this.startSimplepeerConnection(userId);
        } else {
            spConn.ingestSignalingMsg(signalMsg);
        }
    }

    public async sendMessage(msg: rov_actions_proto.IRovResponse, reliable: boolean, toUserIds: string[]) {
        if (!msg) return false;
        if (this._cloudLivekitConnection.connectionState.get() !== ConnectionStates.connected) {
            if (URL_PARAMS.DEBUG_MODE) logDebug("LK: Message Not Sent, Livekit Not Connected",);
            return false;
        }

        if (URL_PARAMS.DEBUG_MODE) logDebug("LK/SP: " + (toUserIds.length == 0 ? "Broadcasting msg " : "Sending msg to [" + toUserIds.join(", ") + "]") + (reliable ? "reliably" : "unreliably") + ":", rov_actions_proto.RovResponse.create(msg).toJSON());
        msg.BackendMetadata = rov_actions_proto.ResponseBackendMetadata.create({}); // Strip out backend metadata if present
        const msgBytes = rov_actions_proto.RovResponse.encode(msg).finish();

        // Send the message via the cloud livekit connection (for simplicity we don't use simplepeer for sending messages to pilot etc..)
        await this._cloudLivekitConnection.sendMessage(msgBytes, reliable, toUserIds);
        return true;
    }

    public async stop() {
        clearInterval(this._videoStatsCheckTimer!);
        this._cloudLivekitConnection.close();
        for (const [userId, spConn] of this._simplepeerConnections) {
            spConn.stop();
        }
    }

}


export const internalConnManager = new InternalConnectionManager();
