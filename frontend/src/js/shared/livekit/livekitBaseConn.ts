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
    DisconnectReason,
    type RoomOptions,
    type RoomConnectOptions,
} from 'livekit-client';
import nStore, { type nStoreT } from '../libraries/nStore'
import { getWebsocketURL, waitfor } from '../util';
import { ConnectionStates } from '../consts';
import { log, logDebug, logInfo, logWarn, logError } from "../logging"

const appendLog = log;
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



    constructor() {
        this.config = {} as LivekitConfig;
        this._shouldReconnect = true;

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
            .on(RoomEvent.DCBufferStatusChanged, (status) => {
                appendLog('LK: DCBufferStatusChanged ', status);
            })
            .on(RoomEvent.SignalConnected, async () => { // DIFF
                appendLog(`LK: Signal connection established to ${this.config.hostUrl}`);
            })
            .on(RoomEvent.Connected, async () => {
                appendLog(`LK: Connected to room: ${this._roomConn.name} via ${this.config.hostUrl}`)
                this.connectionState.set(ConnectionStates.connected)
            })
            .on(RoomEvent.Disconnected, (reason?: DisconnectReason) => {
                this.connectionState.set(ConnectionStates.disconnectedOk)
                let reconnect = this._shouldReconnect && !!this._roomConn
                if (reason === DisconnectReason.DUPLICATE_IDENTITY) {
                    logWarn('LK: disconnected from room - duplicate identity')
                    reconnect = false // don't reconnect if someone else is using the same identity - this prevents a loop of reconnects between the two clients
                    // this is handled in the respective Livekit[Viewer/Pub]Connection code
                } else if (reason === DisconnectReason.CLIENT_INITIATED) {
                    log('LK: disconnected from room - client initiated')
                    reconnect = false
                } else if (reason === DisconnectReason.PARTICIPANT_REMOVED) {
                    log('LK: disconnected from room - participant removed')
                    reconnect = false
                } else if (reason === DisconnectReason.ROOM_DELETED) {
                    log('LK: disconnected from room - room deleted')
                } else if (reason === DisconnectReason.STATE_MISMATCH) {
                    log('LK: disconnected from room - state mismatch')
                } else if (reason === DisconnectReason.SERVER_SHUTDOWN) {
                    log('LK: disconnected from room - server shutdown')
                } else if (reason === DisconnectReason.JOIN_FAILURE) {
                    log('LK: disconnected from room - join failure')
                } else if (reason === DisconnectReason.UNKNOWN_REASON) {
                    log('LK: disconnected from room - unknown reason')
                }
                if (reconnect) this._reconnect();
                else this.close();

            })
            .on(RoomEvent.Reconnecting, () => {
                appendLog(`LK: Reconnecting to room ${this._roomConn.name} via ${this.config.hostUrl}`)
                this.connectionState.set(ConnectionStates.reconnecting)
            })
            .on(RoomEvent.Reconnected, async () => {
                appendLog(
                    'LK: Successfully reconnected. server',
                    await this._roomConn.engine.getConnectedServerAddress(),
                );
                this.connectionState.set(ConnectionStates.connected)
            })
            .on(RoomEvent.ParticipantMetadataChanged, (a) => {
                appendLog('LK: Participant Metadata Changed', a);
            })
            .on(RoomEvent.ParticipantConnected, async (participant: Participant) => {
                appendLog(`LK: Participant ${participant.identity} (${participant.sid}) connected`, participant.metadata);
                this.participantConnectionEvents.set({ id: participant.identity, joined: true })
                participant.on(ParticipantEvent.ConnectionQualityChanged, () => {
                    appendLog('LK: ParticipantEvent.ConnectionQualityChanged', participant.connectionQuality);
                });
            })
            .on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
                appendLog(`LK: Participant ${participant.identity} (${participant.sid}) disconnected`);
                this.participantConnectionEvents.set({ id: participant.identity, joined: false })
            })
            .on(RoomEvent.MediaDevicesError, (e: Error) => {
                const failure = MediaDeviceFailure.getFailure(e);
                appendLog('LK: Media device failure', failure);
                // this._reconnect();
            })
            .on(RoomEvent.ConnectionQualityChanged, (quality: ConnectionQuality, participant?: Participant) => {
                appendLog(`LK: connection quality for ${participant ? participant.identity : "[no identity]"} changed to ${quality}`);
            })
            .on(RoomEvent.RoomMetadataChanged, (metadata) => {
                try {
                    appendLog('LK: New metadata for room', JSON.parse(metadata));
                } catch {
                    appendLog('LK: New metadata for room (NOT VALID JSON)', metadata);
                }
            })
            .on(RoomEvent.MediaDevicesChanged, () => {
                appendLog('LK: MediaDevicesChanged');
            })
            .on(RoomEvent.LocalTrackUnpublished, (track: LocalTrackPublication, participant: LocalParticipant) => {
                appendLog("LK: LocalTrackUnpublished", track.trackSid, "by participant", participant.identity, "source", track.track ? track.track.source : "[no track found]");
            })
            .on(RoomEvent.LocalTrackPublished, (track: LocalTrackPublication, participant: LocalParticipant) => {
                appendLog('LK: LocalVideoTrackPublished', track.trackSid, "by participant", participant.identity, "source", track.track ? track.track.source : "[no track found]");
            })
            .on(RoomEvent.MediaDevicesError, (e: Error) => {
                const failure = MediaDeviceFailure.getFailure(e);
                appendLog('LK: media device failure', failure);
            })
            .on(RoomEvent.AudioPlaybackStatusChanged, () => {
                appendLog('LK: AudioPlaybackStatusChanged. canPlaybackAudio =', this._roomConn.canPlaybackAudio);
            })
    }



    async start(rovRoomName: string, accessToken: string) {
        this._rovRoomName = rovRoomName;
        this._accessToken = accessToken;
        this._shouldReconnect = true;

        const startTime = Date.now();
        log(`LK: Starting conn with ${rovRoomName} via ${this.config.hostUrl} token = ${accessToken}`)
        try {
            // setup timeout in case of connection hang
            const timeout = setTimeout(() => { log(`livekit connect timeout for ${this.config.hostUrl}. Reconnecting...`); this._reconnect() }, 16000);
            await this._connect();
            clearTimeout(timeout);
            log(`LK: Connected in ${Date.now() - startTime}ms ${this.config.hostUrl}`);
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
        await this._roomConn.localParticipant.publishData(msgBytes, {
            reliable: reliable,
            destinationIdentities: toUserIds
        })
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

    async close() {
        this._shouldReconnect = false;
        if (this._roomConn) {
            logInfo("LK: Closing Livekit Connection: ", this._rovRoomName, this.config.hostUrl);
            await this._roomConn.disconnect(true);
        }
    }

    async _connect() {
        await this._roomConn.connect(getWebsocketURL(this.config.hostUrl), this._accessToken, this.config.roomConnectionConfig);
        logInfo('LK: Connected to room', this._roomConn.name, this._roomConn);
    }

    async _reconnect() {
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
