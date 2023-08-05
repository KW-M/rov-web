import { ConnectionStates, LIVEKIT_BACKEND_ROOM_CONFIG, LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG, LIVEKIT_CLOUD_ENDPOINT, LIVEKIT_FRONTEND_ROOM_CONFIG, LIVEKIT_FRONTEND_ROOM_CONNECTION_CONFIG, LIVEKIT_LOCAL_ENDPOINT } from "../../../shared/js/consts";
import { default as nStore, type nStoreT } from "../../../shared/js/libraries/nStore";
import { listLivekitRoomsSansSDK, getAuthTokenFromLivekitRoomMetadata } from "../../../shared/js/livekit/adminActions";
import { LivekitViewerConnection } from "../../../shared/js/livekit/livekitConn";
import { rov_actions_proto } from "../../../shared/js/protobufs/rovActionsProto";
import { SimplePeerConnection } from "../../../shared/js/simplePeer";
import { changesSubscribe, oneShotSubscribe, waitfor } from "../../../shared/js/util";
import { showToastMessage } from "../components/ToastMessages.svelte";
import { LIVEKIT_LIST_ONLY_TOKEN } from "./consts";
import { frontendRovMsgHandler } from "./rovMessageHandler";

export class FrontendConnectionManager {
    connectionState: nStoreT<ConnectionStates> = nStore(ConnectionStates.init);
    livekitConnection: LivekitViewerConnection = new LivekitViewerConnection();
    mainVideoStream: nStoreT<MediaStream> = nStore(null);
    currentLivekitIdentity: nStoreT<string> = nStore("None");
    simplepeerConnection: SimplePeerConnection;
    livekitRoomPollingInterval: number = -1;
    openLivekitRoomNames: nStoreT<string[]> = nStore([]);
    livekitRoomAuthTokens: { [key: string]: string } = {}; // key is room name, value is room token
    _cleanupFuncs: { [key: string]: () => void } = {};

    constructor() {
        this.simplepeerConnection = new SimplePeerConnection();
        changesSubscribe(this.livekitConnection.latestRecivedDataMessage, (msgInfo) => {
            const { senderId, msg } = msgInfo;
            if (senderId != this.livekitConnection.getRoomName()) return; // ignore messages from other participants (not rov)
            frontendRovMsgHandler.handleRecivedMessage(msg)
        })
        changesSubscribe(this.simplepeerConnection.latestRecivedDataMessage, (msg) => {
            frontendRovMsgHandler.handleRecivedMessage(msg)
        })
        changesSubscribe(this.simplepeerConnection.outgoingSignalingMessages, (msg) => {
            this.sendMessageToRov({ SimplepeerSignal: { Message: msg } }, true)
        })
        changesSubscribe(this.simplepeerConnection.currentVideoStream, () => this.updateVideoStream())
        changesSubscribe(this.livekitConnection.remoteVideoTrack, () => this.updateVideoStream())
    }

    private updateVideoStream() {
        const livekitVideoStream = this.livekitConnection.remoteVideoTrack.get()
        const simplepeerVideoStream = this.simplepeerConnection.currentVideoStream.get()
        setTimeout(() => {
            if (simplepeerVideoStream && simplepeerVideoStream.getVideoTracks().length > 0 && !simplepeerVideoStream.getVideoTracks()[0].muted) {
                showToastMessage("Using Direct Video")
                if (livekitVideoStream) livekitVideoStream.stop();
                this.mainVideoStream.set(simplepeerVideoStream)
            } else if (livekitVideoStream) {
                showToastMessage("Using Livekit Video")
                livekitVideoStream.start();
                this.mainVideoStream.set(livekitVideoStream.mediaStream)
            } else {
                showToastMessage("No Video")
            }
        }, 100)
    }

    /**
     * sends normal HTTP request to livekit server to get list of open rooms every second
     * and sets the result in this.openLivekitRooms nStore.
     * @param hostName - the hostname of the livekit server to poll
     */
    async pollForOpenLivekitRooms(hostName) {
        if (this.livekitRoomPollingInterval !== -1) clearInterval(this.livekitRoomPollingInterval)
        const listOpenRooms = async () => {
            if (this.connectionState.get() === ConnectionStates.connected || this.connectionState.get() === ConnectionStates.reconnecting) return;
            const openRooms = await listLivekitRoomsSansSDK(hostName, LIVEKIT_LIST_ONLY_TOKEN)
            const openRoomNames = openRooms.map(room => room.name)
            const openRoomTokens = openRooms.reduce((authTokens, room) => {
                authTokens[room.name] = getAuthTokenFromLivekitRoomMetadata(room.metadata);
                return authTokens
            }, this.livekitRoomAuthTokens)
            this.openLivekitRoomNames.set(openRoomNames)
            this.livekitRoomAuthTokens = openRoomTokens
            // console.log("openRoomNames: ", openRoomNames, "openRoomTokens: ", openRoomTokens, "raw:", openRooms)
        }
        await listOpenRooms();
        this.livekitRoomPollingInterval = Number(setInterval(listOpenRooms, 1000))
    }

    /**
     * Keeps track of the connection state of both the livekit and simplepeer connections and aggriagates them into a single nStore called
     * this.connectionState. This is useful for the frontend to know if the connection is connected, connecting, disconnected, etc.
     */
    async _keepTrackOfConnectionState() {
        if (this._cleanupFuncs['livekitConnState']) this._cleanupFuncs['livekitConnState']()
        const unsubA = changesSubscribe(this.livekitConnection.connectionState, (livekitState) => {
            if (this.simplepeerConnection && this.simplepeerConnection.connectionState.get() === ConnectionStates.connected) {
                this.connectionState.set(ConnectionStates.connected)
            } else {
                this.connectionState.set(livekitState)
            }
        })
        const unsubB = changesSubscribe(this.simplepeerConnection.connectionState, (simplepeerState) => {
            if (this.livekitConnection && this.livekitConnection.connectionState.get() === ConnectionStates.connected) {
                this.connectionState.set(ConnectionStates.connected)
            } else {
                this.connectionState.set(simplepeerState)
            }
        })
        this._cleanupFuncs['livekitConnState'] = () => { unsubA(); unsubB() }
    }

    /**
     * Initilizes the livekit connection using livekit cloud
     * address/parameters and starts polling for open rooms.
     * Does NOT join a room. call connectToLivekitRoom() to do that.
     */
    async initUsingCloudLivekitConnection() {
        if (this.livekitConnection) {
            console.warn("initUsingCloudLivekitConnection(): Already connected to Livekit!")
            this.livekitConnection.close();
        }
        this.pollForOpenLivekitRooms(LIVEKIT_CLOUD_ENDPOINT)
        await this.livekitConnection.init({
            hostUrl: LIVEKIT_CLOUD_ENDPOINT,
            publishVideo: false,
            reconnectAttempts: 3,
            roomConnectionConfig: LIVEKIT_FRONTEND_ROOM_CONNECTION_CONFIG,
            roomConfig: LIVEKIT_FRONTEND_ROOM_CONFIG
        })
    }

    /**
     * Initilizes the livekit connection using livekit local server
     * address/parameters and starts polling for open rooms.
     * Does NOT join a room. call connectToLivekitRoom() to do that.
     */
    async initUsingLocalLivekitConnection() {
        if (this.livekitConnection) {
            console.warn("initUsingCloudLivekitConnection(): Already connected to Livekit!")
            this.livekitConnection.close();
        }
        this.pollForOpenLivekitRooms(LIVEKIT_LOCAL_ENDPOINT)
        await this.livekitConnection.init({
            hostUrl: LIVEKIT_LOCAL_ENDPOINT,
            publishVideo: false,
            reconnectAttempts: 3,
            roomConnectionConfig: LIVEKIT_FRONTEND_ROOM_CONNECTION_CONFIG,
            roomConfig: LIVEKIT_FRONTEND_ROOM_CONFIG
        })
    }

    /**
     * Connects to a livekit room with the given name.
     * requires that the livekit connection is already initilized
     * and the room auth token is known.
     */
    public async connectToLivekitRoom(roomName: string) {
        if (!this.livekitConnection) throw new Error("connectToLivekitRoom() called before livekitConnection was initilized")

        const authToken = this.livekitRoomAuthTokens[roomName]
        if (!authToken) throw new Error(`connectToLivekitRoom() called with roomName ${roomName} which is not in the list of known open rooms`)

        this._keepTrackOfConnectionState();
        await this.livekitConnection.start(roomName, authToken);
        this.currentLivekitIdentity.set(this.livekitConnection.getLivekitIdentitiy())

        // oneShotSubscribe(this.livekitConnection.latestRecivedDataMessage, () => this.startSimplePeerConnection())
    }

    /**
     * Initilizes a direct simplepeer connection with the rov and starts it with the appropriate callbacks.
     * If a simplepeer connection already exists, it is stopped and a new one is created.
     * requires that the livekit connection is already initilized.
     */
    public async startSimplePeerConnection() {
        if (!this.livekitConnection || this.livekitConnection.connectionState.get() != ConnectionStates.connected) throw new Error("startSimplePeerConnection() called when livekitConnection was not fully connected!")
        if (this.simplepeerConnection) this.simplepeerConnection.stop();
        await this.simplepeerConnection.start({
            initiator: true,
            trickle: false,
        })
    }

    /**
     * Triggers the onSignal callback of the simplepeer connection.
     * Should be called in response to a message from the rov containing simplepeer signalling data.
     */
    public async ingestSimplePeerSignallingMsg(signallingMsg: string) {
        const spConn = this.simplepeerConnection;
        if (spConn) spConn.ingestSignalingMsg(signallingMsg);
        else throw new Error("ingestSimplePeerSignallingMsg() called when simplepeerConnection was not initilized!")
    }

    public async toggleSimplePeerConnection() {
        if (!this.simplepeerConnection) throw new Error("toggleSimplePeerConnection() called without simplepeerConnection in class!")
        const state = this.simplepeerConnection.connectionState.get();
        if ([ConnectionStates.disconnectedOk, ConnectionStates.failed, ConnectionStates.init].includes(state)) {
            this.startSimplePeerConnection();
        } else {
            this.simplepeerConnection.stop();
        }
    }

    /**
     * Sends a message to the rov. If reliable is true, it will use the livekit connection.
     * If reliable is false, it will use the simplepeer connection if it is connected, otherwise it will use the livekit connection.
     * @param msg - the message to send to the rov
     * @param reliable - whether or not to use tcp and force the livekit connection.
     */
    public async sendMessageToRov(msg: rov_actions_proto.IRovAction, reliable: boolean) {
        if (!this.livekitConnection) throw new Error("sendMessageToRov() called before livekitConnection was initilized")
        console.info("Sending RovMessaged: ", msg, reliable);
        const msgBytes = rov_actions_proto.RovAction.encode(msg).finish();
        const rovUserId = this.livekitConnection._rovRoomName;
        if (reliable) {
            await this.livekitConnection.sendMessage(msgBytes, reliable, []);//rovUserId
        } else if (this.simplepeerConnection && this.simplepeerConnection.connectionState.get() === ConnectionStates.connected) {
            await this.simplepeerConnection.sendMessage(msgBytes);
        } else {
            await this.livekitConnection.sendMessage(msgBytes, false, [rovUserId]);
        }
    }

    public async disconnectFromLivekitRoom() {
        if (this.simplepeerConnection) await this.simplepeerConnection.stop();
        if (this.livekitConnection) await this.livekitConnection.close();
        for (const key in this._cleanupFuncs) this._cleanupFuncs[key]();
    }
}

export const frontendConnMngr = new FrontendConnectionManager()
