import { LIVEKIT_BACKEND_ROOM_CONFIG, LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG, LIVEKIT_CLOUD_ENDPOINT, LIVEKIT_FRONTEND_ROOM_CONNECTION_CONFIG, LIVEKIT_LOCAL_ENDPOINT } from "../../../shared/js/consts";
import { default as nStore, type nStoreT } from "../../../shared/js/libraries/nStore";
import { listLivekitRoomsSansSDK } from "../../../shared/js/livekit/adminActions";
import { LivekitViewerConnection } from "../../../shared/js/livekit/livekitConn";
import { rov_actions_proto } from "../../../shared/js/protobufs/rovActionsProto";
import { SimplePeerConnection } from "../../../shared/js/simplePeer";
import { LIVEKIT_LIST_ONLY_TOKEN } from "./consts";

export class FrontendConnectionManager {
    openLivekitRooms: nStoreT<any[]> = nStore([]);
    livekitConnection: LivekitViewerConnection;
    simplepeerConnection: SimplePeerConnection;

    async startUsingLocalLivekitConnection() {
        const openRooms = await this.livekitListOpenRooms(LIVEKIT_LOCAL_ENDPOINT)
        this.openLivekitRooms.set(openRooms)
        this.livekitConnection = this.createLivekitLocalConnection()
    }

    async startUsingCloudLivekitConnection() {
        const openRooms = await this.livekitListOpenRooms(LIVEKIT_CLOUD_ENDPOINT)
        this.openLivekitRooms.set(openRooms)
        this.livekitConnection = this.createLivekitCloudConnection()
    }

    async livekitListOpenRooms(hostName: string) {
        const openRooms = await listLivekitRoomsSansSDK(hostName, LIVEKIT_LIST_ONLY_TOKEN)
        return openRooms
    }

    async connectToLivekitRoom(roomName: string, authToken: string) {
        await this.livekitConnection.start(roomName, authToken);
        await this.startSimplePeerConnection()
    }


    public async startSimplePeerConnection() {
        if (this.simplepeerConnection) this.simplepeerConnection.stop();
        const spConn = new SimplePeerConnection();
        spConn.latestRecivedDataMessage.subscribe((msg) => {
            handleFrontendMsgRcvd(msg)
        })
        spConn.outgoingSignalingMessages.subscribe((msg) => {
            this.sendMessageToRov({ SimplepeerSignal: { Message: msg } }, true)
        })
        await spConn.start({
            initiator: true,
            trickle: false,
        })
        this.simplepeerConnection = spConn;
    }

    public async ingestSimplePeerSignallingMsg(signallingMsg: string) {
        const spConn = this.simplepeerConnection;
        if (spConn) spConn.ingestSignalingMsg(signallingMsg);
    }

    public async sendMessageToRov(msg: rov_actions_proto.IRovAction, reliable: boolean) {
        const msgBytes = rov_actions_proto.RovAction.encode(msg).finish();
        const rovUserId = this.livekitConnection._rovRoomName;
        if (reliable) {
            await this.livekitConnection.sendMessage(msgBytes, reliable, [rovUserId]);
        } else if (this.simplepeerConnection && this.simplepeerConnection.connectionState.get() === ConnectionStates.connected) {
            await this.simplepeerConnection.sendMessage(msgBytes);
        } else {
            await this.livekitConnection.sendMessage(msgBytes, false, [rovUserId]);
        }
    }

    createLivekitCloudConnection() {
        return new LivekitViewerConnection({
            hostUrl: LIVEKIT_CLOUD_ENDPOINT,
            publishVideo: false,
            reconnectAttempts: 3,
            roomConnectionConfig: LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG,
            roomConfig: LIVEKIT_BACKEND_ROOM_CONFIG
        })
    }

    createLivekitLocalConnection() {
        return new LivekitViewerConnection({
            hostUrl: LIVEKIT_LOCAL_ENDPOINT,
            publishVideo: false,
            reconnectAttempts: 3,
            roomConnectionConfig: LIVEKIT_FRONTEND_ROOM_CONNECTION_CONFIG,
            roomConfig: LIVEKIT_BACKEND_ROOM_CONFIG
        })
    }
}

export const frontendConnMngr = new FrontendConnectionManager()
