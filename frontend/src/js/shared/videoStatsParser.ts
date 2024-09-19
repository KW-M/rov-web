import { rov_actions_proto } from "./protobufs/rovActionsProto";

export type VideoCodec = "h264" | "vp8" | "vp9" | "av1" | "h265" | "unknown";
export type ComputedRtpStats = rov_actions_proto.IVideoBaseStats & {

    // ice
    selectedCandidatePairChanges?: number;
    canidatePairState?: RTCStatsIceCandidatePairState;
    canidatePairNominated?: boolean;
    iceState?: RTCIceTransportState;
    dtlsState?: RTCDtlsTransportState;

    // put all base rtc stats here
    allStats?: any[];
};

interface OutboundRtpStreamStats extends RTCOutboundRtpStreamStats {
    active: boolean,
    encoderImplementation: string,
    firCount: number,
    framesEncoded: number,
    framesSent: number,
    headerBytesSent: number,
    hugeFramesSent: number,
    keyFramesEncoded: number,
    mediaSourceId: string,
    mid: number,
    nackCount: number,
    pliCount: number,
    powerEfficientEncoder: boolean,
    qualityLimitationDurations: {
        bandwidth: number,
        cpu: number,
        none: number,
        other: number,
    },
    qualityLimitationReason: string,
    retransmittedBytesSent: number,
    retransmittedPacketsSent: number,
    scalabilityMode: string,
    totalEncodeTime: number,
    totalEncodedBytesTarget: number,
    totalPacketSendDelay: number,
}

// interface ComputedRtpStats {
//     hung: boolean;
//     bitrateSend: number;
//     bitrateReceive: number;
//     selectedCandidatePairChanges: number;

//     // candidate pair stats
//     timestamp: number;
//     bytesSent: number;
//     bytesReceived: number;
//     availableOutgoingBitrate?: number;
//     availableIncomingBitrate?: number;
//     jitterBufferDelay?: number;
//     jitterBufferMiniumDelay?: number;
//     jitterBufferTargetDelay?: number;
//     currentRoundTripTime?: number;
//     canidatePairState: RTCStatsIceCandidatePairState;
//     canidatePairNominated: boolean;

//     // transport stats
//     selectedCandidatePairId: string;
//     iceState: RTCIceTransportState;
//     iceRole?: string;
//     dtlsState: RTCDtlsTransportState;
//     dltsRole?: string;

//     // put all base rtc stats here
//     allStats?: any[];
// }

// export interface ComputedRecieverStats extends ComputedRtpStats {
//     // video codec
//     videoCodec?: "h264" | "vp8" | "vp9" | "av1" | "h265" | "unknown";
//     videoSdpFmtpLine?: string;

//     // incoming video stats
//     frameWidth?: number;
//     frameHeight?: number;
//     framesPerSecond?: number;
//     freezeCount: number;
//     nackCount: number;
//     pliCount: number;
// }

// export interface ComputedSenderStats extends ComputedRtpStats {
//     // video codec
//     videoCodec?: "h264" | "vp8" | "vp9" | "av1" | "h265" | "unknown";
//     videoSdpFmtpLine?: string;

//     // incoming video stats
//     frameWidth?: number;
//     frameHeight?: number;
//     framesPerSecond?: number;
//     freezeCount: number;
//     nackCount: number;
//     pliCount: number;
// }


export class RtpStatsParser {
    lastStats: ComputedRtpStats;
    timestamp: number;
    bytesSent: number;
    bytesReceived: number;
    selectedCandidatePairId: string;

    constructor() {
        this.lastStats = {
            availableIncomingBitrate: 0,
            availableOutgoingBitrate: 0,
            bitrateReceive: 0,
            bitrateSend: 0,
            recieverStats: {},
            senderLayerStats: [],
            rtcStatsJson: "",

            // ice
            selectedCandidatePairChanges: 0,
            canidatePairState: "waiting",
            canidatePairNominated: false,
            iceState: "new",
            dtlsState: "new",

            allStats: [],
        }
    }

    parse(statsList?: RTCStatsReport | any[]) {
        let computedStats: ComputedRtpStats = {
            ...this.lastStats,
        };
        computedStats.senderLayerStats = [];
        computedStats.recieverStats = {};
        if (!statsList) {
            computedStats.recieverStats.hung = true;
            return computedStats;
        }

        const stats = computedStats.allStats = Array.from(statsList.values ? statsList.values() : statsList);
        const codecMap = new Map<string, { codec: string, sdpFmtpLine }>();
        for (const stat of stats) {
            const type = stat.type as RTCStatsType;
            if (type === "codec") {
                const { mimeType, sdpFmtpLine, id } = stat as RTCRtpCodec & { id: string };
                const [_, codec] = mimeType.toLowerCase().split("/");
                codecMap.set(id, { codec: codec ?? "unknown", sdpFmtpLine })
            }
        }

        for (const stat of stats) {
            const type = stat.type as RTCStatsType;
            if (type === "inbound-rtp" && stat.kind === "video") {
                let { frameWidth, frameHeight, framesPerSecond, estimatedPlayoutTimestamp, nackCount, pliCount, jitterBufferDelay, freezeCount, jitter, codecId } = stat as RTCInboundRtpStreamStats & { freezeCount: number };
                nackCount = nackCount ?? 0;
                pliCount = pliCount ?? 0;
                const { codec: videoCodec, sdpFmtpLine: videoSdpFmtpLine } = codecMap.get(codecId || "") || { codec: "unknown", sdpFmtpLine: "" };
                const estimatedPlayoutDelay = Math.max(estimatedPlayoutTimestamp ? estimatedPlayoutTimestamp - this.timestamp : 0, jitterBufferDelay);
                computedStats.recieverStats = { ...computedStats.recieverStats, nackCount, pliCount, freezeCount, estimatedPlayoutDelay, jitterBufferDelay, jitter, frameWidth, frameHeight, framesPerSecond, videoCodec, videoSdpFmtpLine };
            }

            else if (type === "outbound-rtp" && stat.kind === "video") {
                let { retransmittedBytesSent, scalabilityMode, qualityLimitationResolutionChanges, encoderImplementation, powerEfficientEncoder, qualityLimitationReason, qualityLimitationDurations, totalPacketSendDelay, frameWidth, frameHeight, framesPerSecond, codecId } = stat as OutboundRtpStreamStats;
                const { codec: videoCodec, sdpFmtpLine: videoSdpFmtpLine } = codecMap.get(codecId || "") || { codec: "unknown", sdpFmtpLine: "" };
                computedStats.senderLayerStats?.push({
                    qualityLimitationResolutionChanges,
                    qualityLimitationReason,
                    bandwidthLimitedQualityDurration: qualityLimitationDurations.bandwidth,
                    cpuLimitedQualityDurration: qualityLimitationDurations.cpu,
                    otherLimitedQualityDurration: qualityLimitationDurations.other,
                    noLimitedQualityDurration: qualityLimitationDurations.none,
                    encoderImplementation,
                    powerEfficientEncoder, scalabilityMode,
                    totalPacketSendDelay,
                    retransmittedBytesSent,
                    frameWidth,
                    frameHeight,
                    framesPerSecond,
                    videoCodec,
                    videoSdpFmtpLine,
                });
            }


            // else if (type === "media-source" && stat.kind === "video") {
            //     let { frameWidth, frameHeight, framesPerSecond } = stat as RTCOutboundRtpStreamStats & {};
            //     computedStats = { ...computedStats, frameWidth, frameHeight, framesPerSecond };
            // }

            else if (type === "candidate-pair") {
                const { availableOutgoingBitrate, availableIncomingBitrate, currentRoundTripTime, state, nominated } = stat as RTCIceCandidatePairStats;
                if (nominated === false) continue;
                computedStats = { ...computedStats, recieverStats: { ...computedStats.recieverStats, currentRoundTripTime }, availableOutgoingBitrate, availableIncomingBitrate, canidatePairState: state, canidatePairNominated: nominated };
            }

            else if (type === "transport") {
                let { bytesReceived, bytesSent, dtlsState, selectedCandidatePairId, timestamp } = stat as RTCTransportStats;
                bytesReceived = bytesReceived ?? 0;
                bytesSent = bytesSent ?? 0;
                selectedCandidatePairId = selectedCandidatePairId ?? "";
                if (selectedCandidatePairId !== this.selectedCandidatePairId) {
                    computedStats.selectedCandidatePairChanges = (computedStats.selectedCandidatePairChanges || 0) + 1;
                    this.selectedCandidatePairId = selectedCandidatePairId;
                }
                if (timestamp != this.timestamp) {
                    computedStats.bitrateReceive = (bytesReceived - this.bytesReceived) / (timestamp - this.timestamp) * 8000; // timestamp is in milliseconds and 8 bits in a byte
                    computedStats.bitrateSend = (bytesSent - this.bytesSent) / (timestamp - this.timestamp) * 8000; // timestamp is in milliseconds and 8 bits in a byte
                    computedStats.recieverStats = { ...computedStats.recieverStats, hung: computedStats.bitrateReceive <= 0 };
                    this.timestamp = timestamp;
                }
                this.bytesSent = bytesSent;
                this.bytesReceived = bytesReceived;
            }
        }
        computedStats.senderLayerStats = computedStats.senderLayerStats ? computedStats.senderLayerStats.sort((a, b) => (b.frameWidth || 0) * (b.frameHeight || 0) - (a.frameWidth || 0) * (a.frameHeight || 0)) : [];
        this.lastStats = computedStats;
        return computedStats;
    }

}

export class RtpSenderStatsParser extends RtpStatsParser { }
export class RtpRecieverStatsParser extends RtpStatsParser { }


//     constructor() {
//         this.lastStats = {
//             hung: false,
//             framesPerSecond: 0,
//             frameHeight: 0,
//             frameWidth: 0,
//             availableIncomingBitrate: 0,
//             availableOutgoingBitrate: 0,
//             bitrateReceive: 0,
//             bitrateSend: 0,

//         }
//     }

//     parse(statsList?: RTCStatsReport | any[]) {
//         let computedStats: rov_actions_proto.IVideoBaseStats = {
//             ...this.lastStats,
//         };
//         if (!statsList) {
//             computedStats.hung = true;
//             return computedStats;
//         }

//         const stats = computedStats.allStats = Array.from(statsList.values ? statsList.values() : statsList);
//         for (const stat of stats) {
//             const type = stat.type as RTCStatsType;
//             if (type === "codec") {
//                 const { mimeType, sdpFmtpLine } = stat as RTCRtpCodec;
//                 const [mimeBase, codec] = mimeType.split("/");
//                 if (mimeBase !== "video") continue;
//                 computedStats.videoCodec = (codec ?? "unknown").toLowerCase() as "h264" | "vp8" | "vp9" | "av1" | "h265" | "unknown";
//                 computedStats.videoSdpFmtpLine = sdpFmtpLine;
//             } else if (type === "inbound-rtp" && stat.kind === "video") {
//                 let { frameWidth, frameHeight, framesPerSecond, estimatedPlayoutTimestamp, framesDecoded, framesDropped, nackCount, pliCount, jitterBufferDelay } = stat as RTCInboundRtpStreamStats;
//                 nackCount = nackCount ?? 0;
//                 pliCount = pliCount ?? 0;
//                 computedStats = { ...computedStats, frameWidth, frameHeight, framesPerSecond, nackCount, pliCount, jitterBufferDelay };
//                 // if (estimatedPlayoutTimestamp)
//             } else if (type === "candidate-pair") {
//                 const { availableOutgoingBitrate, availableIncomingBitrate, currentRoundTripTime, state, nominated } = stat as RTCIceCandidatePairStats;
//                 if (!nominated) continue;
//                 computedStats = { ...computedStats, availableOutgoingBitrate, availableIncomingBitrate, currentRoundTripTime, canidatePairState: state, canidatePairNominated: nominated };
//             } else if (type === "transport") {
//                 let { bytesReceived, bytesSent, dtlsState, selectedCandidatePairId, timestamp } = stat as RTCTransportStats;
//                 bytesReceived = bytesReceived ?? 0;
//                 bytesSent = bytesSent ?? 0;
//                 selectedCandidatePairId = selectedCandidatePairId ?? "";
//                 computedStats = { ...computedStats, bytesReceived, bytesSent, dtlsState, selectedCandidatePairId };
//                 if (selectedCandidatePairId !== this.selectedCandidatePairId) {
//                     computedStats.selectedCandidatePairChanges++;
//                     this.selectedCandidatePairId = computedStats.selectedCandidatePairId;
//                 }
//                 if (timestamp != this.timestamp) {
//                     computedStats.bitrateReceive = (bytesReceived - this.bytesReceived) / (timestamp - this.timestamp) * 8000; // timestamp is in milliseconds and 8 bits in a byte
//                     computedStats.bitrateSend = (bytesSent - this.bytesSent) / (timestamp - this.timestamp) * 8000; // timestamp is in milliseconds and 8 bits in a byte
//                     computedStats.hung = computedStats.bitrateReceive <= 0;
//                     this.timestamp = timestamp;
//                 }
//             }
//         }

//         this.lastStats = computedStats;

//         this.bytesSent = computedStats.bytesSent;
//         this.bytesReceived = computedStats.bytesReceived;
//         return computedStats;
//     }

// }

// export class RtprecieverStatsParser {
//     _lastStats: ComputedRecieverStats;

//     constructor() {
//         this._lastStats = {
//             hung: false,
//             bitrateSend: 0,
//             bitrateReceive: 0,
//             timestamp: 0,
//             bytesSent: 0,
//             bytesReceived: 0,
//             availableOutgoingBitrate: 0,
//             availableIncomingBitrate: 0,
//             jitterBufferDelay: 0,
//             jitterBufferMiniumDelay: 0,
//             jitterBufferTargetDelay: 0,
//             currentRoundTripTime: 0,
//             canidatePairState: "waiting",
//             canidatePairNominated: false,
//             selectedCandidatePairChanges: 0,
//             selectedCandidatePairId: "",
//             iceState: "new",
//             dtlsState: "new",
//             freezeCount: 0,
//             nackCount: 0,
//             pliCount: 0,
//         }
//     }

//     parse(statsList?: RTCStatsReport | any[]) {
//         let computedStats: ComputedRecieverStats = {
//             ...this._lastStats,
//             canidatePairNominated: false,
//         };
//         if (!statsList) {
//             computedStats.hung = true;
//             return computedStats;
//         }

//         const stats = computedStats.allStats = Array.from(statsList.values ? statsList.values() : statsList);
//         for (const stat of stats) {
//             const type = stat.type as RTCStatsType;
//             if (type === "codec") {
//                 const { mimeType, sdpFmtpLine } = stat as RTCRtpCodec;
//                 const [mimeBase, codec] = mimeType.split("/");
//                 if (mimeBase !== "video") continue;
//                 computedStats.videoCodec = (codec ?? "unknown").toLowerCase() as "h264" | "vp8" | "vp9" | "av1" | "h265" | "unknown";
//                 computedStats.videoSdpFmtpLine = sdpFmtpLine;
//             } else if (type === "inbound-rtp" && stat.kind === "video") {
//                 let { frameWidth, frameHeight, framesPerSecond, estimatedPlayoutTimestamp, framesDecoded, framesDropped, nackCount, pliCount, jitterBufferDelay } = stat as RTCInboundRtpStreamStats;
//                 nackCount = nackCount ?? 0;
//                 pliCount = pliCount ?? 0;
//                 computedStats = { ...computedStats, frameWidth, frameHeight, framesPerSecond, nackCount, pliCount, jitterBufferDelay };
//                 // if (estimatedPlayoutTimestamp)
//             } else if (type === "candidate-pair") {
//                 const { availableOutgoingBitrate, availableIncomingBitrate, currentRoundTripTime, state, nominated } = stat as RTCIceCandidatePairStats;
//                 if (!nominated) continue;
//                 computedStats = { ...computedStats, availableOutgoingBitrate, availableIncomingBitrate, currentRoundTripTime, canidatePairState: state, canidatePairNominated: nominated };
//             } else if (type === "transport") {
//                 let { bytesReceived, bytesSent, dtlsState, selectedCandidatePairId, timestamp } = stat as RTCTransportStats;
//                 bytesReceived = bytesReceived ?? 0;
//                 bytesSent = bytesSent ?? 0;
//                 selectedCandidatePairId = selectedCandidatePairId ?? "";
//                 computedStats = { ...computedStats, bytesReceived, bytesSent, dtlsState, selectedCandidatePairId, timestamp };
//                 if (computedStats.selectedCandidatePairId !== this._lastStats.selectedCandidatePairId) {
//                     computedStats.selectedCandidatePairChanges++;
//                 }
//                 if (timestamp != this._lastStats.timestamp) {
//                     computedStats.bitrateReceive = (bytesReceived - this._lastStats.bytesReceived) / (timestamp - this._lastStats.timestamp) * 8000; // timestamp is in milliseconds and 8 bits in a byte
//                     computedStats.bitrateSend = (bytesSent - this._lastStats.bytesSent) / (timestamp - this._lastStats.timestamp) * 8000; // timestamp is in milliseconds and 8 bits in a byte
//                     computedStats.hung = computedStats.bitrateReceive <= 0;
//                 }
//             }
//         }

//         this._lastStats = computedStats;
//         return computedStats;
//     }
// }
