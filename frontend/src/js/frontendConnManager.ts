import { ConnectionStates, LIVEKIT_FRONTEND_ROOM_CONFIG, LIVEKIT_FRONTEND_ROOM_CONNECTION_CONFIG, SIMPLEPEER_BASE_CONFIG } from "./shared/consts";
import { default as nStore } from "./shared/libraries/nStore";
import { listLivekitRoomsWithoutSDK, getAuthTokenFromLivekitRoomMetadata, type AuthTokenInfo } from "./shared/livekit/adminlessActions";
import { LivekitViewerConnection } from "./shared/livekit/livekitConn";
import { rov_actions_proto } from "./shared/protobufs/rovActionsProto";
import { SimplePeerConnection } from "./shared/simplePeer";
import { changesSubscribe, oneShotSubscribe, waitfor } from "./shared/util";
import { showToastMessage, ToastSeverity } from "./toastMessageManager";
import { LIVEKIT_LIST_ONLY_TOKEN, URL_PARAMS } from "./frontendConsts";
import { frontendRovMsgHandler } from "./rovMessageHandler";

export interface LivekitRoomInfo {
    name: string;
    token: AuthTokenInfo;
}

export enum VideoStreamMethod {
    none = "none",
    livekit = "livekit",
    simplepeer = "simplepeer",
}

interface InternalLivekitSetupOptions {
    RovName: string,
    APIKey: string,
    SecretKey: string,
    LivekitCloudURL: string,
    LivekitLocalURL: string,
}

export class FrontendConnectionManager {
    connectionState = nStore<ConnectionStates>(ConnectionStates.init);
    livekitConnection = new LivekitViewerConnection();
    videoStreams = nStore<MediaStream | undefined>(undefined);
    currentLivekitIdentity = nStore<string | null>(null);
    simplepeerConnection: SimplePeerConnection;
    livekitRoomPollingInterval: number = -1;
    openLivekitRoomInfo = nStore<LivekitRoomInfo[]>([]);
    _cleanupFuncs: { [key: string]: () => void } = {};
    currentVideoStreamMethod = nStore<VideoStreamMethod>(VideoStreamMethod.none);


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
    }

    /**
     * sends normal HTTP request to livekit server to get list of open rooms every second
     * and sets the result in this.openLivekitRooms nStore.
     * @param hostName - the hostname of the livekit server to poll
     */
    async pollForOpenLivekitRooms(hostName: string) {
        if (this.livekitRoomPollingInterval !== -1) clearInterval(this.livekitRoomPollingInterval)
        const listOpenRooms = async () => {
            if (this.connectionState.get() === ConnectionStates.connected || this.connectionState.get() === ConnectionStates.reconnecting) return;
            let openRooms;
            try {
                openRooms = await listLivekitRoomsWithoutSDK(hostName, LIVEKIT_LIST_ONLY_TOKEN)
            } catch (e) {
                console.warn("LK Error: Could not retrive list of livekit rooms", e)
                return this.openLivekitRoomInfo.set([])
            }
            const validOpenRooms = openRooms //.filter(room => room.num_participants > 0 && room.metadata.length > 0);
            const openRoomInfo = validOpenRooms.map(room => ({
                name: room.name,
                token: room.metadata.length === 0 ? "" : getAuthTokenFromLivekitRoomMetadata(room.metadata)
            } as LivekitRoomInfo)).sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            this.openLivekitRoomInfo.set(openRoomInfo)
        }
        await listOpenRooms();
        this.livekitRoomPollingInterval = window.setInterval(listOpenRooms, 5000)
    }

    async onConnectedActions() {
        await this.startSimplePeerConnection();


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
        this.livekitConnection.close(); // close incase we are already connected
        this.pollForOpenLivekitRooms(URL_PARAMS.LIVEKIT_CLOUD_ENDPOINT)
        await this.livekitConnection.init({
            hostUrl: URL_PARAMS.LIVEKIT_CLOUD_ENDPOINT,
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
        this.livekitConnection.close(); // close incase we are already connected
        this.pollForOpenLivekitRooms(URL_PARAMS.LIVEKIT_LOCAL_ENDPOINT)
        await this.livekitConnection.init({
            hostUrl: URL_PARAMS.LIVEKIT_LOCAL_ENDPOINT,
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
    public async connectToLivekitRoom(roomName: string, authToken: string) {
        if (!this.livekitConnection || !this.livekitConnection.config) throw new Error("connectToLivekitRoom() called before livekitConnection was initilized")

        this._keepTrackOfConnectionState();
        await this.livekitConnection.start(roomName, authToken);
        this.currentLivekitIdentity.set(this.livekitConnection.getLivekitIdentitiy())
        oneShotSubscribe(this.livekitConnection.latestRecivedDataMessage, () => this.onConnectedActions())
    }

    /**
     * Initilizes a direct simplepeer connection with the rov and starts it with the appropriate callbacks.
     * If a simplepeer connection already exists, it is stopped and a new one is created.
     * requires that the livekit connection is already initilized.
     */
    public async startSimplePeerConnection() {
        if (!this.livekitConnection || this.livekitConnection.connectionState.get() != ConnectionStates.connected) throw new Error("startSimplePeerConnection() called when livekitConnection was not fully connected!")
        if (!this.simplepeerConnection) throw new Error("startSimplePeerConnection() called without initilized simplepeerConnection!")
        this.simplepeerConnection.start(Object.assign({}, SIMPLEPEER_BASE_CONFIG, { initiator: true, offerOptions: { offerToReceiveVideo: true } }))
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
        console.log("toggleSimplePeerConnection(): state", state)
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
    public async sendMessageToRov(msg: rov_actions_proto.IRovAction, reliable: boolean = false) {
        if (!this.livekitConnection) throw new Error("sendMessageToRov() called before livekitConnection was initilized")
        reliable = false; // TODO: remove. Temp debug
        const msgBytes = rov_actions_proto.RovAction.encode(msg).finish();
        const rovUserId = this.livekitConnection._rovRoomName;
        if (URL_PARAMS.DEBUG_MODE) console.debug("Sending Message to ", rovUserId, reliable ? "reliably" : "unreliably", ":", msg);
        if (reliable && this.livekitConnection.connectionState.get() === ConnectionStates.connected) {
            await this.livekitConnection.sendMessage(msgBytes, reliable, [rovUserId]);
        } else if (this.simplepeerConnection && this.simplepeerConnection.connectionState.get() === ConnectionStates.connected) {
            await this.simplepeerConnection.sendMessage(msgBytes);
        } else {
            await this.livekitConnection.sendMessage(msgBytes, false, [rovUserId]);
        }
    }

    public async disconnect() {
        if (this.simplepeerConnection) await this.simplepeerConnection.stop();
        if (this.livekitConnection) await this.livekitConnection.close();
        for (const key in this._cleanupFuncs) this._cleanupFuncs[key]();
    }
}

export const frontendConnMngr = new FrontendConnectionManager()
