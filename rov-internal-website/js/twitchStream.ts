import { EgressClient, StreamProtocol } from 'livekit-server-sdk';
import { waitfor } from './shared/util';

class TwitchStream {
    private _twitchStreamKey?: string;
    private _egressClient?: EgressClient;
    private roomName?: string;
    private streamEgressID?: string;

    init(twitchStreamKey: string, roomName: string, apiKey: string, secretKey: string) {
        this._twitchStreamKey = twitchStreamKey;
        this.roomName = roomName;
        this._egressClient = new EgressClient('https://rov-web.livekit.cloud', apiKey, secretKey);
    }

    async isAnotherStreamRunning() {
        if (!this._egressClient) return true;
        return this._egressClient.listEgress().then((egresses) => {
            return egresses.filter((egress) => !this.streamEgressID || egress.egressId != this.streamEgressID).length > 0;
        })
    }

    async closeOtherEgresses() {
        if (!this._egressClient) return false;
        return this._egressClient.listEgress().then((egresses) => {
            return egresses.map(async (egress) => {
                if (!this._egressClient || !egress.egressId || this.streamEgressID && egress.egressId == this.streamEgressID) return;
                console.log("Closing egress: ", egress);
                await this._egressClient.stopEgress(egress.egressId);
            });
        })
    }

    async startStream() {
        if (!this._twitchStreamKey || !this._egressClient || !this.roomName) return console.warn("startStream() err: Twitch stream key not set or twitchStream class not initilized!");
        await this.closeOtherEgresses();
        while (await this.isAnotherStreamRunning() == true) {
            console.log("Another twitch stream is running, waiting 5 seconds to try again...");
            await waitfor(5000);
        }
        const output = {
            protocol: StreamProtocol.RTMP,
            urls: ['rtmp://live.twitch.tv/app/' + this._twitchStreamKey]
        };
        var info = await this._egressClient.startRoomCompositeEgress(this.roomName, output);
        this.streamEgressID = info.egressId;
    }

    async stopStream() {
        if (!this.streamEgressID || !this._egressClient) return console.warn("stopStream() err: Twitch Stream not started!");
        const info = await this._egressClient.stopEgress(this.streamEgressID);
    }

}

export const twitchStream = new TwitchStream();
