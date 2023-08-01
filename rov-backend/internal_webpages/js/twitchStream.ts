import '../../../shared/js/nodeShimsBundle'
import * as livekitServerSDKTypes from 'livekit-server-sdk';
const EgressClient = globalThis.livekitServerSDK.EgressClient as typeof livekitServerSDKTypes.EgressClient
const StreamProtocol = globalThis.livekitServerSDK.StreamProtocol as typeof livekitServerSDKTypes.StreamProtocol

export class TwitchStream {
    private _twitchStreamKey: string = null;
    private _egressClient: livekitServerSDKTypes.EgressClient = null;
    private roomName: string = null;
    private streamEgressID: string = null;

    constructor(twitchStreamKey: string, roomName: string, apiKey: string, secretKey: string) {
        this._twitchStreamKey = twitchStreamKey;
        this.roomName = roomName;
        this._egressClient = new EgressClient('https://rov-web.livekit.cloud', apiKey, secretKey);
    }

    async startStream() {
        const output = {
            protocol:  StreamProtocol.RTMP,
            urls: ['rtmp://live.twitch.tv/app/' + this._twitchStreamKey]
        };
        var info = await this._egressClient.startRoomCompositeEgress(this.roomName, output);
        this.streamEgressID = info.egressId;
    }

    async stopStream() {
        const info = await this._egressClient.stopEgress(this.streamEgressID);
    }

}
