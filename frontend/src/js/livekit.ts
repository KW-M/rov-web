import {
    Room,
    RoomEvent,
    RemoteParticipant,
    RemoteTrackPublication,
    RemoteTrack,
    Participant,
    VideoPresets,
    DefaultReconnectPolicy,
    LocalTrackPublication,
    LocalParticipant,
    Track,
    ParticipantEvent,
    TrackPublication,
    DisconnectReason,
    MediaDeviceFailure,
    ConnectionQuality,
    DataPacket_Kind
} from 'livekit-client';

import { DECODE_TXT, ENCODE_TXT, LIVEKIT_CLOUD_ENDPOINT, LIVEKIT_FRONTEND_ROOM_CONNECTION_CONFIG, LIVEKIT_LOCAL_ENDPOINT, PROXY_PREFIX } from '../../../shared/js/consts';
import { appendLog, getWebsocketURL, waitfor } from '../../../shared/js/util';
import { handleFrontendMsgRcvd } from './msgHandler';
import { setSendProxyMessageCallback } from '../../../shared/js/proxy';
import { enableFrameProxy } from "./frameProxy";

let videoContainerElem;

declare global {
    interface Window {
        LIVEKIT_TOKEN: string;
    }
}

export async function listLivekitRooms(hostUrl: string) {
    return await fetch(hostUrl + '/twirp/livekit.RoomService/ListRooms', {
        method: 'POST',
        cache: 'no-cache',
        mode: 'cors',
        body: JSON.stringify({}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.LIVEKIT_TOKEN,
        }
    }).then(response => response.json()).then(response => {
        const rooms = response.rooms;
        if (!rooms || !Array.isArray(rooms)) throw new Error(`Error getting livekit room list from ${hostUrl} - ${JSON.stringify(response)}`)
        return rooms.filter(room => room['num_participants'] > 0)
    }).catch((e) => {
        console.warn(`Error getting livekit room list from  - ${hostUrl}`, e)
        return [];
    });
}

type msgQueueItem = { msgBytes: Uint8Array, onSendCallback: (msgBytes: Uint8Array) => void }
type MsgRecivedCallback = (msg: Uint8Array, roomId: string, hostUrl: string) => void;
type StateChangeCallback = (connState: string, roomId: string, hostUrl: string) => void;

const livkitConfig = {
    roomConfig: {

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

    }
}

export class LivekitClientConnection {
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
            // automatically manage subscribed video quality
            adaptiveStream: true,
        });
    }

    async start(roomId: string, accessToken: string) {
        console.log(`Starting conn with ${roomId} via ${this.hostUrl} token = ${accessToken}`)
        const startTime = Date.now();
        this.roomId = roomId;

        // set up event listeners
        this.roomConn
            .on(RoomEvent.SignalConnected, async () => {
                const signalConnectionTime = Date.now() - startTime;
                appendLog(`signal connection established in ${signalConnectionTime}ms`);
            })
            .on(RoomEvent.Connected, async () => {
                appendLog(`Connected to room: ${this.roomConn.name} via ${this.hostUrl}`)
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
            .on(RoomEvent.TrackSubscribed, (
                track: RemoteTrack,
                publication: RemoteTrackPublication,
                participant: RemoteParticipant,
            ) => {
                if (track.kind === Track.Kind.Video) {
                    // attach it to a HTMLVideoElement or HTMLAudioElement
                    this.videoElem = track.attach(document.getElementById("cloud_video") as HTMLVideoElement);
                    this.videoElem.setAttribute("host", this.hostUrl)
                    videoContainerElem = document.getElementById("video_container");
                } // else if (track.kind === Track.Kind.Audio) {}
                console.log(track, this.hostUrl)
            })
            .on(RoomEvent.TrackUnsubscribed, (
                track: RemoteTrack,
                publication: RemoteTrackPublication,
                participant: RemoteParticipant,
            ) => {
                // remove tracks from all attached elements
                track.detach();
            })
            .on(RoomEvent.DataReceived, async (msg: Uint8Array, participant?: RemoteParticipant) => {
                const person = participant ? participant.identity : "SERVER";
                appendLog(`Got dataReceived from ${person} via ${this.hostUrl}|${this.roomId}`, DECODE_TXT(msg));
                this.onMesssageRecived(msg, this.roomId, this.hostUrl)
            })
            .on(RoomEvent.LocalTrackUnpublished, (track: LocalTrackPublication, participant: LocalParticipant) => {
                console.error("handleLocalTrackUnpublished: _THIS SHOULD NEVER BE HAPPENING_", track, participant)
            })
            .on(RoomEvent.RoomMetadataChanged, (metadata) => {
                appendLog('new metadata for room', metadata);
            })
            .on(RoomEvent.MediaDevicesChanged, () => {
                appendLog('MediaDevicesChanged _THIS SHOULDN\'T HAPPEN?_');
            })
            .on(RoomEvent.AudioPlaybackStatusChanged, () => {
                appendLog('AudioPlaybackStatusChanged _THIS SHOULDN\'T HAPPEN?_', this.roomConn.canPlaybackAudio);
            })

        await this.roomConn.connect(getWebsocketURL(this.hostUrl), accessToken, LIVEKIT_FRONTEND_ROOM_CONNECTION_CONFIG); // local: 'ws://localhost:7800',
        console.info('connected to room', this.roomConn.name, this.roomConn);

        return true;
    }

    sendMessage(msgBytes: Uint8Array, onSendCallback?: () => void, skipQueue = false) {
        // const rov = this.roomConn.getParticipantByIdentity(this.roomId);
        console.log("sendMessage() to rov ", msgBytes)
        this.roomConn.localParticipant.publishData(msgBytes, DataPacket_Kind.RELIABLE)
    }

    close() {
        console.info("Closing Livekit Connection: ", this.roomId, this.hostUrl);
        if (this.roomConn) {
            this.roomConn.disconnect(true);
        }
    }

}

const cloudLivekitConnection = new LivekitClientConnection(LIVEKIT_CLOUD_ENDPOINT, (msg, roomId, hostUrl) => {
    handleFrontendMsgRcvd(msg)
}, (state, roomId, hostUrl) => {
    console.log("Cloud Conn State Changed: " + state, roomId, hostUrl)
})

// const localLivekitConnection = new LivekitClientConnection(PROXY_PREFIX + LIVEKIT_LOCAL_ENDPOINT, (msg, roomId, hostUrl) => {
//     handleFrontendMsgRcvd(msg)
// }, (state, roomId, hostUrl) => {
//     console.log("Local Conn State Changed: " + state, roomId, hostUrl)
// })

export async function connectToRoom(roomName, accessToken) {
    await cloudLivekitConnection.start(roomName, accessToken);
}

export async function connectToRoomLocal(roomName, accessToken) {
    if (window.parent && window.parent === window.top) {
        enableFrameProxy();
        await waitfor(100);
        // await localLivekitConnection.start(roomName, accessToken);
    }
}

export async function sendTestMessage() {
    // localLivekitConnection.sendMessage(ENCODE_TXT("HI FROM FRONTEND SHOULD BE LOCAL"))
    cloudLivekitConnection.sendMessage(ENCODE_TXT("HI FROM FRONTEND SHOULD BE CLOUD"))
}


export function sendLivekitMessage(data: Uint8Array) {
    cloudLivekitConnection.sendMessage(data)
}





// await waitfor(1000);

// let msg = JSON.stringify({
//     url: 'http://wow.com',
//     body: new Array(...ENCODE_TXT("BooO")),
//     type: proxyMessageTypes.socketMsg
// })
// console.log("smg", msg)
// this.roomConn.localParticipant.publishData(new Uint8Array(ENCODE_TXT(msg)), DataPacket_Kind.RELIABLE)
