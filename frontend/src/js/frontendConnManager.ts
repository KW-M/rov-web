import { ConnectionStates, LIVEKIT_FRONTEND_ROOM_CONFIG, LIVEKIT_FRONTEND_ROOM_CONNECTION_CONFIG, SIMPLEPEER_BASE_CONFIG } from "./shared/consts";
import { default as nStore, type nStoreT } from "./shared/libraries/nStore";
import { listLivekitRoomsWithoutSDK, getAuthTokenFromLivekitRoomMetadata, type AuthTokenInfo } from "./shared/livekit/adminlessActions";
import { LivekitViewerConnection } from "./livekitViewerConn";
import { rov_actions_proto } from "./shared/protobufs/rovActionsProto";
import { SimplePeerConnection } from "./shared/simplePeer";
import { changesSubscribe, oneShotSubscribe, waitfor } from "./shared/util";
import { showToastMessage, ToastSeverity } from "./toastMessageManager";
import { LIVEKIT_LIST_ONLY_TOKEN, URL_PARAMS } from "./frontendConsts";
import { frontendRovMsgHandler } from "./rovMessageHandler";
import { log, logDebug, logInfo, logWarn, logError } from "../js/shared/logging"
import { type Room } from "livekit-server-sdk";
import { type ComputedRecieverStats } from "./shared/videoStatsParser";

export interface LivekitRoomInfo {
    name: string;
    token: AuthTokenInfo;
}

export enum VideoStreamMethod {
    none = "none",
    livekit = "livekit",
    simplePeer = "simplePeer",
}

export class FrontendConnectionManager {
    connectionState = nStore<ConnectionStates>(ConnectionStates.init);
    livekitConnection = new LivekitViewerConnection();
    videoStreams = nStore<MediaStream | undefined>(undefined);
    currentLivekitIdentity = nStore<string | null>(null);
    simplePeerConnection: SimplePeerConnection;
    livekitRoomPollingInterval: number = -1;
    openLivekitRoomInfo = nStore<LivekitRoomInfo[]>([]);
    currentVideoStreamMethod = nStore<VideoStreamMethod>(VideoStreamMethod.none);

    livekitVideoStats: nStoreT<ComputedRecieverStats | null> = nStore<ComputedRecieverStats | null>(null);
    simplePeerVideoStats: nStoreT<ComputedRecieverStats | null> = nStore<ComputedRecieverStats | null>(null);

    // interval id for checking video stats loop
    _videoStatsIntervalId: NodeJS.Timeout | null;
    // cleanup functions for all the subscriptions we use - all get called on cleanup()
    _cleanupFuncs: { [key: string]: () => void } = {};

    constructor() {
        this.simplePeerConnection = new SimplePeerConnection();
        this._cleanupFuncs['lkOnData'] = changesSubscribe(this.livekitConnection.latestRecivedDataMessage, (msgInfo) => {
            const { senderId, msg } = msgInfo;
            if (senderId != this.livekitConnection.getRoomName()) return; // ignore messages from other participants (not rov)
            frontendRovMsgHandler.handleRecivedMessage(msg)
        })
        this._cleanupFuncs['spOnData'] = changesSubscribe(this.simplePeerConnection.latestRecivedDataMessage, (msg) => {
            frontendRovMsgHandler.handleRecivedMessage(msg)
        })
        this._cleanupFuncs['outSignal'] = changesSubscribe(this.simplePeerConnection.outgoingSignalingMessages, (msg) => {
            this.sendMessageToRov({ SimplePeerSignal: { Message: msg } }, true)
        })
        this.startVideoStatsCollection();
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
            let openRooms: Room[];
            try {
                openRooms = await listLivekitRoomsWithoutSDK(hostName, LIVEKIT_LIST_ONLY_TOKEN)
            } catch (e) {
                logWarn("LK Error: Could not retrive list of livekit rooms", e)
                return this.openLivekitRoomInfo.set([])
            }
            const openRoomInfo = openRooms.map(room => ({
                name: room.name,
                token: room.metadata.length === 0 ? null : getAuthTokenFromLivekitRoomMetadata(room.metadata, room.numParticipants)
            } as LivekitRoomInfo)).sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            this.openLivekitRoomInfo.set(openRoomInfo)
        }
        await listOpenRooms();
        this.livekitRoomPollingInterval = window.setInterval(listOpenRooms, 5000)
    }

    async onConnectedActions() {
        // await this.startSimplePeerConnection();
        showToastMessage(`Connected to ROV ${this.livekitConnection._roomConn.name}!`, 2000, false, ToastSeverity.success)
        // this.startSimplePeerConnection();
    }

    startVideoStatsCollection() {
        if (this._videoStatsIntervalId) clearInterval(this._videoStatsIntervalId);
        this._videoStatsIntervalId = setInterval(async () => {
            const lkStats = await this.livekitConnection.getVideoStats();
            if (lkStats) this.livekitVideoStats.set(lkStats);
            // const spStats = await this.simplePeerConnection.getVideoStats();
            // if (spStats) this.simplePeerVideoStats.set(spStats);
        }, 600)
    }

    /**
     * Keeps track of the connection state of both the livekit and simplePeer connections and aggriagates them into a single nStore called
     * this.connectionState. This is useful for the frontend to know if the connection is connected, connecting, disconnected, etc.
     */
    async _keepTrackOfConnectionState() {
        if (this._cleanupFuncs['livekitConnState']) this._cleanupFuncs['livekitConnState']()
        const unsubA = changesSubscribe(this.livekitConnection.connectionState, (livekitState) => {
            if (this.simplePeerConnection && this.simplePeerConnection.connectionState.get() === ConnectionStates.connected) {
                this.connectionState.set(ConnectionStates.connected)
            } else if (livekitState === ConnectionStates.connected) {
                this.connectionState.set(ConnectionStates.connected)
            } else {
                this.connectionState.set(livekitState)
            }
        })
        const unsubB = changesSubscribe(this.simplePeerConnection.connectionState, (simplePeerState) => {
            if (this.livekitConnection && this.livekitConnection.connectionState.get() === ConnectionStates.connected) {
                this.connectionState.set(ConnectionStates.connected)
            } else {
                this.connectionState.set(simplePeerState)
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
     * Initilizes a direct simplePeer connection with the rov and starts it with the appropriate callbacks.
     * If a simplePeer connection already exists, it is stopped and a new one is created.
     * requires that the livekit connection is already initilized.
     */
    public async startSimplePeerConnection() {
        if (!this.livekitConnection || this.livekitConnection.connectionState.get() != ConnectionStates.connected) throw new Error("startSimplePeerConnection() called when livekitConnection was not fully connected!")
        if (!this.simplePeerConnection) throw new Error("startSimplePeerConnection() called without initilized simplePeerConnection!")
        this.simplePeerConnection.start(Object.assign({}, SIMPLEPEER_BASE_CONFIG, { initiator: true, offerOptions: { offerToReceiveVideo: true, offerToReciveAudio: false } }), true)
    }

    /**
     * Triggers the onSignal callback of the simplePeer connection.
     * Should be called in response to a message from the rov containing simplePeer signalling data.
     */
    public async ingestSimplePeerSignallingMsg(signallingMsg: string) {
        const spConn = this.simplePeerConnection;
        if (spConn) spConn.ingestSignalingMsg(signallingMsg);
        else throw new Error("ingestSimplePeerSignallingMsg() called when simplePeerConnection was not initilized!")
    }

    // public async toggleSimplePeerConnection() {
    //     if (!this.simplePeerConnection) throw new Error("toggleSimplePeerConnection() called without simplePeerConnection in class!")
    //     const state = this.simplePeerConnection.connectionState.get();
    //     log("toggleSimplePeerConnection(): state", state)
    //     if ([ConnectionStates.disconnectedOk, ConnectionStates.failed, ConnectionStates.init].includes(state)) {
    //         this.startSimplePeerConnection();
    //     } else {
    //         this.simplePeerConnection.stop();
    //     }
    // }

    public async setSimplePeerCodec(mimeType: string) {
        if (!this.simplePeerConnection) throw new Error("setSimplePeerCodec() called without simplePeerConnection in class!")
        this.simplePeerConnection.setCodecPreferences([mimeType])
    }

    /**
     * Sends a message to the rov. If reliable is true, it will use the livekit connection.
     * If reliable is false, it will use the simplePeer connection if it is connected, otherwise it will use the livekit connection.
     * @param msg - the message to send to the rov
     * @param reliable - whether or not to use tcp and force the livekit connection.
     */
    public async sendMessageToRov(msg: rov_actions_proto.IRovAction, reliable: boolean = true) {
        if (!this.livekitConnection) throw new Error("sendMessageToRov() called before livekitConnection was initilized")
        const msgBytes = rov_actions_proto.RovAction.encode(msg).finish();
        const rovUserId = this.livekitConnection._rovRoomName;
        if (URL_PARAMS.DEBUG_MODE) logDebug("Sending Message to ", rovUserId, reliable ? "reliably" : "unreliably", ":", msg);
        if (reliable && this.livekitConnection.connectionState.get() === ConnectionStates.connected) {
            await this.livekitConnection.sendMessage(msgBytes, reliable, [rovUserId]);
        } else if (this.simplePeerConnection && this.simplePeerConnection.connectionState.get() === ConnectionStates.connected) {
            await this.simplePeerConnection.sendMessage(msgBytes);
        } else {
            await this.livekitConnection.sendMessage(msgBytes, false, [rovUserId]);
        }
    }

    public async close() {
        if (this.livekitConnection) this.livekitConnection.close();
        if (this.simplePeerConnection) this.simplePeerConnection.stop();
        if (this._videoStatsIntervalId) clearInterval(this._videoStatsIntervalId);
        for (const key in this._cleanupFuncs) this._cleanupFuncs[key]();
    }
}

export const frontendConnMngr = new FrontendConnectionManager()
