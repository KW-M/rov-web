import {
    Room,
    RoomEvent,
    RemoteParticipant,
    RemoteTrackPublication,
    RemoteTrack,
    Participant,
    VideoPresets,
    DefaultReconnectPolicy,
    RoomConnectOptions,
    LivekitError,
    LocalTrackPublication,
    LocalParticipant,
    LocalAudioTrack,
    MediaDeviceFailure,
    ConnectionQuality,
    ParticipantEvent,
    TrackPublication,
    DisconnectReason,
    DataPacket_Kind
} from 'livekit-client';

export type LivekitSetupOptions = {
    ForceLocal: boolean,
    RovRoomName: string,
    CloudSecretKey: string,
    CloudAPIKey: string,
    LocalSecretKey: string,
    LocalAPIKey: string
}

import { LIVEKIT_CLOUD_ENDPOINT, LIVEKIT_LOCAL_ENDPOINT, LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG, DECODE_TXT, ENCODE_TXT, PROXY_PREFIX } from '../../js/consts';
import { appendLog, getWebsocketURL, waitfor } from '../../js/util';
import { getFrontendAccessToken, getPublisherAccessToken } from '../../js/livekit/livekitTokens';
import { setSendProxyMessageCallback } from '../../js/proxyReciever';
import { handleBackendMsgRcvd } from './msgHandler'
// const RoomServiceClient = globalThis.livekitServerSDK.RoomServiceClient as typeof livekitServerSDKTypes.RoomServiceClient

type msgQueueItem = { msgBytes: Uint8Array, onSendCallback: (msgBytes: Uint8Array) => void }
type MsgRecivedCallback = (msg: Uint8Array, roomId: string, hostUrl: string) => void;
type StateChangeCallback = (connState: string, roomId: string, hostUrl: string) => void;

export class LivekitPublisherConnection {
    roomId: string;
    hostUrl: string;
    accessToken: string;
    roomConn: Room;
    videoElem: Element;

    onMesssageRecived: MsgRecivedCallback;
    onConnStateChange: StateChangeCallback;

    constructor(hostUrl: string, onMesssageRecived: MsgRecivedCallback, onConnStateChange: StateChangeCallback) {
        this.hostUrl = hostUrl;
        this.onMesssageRecived = (msg: Uint8Array) => onMesssageRecived(msg, this.roomId, this.hostUrl);
        this.onConnStateChange = (connState: string) => onConnStateChange(connState, this.roomId, this.hostUrl);

        // creates a new room object with options
        this.roomConn = new Room({

            // specify how offten to retry connection when it fails.
            reconnectPolicy: new DefaultReconnectPolicy(),

            // optimize publishing bandwidth and CPU for published tracks
            dynacast: true,

            // default capture settings
            videoCaptureDefaults: {
                resolution: VideoPresets.h1080.resolution,
                // facingMode: 'environment',
                // deviceId: //get device id beforehand
            },

            publishDefaults: {
                videoCodec: "h264",
            },

        });
    }

    async start(roomId: string, accessToken: string) {
        console.log(`Starting conn with ${roomId} via ${this.hostUrl} token = ${accessToken}`)
        const startTime = Date.now();
        this.roomId = roomId;

        // set up event listeners
        this.roomConn
            .on(RoomEvent.SignalConnected, async () => { // DIFF
                const signalConnectionTime = Date.now() - startTime;
                appendLog(`signal connection established in ${signalConnectionTime}ms`);
                let camResult = await this.roomConn.localParticipant.setCameraEnabled(true);
                console.log(`camResult:`, camResult)
            })
            .on(RoomEvent.Connected, async () => {
                appendLog(`Connected to room: ${this.roomConn.name}`)
            })
            .on(RoomEvent.Disconnected, (reason?: DisconnectReason) => {
                if (!this.roomConn) return;
                appendLog('disconnected from room', { reason }, this.roomConn.localParticipant);
                this.roomConn.participants.forEach((p) => { });
            })
            .on(RoomEvent.Reconnecting, () => {
                appendLog('Reconnecting to room')
            })
            .on(RoomEvent.Reconnected, async () => {
                appendLog(
                    'Successfully reconnected. server',
                    await this.roomConn.engine.getConnectedServerAddress(),
                );
            })
            .on(RoomEvent.ParticipantConnected, async (participant: Participant) => {
                appendLog('participant', participant.identity, 'connected', participant.metadata);
                participant
                    .on(ParticipantEvent.TrackMuted, (pub: TrackPublication) => {
                        appendLog('track was muted', pub.trackSid, participant.identity);
                    })
                    .on(ParticipantEvent.TrackUnmuted, (pub: TrackPublication) => {
                        appendLog('track was unmuted', pub.trackSid, participant.identity);
                    })
                    .on(ParticipantEvent.IsSpeakingChanged, () => {
                        appendLog('ParticipantEvent.IsSpeakingChanged', participant.isSpeaking);
                    })
                    .on(ParticipantEvent.ConnectionQualityChanged, () => {
                        appendLog('ParticipantEvent.ConnectionQualityChanged', participant.connectionQuality);
                    });
            })
            .on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
                appendLog('participant', participant.sid, 'disconnected');
            })
            .on(RoomEvent.MediaDevicesError, (e: Error) => {
                const failure = MediaDeviceFailure.getFailure(e);
                appendLog('media device failure', failure);
            })
            .on(RoomEvent.ConnectionQualityChanged, (quality: ConnectionQuality, participant?: Participant) => {
                appendLog('connection quality changed', participant?.identity, quality);
            })
            .on(RoomEvent.DataReceived, async (msg: Uint8Array, participant?: RemoteParticipant) => {
                const person = participant ? participant.identity : "SERVER";
                appendLog(`Got dataReceived from ${person} via ${this.hostUrl}|${this.roomId}`, DECODE_TXT(msg));
                this.onMesssageRecived(msg, this.roomId, this.hostUrl)
            })
            .on(RoomEvent.RoomMetadataChanged, (metadata) => {
                appendLog('new metadata for room', metadata);
            })
            .on(RoomEvent.MediaDevicesChanged, () => {
                appendLog('MediaDevicesChanged');
            })
            .on(RoomEvent.LocalTrackUnpublished, (track: LocalTrackPublication, participant: LocalParticipant) => {
                appendLog("LocalTrackUnpublished!!!?", track, participant)
            })
            .on(RoomEvent.LocalTrackPublished, (track: LocalTrackPublication, participant: LocalParticipant) => {
                appendLog('LocalVideoTrackPublished ', track, participant)
            })
            .on(RoomEvent.MediaDevicesError, (e: Error) => {
                const failure = MediaDeviceFailure.getFailure(e);
                appendLog('media device failure', failure);
            })
            .on(RoomEvent.ConnectionQualityChanged, (quality: ConnectionQuality, participant?: Participant) => {
                appendLog('connection quality changed', participant?.identity, quality);
            })
            .on(RoomEvent.TrackSubscribed, (track, pub, participant) => {
                // DIFF
                appendLog('subscribed to track _THIS SHOULDN\'T HAPPEN on BACKEND??_', pub.trackSid, participant.identity);
            })
            .on(RoomEvent.TrackUnsubscribed, (_, pub, participant) => {
                // DIFF
                appendLog('unsubscribed from track _THIS SHOULDN\'T HAPPEN on BACKEND??_', pub.trackSid);
            })
            .on(RoomEvent.AudioPlaybackStatusChanged, () => {
                appendLog('AudioPlaybackStatusChanged _THIS SHOULDN\'T HAPPEN on BACKEND??_', this.roomConn.canPlaybackAudio);
            })

        // DIFF
        await this.roomConn.connect(getWebsocketURL(this.hostUrl), accessToken, LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG); // local: 'ws://localhost:7800',
        console.info('connected to room', this.roomConn.name, this.roomConn);

        return true;
    }

    sendMessage(msgBytes: Uint8Array, onSendCallback?: () => void, skipQueue = false) {
        console.log("sendMessage() to driver/spectator ", msgBytes)
        this.roomConn.localParticipant.publishData(msgBytes, DataPacket_Kind.RELIABLE)
    }

    close() {
        console.info("Closing Livekit Connection: ", this.roomId, this.hostUrl);
        if (this.roomConn) {
            this.roomConn.disconnect(true);
        }
    }
}



export const cloudLivekitConnection = new LivekitPublisherConnection(LIVEKIT_CLOUD_ENDPOINT, (msg, roomId, hostUrl) => {
    handleBackendMsgRcvd(msg)
}, (state, roomId, hostUrl) => {
    console.log("Cloud Conn State Changed: " + state, roomId, hostUrl)
})


export const localLivekitConnection = new LivekitPublisherConnection(LIVEKIT_LOCAL_ENDPOINT, (msg, roomId, hostUrl) => {
    handleBackendMsgRcvd(msg)
}, (state, roomId, hostUrl) => {
    console.log("Local Conn State Changed: " + state, roomId, hostUrl)
})

export async function connectToLivekit(livekitSetup: LivekitSetupOptions): Promise<boolean> {
    if (!livekitSetup.CloudAPIKey || !livekitSetup.CloudSecretKey || !livekitSetup.RovRoomName) throw new Error("Missing some required livekit setup url query params.");
    const livekitUrlEndpoint = livekitSetup.ForceLocal ? LIVEKIT_LOCAL_ENDPOINT : LIVEKIT_CLOUD_ENDPOINT;
    const startTime = Date.now();

    if (true) { // USE CLOUD_ENDPOINT
        // generate authTokens from the credentials:
        const cloudToken = getPublisherAccessToken(livekitSetup.CloudAPIKey, livekitSetup.CloudSecretKey, livekitSetup.RovRoomName);
        const cloudRoomClient = new RoomServiceClient(LIVEKIT_CLOUD_ENDPOINT, livekitSetup.CloudAPIKey, livekitSetup.CloudSecretKey)
        await createLivekitRoom(cloudRoomClient, livekitSetup.RovRoomName);
        await refreshMetadata(cloudRoomClient, livekitSetup);

        await cloudLivekitConnection.start(livekitSetup.RovRoomName, cloudToken);
        // setSendProxyMessageCallback((data) => {
        //     console.log('sendProxyMessage', data);
        //     cloudLivekitConnection.sendMessage(new Uint8Array(data))
        // })
        let cloudRoomList = await listLivekitRooms(cloudRoomClient);
        console.log('cloud roomList', cloudRoomList);
    } else {
        // // generate authTokens from the credentials:
        // const localToken = getPublisherAccessToken(livekitSetup.CloudAPIKey, livekitSetup.CloudSecretKey, livekitSetup.RovRoomName);
        // const localRoomClient = new RoomServiceClient(LIVEKIT_LOCAL_ENDPOINT, livekitSetup.CloudAPIKey, livekitSetup.CloudSecretKey)
        // await createLivekitRoom(localRoomClient, livekitSetup.RovRoomName);
        // await refreshMetadata(localRoomClient, livekitSetup);

        // await localLivekitConnection.start(livekitSetup.RovRoomName, localToken);
        // let localRoomList = await listLivekitRooms(localRoomClient);
        // console.log('local roomList', localRoomList);

    }


    return true;
}

export function sendLivekitMessage(msg: Uint8Array) {
    cloudLivekitConnection.sendMessage(msg);
}
