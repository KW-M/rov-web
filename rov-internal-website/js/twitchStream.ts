import { EgressClient, EgressInfo, StreamOutput, StreamProtocol } from 'livekit-server-sdk';
import { waitfor } from './shared/util';
import { log, logInfo, logWarn } from "./shared/logging"
import { silenceFalseSecurityNotice } from './shared/livekit/livekitTokens';

class TwitchStream {
    private _twitchStreamKey?: string;
    private _egressClient?: EgressClient;
    private roomName?: string;
    private streamEgressID?: string;

    init(twitchStreamKey: string, roomName: string, apiKey: string, secretKey: string) {
        this.roomName = roomName;
        this._twitchStreamKey = twitchStreamKey;
        this._egressClient = new EgressClient('https://rov-web.livekit.cloud', apiKey, secretKey);
    }

    async listRunningEgress() {
        if (!this._egressClient) throw new Error("Egress client not initialized!");
        return await this._egressClient.listEgress({
            active: true
        });
    }

    isAnotherEgressRunning(egressList: EgressInfo[]) {
        return egressList.filter((egress) => !this.streamEgressID || egress.egressId != this.streamEgressID).length > 0;
    }

    getCurrentEgress(egressList: EgressInfo[]) {
        return egressList.find((egress) => egress.roomName == this.roomName);
    }

    async closeOtherEgresses(egressList: EgressInfo[]) {
        if (!this._egressClient) return false;
        return Promise.allSettled(egressList.filter((egress) => {
            return !this.streamEgressID || egress.egressId !== this.streamEgressID;
        }).map(async (egress) => {
            if (!this._egressClient || !egress.egressId) return false;
            log("Closing egress: ", egress);
            return await this._egressClient.stopEgress(egress.egressId);
        }));
    }

    async startStream() {
        if (!this._twitchStreamKey || !this._egressClient || !this.roomName) return logWarn("startStream() err: Twitch stream key not set or twitchStream class not initilized!");
        let egressList = await silenceFalseSecurityNotice(() => this.listRunningEgress());
        let currentEgress = this.getCurrentEgress(egressList);
        if (currentEgress !== undefined) {
            log("Found current twitch egress: ", currentEgress);
            this.streamEgressID = currentEgress.egressId;
            return;
        } else {
            while (await this.isAnotherEgressRunning(egressList) == true) {
                const msgs = await this.closeOtherEgresses(egressList);
                logInfo("egressCloseStates", msgs);
                log("Another twitch stream is running, waiting 2 seconds to try again...");
                await waitfor(2000);
                egressList = await this.listRunningEgress();
                currentEgress = this.getCurrentEgress(egressList);
                if (currentEgress !== undefined) {
                    log("Found current twitch egress: ", currentEgress);
                    this.streamEgressID = currentEgress.egressId;
                    return;
                }
            }
            const output = new StreamOutput({
                protocol: StreamProtocol.RTMP,
                urls: ['rtmp://live.twitch.tv/app/' + this._twitchStreamKey]
            });
            var info = await silenceFalseSecurityNotice(() => { return this._egressClient?.startRoomCompositeEgress(this.roomName as string, output) });
            this.streamEgressID = info.egressId;
            logInfo("Twitch stream started: ", info);
        }

    }

    async stopStream() {
        if (!this._egressClient) return logWarn("stopStream() err: Twitch Stream not started!");
        const egressId = this.streamEgressID;
        this.streamEgressID = undefined;
        if (egressId) {
            const info = await silenceFalseSecurityNotice(() => this?._egressClient?.stopEgress(egressId));
            logInfo("Twitch stream stopped: ", info);
        }
        const egressList = await silenceFalseSecurityNotice(() => this.listRunningEgress());
        const egress = this.getCurrentEgress(egressList);
        if (egress) {
            logInfo("Egress still running: ", egress);
            const info = await silenceFalseSecurityNotice(() => this?._egressClient?.stopEgress(egress.egressId));
            logInfo("Twitch stream stopped: ", info);
        }
        this.streamEgressID = undefined;
    }

}

export const twitchStream = new TwitchStream();
