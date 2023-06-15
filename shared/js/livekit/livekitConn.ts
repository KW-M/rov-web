import {
    Room,
    RoomEvent,
    RemoteParticipant,
    Participant,
    LocalTrackPublication,
    LocalParticipant,
    MediaDeviceFailure,
    ConnectionQuality,
    ParticipantEvent,
    TrackPublication,
    DisconnectReason,
    DataPacket_Kind,
    type RoomOptions,
    type RoomConnectOptions,
    RemoteTrack,
    Track,
} from 'livekit-client';
import nStore, { type nStoreT } from '../libraries/nStore'
import { getWebsocketURL, waitfor } from '../util';
import { ConnectionStates, DECODE_TXT, LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG } from '../consts';
import type { init } from 'svelte/internal';

const appendLog = console.log;
interface msgQueueItem {
    msgBytes: Uint8Array,
    onSendCallback: (msgBytes: Uint8Array) => void
}

interface LivekitConfig {
    hostUrl: string;
    publishVideo: boolean;
    reconnectAttempts: number;
    roomConfig: RoomOptions;
    roomConnectionConfig: RoomConnectOptions;
}

interface ParticipantConnectionEvent {
    id: string; // the livekit identity of the participant
    joined: boolean; // true if the participant joined, false if they left
}

export class LivekitGenericConnection {
    config: LivekitConfig;
    // timestamp in ms which is updated whenever a message is recived from another participant.
    lastMsgRecivedTimestamp: number;
    // subscribe to get updates on the state of the webrtc connection overall.
    connectionState: nStoreT<ConnectionStates>; // TODO
    // subscribe to get new data messages as they are recived from the rov each message is an array of bytes.
    latestRecivedDataMessage: nStoreT<{
        senderId: string
        msg: Uint8Array
    }>;
    // subscribe to get notified when a participant joins or leaves the room.
    participantConnectionEvents: nStoreT<ParticipantConnectionEvent>;

    // the name of the room we are connected to (will also be the livekit identity of the rov in that room)
    _rovRoomName: string;
    // the livekit JWT accessToken used to connect to the livekit server (controls our identity, what room we'll connect to, and what permissions we have)
    _accessToken: string;
    // how many times we have attempted to reconnect to the livekit server after a disconnect (resets on successful reconnect)
    _reconnectAttemptCount: number;
    // flag used durring shutdown/cleanup to stop it from automatically reconnecting
    _shouldReconnect: boolean;
    // the html element on the page to attach the video stream to
    _videoElem: Element;
    // the livekit room object
    _roomConn: Room;

    constructor() {
        this.config = null;
        this._shouldReconnect = true;

        // setup reactive stores
        this.connectionState = nStore<ConnectionStates>(ConnectionStates.init)
        this.latestRecivedDataMessage = nStore<{
            senderId: string
            msg: Uint8Array
        }>(null)
        this.participantConnectionEvents = nStore<ParticipantConnectionEvent>(null);
    }

    async init(config: LivekitConfig) {
        this.config = config;
        this._shouldReconnect = true;

        // creates a new room object with options
        this._roomConn = new Room(config.roomConfig);

        // set up event listeners on the room
        this._roomConn
            .on(RoomEvent.SignalConnected, async () => { // DIFF
                appendLog(`signal connection established`);
            })
            .on(RoomEvent.Connected, async () => {
                appendLog(`Connected to room: ${this._roomConn.name}`)
                this.connectionState.set(ConnectionStates.connected)
            })
            .on(RoomEvent.Disconnected, (reason?: DisconnectReason) => {
                if (!this._roomConn) return;
                appendLog('disconnected from room', reason);
                this._roomConn.participants.forEach((p) => { });
                this._reconnect();
            })
            .on(RoomEvent.Reconnecting, () => {
                appendLog('Reconnecting to room')
                this.connectionState.set(ConnectionStates.reconnecting)
            })
            .on(RoomEvent.Reconnected, async () => {
                appendLog(
                    'Successfully reconnected. server',
                    await this._roomConn.engine.getConnectedServerAddress(),
                );
            })
            .on(RoomEvent.ParticipantConnected, async (participant: Participant) => {
                appendLog('participant', participant.identity, 'connected', participant.metadata);
                this.participantConnectionEvents.set({ id: participant.identity, joined: true })
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
                this.participantConnectionEvents.set({ id: participant.identity, joined: false })
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
                appendLog('AudioPlaybackStatusChanged _THIS SHOULDN\'T HAPPEN on BACKEND??_', this._roomConn.canPlaybackAudio);
            })

    }



    async start(rovRoomName: string, accessToken: string) {
        this._rovRoomName = rovRoomName;
        this._accessToken = accessToken;

        const startTime = Date.now();
        appendLog(`Starting conn with ${rovRoomName} via ${this.config.hostUrl} token = ${accessToken}`)
        await this._connect();
        appendLog(`Connected or Failed in ${Date.now() - startTime}ms ${this.config.hostUrl}`);
    }

    async sendMessage(msgBytes: Uint8Array, reliable: boolean = true, toUserIds: string[] = []) {
        console.log("sendMessage() to participant ", msgBytes, reliable, toUserIds)
        await this._roomConn.localParticipant.publishData(
            msgBytes,
            reliable ? DataPacket_Kind.RELIABLE : DataPacket_Kind.LOSSY,
            { destination: toUserIds }
        )
    }

    async close() {
        this._shouldReconnect = false;
        if (this._roomConn) {
            console.info("Closing Livekit Connection: ", this._rovRoomName, this.config.hostUrl);
            await this._roomConn.disconnect(true);
        }
    }

    async _connect() {
        await this._roomConn.connect(getWebsocketURL(this.config.hostUrl), this._accessToken, this.config.roomConnectionConfig);
        console.info('connected to room', this._roomConn.name, this._roomConn);
    }

    async _reconnect() {
        await this._roomConn.disconnect(true);
        if (this._shouldReconnect == false) return;
        if (this._reconnectAttemptCount < this.config.reconnectAttempts) {
            const expBackoffDelay = this._reconnectAttemptCount * 800;
            await waitfor(expBackoffDelay)
            await this._connect();
        } else {
            this._fail();
        }
    }

    _fail() {
        this._shouldReconnect = false;
        this.connectionState.set(ConnectionStates.failed)
    }
}


export class LivekitPublisherConnection extends LivekitGenericConnection {
    camTrack: LocalTrackPublication | undefined;

    constructor() {
        super();
        this.camTrack = null;
    }

    async init(config: LivekitConfig) {
        await super.init(config);

        // set up more specific event listeners for video publisher (the rov)
        this._roomConn
            .on(RoomEvent.SignalConnected, async () => {
                while (!this.camTrack) {
                    this.camTrack = await this._roomConn.localParticipant.setCameraEnabled(true);
                }
            })
            .on(RoomEvent.DataReceived, async (msg: Uint8Array, participant?: RemoteParticipant) => {
                const senderId = participant ? participant.identity : "SERVER";
                appendLog(`Got dataReceived from ${senderId} via ${this.config.hostUrl}|${this._roomConn.name}`, DECODE_TXT(msg));
                this.lastMsgRecivedTimestamp = Date.now();
                this.latestRecivedDataMessage.set({
                    senderId: senderId,
                    msg: msg
                })
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
    remoteVideoTrack: nStoreT<RemoteTrack>;

    constructor() {
        super();
        this.remoteVideoTrack = nStore(null);
    }

    async init(config: LivekitConfig) {
        await super.init(config);

        // set up more specific event listeners for video publisher (the rov)
        this._roomConn
            .on(RoomEvent.DataReceived, async (msg: Uint8Array, participant?: RemoteParticipant) => {
                const senderId = participant ? participant.identity : "SERVER";
                appendLog(`Got dataReceived from ${senderId} via ${this.config.hostUrl}|${this._roomConn.name}`, DECODE_TXT(msg));
                if (participant && participant.identity !== this._rovRoomName) return; // Ignore messages that come from participants other than the ROV
                this.lastMsgRecivedTimestamp = Date.now();
                this.latestRecivedDataMessage.set({
                    senderId: senderId,
                    msg: msg
                })
            })
            .on(RoomEvent.TrackSubscribed, (track, pub, participant) => {
                appendLog('subscribed to track!!!!!', pub.trackSid, participant.identity, track.source);
                if (track.kind === Track.Kind.Video) {
                    appendLog('subscribed to video track', track, pub, participant);
                    this.remoteVideoTrack.set(track)
                }
            })
            .on(RoomEvent.TrackUnsubscribed, (_, pub, participant) => {
                appendLog('unsubscribed from track!!!!', pub.trackSid);
            })
    }
}
