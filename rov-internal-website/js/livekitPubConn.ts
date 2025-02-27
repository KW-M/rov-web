import { type LivekitConfig, LivekitBaseConnection } from "./shared/livekit/livekitBaseConn";
import { LocalTrackPublication, MediaDeviceFailure, RemoteParticipant, RoomEvent, Track, type TrackPublishOptions, type VideoCaptureOptions } from "livekit-client";
import { log, logDebug, logError, logInfo, logWarn } from "./shared/logging";
import { ConnectionStates } from "./shared/consts";
import { waitfor } from "./shared/util";
import { getPublisherAccessToken } from "./shared/livekit/livekitTokens";
import { LivekitRoomAdmin } from "./shared/livekit/adminActions";
import { URL_PARAMS } from "./constsInternal";
import { RtpSenderStatsParser } from "./shared/videoStatsParser";
import { unixTimeNow } from "./shared/time";

export class LivekitPublisherConnection extends LivekitBaseConnection {
    _livekitApiKey: string;
    _livekitSecretKey: string;
    _livekitAdmin: LivekitRoomAdmin | undefined;

    // the current camera video track being published
    camTrack: LocalTrackPublication | undefined;
    // video stats
    videoStatsParser = new RtpSenderStatsParser()
    // interval id for checking video stats loop
    _videoStatsIntervalId: NodeJS.Timeout | null;

    _videoPublishOptions: TrackPublishOptions;
    _videoCaptureOptions: VideoCaptureOptions;

    constructor() {
        super();
    }

    async init(config: LivekitConfig) {
        await super.init(config);

        // set up more specific event listeners for video publisher (the rov)
        this._roomConn
            // .on(RoomEvent.SignalConnected, async () => {
            //     logInfo("LK: Signal connected to room metadata: ", this._roomConn.name, this._roomConn.state, this._roomConn.metadata);
            //     const clone = {
            //         ...this._roomConn["roomInfo"]
            //     }
            //     if (!this._roomConn.metadata?.length) this.createLivekitRoom();
            // })
            .on(RoomEvent.SignalConnected, () => {
                if (!this.isVideoActive()) this.enableCamera();
                if (!this._roomConn.metadata) this.createLivekitRoom();
            })
            .on(RoomEvent.Reconnecting, () => {
                if (!this._roomConn.metadata) this.createLivekitRoom();
            })
            .on(RoomEvent.Connected, () => {
                if (!this.isVideoActive()) this.enableCamera();
                this.updateRoomMetadata();
            })
            .on(RoomEvent.Reconnected, () => {
                if (!this.isVideoActive()) this.enableCamera();
                this.updateRoomMetadata();
            })
            .on(RoomEvent.ParticipantConnected, () => {
                this.updateRoomMetadata();
            })
            .on(RoomEvent.DataReceived, (msg: Uint8Array, participant?: RemoteParticipant) => {
                if (!participant) return logWarn("LK: Ignoring received data message with no participant. This can happen when the message is sent before connection completes or if the message comes from the server: ", msg);
                const senderId = participant?.identity;
                // const senderSID = participant.sid;
                // log(`LK: Got dataReceived from ${senderId} (${senderSID}) via ${this.config.hostUrl}|${this._roomConn.name}`);
                this.lastMsgRecivedTimestamp = unixTimeNow();
                this.latestRecivedDataMessage.set({
                    senderId: senderId,
                    msgBytes: msg
                })
            })
            .on(RoomEvent.TrackSubscribed, (track, pub, participant) => {
                logWarn('LK: Subscribed to track ', pub.trackSid, " from participant: ", participant.identity, " source: ", track.source, ' _THIS SHOULDNT HAPPEN on BACKEND_ ');
            })
            .on(RoomEvent.TrackUnsubscribed, (_, pub, participant) => {
                logWarn('LK: Unsubscribed from track', pub.trackSid, " from participant: ", participant.identity, ' _THIS SHOULDNT HAPPEN on BACKEND_ ');
            })
            .on(RoomEvent.MediaDevicesError, (e: Error) => {
                const failure = MediaDeviceFailure.getFailure(e);
                logError('LK: Media device failure', failure);
                this._reconnect();
            })
    }

    async startRoom(rovRoomName: string, livekitApiKey: string, livekitSecretKey: string) {
        this._rovRoomName = rovRoomName;
        this._livekitApiKey = livekitApiKey;
        this._livekitSecretKey = livekitSecretKey;
        this._livekitAdmin = this._livekitAdmin ?? new LivekitRoomAdmin(livekitApiKey, livekitSecretKey, this.config.hostUrl, rovRoomName, URL_PARAMS.ROV_CONTROL_PASSWORD);

        this.createLivekitRoom();
        const pubAccessToken = await getPublisherAccessToken(livekitApiKey, livekitSecretKey, rovRoomName);
        await super.start(rovRoomName, pubAccessToken);
    }

    async enableCamera(captureOptions?: VideoCaptureOptions, publishOptions?: TrackPublishOptions) {
        if (!this._roomConn) throw new Error("LK: Can't enable camera, room not initialized");

        this._videoCaptureOptions = captureOptions || this._videoCaptureOptions || this.config.roomConfig.videoCaptureDefaults;
        this._videoPublishOptions = publishOptions || this._videoPublishOptions || this.config.roomConfig.publishDefaults;



        const videoPub = this._roomConn.localParticipant.getTrackPublication(Track.Source.Camera);
        if (captureOptions && videoPub) {
            log("LK: Camera track restarting with options: ", captureOptions, publishOptions, videoPub);
            if (videoPub) {
                const videoTrack = videoPub.videoTrack;
                if (publishOptions) {
                    await this._roomConn.localParticipant.unpublishTrack(videoTrack, false);
                    await videoTrack.restartTrack(this._videoCaptureOptions);
                    await videoTrack.restartTrack(this._videoCaptureOptions);// TODO: remove this line when livekit bug is fixed
                    await this._roomConn.localParticipant.publishTrack(videoTrack, this._videoPublishOptions);
                } else {
                    await videoTrack.restartTrack(this._videoCaptureOptions);
                    await videoTrack.restartTrack(this._videoCaptureOptions); // TODO: remove this line when livekit bug is fixed
                }
            }
        }
        await this._roomConn.localParticipant.setCameraEnabled(true, this._videoCaptureOptions, this._videoPublishOptions);
        // if (!this._roomConn.localParticipant.isCameraEnabled) {
        //     const videoPub = await this._roomConn.localParticipant.setCameraEnabled(true, this._videoCaptureOptions, this._videoPublishOptions);
        //     if (!videoPub || !videoPub.videoTrack) return logError("LK: Can't enable camera, no video publication returned");
        //     this.camTrack = videoPub;
        // }


        // this._roomConn.localParticipant.setMicrophoneEnabled(enabled);

        // disable all existing video tracks
        // for (const [name, vidPub] of this._roomConn.localParticipant.videoTrackPublications) {
        //     log("LK: Unpublishing video track: ", name, vidPub)
        //     if (vidPub?.videoTrack) {
        //         this._roomConn.localParticipant.unpublishTrack(vidPub.videoTrack, true);
        //     }
        // }
        // while (true) {
        //     try {
        //         if (this.connectionState.get() === ConnectionStates.failed) return logWarn("LK: Can't enable camera, room connection failed");
        //         const tracks = await this._roomConn.localParticipant..createTracks({
        //             video: {
        //                 resolution: this._videoCaptureOptions.resolution,
        //                 facingMode: this._videoCaptureOptions.facingMode
        //             },
        //             audio: false
        //         })
        //         for (const track of tracks) {
        //             const pub = await this._roomConn.localParticipant.publishTrack(tracks[0], this._videoPublishOptions);
        //             if (pub && track.kind === Track.Kind.Video) this.camTrack = pub;
        //             pub.videoTrack.restartTrack()
        //         }
        //         if (this.camTrack) return logInfo("LK: Camera enabled", enabled, this._videoCaptureOptions, this._videoPublishOptions);
        //     } catch (e) {
        //         logError(e.message);
        //     }
        //     await waitfor(1000);
        // }
    }

    async disableCamera() {
        if (this.camTrack) {
            this.camTrack.videoTrack.stop();
            this.camTrack.audioTrack.stop();
            this.camTrack = undefined;
        }
        await this._roomConn.localParticipant.setCameraEnabled(false);
    }

    isVideoActive() {
        // if (!this.camTrack || !this.camTrack.videoTrack) return false;
        // let videoPublication = this._roomConn.localParticipant.videoTrackPublications.get(this.camTrack.trackSid);
        // logDebug("LK: Video Publication: ", videoPublication, " Enabled: ", videoPublication?.isEnabled);
        // return videoPublication?.isEnabled;
        return this._roomConn.localParticipant.isCameraEnabled;
    }

    async getVideoStats() {
        for (const stream of this._roomConn.localParticipant.videoTrackPublications.values()) {
            if (!stream || !stream.videoTrack) continue;
            const report = await stream.videoTrack.getRTCStatsReport()
            if (!report) continue;
            const stats = this.videoStatsParser.parse(report);
            if (stats) return stats;
        }
    }

    getParticipantIds() {
        return [...this._roomConn.remoteParticipants.values()].map(p => p.identity);
    }

    // ---- Admin Functions ----

    async updateRoomMetadata() {
        // update room metadata to exclude auth tokens taken by participants
        if (!this._livekitAdmin) return logWarn("LK: Can't update metadata tokens, livekit admin client not initialized");
        logInfo("LK: Updating room metadata");
        const currentParticipants = this.getParticipantIds().filter(id => id !== this._rovRoomName);
        await this._livekitAdmin.updateRoomMetadata(currentParticipants, currentParticipants.length + 1);
    }

    async createLivekitRoom() {
        if (!this._livekitAdmin) return logWarn("LK: Can't create livekit room, livekit admin client not initialized");
        const currentParticipants = this.getParticipantIds()
        const roomInfo = await this._livekitAdmin.createLivekitRoom(currentParticipants, currentParticipants.length + 1);
        if (!roomInfo.metadata || roomInfo.numParticipants !== currentParticipants.length + 1) await this.updateRoomMetadata();
    }

}
