import {
    Room,
    RoomEvent,
    type RemoteParticipant,
    type Participant,
    type LocalTrackPublication,
    type LocalParticipant,
    MediaDeviceFailure,
    type ConnectionQuality,
    ParticipantEvent,
    DisconnectReason,
    type RoomOptions,
    type RoomConnectOptions,
} from 'livekit-client';
import nStore, { type nStoreT } from '../libraries/nStore'
import { getWebsocketURL, waitfor } from '../util';
import { unixTimeNow } from '../time';
import { ConnectionStates } from '../consts';
import { log, logDebug, logInfo, logWarn, logError } from "../logging"

export interface msgQueueItem {
    msgBytes: Uint8Array,
    onSendCallback: (msgBytes: Uint8Array) => void
}

interface LivekitMessageDetails {
    senderId: string
    msg: Uint8Array
}

export interface LivekitConfig {
    hostUrl: string;
    publishVideo: boolean;
    reconnectAttempts: number;
    roomConfig: RoomOptions;
    roomConnectionConfig: RoomConnectOptions;
    tokenEncryptionPassword?: string;
}

export interface ParticipantConnectionEvent {
    id: string;  // the livekit identity of the participant
    joined: boolean; // true if the participant joined, false if they left
}

export class LivekitBaseConnection {
    config: LivekitConfig;
    // timestamp in ms which is updated whenever a message is recived from another participant.
    lastMsgRecivedTimestamp: number;
    // subscribe to get updates on the state of the webrtc connection overall.
    connectionState: nStoreT<ConnectionStates>; // TODO
    // subscribe to get new data messages as they are recived from the rov each message is an array of bytes.
    latestRecivedDataMessage: nStoreT<LivekitMessageDetails | null>;
    // subscribe to get notified when a participant joins or leaves the room.
    participantConnectionEvents: nStoreT<ParticipantConnectionEvent | null>;

    // the name of the room we are connected to (will also be the livekit identity of the rov in that room)
    _rovRoomName: string;
    // the livekit JWT accessToken used to connect to the livekit server (controls our identity, what room we'll connect to, and what permissions we have)
    _accessToken: string;
    // how many times we have attempted to reconnect to the livekit server after a disconnect (resets on successful reconnect)
    _reconnectAttemptCount: number = 0;
    // flag used durring shutdown/cleanup to stop it from automatically reconnecting
    _shouldReconnect: boolean;
    // the livekit room object
    _roomConn: Room;



    constructor(shouldReconnect: boolean = true) {
        this.config = {} as LivekitConfig;
        this._shouldReconnect = shouldReconnect;

        // setup reactive stores
        this.connectionState = nStore<ConnectionStates>(ConnectionStates.init)
        this.latestRecivedDataMessage = nStore<LivekitMessageDetails | null>(null)
        this.participantConnectionEvents = nStore<ParticipantConnectionEvent | null>(null);
    }

    async init(config: LivekitConfig) {
        this.config = config;
        this._shouldReconnect = true;

        // creates a new room object with options
        this._roomConn = new Room(config.roomConfig);

        // set up event listeners on the room
        this._roomConn
            .on(RoomEvent.DCBufferStatusChanged, (bufferSpaceIsLow, kind) => {
                if (bufferSpaceIsLow) {
                    logWarn('LK: Data channel buffer is low: ', kind);
                } else {
                    logDebug('LK: Data channel buffer is normal: ', kind);
                }
            })
            .on(RoomEvent.SignalConnected, async () => { // DIFF
                logDebug(`LK: Signal connection established to ${this.config.hostUrl}`);
            })
            .on(RoomEvent.Connected, async () => {
                logInfo(`LK: Connected to room: ${this._roomConn.name} via ${this.config.hostUrl}`)
                this.connectionState.set(ConnectionStates.connected)
            })
            .on(RoomEvent.SignalReconnecting, () => {
                this.connectionState.set(ConnectionStates.reconnecting)
            })
            .on(RoomEvent.Disconnected, (reason?: DisconnectReason) => {
                let reconnect = this._shouldReconnect && !!this._roomConn
                if (reason === DisconnectReason.DUPLICATE_IDENTITY) {
                    logWarn('LK: disconnected from room - duplicate identity')
                    reconnect = false // don't reconnect if someone else is using the same identity - this prevents a loop of reconnects between the two clients
                    // this is handled in the respective Livekit[Viewer/Pub]Connection code
                } else if (reason === DisconnectReason.CLIENT_INITIATED) {
                    logWarn('LK: disconnected from room - client initiated')
                    reconnect = false
                } else if (reason === DisconnectReason.PARTICIPANT_REMOVED) {
                    logWarn('LK: disconnected from room - participant removed')
                    reconnect = false
                } else if (reason === DisconnectReason.ROOM_DELETED) {
                    logWarn('LK: disconnected from room - room deleted')
                } else if (reason === DisconnectReason.STATE_MISMATCH) {
                    logWarn('LK: disconnected from room - state mismatch')
                } else if (reason === DisconnectReason.SERVER_SHUTDOWN) {
                    logWarn('LK: disconnected from room - server shutdown')
                } else if (reason === DisconnectReason.JOIN_FAILURE) {
                    logWarn('LK: disconnected from room - join failure')
                } else if (reason === DisconnectReason.UNKNOWN_REASON) {
                    logWarn('LK: disconnected from room - unknown reason')
                }
                if (reconnect) this._reconnect();
                else {
                    this.connectionState.set(ConnectionStates.disconnectedOk)
                    this.close();
                }
            })
            .on(RoomEvent.Reconnecting, () => {
                logDebug(`LK: Reconnecting to room ${this._roomConn.name} via ${this.config.hostUrl}`)
                this.connectionState.set(ConnectionStates.reconnecting)
            })
            .on(RoomEvent.Reconnected, async () => {
                logInfo(
                    'LK: Successfully reconnected. server=',
                    await this._roomConn.engine.getConnectedServerAddress(),
                );
                this.connectionState.set(ConnectionStates.connected)
            })
            .on(RoomEvent.ParticipantMetadataChanged, (a) => {
                logDebug('LK: Participant Metadata Changed', a);
            })
            .on(RoomEvent.ParticipantConnected, async (participant: Participant) => {
                logInfo(`LK: Participant ${participant.identity} (${participant.sid}) connected`, participant.metadata);
                this.participantConnectionEvents.set({ id: participant.identity, joined: true })
                participant.on(ParticipantEvent.ConnectionQualityChanged, () => {
                    logDebug('LK: ParticipantEvent.ConnectionQualityChanged', participant.connectionQuality);
                });
            })
            .on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
                logDebug(`LK: Participant ${participant.identity} (${participant.sid}) disconnected`);
                this.participantConnectionEvents.set({ id: participant.identity, joined: false })
            })
            .on(RoomEvent.MediaDevicesError, (e: Error) => {
                const failure = MediaDeviceFailure.getFailure(e);
                logWarn('LK: Media device failure', failure);
            })
            .on(RoomEvent.ConnectionQualityChanged, (quality: ConnectionQuality, participant?: Participant) => {
                logDebug(`LK: connection quality for ${participant ? participant.identity : "[no identity]"} changed to ${quality}`);
            })
            .on(RoomEvent.RoomMetadataChanged, (metadata) => {
                try {
                    logDebug('LK: New metadata for room', JSON.parse(metadata));
                } catch {
                    logDebug('LK: New metadata for room (NOT VALID JSON)', metadata);
                }
            })
            .on(RoomEvent.MediaDevicesChanged, () => {
                logDebug('LK: MediaDevicesChanged');
            })
            .on(RoomEvent.LocalTrackUnpublished, (track: LocalTrackPublication, participant: LocalParticipant) => {
                logDebug("LK: LocalTrackUnpublished", track.trackSid, "by participant", participant.identity, "source", track.track ? track.track.source : "[no track found]");
            })
            .on(RoomEvent.LocalTrackPublished, (track: LocalTrackPublication, participant: LocalParticipant) => {
                logDebug('LK: LocalVideoTrackPublished', track.trackSid, "by participant", participant.identity, "source", track.track ? track.track.source : "[no track found]");
            })
            .on(RoomEvent.AudioPlaybackStatusChanged, () => {
                logDebug('LK: AudioPlaybackStatusChanged. canPlaybackAudio =', this._roomConn.canPlaybackAudio);
            })
    }



    async start(rovRoomName: string, accessToken: string) {
        this._rovRoomName = rovRoomName;
        this._accessToken = accessToken;
        this._shouldReconnect = true;

        const startTime = unixTimeNow();
        log(`LK: Starting conn with ${rovRoomName} via ${this.config.hostUrl} token = ${accessToken}`)
        try {
            // setup timeout in case of connection hang
            const timeout = setTimeout(() => { log(`livekit connect timeout for ${this.config.hostUrl}. Reconnecting...`); this._reconnect() }, 16000);
            await this._connect();
            clearTimeout(timeout);
            log(`LK: Connected in ${unixTimeNow() - startTime}ms ${this.config.hostUrl}`);
        } catch (err) {
            log(`LK: Error connecting to ${this.config.hostUrl}. Reconnecting...`, err);
            this._reconnect();
        }
    }



    async sendMessage(msgBytes: Uint8Array, reliable: boolean = true, toUserIds: string[] = []) {
        if (!this._roomConn) return logWarn("LK: Can't send message, room not connected");
        if (msgBytes.length == 0) return logWarn("LK: Can't send empty message");
        // if (this._roomConn.state !== ConnectionState.Connected || this.connectionState.get() != ConnectionStates.connected) return;
        // if (toUserIds.length == 0) toUserIds = [...(this._roomConn.remoteParticipants.values())].map(p => p.identity);
        // const participantSIDs = toUserIds.map((userId) => {
        //     const sid = this.getParticipantSid(userId)
        //     if (!sid) logWarn("LK: SendMessge: No participant found for livekit identity: ", userId)
        //     return sid || null;
        // }).filter((s) => s != null) as string[];
        try {
            await this._roomConn.localParticipant.publishData(msgBytes, {
                reliable: reliable,
                destinationIdentities: toUserIds
            })
        } catch (e) {
            logError("LK: Error sending message", e)
        }
    }

    getParticipantSid(participantIdentity: string) {
        const participant = [...(this._roomConn.remoteParticipants.values())].find(p => p.identity === participantIdentity);
        return participant ? participant.sid : null;
    }

    getLivekitIdentitiy() {
        return this._roomConn ? this._roomConn.localParticipant.identity : null;
    }

    getRoomName() {
        return this._roomConn ? this._roomConn.name : this._rovRoomName;
    }

    close() {
        this._shouldReconnect = false;
        this.connectionState.set(ConnectionStates.disconnectedOk)
        if (this._roomConn) {
            logInfo("LK: Closing Livekit Connection: ", this._rovRoomName, this.config.hostUrl);
            this._roomConn.disconnect(true);
        }
    }

    async _connect() {
        await this._roomConn.connect(getWebsocketURL(this.config.hostUrl), this._accessToken, this.config.roomConnectionConfig);
        logInfo('LK: Connected to room', this._roomConn.name, this._roomConn);
    }

    async _reconnect() {
        this.connectionState.set(ConnectionStates.reconnecting)
        try {
            await this._roomConn.disconnect(true);
        } catch (e) {
            logError("LK: Error disconnecting from room", e)
        }
        if (this._shouldReconnect == false) return;
        if (this._reconnectAttemptCount < this.config.reconnectAttempts) {
            const expBackoffDelay = this._reconnectAttemptCount * 800;
            this._reconnectAttemptCount++;
            await waitfor(expBackoffDelay)
            try {
                await this._connect();
            } catch (e) {
                logError("LK: Error reconnecting to room", e)
                throw e;
            }
        } else {
            logError("LK: Failed to reconnect after ", this._reconnectAttemptCount, "/", this.config.reconnectAttempts, "attempts")
            this._fail();
        }
    }

    _fail() {
        this._shouldReconnect = false;
        this.connectionState.set(ConnectionStates.failed)
    }
}
