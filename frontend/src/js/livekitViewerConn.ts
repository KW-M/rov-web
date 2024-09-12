import nStore, { type nStoreT } from "./shared/libraries/nStore";
import { type LivekitConfig, LivekitBaseConnection } from "./shared/livekit/livekitBaseConn";
import { DisconnectReason, type RemoteParticipant, type RemoteTrack, type RemoteTrackPublication, type RemoteVideoTrack, RoomEvent, Track } from "livekit-client";
import { log, logError, logInfo, logWarn } from "./shared/logging";
import { ConnectionStates } from "./shared/consts";
import { appendLog } from "./shared/util";
import { takenLivekitUsernameIds } from "./globalContext";

interface VideoStatIndicators {
    bytesSent: number,
    bytesReceived: number,
    timestamp: number
}

export class LivekitViewerConnection extends LivekitBaseConnection {
    // remote video tracks maps from the track source name to the livekit track object
    remoteVideoTracks: nStoreT<Map<String, RemoteTrack | null>>;
    // subscribe to get updates on the state of the video channel webrtc connection.
    videoStats = nStore<any[] | undefined>(undefined);
    // flag to indicate if the rov is currently broadcasting a livestream publicly (TWITCH)
    isLivestreamRecording = nStore<boolean>(false);
    // interval id for checking video stats loop
    _videoStatsIntervalId: NodeJS.Timeout | null;
    //
    _lastVideoStatIndicators: VideoStatIndicators;


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
            participant.audioTrackPublications.forEach((pub: RemoteTrackPublication) => pub.setSubscribed(true))

            logInfo("canPlayback audio = ", this._roomConn.canPlaybackAudio, " video = ", this._roomConn.canPlaybackVideo);
        }
    }

    checkVideoStats(pub: RemoteTrackPublication) {
        if (this._videoStatsIntervalId) clearInterval(this._videoStatsIntervalId);
        this._videoStatsIntervalId = setInterval(async () => {
            if (!pub || !pub.videoTrack || this.connectionState.get() != ConnectionStates.connected) return;
            const videoTrack = (pub.videoTrack as RemoteVideoTrack);

            const computedStats = {
            }

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

            let statsArray = [];

            const RTCStats = await pub.videoTrack.getRTCStatsReport();
            if (RTCStats) {
                for (const stat of RTCStats.values()) {
                    statsArray.push(stat);

                    if (stat.type === "codec") {
                        const { mimeType, clockRate, payloadType } = stat;
                        computedStats["codec"] = { mimeType, clockRate, payloadType };
                    } else if (stat.type === "inbound-rtp" && stat.kind === "video") {
                        const { frameWidth, frameHeight, framesPerSecond, framesSent, framesDecoded, framesDropped, frezeCount, nacCount, pliCount, jitterBufferDelay, jitterBufferMiniumDelay, jitterBufferTargetDelay } = stat;
                        computedStats["incoming-video"] = { frameWidth, frameHeight, framesPerSecond, framesSent, framesDecoded, framesDropped, frezeCount, nacCount, pliCount, jitterBufferDelay, jitterBufferMiniumDelay, jitterBufferTargetDelay };
                    } else if (stat.type === "candidate-pair") {
                        const { currentRoundTripTime, state, nominated, availableOutgoingBitrate, availableIncomingBitrate } = stat;
                        computedStats["candidatePair"] = { currentRoundTripTime, state, nominated, availableOutgoingBitrate, availableIncomingBitrate };
                    } else if (stat.type === "transport") {
                        const { timestamp, bytesSent, bytesReceived, selectedCandidatePairChanges, iceState, iceRole, dltsState, dltsRole } = stat;
                        computedStats["timestamp"] = timestamp;
                        computedStats["transport"] = { bytesSent, bytesReceived, selectedCandidatePairChanges, iceState, iceRole, dltsState, dltsRole };
                        if (this._lastVideoStatIndicators) {
                            const { bytesSent: lastBytesSent, bytesReceived: lastBytesReceived } = this._lastVideoStatIndicators;
                            const bytesSentDelta = bytesSent - lastBytesSent;
                            const bytesReceivedDelta = bytesReceived - lastBytesReceived;
                            const timeDelta = timestamp - this._lastVideoStatIndicators.timestamp;
                            const bitrateSend = bytesSentDelta / timeDelta * 1000 * 8;
                            const bitrateReceive = bytesReceivedDelta / timeDelta * 1000 * 8;
                            computedStats["transport"]["bitrateSend"] = bitrateSend;
                            computedStats["transport"]["bitrateReceive"] = bitrateReceive;
                            computedStats["hung"] = bytesReceivedDelta === 0
                        }
                        this._lastVideoStatIndicators = { bytesSent, bytesReceived, timestamp };
                    }
                }

            }
            // let statsArray = [computedStats, myStats, pub.trackInfo.toJson()];
            statsArray.splice(0, 0, computedStats);
            statsArray.splice(1, 0, myStats);
            statsArray.push(pub.trackInfo.toJson());
            this.videoStats.set(statsArray);
        }, 600)
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
                this.isLivestreamRecording.set(this._roomConn.isRecording)
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
                // if (participant.identity === this._rovRoomName) {
                console.log("LK: ROV Participant track published: ", participant.identity, pub.kind, pub.trackSid)
                this.subscribeToTracks(participant)
                // }
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
                this.isLivestreamRecording.set(this._roomConn.isRecording)
            })
            .on(RoomEvent.TrackUnsubscribed, (_, pub, participant) => {
                log('LK: Unsubscribed from track', pub.source, pub.trackSid, " from participant: ", participant.identity);
                this.remoteVideoTracks.update((knownRemoteTracks) => {
                    knownRemoteTracks.delete(pub.source)
                    return knownRemoteTracks
                })
            })
            .on(RoomEvent.Disconnected, (reason?: DisconnectReason) => {
                if (reason === DisconnectReason.DUPLICATE_IDENTITY) {
                    takenLivekitUsernameIds.update((ids) => {
                        ids.add(this.getLivekitIdentitiy());
                        return ids;
                    })
                }
            })
            .on(RoomEvent.RecordingStatusChanged, (isRecording) => {
                appendLog('LK: RecordingStatusChanged ', isRecording);
                this.isLivestreamRecording.set(isRecording);
            })
    }

    checkIfLivestreamRecording() {
        this.isLivestreamRecording.set(this._roomConn.isRecording)
        return this.isLivestreamRecording.get();
    }


}
