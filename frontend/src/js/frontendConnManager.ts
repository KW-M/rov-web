import { ConnectionStates, LIVEKIT_FRONTEND_ROOM_CONFIG, LIVEKIT_FRONTEND_ROOM_CONNECTION_CONFIG, SIMPLEPEER_BASE_CONFIG } from "./shared/consts";
import { default as nStore, type nStoreT } from "./shared/libraries/nStore";
import { listLivekitRoomsWithoutSDK, getAuthTokenFromLivekitRoomMetadata, type AuthTokenInfo } from "./shared/livekit/adminlessActions";
import { LivekitViewerConnection } from "./livekitViewerConn";
import { SimplePeerConnection } from "./shared/simplePeer";
import { changesSubscribe, oneShotSubscribe, waitfor } from "./shared/util";
import { closeToastMessage, showToastMessage, ToastSeverity } from "./toastMessageManager";
import { LIVEKIT_LIST_ONLY_TOKEN, SIMPLEPEER_PILOT_CONFIG, URL_PARAMS } from "./frontendConsts";
import { frontendRovMsgHandler } from "./rovMessageHandler";
import { log, logDebug, logInfo, logWarn, logError } from "../js/shared/logging"
import { type Room } from "livekit-server-sdk";
import { type ComputedRtpStats } from "./shared/videoStatsParser";
import { RovAction, RovResponse } from "./shared/protobufs/rov_actions";
import { debugModeOn } from "./globalContext";

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

    livekitVideoStats: nStoreT<ComputedRtpStats | null> = nStore<ComputedRtpStats | null>(null);
    simplePeerVideoStats: nStoreT<ComputedRtpStats | null> = nStore<ComputedRtpStats | null>(null);

    // interval id for checking video stats loop
    _videoStatsIntervalId: NodeJS.Timeout | null;
    // cleanup functions for all the subscriptions we use - all get called on cleanup()
    _cleanupFuncs: { [key: string]: () => void } = {};

    constructor() {
        this._addCleanupFunc(changesSubscribe(this.livekitConnection.latestRecivedDataMessage, (msgInfo) => {
            const { senderId, msgBytes } = msgInfo;
            if (senderId != this.livekitConnection.getRoomName()) return; // ignore messages from other participants (not the rov)
            frontendRovMsgHandler.processRecivedMessage(msgBytes)
        }))


        this.simplePeerConnection = new SimplePeerConnection(SIMPLEPEER_PILOT_CONFIG);
        this._addCleanupFunc(changesSubscribe(this.simplePeerConnection.latestRecivedDataMessage, (msgBytes) => {
            frontendRovMsgHandler.processRecivedMessage(msgBytes)
        }))
        this._addCleanupFunc(changesSubscribe(this.simplePeerConnection.outgoingSignalingMessages, (signalStr) => {
            frontendRovMsgHandler.sendRovMessage(RovAction.create({
                body: {
                    oneofKind: "simplePeerSignal",
                    simplePeerSignal: {
                        message: signalStr
                    }
                }
            }), true)
        }))
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
            const connectionState = this.connectionState.get()
            if (!([ConnectionStates.init, ConnectionStates.disconnectedOk, ConnectionStates.failed].includes(connectionState))) return;
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

    onConnectedActions() {
        log("Connected to ROV", this.livekitConnection._roomConn.name, this.livekitConnection._roomConn.isRecording, this.livekitConnection._roomConn.remoteParticipants.keys())
        showToastMessage(`Connected to ROV ${this.livekitConnection._roomConn.name}!`, 2000, false, ToastSeverity.success)
        setTimeout(() => {
            log("Starting simplepeer after onConnectedActions: remote participants=", this.livekitConnection._roomConn.remoteParticipants.keys())
            this.startSimplePeerConnection();
        }, 1000)
    }

    onReconnectActions() {
        logInfo("Reconnected to ROV", this.livekitConnection._roomConn.name)
        showToastMessage(`Reconnected to ROV ${this.livekitConnection._roomConn.name}`, 20000, false, ToastSeverity.success)
        if (this.simplePeerConnection) {
            this.simplePeerConnection.restartIce();
        }
    }

    startVideoStatsCollection() {
        if (this._videoStatsIntervalId) clearInterval(this._videoStatsIntervalId);
        this._videoStatsIntervalId = setInterval(async () => {
            const lkStats = await this.livekitConnection.getVideoStats();
            this.livekitVideoStats.set(lkStats);
            const spStats = await this.simplePeerConnection.getStats();
            this.simplePeerVideoStats.set(spStats);
        }, 600)
    }

    /**
     * Keeps track of the connection state of both the livekit and simplePeer connections and aggriagates them into a single nStore called
     * this.connectionState. This is useful for the frontend to know if the connection is connected, connecting, disconnected, etc.
     */
    async _keepTrackOfConnectionState() {
        this._runCleanupFunc('livekitConnState')
        this._runCleanupFunc('simplepeerConnState')
        this._addCleanupFunc(changesSubscribe(this.livekitConnection.connectionState, (livekitState, prevLivekitState) => {
            if (this.simplePeerConnection && this.simplePeerConnection.connectionState.get() === ConnectionStates.connected) {
                this.connectionState.set(ConnectionStates.connected)
            } else if (livekitState === ConnectionStates.connected) {
                this.connectionState.set(ConnectionStates.connected)
            } else {
                this.connectionState.set(livekitState)
            }

            if (this.connectionState.get() === ConnectionStates.reconnecting) {
                showToastMessage("Reconnecting...", 100000, false, ToastSeverity.info)
            } else {
                closeToastMessage("Reconnecting...")
            }

            if (livekitState === ConnectionStates.connected && prevLivekitState === ConnectionStates.reconnecting) this.onReconnectActions();
        }), 'livekitConnState')
        this._addCleanupFunc(changesSubscribe(this.simplePeerConnection.connectionState, (simplePeerState) => {
            if (this.livekitConnection && this.livekitConnection.connectionState.get() === ConnectionStates.connected) {
                this.connectionState.set(ConnectionStates.connected)
            } else {
                this.connectionState.set(simplePeerState)
            }
        }), 'simplepeerConnState')
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
        this.simplePeerConnection.start(true)
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
    public async sendMessageToRov(msg: RovAction, reliable: boolean = true) {
        if (!this.livekitConnection) throw new Error("sendMessageToRov() called before livekitConnection was initilized")
        const msgBytes = RovAction.toBinary(msg)
        const rovUserId = this.livekitConnection._rovRoomName;
        if (debugModeOn.get()) logDebug("Sending Message to ", rovUserId, reliable ? "reliably" : "unreliably", ":", `(${msgBytes.byteLength} bytes) LK: ${this.livekitConnection.connectionState.get()} SP: ${this.simplePeerConnection.connectionState.get()}`, msg);
        if (reliable && this.livekitConnection.connectionState.get() === ConnectionStates.connected) {
            await this.livekitConnection.sendMessage(msgBytes, reliable, [rovUserId]);
        }
        // else if (this.simplePeerConnection && this.simplePeerConnection.connectionState.get() === ConnectionStates.connected) {
        //     await this.simplePeerConnection.sendMessage(msgBytes);
        // }
        else {
            await this.livekitConnection.sendMessage(msgBytes, false, [rovUserId]);
        }
    }

    public close() {
        this.connectionState.set(ConnectionStates.disconnectedOk);
        if (this.livekitConnection) this.livekitConnection.close();
        if (this.simplePeerConnection) this.simplePeerConnection.stop();
        if (this._videoStatsIntervalId) clearInterval(this._videoStatsIntervalId);
        for (const key in this._cleanupFuncs) this._cleanupFuncs[key]();
        this._cleanupFuncs = {};
    }

    _addCleanupFunc(func: () => void, key?: string) {
        key = key ?? Math.random().toString(36).substring(7);
        this._cleanupFuncs[key] = func;
        return key;
    }

    _runCleanupFunc(key: string) {
        if (this._cleanupFuncs[key]) {
            this._cleanupFuncs[key]();
            delete this._cleanupFuncs[key];
        }
    }
}

export const frontendConnMngr = new FrontendConnectionManager()
