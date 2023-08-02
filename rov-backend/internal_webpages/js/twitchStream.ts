import '../../../shared/js/nodeShimsBundle'
import * as livekitServerSDKTypes from 'livekit-server-sdk';
const EgressClient = globalThis.livekitServerSDK.EgressClient as typeof livekitServerSDKTypes.EgressClient
const StreamProtocol = globalThis.livekitServerSDK.StreamProtocol as typeof livekitServerSDKTypes.StreamProtocol

class TwitchStream {
    private _twitchStreamKey: string = null;
    private _egressClient: livekitServerSDKTypes.EgressClient = null;
    private roomName: string = null;
    private streamEgressID: string = null;

    innit(twitchStreamKey: string, roomName: string, apiKey: string, secretKey: string) {
        this._twitchStreamKey = twitchStreamKey;
        this.roomName = roomName;
        this._egressClient = new EgressClient('https://rov-web.livekit.cloud', apiKey, secretKey);
    }

    async startStream() {
        if (!this._twitchStreamKey) return console.warn("startStream() err: Twitch stream key not set!");
        const output = {
            protocol: StreamProtocol.RTMP,
            urls: ['rtmp://live.twitch.tv/app/' + this._twitchStreamKey]
        };
        var info = await this._egressClient.startRoomCompositeEgress(this.roomName, output);
        this.streamEgressID = info.egressId;
    }

    async stopStream() {
        if (!this.streamEgressID) return console.warn("stopStream() err: Twitch Stream not started!");
        const info = await this._egressClient.stopEgress(this.streamEgressID);
    }

}

export const twitchStream = new TwitchStream();
