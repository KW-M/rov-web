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
import { createLivekitRoom, generateLivekitRoomTokens, newLivekitAdminSDKRoomServiceClient, refreshMetadata } from './adminActions';
import { getPublisherAccessToken } from './livekitTokens';
import type { RoomServiceClient } from 'livekit-server-sdk';

const appendLog = console.log;
interface msgQueueItem {
    msgBytes: Uint8Array,
    onSendCallback: (msgBytes: Uint8Array) => void
}

interface LivekitMessageDetails {
    senderId: string
    msg: Uint8Array
}

interface LivekitConfig {
    hostUrl: string;
    publishVideo: boolean;
    reconnectAttempts: number;
    roomConfig: RoomOptions;
    roomConnectionConfig: RoomConnectOptions;
}

interface ParticipantConnectionEvent {
    id: string;  // the livekit identity of the participant
    joined: boolean; // true if the participant joined, false if they left
}

export class LivekitGenericConnection {
    config: LivekitConfig;
    // timestamp in ms which is updated whenever a message is recived from another participant.
    lastMsgRecivedTimestamp: number;
    // subscribe to get updates on the state of the webrtc connection overall.
    connectionState: nStoreT<ConnectionStates>; // TODO
    // subscribe to get new data messages as they are recived from the rov each message is an array of bytes.
    latestRecivedDataMessage: nStoreT<LivekitMessageDetails>;
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
        this.latestRecivedDataMessage = nStore<LivekitMessageDetails>(null)
        this.participantConnectionEvents = nStore<ParticipantConnectionEvent>(null);
    }

    async init(config: LivekitConfig) {
        this.config = config;
        this._shouldReconnect = true;

        // creates a new room object with options
        this._roomConn = new Room(config.roomConfig);

        // set up event listeners on the room
        this._roomConn
            .on(RoomEvent.DCBufferStatusChanged, (status) => {
                appendLog('DCBufferStatusChanged', status);
            })
            .on(RoomEvent.SignalConnected, async () => { // DIFF
                appendLog(`signal connection established`);
            })
            .on(RoomEvent.Connected, async () => {
                appendLog(`Connected to room: ${this._roomConn.name}`)
                this.connectionState.set(ConnectionStates.connected)
            })
            .on(RoomEvent.Disconnected, (reason?: DisconnectReason) => {
                this.connectionState.set(ConnectionStates.disconnectedOk)
                let reconnect = this._shouldReconnect && !!this._roomConn
                if (reason === DisconnectReason.DUPLICATE_IDENTITY) {
                    // TODO: handle duplicate identity
                    console.warn('duplicate identity, disconnected')
                    reconnect = false
                } else if (reason === DisconnectReason.CLIENT_INITIATED) {
                    console.log('disconnected from room, client initiated')
                    reconnect = false
                } else if (reason === DisconnectReason.SERVER_SHUTDOWN) {
                    console.log('disconnected from room, server shutdown')
                    reconnect = false
                } else if (reason === DisconnectReason.PARTICIPANT_REMOVED) {
                    console.log('disconnected from room, participant removed')
                    reconnect = false
                } else if (reason === DisconnectReason.ROOM_DELETED) {
                    console.log('disconnected from room, room deleted')
                    reconnect = false
                } else if (reason === DisconnectReason.STATE_MISMATCH) {
                    console.log('disconnected from room, state mismatch')
                    reconnect = false
                } else if (reason === DisconnectReason.JOIN_FAILURE) {
                    console.log('disconnected from room, join failure')
                } else if (reason === DisconnectReason.UNKNOWN_REASON) {
                    console.log('disconnected from room, unknown reason')
                } else if (reason === DisconnectReason.UNRECOGNIZED) {
                    console.log('disconnected from room, unrecognized')
                }
                if (reconnect) this._reconnect();
                else this.close();

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
                this.connectionState.set(ConnectionStates.connected)
            })
            .on(RoomEvent.ParticipantMetadataChanged, (a) => {
                appendLog('ParticipantMetadataChanged', a);
            })
            .on(RoomEvent.ParticipantConnected, async (participant: Participant) => {
                appendLog(`participant ${participant.identity} (${participant.sid}) connected`, participant.metadata);
                this.participantConnectionEvents.set({ id: participant.identity, joined: true })
                participant.on(ParticipantEvent.ConnectionQualityChanged, () => {
                    appendLog('ParticipantEvent.ConnectionQualityChanged', participant.connectionQuality);
                });
            })
            .on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
                appendLog(`participant ${participant.identity} (${participant.sid}) disconnected`);
                this.participantConnectionEvents.set({ id: participant.identity, joined: false })
            })
            .on(RoomEvent.MediaDevicesError, (e: Error) => {
                const failure = MediaDeviceFailure.getFailure(e);
                appendLog('media device failure', failure);
                // this._reconnect();
            })
            .on(RoomEvent.ConnectionQualityChanged, (quality: ConnectionQuality, participant?: Participant) => {
                appendLog(`connection quality for ${participant ? participant.identity : "[no identity]"} changed to ${quality}`);
            })
            .on(RoomEvent.RoomMetadataChanged, (metadata) => {
                appendLog('new metadata for room', metadata);
            })
            .on(RoomEvent.MediaDevicesChanged, () => {
                appendLog('MediaDevicesChanged');
            })
            .on(RoomEvent.LocalTrackUnpublished, (track: LocalTrackPublication, participant: LocalParticipant) => {
                appendLog("LocalTrackUnpublished!?????????????", track, participant)
            })
            .on(RoomEvent.LocalTrackPublished, (track: LocalTrackPublication, participant: LocalParticipant) => {
                appendLog('LocalVideoTrackPublished ', track, participant)
            })
            .on(RoomEvent.MediaDevicesError, (e: Error) => {
                const failure = MediaDeviceFailure.getFailure(e);
                appendLog('media device failure', failure);
            })
            .on(RoomEvent.AudioPlaybackStatusChanged, () => {
                appendLog('AudioPlaybackStatusChanged. canPlaybackAudio =', this._roomConn.canPlaybackAudio);
            })
    }



    async start(rovRoomName: string, accessToken: string) {
        this._rovRoomName = rovRoomName;
        this._accessToken = accessToken;
        this._shouldReconnect = true;

        const startTime = Date.now();
        appendLog(`Starting conn with ${rovRoomName} via ${this.config.hostUrl} token = ${accessToken}`)
        try {
            // setup timeout in case of connection hang
            const timeout = setTimeout(() => { console.log(`livekit connect timeout for ${this.config.hostUrl}`); this._reconnect() }, 16000);
            await this._connect();
            clearTimeout(timeout);
            appendLog(`Connected in ${Date.now() - startTime}ms ${this.config.hostUrl}`);
        } catch (err) {
            appendLog(`Error connecting to ${this.config.hostUrl}`, err);
            this._reconnect();
        }
    }



    async sendMessage(msgBytes: Uint8Array, reliable: boolean = true, toUserIds: string[] = []) {
        console.log("sending message to participant(s) ", toUserIds, reliable ? "reliable" : "unreliable", msgBytes)
        const participantSIDs = toUserIds.map((userId) => {
            const sid = this.getParticipantSid(userId)
            if (!sid) console.warn("no participant found for livekit identity: ", userId)
            return sid;
        });
        await this._roomConn.localParticipant.publishData(
            msgBytes,
            reliable ? DataPacket_Kind.RELIABLE : DataPacket_Kind.LOSSY,
            { destination: participantSIDs }
        )
    }

    getParticipantSid(participantIdentity: string) {
        const participant = [...(this._roomConn.participants.values())].find(p => p.identity === participantIdentity);
        return participant ? participant.sid : null;
    }

    getLivekitIdentitiy() {
        return this._roomConn ? this._roomConn.localParticipant.identity : null;
    }

    getRoomName() {
        return this._roomConn ? this._roomConn.name : this._rovRoomName;
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
        try {
            await this._roomConn.disconnect(true);
        } catch (e) {
            console.error("Livekit error disconnecting from room", e)
        }
        if (this._shouldReconnect == false) return;
        if (this._reconnectAttemptCount < this.config.reconnectAttempts) {
            const expBackoffDelay = this._reconnectAttemptCount * 800;
            this._reconnectAttemptCount++;
            await waitfor(expBackoffDelay)
            await this._connect();
        } else {
            console.error("Livekit failed to reconnect after ", this.config.reconnectAttempts, " attempts")
            this._fail();
        }
    }

    _fail() {
        this._shouldReconnect = false;
        this.connectionState.set(ConnectionStates.failed)
    }
}


export class LivekitPublisherConnection extends LivekitGenericConnection {
    _livekitApiKey: string;
    _livekitSecretKey: string;
    camTrack: LocalTrackPublication | undefined;
    _livekitAdmin: RoomServiceClient | undefined;

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
                if (!participant) return console.warn("Ignoring received webrtc message with no participant. This can happen when the message is sent before connection completes or if the message comes from the server: ", msg);
                const senderId = participant.identity;
                const senderSID = participant.sid;
                appendLog(`Got dataReceived from ${senderId} (${senderSID}) via ${this.config.hostUrl}|${this._roomConn.name}`, DECODE_TXT(msg), participant);
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
            }).on(RoomEvent.ParticipantConnected, () => {
                this.updateMetadataTokens();
            })
    }

    updateMetadataTokens() {
        const existingParticipantIds = [...(this._roomConn.participants.values())].map(p => p.identity);
        refreshMetadata(this._livekitAdmin, this._livekitApiKey, this._livekitSecretKey, this._rovRoomName, existingParticipantIds);
    }


    async startRoom(rovRoomName: string, livekitApiKey: string, livekitSecretKey: string) {
        this._rovRoomName = rovRoomName;
        this._livekitApiKey = livekitApiKey;
        this._livekitSecretKey = livekitSecretKey;
        this._livekitAdmin = newLivekitAdminSDKRoomServiceClient(this.config.hostUrl, livekitApiKey, livekitSecretKey)
        await createLivekitRoom(this._livekitAdmin, rovRoomName);
        const accessToken = getPublisherAccessToken(livekitApiKey, livekitSecretKey, rovRoomName);
        await this.updateMetadataTokens();
        await super.start(rovRoomName, accessToken);
    }
}

export class LivekitViewerConnection extends LivekitGenericConnection {
    remoteVideoTrack: nStoreT<RemoteTrack>;

    constructor() {
        super();
        this.remoteVideoTrack = nStore(null);
    }

    subscribeToTracks(participant: RemoteParticipant) {
        if (this._rovRoomName === participant.identity) {
            participant.tracks.forEach((pub) => {
                pub.setSubscribed(true)
            })
        }
    }

    async init(config: LivekitConfig) {
        await super.init(config);

        // set up more specific event listeners for video publisher (the rov)
        this._roomConn
            .on(RoomEvent.DataReceived, async (msg: Uint8Array, participant?: RemoteParticipant) => {
                if (!participant) return console.warn("Ignoring received livekit data message with no participant. This can happen when the message is sent before connection completes or if the message comes from the server: ", msg);
                if (participant.identity !== this._rovRoomName) return; // Ignore messages that come from participants other than the ROV
                const senderId = participant.identity;
                const senderSID = participant.sid;
                appendLog(`Got dataReceived from ${senderId} (${senderSID}) via ${this.config.hostUrl}|${this._roomConn.name}`, DECODE_TXT(msg), participant);
                this.lastMsgRecivedTimestamp = Date.now();
                this.latestRecivedDataMessage.set({
                    senderId: senderId,
                    msg: msg
                })
            })
            .on(RoomEvent.Connected, () => {
                this._roomConn.participants.forEach(this.subscribeToTracks.bind(this))
            })
            .on(RoomEvent.ParticipantConnected, (participant) => {
                this.subscribeToTracks(participant)
            })
            .on(RoomEvent.TrackPublished, (pub, participant) => {
                this.subscribeToTracks(participant)
            })
            .on(RoomEvent.TrackSubscribed, (track, pub, participant) => {
                if (track.kind === Track.Kind.Video) {
                    if (this.remoteVideoTrack.get()) {
                        console.warn("Livekit: already subscribed to video track, unsubscribing from old track", this.remoteVideoTrack.get())
                        this.remoteVideoTrack.get().startMonitor
                    }
                    appendLog('Livekit: subscribed to video', track.source);
                    this.remoteVideoTrack.set(track)
                    track.on('upstreamPaused', () => {
                        console.log('livekit: video upstream paused')
                    })
                    track.on('muted', () => {
                        console.log('livekit: video muted')
                    })
                    track.on('ended', () => {
                        console.log('livekit: video ended')
                    })
                } else {
                    appendLog('Livekit: subscribed to unknown track kind', track.kind, track.source);
                }
            })
            .on(RoomEvent.TrackUnsubscribed, (_, pub, participant) => {
                appendLog('unsubscribed from track!!!!', pub.trackSid);
            })
    }


}
