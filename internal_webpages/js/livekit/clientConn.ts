import {
    Room,
    RoomEvent,
    RemoteParticipant,
    Participant,
    VideoPresets,
    DefaultReconnectPolicy,
    LocalTrackPublication,
    LocalParticipant,
    MediaDeviceFailure,
    ConnectionQuality,
    ParticipantEvent,
    TrackPublication,
    DisconnectReason,
    DataPacket_Kind,
    RoomOptions,
    RoomConnectOptions,
    ConnectionState
} from 'livekit-client';
import nStore, { type nStoreT } from '../libraries/nStore'
import { appendLog, getWebsocketURL } from '../util';
import { ConnectionStates, DECODE_TXT, LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG } from '../consts';
import { sleep } from 'livekit-client/dist/src/room/utils';

interface msgQueueItem {
    msgBytes: Uint8Array,
    onSendCallback: (msgBytes: Uint8Array) => void
}

type MsgRecivedCallback = (msg: Uint8Array, roomId: string, hostUrl: string) => void;
type StateChangeCallback = (connState: string, roomId: string, hostUrl: string) => void;

interface LivekitConfig {
    hostUrl: string;
    publishVideo: boolean;
    reconnectAttempts: number;
    roomConfig: RoomOptions;
    roomConnectionConfig: RoomConnectOptions;
}

export class LivekitGenericConnection {
    config: LivekitConfig;
    rovRoomName: string;
    accessToken: string;
    reconnectAttemptCount: number;
    should_reconnect: boolean;
    videoElem: Element;
    roomConn: Room;
    // subscribe to get updates on the state of the webrtc connection overall.
    connectionState: nStoreT<ConnectionStates>; // TODO
    // subscribe to get new data messages as they are recived from the rov each message is an array of bytes.
    latestRecivedDataMessage: nStoreT<Uint8Array>;
    // subscribe to get new data messages as they are recived from the rov each message is an array of bytes.
    participants: nStoreT<Map<string, Participant>>;

    constructor(config: LivekitConfig) {
        this.config = config;
        this.should_reconnect = true;

        // setup reactive stores
        this.connectionState = nStore<ConnectionStates>(ConnectionStates.init)
        this.latestRecivedDataMessage = nStore<Uint8Array>(new Uint8Array())
        this.participants = nStore<Map<string, Participant>>(new Map<string, Participant>());

        // creates a new room object with options
        this.roomConn = new Room(config.roomConfig);

        // set up event listeners on the room
        this.roomConn
            .on(RoomEvent.DataReceived, async (msg: Uint8Array, participant?: RemoteParticipant) => {
                if (participant && participant.identity !== this.rovRoomName) return; // Ignore messages that come from participants other than the ROV
                appendLog(`Got dataReceived from ${!participant ? "SERVER" : participant.identity} via ${this.config.hostUrl}|${this.roomConn.name}`, DECODE_TXT(msg));
                this.latestRecivedDataMessage.set(msg)
            })
            .on(RoomEvent.SignalConnected, async () => { // DIFF
                appendLog(`signal connection established`);
            })
            .on(RoomEvent.Connected, async () => {
                appendLog(`Connected to room: ${this.roomConn.name}`)
                this.connectionState.set(ConnectionStates.connected)
            })
            .on(RoomEvent.Disconnected, (reason?: DisconnectReason) => {
                if (!this.roomConn) return;
                appendLog('disconnected from room', reason);
                this.roomConn.participants.forEach((p) => { });
                this._reconnect();
            })
            .on(RoomEvent.Reconnecting, () => {
                appendLog('Reconnecting to room')
                this.connectionState.set(ConnectionStates.reconnecting)
            })
            .on(RoomEvent.Reconnected, async () => {
                appendLog(
                    'Successfully reconnected. server',
                    await this.roomConn.engine.getConnectedServerAddress(),
                );
            })
            .on(RoomEvent.ParticipantConnected, async (participant: Participant) => {
                appendLog('participant', participant.identity, 'connected', participant.metadata);
                this.participants.set(this.roomConn.participants)
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
                this.participants.set(this.roomConn.participants)
            })
            .on(RoomEvent.MediaDevicesError, (e: Error) => {
                const failure = MediaDeviceFailure.getFailure(e);
                appendLog('media device failure', failure);
                this._reconnect();
            })
            .on(RoomEvent.ConnectionQualityChanged, (quality: ConnectionQuality, participant?: Participant) => {
                appendLog('connection quality changed', participant ? participant.identity : "no identity", quality);
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
            .on(RoomEvent.AudioPlaybackStatusChanged, () => {
                appendLog('AudioPlaybackStatusChanged _THIS SHOULDN\'T HAPPEN on BACKEND??_', this.roomConn.canPlaybackAudio);
            })

    }

    async start(rovRoomName: string, accessToken: string) {
        this.rovRoomName = rovRoomName;
        this.accessToken = accessToken;

        const startTime = Date.now();
        appendLog(`Starting conn with ${rovRoomName} via ${this.config.hostUrl} token = ${accessToken}`)
        await this._connect();
        appendLog(`Connected or Failed in ${Date.now() - startTime}ms`);
    }

    async sendMessageLossy(msgBytes: Uint8Array) {
        await this.roomConn.localParticipant.publishData(msgBytes, DataPacket_Kind.LOSSY)
    }

    async sendMessageReliable(msgBytes: Uint8Array, onSendCallback?: () => void, skipQueue = false) {
        console.log("sendMessage() to driver/spectator ", msgBytes)
        await this.roomConn.localParticipant.publishData(msgBytes, DataPacket_Kind.RELIABLE)
    }

    async close() {
        this.should_reconnect = false;
        console.info("Closing Livekit Connection: ", this.rovRoomName, this.config.hostUrl);
        if (this.roomConn) await this.roomConn.disconnect(true);
    }

    async _connect() {
        await this.roomConn.connect(getWebsocketURL(this.config.hostUrl), this.accessToken, this.config.roomConnectionConfig);
        console.info('connected to room', this.roomConn.name, this.roomConn);
    }

    async _reconnect() {
        await this.roomConn.disconnect(true);
        if (this.should_reconnect == false) return;
        if (this.reconnectAttemptCount < this.config.reconnectAttempts) {
            const expBackoffDelay = this.reconnectAttemptCount * 800;
            await sleep(expBackoffDelay)
            await this._connect();
        } else {
            this._fail();
        }
    }

    _fail() {
        this.should_reconnect = false;
        this.connectionState.set(ConnectionStates.failed)
    }
}


export class LivekitPublisherConnection extends LivekitGenericConnection {
    camTrack: LocalTrackPublication | undefined;

    constructor(config: LivekitConfig) {
        super(config);

        // set up more specific event listeners for video publisher (the rov)
        this.roomConn
            .on(RoomEvent.SignalConnected, async () => {
                while (!this.camTrack) {
                    this.camTrack = await this.roomConn.localParticipant.setCameraEnabled(true);
                }
            })
            .on(RoomEvent.TrackSubscribed, (track, pub, participant) => {
                appendLog('subscribed to track _THIS SHOULDN\'T HAPPEN on BACKEND??_', pub.trackSid, participant.identity, track.source);
            })
            .on(RoomEvent.TrackUnsubscribed, (_, pub, participant) => {
                appendLog('unsubscribed from track _THIS SHOULDN\'T HAPPEN on BACKEND??_', pub.trackSid);
            })
    }
}

export class LivekitViewerConnection extends LivekitGenericConnection {
    camTrack: LocalTrackPublication | undefined;

    constructor(config: LivekitConfig) {
        super(config);

        // set up more specific event listeners for video publisher (the rov)
        this.roomConn
            .on(RoomEvent.TrackSubscribed, (track, pub, participant) => {
                appendLog('subscribed to track _THIS SHOULDN\'T HAPPEN on BACKEND??_', pub.trackSid, participant.identity, track.source);
            })
            .on(RoomEvent.TrackUnsubscribed, (_, pub, participant) => {
                appendLog('unsubscribed from track _THIS SHOULDN\'T HAPPEN on BACKEND??_', pub.trackSid);
            })
    }
}
