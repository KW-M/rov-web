import { LivekitPublisherConnection } from "../../../shared/js/livekit/livekitConn"
import { LIVEKIT_CLOUD_ENDPOINT, LIVEKIT_LOCAL_ENDPOINT, LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG, DECODE_TXT, ENCODE_TXT, PROXY_PREFIX, LIVEKIT_BACKEND_ROOM_CONFIG } from '../../../shared/js/consts';
import { asyncExpBackoff, changesSubscribe, getWebsocketURL, waitfor } from '../../../shared/js/util';
import { getPublisherAccessToken } from '../../../shared/js/livekit/livekitTokens';
import { backendHandleWebrtcMsgRcvd } from './msgHandler'
import { createLivekitRoom, listLivekitRooms, newLivekitAdminSDKRoomServiceClient, refreshMetadata } from '../../../shared/js/livekit/adminActions';
import { SimplePeerConnection } from "../../../shared/js/simplePeer"
import type { LivekitSetupOptions } from "../../../shared/js/livekit/adminActions";
import { rov_actions_proto } from "../../../shared/js/protobufs/rovActionsProto";

/** ConnectionManager
 * consolodate all the connections into one place
 * messages from any connection are passed to the msgHandler
 * outgoing messages to each user are sent through whichever connection to that user which was most recently active.
 */
class ConnectionManager {
    private _cloudLivekitConnection: LivekitPublisherConnection = new LivekitPublisherConnection();
    private _localLivekitConnection: LivekitPublisherConnection = new LivekitPublisherConnection();
    private _simplePeerConnections: { [userId: string]: SimplePeerConnection } = {};
    private _cameraMediaStream: MediaStream = null;

    constructor() {
        // Initlize (but don't start) the cloud livekit connection:
        this._cloudLivekitConnection.init({
            hostUrl: LIVEKIT_CLOUD_ENDPOINT,
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
        })

        // Initlize (but don't start) the local livekit connection:
        this._localLivekitConnection.init({
            hostUrl: LIVEKIT_LOCAL_ENDPOINT,
            publishVideo: true,
            reconnectAttempts: 300,
            roomConnectionConfig: LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG,
            roomConfig: LIVEKIT_BACKEND_ROOM_CONFIG
        })

        changesSubscribe(this._localLivekitConnection.latestRecivedDataMessage, (msgObj) => {
            if (!msgObj) return;
            const { senderId, msg } = msgObj;
            backendHandleWebrtcMsgRcvd(senderId, msg)
        })
        changesSubscribe(this._localLivekitConnection.connectionState, (state) => {
            console.log("Local Conn State Changed: " + state)
        })
    }

    public async start(livekitSetup: LivekitSetupOptions) {
        if (livekitSetup.EnableLivekitCloud) await asyncExpBackoff(this._setupLivekitRoom, this)(LIVEKIT_CLOUD_ENDPOINT, livekitSetup, this._cloudLivekitConnection)
        if (livekitSetup.EnableLivekitLocal) await asyncExpBackoff(this._setupLivekitRoom, this)(LIVEKIT_LOCAL_ENDPOINT, livekitSetup, this._localLivekitConnection)
        this._cameraMediaStream = await asyncExpBackoff(navigator.mediaDevices.getUserMedia, navigator.mediaDevices)({ video: true, audio: false });
        console.log("ConnectionManager Started")
    }

    public async startSimplePeerConnection(userId: string, firstSignallingMessage?: string) {
        if (this._simplePeerConnections[userId]) {
            this._simplePeerConnections[userId].stop();
            delete this._simplePeerConnections[userId];
        }
        const spConn = new SimplePeerConnection();
        changesSubscribe(spConn.latestRecivedDataMessage, (msg) => {
            backendHandleWebrtcMsgRcvd(userId, msg)
        })
        changesSubscribe(spConn.outgoingSignalingMessages, (msg) => {
            this.sendMessage({ SimplepeerSignal: { Message: msg } }, true, [userId])
        })
        await spConn.start({
            initiator: false,
            trickle: false,
            streams: [this._cameraMediaStream]
        })

        this._simplePeerConnections[userId] = spConn;
        if (firstSignallingMessage) spConn.ingestSignalingMsg(firstSignallingMessage);
    }

    public async ingestSimplePeerSignallingMsg(userId: string, signallingMsg: string) {
        const spConn = this._simplePeerConnections[userId]
        if (spConn) spConn.ingestSignalingMsg(signallingMsg);
        else await this.startSimplePeerConnection(userId, signallingMsg);
    }

    public async _sendMessageViaLivekit(msg: Uint8Array, reliable: boolean, toUserIds: string[]) {
        await this._cloudLivekitConnection.sendMessage(msg, reliable, toUserIds);
        await this._localLivekitConnection.sendMessage(msg, reliable, toUserIds);
    }

    public async sendMessage(msg: rov_actions_proto.IRovResponse, reliable: boolean, toUserIds: string[]) {
        const msgBytes = rov_actions_proto.RovResponse.encode(msg).finish();
        await this._cloudLivekitConnection.sendMessage(msgBytes, reliable, toUserIds);
        await this._localLivekitConnection.sendMessage(msgBytes, reliable, toUserIds);
        for (const userId of toUserIds) {
            if (this._simplePeerConnections[userId]) {
                await this._simplePeerConnections[userId].sendMessage(msgBytes);
            }
        }
    }

    private async _setupLivekitRoom(HostName: string, livekitSetup: LivekitSetupOptions, livekitConnection: LivekitPublisherConnection) {
        const cloudToken = getPublisherAccessToken(livekitSetup.CloudAPIKey, livekitSetup.CloudSecretKey, livekitSetup.RovRoomName);
        const livekitAdminSDK = newLivekitAdminSDKRoomServiceClient(HostName, livekitSetup.CloudAPIKey, livekitSetup.CloudSecretKey)
        await createLivekitRoom(livekitAdminSDK, livekitSetup.RovRoomName);
        await refreshMetadata(livekitAdminSDK, livekitSetup);
        await livekitConnection.start(livekitSetup.RovRoomName, cloudToken);
        // let cloudRoomList = await listLivekitRooms(livekitAdminSDK);
    }
}


export const connectionManager = new ConnectionManager();
