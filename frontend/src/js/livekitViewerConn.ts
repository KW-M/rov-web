import nStore, { type nStoreT } from "./shared/libraries/nStore";
import { type LivekitConfig, LivekitBaseConnection } from "./shared/livekit/livekitBaseConn";
import { DisconnectReason, type RemoteParticipant, type RemoteTrack, type RemoteTrackPublication, type RemoteVideoTrack, RoomEvent, Track } from "livekit-client";
import { log, logDebug, logError, logInfo, logWarn } from "./shared/logging";
import { ConnectionStates } from "./shared/consts";
import { takenLivekitUsernames } from "./globalContext";
import { RtpRecieverStatsParser } from "./shared/videoStatsParser";
import { unixTimeNow } from "./shared/time";
import { showToastMessage } from "./toastMessageManager";

export class LivekitViewerConnection extends LivekitBaseConnection {
    // remote video tracks maps from the track source name to the livekit track object
    remoteVideoTracks: nStoreT<Map<String, RemoteTrack | null>>;
    // video stats
    videoStatsParser = new RtpRecieverStatsParser()
    // flag to indicate if the rov is currently broadcasting a livestream publicly (TWITCH)
    isLivestreamRecording = nStore<boolean>(false);

    constructor() {
        super();
        this.remoteVideoTracks = nStore<Map<String, RemoteTrack | null>>(new Map());
    }

    subscribeToTracks(participant: RemoteParticipant) {
        if (this._rovRoomName === participant.identity) {
            participant.videoTrackPublications.forEach((pub: RemoteTrackPublication) => {
                pub.setSubscribed(true);
            })

            // Audio in case we want to listen to the ROV underwater audio
            participant.audioTrackPublications.forEach((pub: RemoteTrackPublication) => pub.setSubscribed(true))
            logInfo(`Can playback - audio: ${this._roomConn.canPlaybackAudio}, video: ${this._roomConn.canPlaybackVideo}`);
        }
    }

    async getVideoStats() {
        for (const [_, track] of this.remoteVideoTracks.get()) {
            if (!track) continue;
            const report = await track.getRTCStatsReport()
            if (!report) continue;
            const stats = this.videoStatsParser.parse(report);
            if (stats) return stats;
        }
    }

    // checkVideoStats(pub: RemoteTrackPublication) {

    //     if (!pub || !pub.videoTrack || this.connectionState.get() != ConnectionStates.connected) return;
    //     const videoTrack = (pub.videoTrack as RemoteVideoTrack);

    //     const computedStats = {
    //     }

    //     // videoTrack.setPlayoutDelay(0.01)
    //     const myStats = {
    //         bitrate: videoTrack.currentBitrate,
    //         streamState: videoTrack.streamState,
    //         simulcasted: pub.simulcasted,
    //         videoQuality: pub.videoQuality,
    //         dimensions: pub.dimensions,
    //         playoutDelay: videoTrack.getPlayoutDelay(),
    //         numAttachedElements: pub.videoTrack.attachedElements.length,
    //     }

    //     let statsArray = [];

    //     const RTCStats = await pub.videoTrack.getRTCStatsReport();
    //     if (RTCStats) {
    //         for (const stat of RTCStats.values()) {
    //             statsArray.push(stat);


    //         }

    //     }
    //     // let statsArray = [computedStats, myStats, pub.trackInfo.toJson()];
    //     statsArray.splice(0, 0, computedStats);
    //     statsArray.splice(1, 0, myStats);
    //     statsArray.push(pub.trackInfo.toJson());
    //     this.videoStats.set(statsArray);
    // }, 600)
    // }

    close() {
        super.close();
    }

    _fail() {
        super._fail();
    }

    async init(config: LivekitConfig) {
        await super.init(config);

        // set up more specific event listeners for video publisher (the rov)
        this._roomConn
            .on(RoomEvent.DataReceived, async (msg: Uint8Array, participant?: RemoteParticipant) => {
                if (!participant) return logWarn("LK: Ignoring received data message with no participant. This can happen when the message is sent before connection completes or if the message comes from the server: ", msg);
                if (participant.identity !== this._rovRoomName) return; // Ignore messages that come from participants other than the ROV
                const senderId = participant.identity;
                // log(`LK: Got dataReceived from ${senderId} (${senderSID}) via ${this.config.hostUrl}|${this._roomConn.name}`);
                this.lastMsgRecivedTimestamp = unixTimeNow();
                this.latestRecivedDataMessage.set({
                    senderId: senderId,
                    msgBytes: msg
                })
            })
            .on(RoomEvent.Connected, () => {
                const rovParticipant = this._roomConn.remoteParticipants.get(this._rovRoomName)
                if (rovParticipant) this.subscribeToTracks(rovParticipant)
                this.isLivestreamRecording.set(this._roomConn.isRecording)
            })
            .on(RoomEvent.ParticipantConnected, (participant) => {
                if (participant.identity === this._rovRoomName) {
                    logDebug("LK: ROV Participant connected: ", participant.identity)
                    this.subscribeToTracks(participant)
                }
            })
            .on(RoomEvent.ParticipantDisconnected, (participant) => {
                if (participant.identity === this._rovRoomName && this.connectionState.get() === ConnectionStates.connected) {
                    logDebug("LK: ROV Participant disconnected: ", participant.identity)
                    showToastMessage("ROV is offline")
                }
            })
            .on(RoomEvent.TrackPublished, (pub, participant) => {
                // if (participant.identity === this._rovRoomName) {
                logDebug("LK: ROV Participant track published: ", participant.identity, pub.kind, pub.trackSid)
                this.subscribeToTracks(participant)
                // }
            })
            .on(RoomEvent.TrackSubscribed, (track, pub, participant) => {
                if (track.kind !== Track.Kind.Video) return logWarn('LK: Subscribed to unknown track kind: ', track.kind, track.source);
                this.remoteVideoTracks.update((knownRemoteTracks) => {
                    if (knownRemoteTracks.has(track.source)) {
                        if (knownRemoteTracks.get(track.source) == track) return; // already subscribed to this track
                        logWarn("LK: already subscribed to video track " + track.source + ", unsubscribing from old track")
                        knownRemoteTracks.get(track.source)?.stop();
                    }
                    log('LK: subscribed to video', track.source);
                    knownRemoteTracks.set(track.source, track)
                    return knownRemoteTracks
                })
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
                // Avoi Removing tracks BECAUSE Causes Race condition With Livekit
                // this.remoteVideoTracks.update((knownRemoteTracks) => {
                //     knownRemoteTracks.delete(pub.source)
                //     return knownRemoteTracks
                // })
            })
            .on(RoomEvent.Disconnected, (reason?: DisconnectReason) => {
                if (reason === DisconnectReason.DUPLICATE_IDENTITY) {
                    takenLivekitUsernames.update((ids) => {
                        ids.add(this.getLivekitIdentitiy());
                        return ids;
                    })
                }
            })
            .on(RoomEvent.RecordingStatusChanged, (isRecording) => {
                log('LK: RecordingStatusChanged ', isRecording);
                this.isLivestreamRecording.set(isRecording);
            })
    }

    checkIfLivestreamRecording() {
        this.isLivestreamRecording.set(this._roomConn.isRecording)
        return this.isLivestreamRecording.get();
    }


}
