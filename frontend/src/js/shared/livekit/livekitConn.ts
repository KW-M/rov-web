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
    ConnectionState,
    type VideoSenderStats,
    type VideoReceiverStats,
    RemoteTrackPublication,
    RemoteVideoTrack,
    LocalVideoTrack,
    VideoQuality,
} from 'livekit-client';
import nStore, { type nStoreT } from '../libraries/nStore'
import { getWebsocketURL, waitfor } from '../util';
import { ConnectionStates, DECODE_TXT, LIVEKIT_BACKEND_ROOM_CONNECTION_CONFIG } from '../consts';
import { createLivekitRoom, generateLivekitRoomMetadata, newLivekitAdminSDKRoomServiceClient, updateLivekitRoomMetadata } from './adminActions';
import { getPublisherAccessToken } from './livekitTokens';
import type { RoomServiceClient } from 'livekit-server-sdk';
import { log, logDebug, logInfo, logWarn, logError } from "../logging"

const appendLog = log;
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
    tokenEncryptionPassword?: string;
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
                    // TODO: handle duplicate identity
                    logWarn('LK: disconnected from room - duplicate identity')
                    reconnect = false
                } else if (reason === DisconnectReason.CLIENT_INITIATED) {
                    log('LK: disconnected from room - client initiated')
                    reconnect = false
                } else if (reason === DisconnectReason.SERVER_SHUTDOWN) {
                    log('LK: disconnected from room - server shutdown')
                    reconnect = false
                } else if (reason === DisconnectReason.PARTICIPANT_REMOVED) {
                    log('LK: disconnected from room - participant removed')
                    reconnect = false
                } else if (reason === DisconnectReason.ROOM_DELETED) {
                    log('LK: disconnected from room - room deleted')
                    reconnect = false
                } else if (reason === DisconnectReason.STATE_MISMATCH) {
                    log('LK: disconnected from room - state mismatch')
                    reconnect = false
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
        if (!this._roomConn || this._roomConn.state !== ConnectionState.Connected || this.connectionState.get() != ConnectionStates.connected) return logWarn("LK: Can't send message, room not connected");
        if (toUserIds.length == 0) toUserIds = [...(this._roomConn.remoteParticipants.values())].map(p => p.identity);
        const participantSIDs = toUserIds.map((userId) => {
            const sid = this.getParticipantSid(userId)
            if (!sid) logWarn("LK: SendMessge: No participant found for livekit identity: ", userId)
            return sid || null;
        }).filter((s) => s != null) as string[];
        if (participantSIDs.length == 0) return;
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


export class LivekitPublisherConnection extends LivekitGenericConnection {
    _livekitApiKey: string;
    _livekitSecretKey: string;
    _livekitAdmin: RoomServiceClient | undefined;
    camTrack: LocalTrackPublication | undefined;
    // subscribe to get updates on the state of the video channel webrtc connection.
    videoStats = nStore<(VideoSenderStats | any)[]>([]);
    // interval id for checking video stats loop
    _videoStatsIntervalId: NodeJS.Timeout | null;


    constructor() {
        super();
    }

    async init(config: LivekitConfig) {
        await super.init(config);

        // set up more specific event listeners for video publisher (the rov)
        this._roomConn
            .on(RoomEvent.SignalConnected, async () => {
            })
            .on(RoomEvent.DataReceived, async (msg: Uint8Array, participant?: RemoteParticipant) => {
                if (!participant) return logWarn("LK: Ignoring received data message with no participant. This can happen when the message is sent before connection completes or if the message comes from the server: ", msg);
                const senderId = participant.identity;
                const senderSID = participant.sid;
                // appendLog(`LK: Got dataReceived from ${senderId} (${senderSID}) via ${this.config.hostUrl}|${this._roomConn.name}`);
                this.lastMsgRecivedTimestamp = Date.now();
                this.latestRecivedDataMessage.set({
                    senderId: senderId,
                    msg: msg
                })
            })
            .on(RoomEvent.TrackSubscribed, (track, pub, participant) => {
                logWarn('LK: Subscribed to track ', pub.trackSid, " from participant: ", participant.identity, " source: ", track.source, ' _THIS SHOULDNT HAPPEN on BACKEND_ ');
            })
            .on(RoomEvent.TrackUnsubscribed, (_, pub, participant) => {
                logWarn('LK: Unsubscribed from track', pub.trackSid, " from participant: ", participant.identity, ' _THIS SHOULDNT HAPPEN on BACKEND_ ');
            }).on(RoomEvent.ParticipantConnected, () => {
                this.updateRoomMetadata();
            })
    }

    async updateRoomMetadata() {
        if (!this._livekitAdmin) return logWarn("LK: Can't update metadata tokens, livekit admin client not initialized");
        const alreadyTakenNames = [...(this._roomConn.remoteParticipants.values())].map(p => p.identity);
        const metadata = await generateLivekitRoomMetadata(this._rovRoomName, this._livekitApiKey, this._livekitSecretKey, alreadyTakenNames, this.config.tokenEncryptionPassword)
        await updateLivekitRoomMetadata(this._livekitAdmin, this._rovRoomName, metadata);
    }

    async createLivekitRoom() {
        if (!this._livekitAdmin) return logWarn("LK: Can't create livekit room, livekit admin client not initialized");
        const existingParticipantIds = [...(this._roomConn.remoteParticipants.values())].map(p => p.identity);
        await createLivekitRoom(this._livekitAdmin, this._rovRoomName, this._livekitApiKey, this._livekitSecretKey, existingParticipantIds, this.config.tokenEncryptionPassword);
    }

    async enableCamera() {
        if (!this._roomConn) throw new Error("LK: Can't enable camera, room not initialized");
        while (true) {
            try {
                if (this.connectionState.get() === ConnectionStates.failed) return logWarn("LK: Can't enable camera, room connection failed");
                this.camTrack = await this._roomConn.localParticipant.setCameraEnabled(true);
                if (this.camTrack) return logInfo("LK: Camera enabled");
            } catch (e) {
                logError(e.message);
            }
            await waitfor(1000);
        }
    }

    async startRoom(rovRoomName: string, livekitApiKey: string, livekitSecretKey: string) {
        this._rovRoomName = rovRoomName;
        this._livekitApiKey = livekitApiKey;
        this._livekitSecretKey = livekitSecretKey;
        this._livekitAdmin = newLivekitAdminSDKRoomServiceClient(this.config.hostUrl, livekitApiKey, livekitSecretKey)
        this.createLivekitRoom();
        const pubAccessToken = await getPublisherAccessToken(livekitApiKey, livekitSecretKey, rovRoomName);
        await super.start(rovRoomName, pubAccessToken);

        // try to enable camera until successful
        log("LK: Enabling camera")
        await Promise.allSettled([this.enableCamera(), this.updateRoomMetadata()]);
        console.log("LK: Room started: ", rovRoomName, livekitApiKey, livekitSecretKey)
        this.checkVideoStats();
    }

    checkVideoStats() {
        if (this._videoStatsIntervalId) clearInterval(this._videoStatsIntervalId);
        this._videoStatsIntervalId = setInterval(async () => {
            if (!this.camTrack || !this.camTrack.videoTrack || this.connectionState.get() != ConnectionStates.connected) return;
            const videoTrack = (this.camTrack.videoTrack as LocalVideoTrack);
            let statsArray = [{
                bitrate: videoTrack.currentBitrate,
                streamState: videoTrack.streamState,
                simulcasted: this.camTrack.simulcasted,
                codec: videoTrack.codec,
                dimensions: this.camTrack.dimensions,
            }, this.camTrack.trackInfo.toJson()];
            const senderStats = await this.camTrack.videoTrack.getSenderStats();
            if (senderStats) statsArray = statsArray.concat(senderStats);
            const RTCStats = await this.camTrack.videoTrack.getRTCStatsReport();
            if (RTCStats) for (const stat of RTCStats.values()) {
                statsArray.push(stat);
            }
            this.videoStats.set(statsArray);
        }, 500)
    }

    async close() {
        if (this._videoStatsIntervalId) clearInterval(this._videoStatsIntervalId);
        await super.close();
    }

    async fail() {
        if (this._videoStatsIntervalId) clearInterval(this._videoStatsIntervalId);
        await super._fail();
    }

}

export class LivekitViewerConnection extends LivekitGenericConnection {
    // remote video tracks maps from the track source name to the livekit track object
    remoteVideoTracks: nStoreT<Map<String, RemoteTrack | null>>;
    // subscribe to get updates on the state of the video channel webrtc connection.
    videoStats = nStore<any[] | undefined>(undefined);
    // interval id for checking video stats loop
    _videoStatsIntervalId: NodeJS.Timeout | null;

    constructor() {
        super();
        this.remoteVideoTracks = nStore<Map<String, RemoteTrack | null>>(new Map());
    }

    subscribeToTracks(participant: RemoteParticipant) {
        if (this._rovRoomName === participant.identity) {
            participant.videoTrackPublications.forEach((pub: RemoteTrackPublication) => {
                pub.setSubscribed(true);
                this.checkVideoStats(pub);
            })
        }
    }

    checkVideoStats(pub: RemoteTrackPublication) {
        if (this._videoStatsIntervalId) clearInterval(this._videoStatsIntervalId);
        this._videoStatsIntervalId = setInterval(async () => {
            if (!pub || !pub.videoTrack || this.connectionState.get() != ConnectionStates.connected) return;
            const videoTrack = (pub.videoTrack as RemoteVideoTrack);
            // videoTrack.setPlayoutDelay(0.01)
            const myStats = {
                bitrate: videoTrack.currentBitrate,
                streamState: videoTrack.streamState,
                simulcasted: pub.simulcasted,
                videoQuality: pub.videoQuality,
                dimensions: pub.dimensions,
                playoutDelay: videoTrack.getPlayoutDelay(),
                numAttachedElements: pub.videoTrack.attachedElements.length,
            }
            let statsArray = [myStats, pub.trackInfo.toJson()];
            const RTCStats = await pub.videoTrack.getRTCStatsReport();
            if (RTCStats) for (const stat of RTCStats.values()) {
                statsArray.push(stat);
            }
            this.videoStats.set(statsArray);

            if (videoTrack.streamState != 'active') {
                pub.setVideoQuality(VideoQuality.LOW)
            }
        }, 100)
    }

    async close() {
        if (this._videoStatsIntervalId) clearInterval(this._videoStatsIntervalId);
        await super.close();
    }

    async fail() {
        if (this._videoStatsIntervalId) clearInterval(this._videoStatsIntervalId);
        await super._fail();
    }

    async init(config: LivekitConfig) {
        await super.init(config);

        // set up more specific event listeners for video publisher (the rov)
        this._roomConn
            .on(RoomEvent.DataReceived, async (msg: Uint8Array, participant?: RemoteParticipant) => {
                if (!participant) return logWarn("LK: Ignoring received data message with no participant. This can happen when the message is sent before connection completes or if the message comes from the server: ", msg);
                if (participant.identity !== this._rovRoomName) return; // Ignore messages that come from participants other than the ROV
                const senderId = participant.identity;
                const senderSID = participant.sid;
                // appendLog(`LK: Got dataReceived from ${senderId} (${senderSID}) via ${this.config.hostUrl}|${this._roomConn.name}`);
                this.lastMsgRecivedTimestamp = Date.now();
                this.latestRecivedDataMessage.set({
                    senderId: senderId,
                    msg: msg
                })
            })
            .on(RoomEvent.Connected, () => {
                const rovParticipant = this._roomConn.remoteParticipants.get(this._rovRoomName)
                if (rovParticipant) this.subscribeToTracks(rovParticipant)
            })
            .on(RoomEvent.ParticipantConnected, (participant) => {
                if (participant.identity === this._rovRoomName) {
                    console.log("LK: ROV Participant connected: ", participant.identity)
                    this.subscribeToTracks(participant)
                }
            })
            .on(RoomEvent.ParticipantDisconnected, (participant) => {
                if (participant.identity === this._rovRoomName) {
                    console.log("LK: ROV Participant disconnected: ", participant.identity)
                }
            })
            .on(RoomEvent.TrackPublished, (pub, participant) => {
                if (participant.identity === this._rovRoomName) {
                    console.log("LK: ROV Participant track published: ", participant.identity, pub.kind, pub.trackSid)
                    this.subscribeToTracks(participant)
                }
            })
            .on(RoomEvent.TrackSubscribed, (track, pub, participant) => {
                if (track.kind !== Track.Kind.Video) return logWarn('LK: Subscribed to unknown track kind: ', track.kind, track.source);
                const knownRemoteTracks = this.remoteVideoTracks.get()
                if (knownRemoteTracks.has(track.source)) {
                    if (knownRemoteTracks.get(track.source) == track) return; // already subscribed to this track
                    logWarn("LK: already subscribed to video track " + track.source + ", unsubscribing from old track")
                    knownRemoteTracks.get(track.source)?.stop();
                }
                appendLog('LK: subscribed to video', track.source);
                knownRemoteTracks.set(track.source, track)
                this.remoteVideoTracks.set(knownRemoteTracks)
                track.on('upstreamPaused', () => {
                    log('LK: video upstream paused')
                })
                track.on('muted', () => {
                    log('LK: video muted')
                })
                track.on('ended', () => {
                    log('LK: video ended')
                })
            })
            .on(RoomEvent.TrackUnsubscribed, (_, pub, participant) => {
                log('LK: Unsubscribed from track', pub.source, pub.trackSid, " from participant: ", participant.identity);
                this.remoteVideoTracks.update((knownRemoteTracks) => {
                    knownRemoteTracks.delete(pub.source)
                    return knownRemoteTracks
                })
            })
    }


}
