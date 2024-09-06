import { LivekitPublisherConnection } from "./shared/livekit/livekitConn"
import { LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG, DECODE_TXT, ENCODE_TXT, PROXY_PREFIX, LIVEKIT_BACKEND_ROOM_CONFIG, ConnectionStates, SIMPLEPEER_BASE_CONFIG } from './shared/consts';
import { asyncExpBackoff, changesSubscribe, getWebsocketURL, waitfor, waitforCondition } from './shared/util';
import { getPublisherAccessToken } from './shared/livekit/livekitTokens';
import { backendHandleWebrtcMsgRcvd } from './msgHandler'
import { SimplePeerConnection } from "./shared/simplePeer"
import { rov_actions_proto } from "./shared/protobufs/rovActionsProto";
import { twitchStream } from "./twitchStream";
import { URL_PARAMS } from "./constsInternal";
import { log, logDebug, logInfo, logWarn, logError } from "./shared/logging"
import { type VideoSenderStats } from "livekit-client";

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
    // private _localLivekitConnection: LivekitPublisherConnection = new LivekitPublisherConnection();
    private _simplePeerConnections: { [userId: string]: SimplePeerConnection } = {};
    private _cameraMediaStream: MediaStream | null = null;

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
                twitchStream.startStream()
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

    public subscribeToVideoStats(callback: (stats: VideoSenderStats[]) => void) {
        this._cloudLivekitConnection.videoStats.subscribe(callback);
    }

    public async start(livekitSetup: InternalLivekitSetupOptions) {
        let lastCloudConnState = this._cloudLivekitConnection.connectionState.get();
        if (livekitSetup.LivekitCloudURL) this._cloudLivekitConnection.connectionState.subscribe((state) => {
            if (state === ConnectionStates.failed || state === ConnectionStates.init) {
                logInfo("Creating & Starting Livekit Room: " + livekitSetup.RovName)
                const backoff = asyncExpBackoff(this._cloudLivekitConnection.startRoom, this._cloudLivekitConnection, 10, 1000, 1.3);
                backoff(livekitSetup.RovName, livekitSetup.APIKey, livekitSetup.SecretKey).catch((e) => { logError(e); log("Too many errors: Triggering Page Reload"); window.location.reload() });
            } else if (state === ConnectionStates.connected && lastCloudConnState !== ConnectionStates.init) {
                this._cloudLivekitConnection.updateRoomMetadata()
            }
            lastCloudConnState = state;
        })

        logInfo("Connection Manager Started")
        await waitforCondition(() => this._cloudLivekitConnection && this._cloudLivekitConnection.connectionState && this._cloudLivekitConnection.connectionState.get() === ConnectionStates.connected)
    }

    public async startSimplePeerConnection(userId: string, firstSignallingMessage?: string) {

        // Stop any existing simplepeer connection to this user
        if (this._simplePeerConnections[userId]) {
            this._simplePeerConnections[userId].stop();
            delete this._simplePeerConnections[userId];
        }

        // Get a separate video stream for simplePeer
        if (!this._cameraMediaStream) {
            this._cameraMediaStream = await asyncExpBackoff(navigator.mediaDevices.getUserMedia, navigator.mediaDevices, 10, 1000, 1.3)({
                video: {
                    width: 1920,
                    height: 1080,
                    frameRate: 60,
                    facingMode: "environment"
                },
                audio: false
            })
        }

        const spConn = new SimplePeerConnection();
        changesSubscribe(spConn.latestRecivedDataMessage, (msg) => {
            if (msg) backendHandleWebrtcMsgRcvd(userId, msg)
        })
        changesSubscribe(spConn.outgoingSignalingMessages, (msg) => {
            this.sendMessage({ SimplepeerSignal: { Message: msg } }, true, [userId])
        })

        await spConn.start(Object.assign({}, SIMPLEPEER_BASE_CONFIG, {
            initiator: false,
            streams: [this._cameraMediaStream]
        }), false)

        this._simplePeerConnections[userId] = spConn;
        if (firstSignallingMessage) spConn.ingestSignalingMsg(firstSignallingMessage);
    }

    public async ingestSimplePeerSignallingMsg(userId: string, signallingMsg: string) {
        const spConn = this._simplePeerConnections[userId]
        if (!spConn) await this.startSimplePeerConnection(userId, signallingMsg);
        else if ([ConnectionStates.failed, ConnectionStates.disconnectedOk].includes(spConn.connectionState.get())) {
            log("SP: Connecting to " + userId + " after signalling message received. SP ConnectionState: " + spConn.connectionState.get())
            await this.startSimplePeerConnection(userId, signallingMsg);
        } else spConn.ingestSignalingMsg(signallingMsg);
    }

    public async sendMessage(msg: rov_actions_proto.IRovResponse, reliable: boolean, toUserIds: string[]) {
        if (!msg) return false;
        if (this._cloudLivekitConnection.connectionState.get() !== ConnectionStates.connected) {
            if (URL_PARAMS.DEBUG_MODE) logDebug("LK: Message Not Sent, Livekit Not Connected",);
            return false;
        }
        if (URL_PARAMS.DEBUG_MODE) logDebug("LK/SP: " + (toUserIds.length == 0 ? "Broadcasting msg " : "Sending msg to [" + toUserIds.join(", ") + "]") + (reliable ? "reliably" : "unreliably") + ":", msg);
        msg.BackendMetadata = new rov_actions_proto.ResponseBackendMetadata({}); // Strip out backend metadata if present
        const msgBytes = rov_actions_proto.RovResponse.encode(msg).finish();
        // if (!reliable) {
        //     for (const userId of toUserIds) {
        //         const spConn = this._simplePeerConnections[userId]
        //         if (spConn && spConn.connectionState.get() == ConnectionStates.connected) {
        //             await this._simplePeerConnections[userId].sendMessage(msgBytes);
        //             sentToParticpants.push(userId);
        //         }
        //     }
        //     if (sentToParticpants.length == toUserIds.length) return;
        // }
        const notSentPeers = toUserIds; //toUserIds.filter((userId) => !sentToParticpants.includes(userId));
        await this._cloudLivekitConnection.sendMessage(msgBytes, reliable, notSentPeers);
        return true;
    }

}


export const internalConnManager = new InternalConnectionManager();
