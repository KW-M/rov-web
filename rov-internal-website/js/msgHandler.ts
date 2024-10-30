import { arm, disarm, heartbeat, manualControl, servoPositionControl, setMode } from "./shared/mavlink2RestMessages";
import { MavModeFlag } from "./shared/mavlink2rest-ts/messages/mavlink2rest-enum";
import type { Message as MavMessages } from "./shared/mavlink2rest-ts/messages/mavlink2rest-message";
import type { Package as mavlink2RestFullMessage, Message } from "./shared/mavlink2rest-ts/messages/mavlink2rest";
import { internalConnManager } from "./internalConnManager";
import { irovMavlinkInterface } from "./mavlinkWebsocket";
import { iRovWebSocketRelay } from "./websocketRelay";
import { shutdownROV } from "./blueosAPIs/commander";
import { log, logDebug, logInfo, LogLevel, logWarn, mainLogr } from "./shared/logging"
import { LIVEKIT_BACKEND_ROOM_CONFIG } from "./shared/consts";
import type { TrackPublishOptions, VideoCaptureOptions, VideoPreset } from "livekit-client";
import { twitchStream } from "./twitchStream";
import { CLAW_SERVO_PIN } from "./constsInternal";
import { ActionBackendMetadata, RovAction, RovResponse } from "./shared/protobufs/rov_actions";

let designated_driver_user_id: string | null = null
let should_be_armed = false;
let rov_is_armed = false;
let i = 0, j = 1;

function setAutopilotArmed(armed: boolean, force: boolean = true) {
    // if (should_be_armed != armed) {
    should_be_armed = armed;
    internalConnManager.sendMessage(RovResponse.create({
        body: {
            oneofKind: "arming",
            arming: { armed: armed }
        }
    }), true, [])
    // }
    if (should_be_armed) irovMavlinkInterface.sendMessage(arm(force))
    else irovMavlinkInterface.sendMessage(disarm(force))
}

function handleInternalWebpageActions(senderId: string, msgProto: RovAction) {

    const msgBody = msgProto.body
    const msgType = msgBody.oneofKind
    switch (msgType) {

        // PING Message - Respond with PONG
        case "ping":
            internalConnManager.sendMessage(RovResponse.create({
                body: {
                    oneofKind: "pong",
                    pong: { time: msgBody.ping.time }
                }
            }), false, [senderId]);
            irovMavlinkInterface.sendMessage(heartbeat()); // Also send a heartbeat to the autopilot to keep it alive
            return true;

        // SIMPLEPEER SIGNAL Message - Pass it to the internalConnManager
        case "simplePeerSignal":
            const signal = msgBody.simplePeerSignal.message;
            internalConnManager.ingestSimplePeerSignalMsg(senderId, signal);
            return true;

        // MOVE Message - Send it to the BlueOS system
        case "move":
            if (designated_driver_user_id && designated_driver_user_id !== senderId) return false;
            let buttonBitmask = msgBody.move.buttonBitmask || 0;
            if (should_be_armed) {
                if (!rov_is_armed) setAutopilotArmed(true);
                let x = (msgBody.move.velocityX || 0) * 1000; // X is forward in the ROV
                let y = (msgBody.move.velocityY || 0) * 1000; // Y is left/right in the ROV
                let z = (msgBody.move.velocityZ || 0) * 500 + 500;
                let r = (msgBody.move.angularVelocityYaw || 0) * 500;
                irovMavlinkInterface.sendMessage(manualControl(x, y, z, r, buttonBitmask));
                return true;
            } else {
                // If the ROV is not armed, send a manual control message with neutral velocities
                irovMavlinkInterface.sendMessage(manualControl(0, 0, 500, 0, buttonBitmask));
                return false;
            }

        // SHUTDOWN ROV Message - Send it to the BlueOS system
        case "shutdownRov":
            shutdownROV("poweroff").then((msg) => {
                internalConnManager.sendMessage(RovResponse.create({
                    exchangeId: msgProto.exchangeId,
                    body: { oneofKind: "done", done: { message: msg } }
                }), false, []);
            }).catch((err) => {
                internalConnManager.sendMessage(RovResponse.create({
                    exchangeId: msgProto.exchangeId,
                    body: { oneofKind: "error", error: { message: err.message } }
                }), false, []);
            });
            return true;

        // REBOOT ROV Message - Send it to the BlueOS system
        case "rebootRov":
            shutdownROV("reboot").then((msg) => {
                internalConnManager.sendMessage(RovResponse.create({
                    exchangeId: msgProto.exchangeId,
                    body: { oneofKind: "done", done: { message: msg } }
                }), false, []);
            }).catch((err) => {
                internalConnManager.sendMessage(RovResponse.create({
                    exchangeId: msgProto.exchangeId,
                    body: { oneofKind: "error", error: { message: err.message } }
                }), false, []);
            });
            return true;

        // CLAW MOVE Message - Send it to the BlueOS system
        case "moveClaw":
            const position = 0.25;
            logInfo("Setting servo ", i, " of group ", j, " to ", position);
            irovMavlinkInterface.sendMessage(servoPositionControl(i, position, j));
            if (i == 7) {
                i = 0;
                j++;
            } else {
                i++;
            }
            return true;

        // SET AUTOPILOT MODE Message - Send it to the BlueOS system
        case "setAutopilotMode":
            irovMavlinkInterface.sendMessage(setMode(msgBody.setAutopilotMode.mode));
            return true;

        // DISARM Message - Send it to the BlueOS system
        case "disarm":
            setAutopilotArmed(false);
            return true;

        // TAKE CONTROL Message - Send it to the BlueOS system as arm and notify others of the take over
        case "takeControl":
            designated_driver_user_id = senderId;
            internalConnManager.sendMessage(RovResponse.create({
                body: {
                    oneofKind: "pilotChanged",
                    pilotChanged: { pilotIdentity: senderId }
                }
            }), false, []);
            setAutopilotArmed(true);
            return true;

        // SEND LOGS Message - Send any new logs to everyone
        case "sendRovLogs":
            mainLogr.sendQueuedLogs((logLevel, text) => {
                return internalConnManager.sendMessage(RovResponse.create({
                    body: {
                        oneofKind: "logMessage",
                        logMessage: {
                            level: logLevel ?? LogLevel.Debug,
                            message: text,
                        }
                    }
                }), true, []);
            });
            return true;

        // SET LIVESTREAMING ENABLED Message - Start or stop the Twitch stream
        case "setLivestreamingEnabled":
            if (msgBody.setLivestreamingEnabled.enabled) {
                twitchStream.startStream();
            } else {
                twitchStream.stopStream();
            }
            return true;

        // SET LIVEKIT VIDEO OPTIONS Message - Update the livekit video stream config with the internalConnManager
        case "setLivekitVideoOptions":
            const vcDefaults = LIVEKIT_BACKEND_ROOM_CONFIG.videoCaptureDefaults;
            const pubDefaults = LIVEKIT_BACKEND_ROOM_CONFIG.publishDefaults;

            const opts = msgBody.setLivekitVideoOptions;
            const baseStream = opts.baseStream;

            if (!opts.enabled) {
                internalConnManager.setLivekitVideoOptions(false);
                return true;
            }

            logInfo("Got Livekit Video Options: ", opts);

            const aspectRatio = 16 / 9;
            const videoCaptureOpts: VideoCaptureOptions = {
                ...vcDefaults,
                resolution: {
                    width: baseStream?.width || Math.floor((baseStream?.height || 0) * aspectRatio) || vcDefaults?.resolution?.width || 1920,
                    height: baseStream?.height || Math.floor((baseStream?.width || 0) / aspectRatio) || vcDefaults?.resolution?.height || 1080,
                    frameRate: baseStream?.fps || vcDefaults?.resolution?.frameRate,
                },
                facingMode: vcDefaults?.facingMode,
            };

            const simulcastLayers = opts.simulcastLayers ? opts.simulcastLayers.map((l, i) => {
                const def = pubDefaults?.videoSimulcastLayers ? pubDefaults?.videoSimulcastLayers[i] : undefined;
                return {
                    encoding: {
                        maxBitrate: l.maxBitrate ?? baseStream?.maxBitrate ?? def?.encoding?.maxBitrate ?? 99_000_000_000,
                        maxFramerate: l.fps || def?.encoding?.maxFramerate,
                        priority: "high",
                    },
                    width: l.width || (l.height ? Math.floor(l.height * aspectRatio) : null) || def?.width || vcDefaults?.resolution?.width,
                    height: l.height || (l.width ? Math.floor(l.width / aspectRatio) : null) || def?.height || vcDefaults?.resolution?.height,
                } as VideoPreset;
            }) : pubDefaults?.videoSimulcastLayers;

            const codec = (opts.codec !== null && opts.codec !== undefined) ? opts.codec : pubDefaults?.videoCodec;
            const pubOpts: TrackPublishOptions = {
                ...pubDefaults,
                videoCodec: codec as TrackPublishOptions['videoCodec'],
                videoEncoding: {
                    maxBitrate: baseStream?.maxBitrate ?? pubDefaults?.videoEncoding?.maxBitrate ?? 99_000_000_000,
                    maxFramerate: baseStream?.fps || pubDefaults?.videoEncoding?.maxFramerate,
                    priority: pubDefaults?.videoEncoding?.priority,
                },
                backupCodec: opts.allowBackupCodec ?? pubDefaults?.backupCodec,
                simulcast: opts.simulcastLayers ? opts.simulcastLayers.length > 0 : pubDefaults?.simulcast,
                videoSimulcastLayers: simulcastLayers,
            };
            internalConnManager.setLivekitVideoOptions(true, videoCaptureOpts, pubOpts);
            return true;

        // SET SIMPLEPEER VIDEO OPTIONS Message - Update the simple peer video stream config with the internalConnManager
        case "setSimplePeerVideoOptions":
            const vcDefaultsSP = LIVEKIT_BACKEND_ROOM_CONFIG.videoCaptureDefaults;
            const pubDefaultsSP = LIVEKIT_BACKEND_ROOM_CONFIG.publishDefaults;

            const optsSP = msgBody.setSimplePeerVideoOptions;
            const baseStreamSP = optsSP.baseStream;
            logInfo("Got SimplePeer Video Options: ", optsSP);

            if (!optsSP.enabled) {
                internalConnManager.setSimplePeerVideoOptions(false, senderId);
                return true;
            }

            const aspectRatioSP = 16 / 9;
            const videoCaptureOptsSP: VideoCaptureOptions = {
                ...vcDefaultsSP,
                resolution: {
                    width: Math.floor((baseStreamSP?.height || vcDefaultsSP?.resolution?.height || 0) * aspectRatioSP),
                    height: baseStreamSP?.height || vcDefaultsSP?.resolution?.height || 0,
                    frameRate: baseStreamSP?.fps || vcDefaultsSP?.resolution?.frameRate || 60,
                },
                facingMode: vcDefaultsSP?.facingMode,
            };

            const codecSP = optsSP.codec ? optsSP.codec : pubDefaultsSP?.videoCodec;
            const videoPubOptsSP: TrackPublishOptions = {
                videoCodec: (codecSP as TrackPublishOptions['videoCodec']),
                videoEncoding: {
                    maxBitrate: baseStreamSP?.maxBitrate || pubDefaultsSP?.videoEncoding?.maxBitrate || 0,
                    maxFramerate: baseStreamSP?.fps || pubDefaultsSP?.videoEncoding?.maxFramerate,
                },
            };

            internalConnManager.setSimplePeerVideoOptions(true, senderId, videoCaptureOptsSP, videoPubOptsSP);
            return true;

        default:
            logWarn("Unknown Message Recived: ", RovAction.toJson(msgProto));
            return false;
    }
}

/**
    Intended to handle messages coming FROM Livekit/The Internet
*/
export function backendHandleWebrtcMsgRcvd(senderId: string, msgBytes: ArrayBufferLike) {
    let data = new Uint8Array(msgBytes)
    if (!data || data.length === 0) return;

    // Decode the protobuf object from bytes
    const msgProto = RovAction.fromBinary(data)
    if (handleInternalWebpageActions(senderId, msgProto)) return;

    // Stuff the protobuff object with metadata
    msgProto.backendMetadata = msgProto.backendMetadata || ActionBackendMetadata.create();
    msgProto.backendMetadata.fromUserId = senderId
    const newMessage = RovAction.toBinary(msgProto)

    // Send the re-packaged up message bytes to the iROV python via webSocketRelay
    if (iRovWebSocketRelay.isConnected) iRovWebSocketRelay.sendMessage(newMessage)
}


/**
    Intended to handle mavlink json messages coming FROM the Ardupilot autopilot (mavlink2rest)
*/
export function backendArdupilotMavlinkMsgRcvd(msg: mavlink2RestFullMessage) {
    if (!msg || !msg.message) return;
    const message = msg.message as Message;
    if (!message.type) return;
    if (message.type === "HEARTBEAT") {
        rov_is_armed = (message as MavMessages.Heartbeat).base_mode.bits & MavModeFlag.MAV_MODE_FLAG_SAFETY_ARMED ? true : false;
    }
}
