import { LivekitPublisherConnection } from "./shared/livekit/livekitConn"
import { LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG, DECODE_TXT, ENCODE_TXT, PROXY_PREFIX, LIVEKIT_BACKEND_ROOM_CONFIG, ConnectionStates, SIMPLEPEER_BASE_CONFIG } from './shared/consts';
import { asyncExpBackoff, changesSubscribe, getWebsocketURL, waitfor, waitforCondition } from './shared/util';
import { getPublisherAccessToken } from './shared/livekit/livekitTokens';
import { backendHandleWebrtcMsgRcvd } from './msgHandler'
import { SimplePeerConnection } from "./shared/simplePeer"
import { rov_actions_proto } from "./shared/protobufs/rovActionsProto";
import { twitchStream } from "./twitchStream";
import { URL_PARAMS } from "./constsInternal";

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
            roomConfig: LIVEKIT_BACKEND_ROOM_CONFIG
        })
        changesSubscribe(this._cloudLivekitConnection.latestRecivedDataMessage, (msgObj) => {
            if (!msgObj) return;
            const { senderId, msg } = msgObj;
            backendHandleWebrtcMsgRcvd(senderId, msg)
        })
        changesSubscribe(this._cloudLivekitConnection.connectionState, (state) => {
            console.log("Cloud Conn State Changed: " + state)
            if (state == ConnectionStates.connected) {
                twitchStream.startStream()
            }
        })
        changesSubscribe(this._cloudLivekitConnection.participantConnectionEvents, (evt) => {
            console.log("Cloud Conn Participant Event: ", evt)
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
        //     console.log("Local Conn State Changed: " + state)
        // })
        // changesSubscribe(this._localLivekitConnection.participantConnectionEvents, (evt) => {
        //     console.log("Local Conn Participant Event: ", evt)
        // })
    }

    private async cameraReady(stream: MediaStream) {
        this._cameraMediaStream = stream;
        if (this._cloudLivekitConnection && this._cloudLivekitConnection.connectionState.get() == ConnectionStates.connected && this._cameraMediaStream) await this._cloudLivekitConnection._roomConn.localParticipant.setCameraEnabled(true)
        // if (this._localLivekitConnection && this._localLivekitConnection.connectionState.get() == ConnectionStates.connected && this._cameraMediaStream) await this._localLivekitConnection._roomConn.localParticipant.setCameraEnabled(true)
    }

    public async start(livekitSetup: InternalLivekitSetupOptions) {
        let lastCloudConnState = this._cloudLivekitConnection.connectionState.get();
        if (livekitSetup.LivekitCloudURL) this._cloudLivekitConnection.connectionState.subscribe((state) => {
            if (state === ConnectionStates.failed || state === ConnectionStates.init) {
                console.info("Creating & Starting Livekit Room: " + livekitSetup.RovName)
                const backoff = asyncExpBackoff(this._cloudLivekitConnection.startRoom, this._cloudLivekitConnection, 10, 1000, 1.3);
                backoff(livekitSetup.RovName, livekitSetup.APIKey, livekitSetup.SecretKey).catch((e) => { console.error(e); console.log("Too many errors: Triggering Page Reload"); window.location.reload() });
            } else if (state === ConnectionStates.connected && lastCloudConnState !== ConnectionStates.init) {
                this._cloudLivekitConnection.updateMetadataTokens()
            }
            lastCloudConnState = state;
        })
        // await asyncExpBackoff(this._cloudLivekitConnection.startRoom, this._cloudLivekitConnection, 10, 1000, 1.3)(livekitSetup.RovName, livekitSetup.LivekitAPIKey, livekitSetup.LivekitSecretKey).catch((e) => { console.error(e); window.location.reload() });
        // if (livekitSetup.EnableLivekitLocal) await asyncExpBackoff(this._localLivekitConnection.startRoom, this._localLivekitConnection, 10, 1000, 1.3)(livekitSetup.RovName, livekitSetup.LivekitAPIKey, livekitSetup.LivekitSecretKey).catch((e) => { console.error(e); window.location.reload() });
        asyncExpBackoff(navigator.mediaDevices.getUserMedia, navigator.mediaDevices, 10, 1000, 1.3)({ video: true, audio: false }).then(this.cameraReady.bind(this)).catch((e) => { console.error(e); window.location.reload() });
        console.info("Connection Manager Started")
        await waitforCondition(() => this._cloudLivekitConnection && this._cloudLivekitConnection.connectionState && this._cloudLivekitConnection.connectionState.get() === ConnectionStates.connected)
    }

    public async startSimplePeerConnection(userId: string, firstSignallingMessage?: string) {
        if (this._simplePeerConnections[userId]) {
            this._simplePeerConnections[userId].stop();
            delete this._simplePeerConnections[userId];
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
        if (spConn) {
            if ([ConnectionStates.failed, ConnectionStates.disconnectedOk].includes(spConn.connectionState.get())) {
                console.log("SP: Reconnecting to " + userId + " after signalling message received connectionState: " + spConn.connectionState.get())
                await this.startSimplePeerConnection(userId, signallingMsg);
            } else spConn.ingestSignalingMsg(signallingMsg);
        } else await this.startSimplePeerConnection(userId, signallingMsg);
    }

    public async _sendMessageViaLivekit(msg: Uint8Array, reliable: boolean, toUserIds: string[]) {
        await this._cloudLivekitConnection.sendMessage(msg, reliable, toUserIds);
        // await this._localLivekitConnection.sendMessage(msg, reliable, toUserIds);
    }

    public async sendMessage(msg: rov_actions_proto.IRovResponse, reliable: boolean, toUserIds: string[]) {
        if (!msg) return false;
        if (this._cloudLivekitConnection.connectionState.get() !== ConnectionStates.connected) {
            if (URL_PARAMS.DEBUG_MODE) console.debug("LK: Message Not Sent, Livekit Not Connected",);
            return false;
        }
        if (URL_PARAMS.DEBUG_MODE) console.debug("LK/SP: " + (toUserIds.length == 0 ? "Broadcasting msg " : "Sending msg to [" + toUserIds.join(", ") + "]") + (reliable ? "reliably" : "unreliably") + ":", msg);
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
        // await this._localLivekitConnection.sendMessage(msgBytes, reliable, notSentPeers);
        return true;
    }

}


export const internalConnManager = new InternalConnectionManager();
