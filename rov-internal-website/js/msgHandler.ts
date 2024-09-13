import { arm, disarm, heartbeat, manualControl, servoPositionControl, setMode } from "./shared/mavlink2RestMessages";
import { MavModeFlag } from "./shared/mavlink2rest-ts/messages/mavlink2rest-enum";
import type { Message as MavMessages } from "./shared/mavlink2rest-ts/messages/mavlink2rest-message";
import type { Package as mavlink2RestFullMessage, Message } from "./shared/mavlink2rest-ts/messages/mavlink2rest";
import { rov_actions_proto } from "./shared/protobufs/rovActionsProto";
import { internalConnManager } from "./internalConnManager";
import { irovMavlinkInterface } from "./mavlinkWebsocket";
import { iRovWebSocketRelay } from "./websocketRelay";
import { shutdownROV } from "./blueosAPIs/commander";
import { logDebug, logInfo, LogLevelConsole, logWarn, mainLogr } from "./shared/logging"
import { LIVEKIT_BACKEND_ROOM_CONFIG } from "./shared/consts";
import type { TrackPublishOptions, VideoCaptureOptions, VideoPreset } from "livekit-client";
import { twitchStream } from "./twitchStream";
import { CLAW_SERVO_PIN } from "./constsInternal";

let designated_driver_user_id: string | null = null
let should_be_armed = false;
let rov_is_armed = false;
let i = 0, j = 1;
function handleInternalWebpageActions(senderId: string, msgProto: rov_actions_proto.RovAction) {

    // PING Message - Respond with PONG
    if (msgProto.Ping) {
        internalConnManager.sendMessage(rov_actions_proto.RovResponse.create({
            Pong: { Time: msgProto.Ping.Time }
        }), false, [senderId])
        irovMavlinkInterface.sendMessage(heartbeat()) // Also send a heartbeat to the autopilot to keep it alive
        return true;
    }

    // SIMPLEPEER SIGNAL Message - Pass it to the internalConnManager
    else if (msgProto.SimplePeerSignal && msgProto.SimplePeerSignal.Message) {
        const signal = msgProto.SimplePeerSignal.Message
        internalConnManager.ingestSimplePeerSignalMsg(senderId, signal)
        return true;
    }

    // MOVE Message - Send it to the BlueOS system
    else if (msgProto.Move) {

        if (designated_driver_user_id && designated_driver_user_id !== senderId) return false;
        if (!should_be_armed) return false;
        if (!rov_is_armed) irovMavlinkInterface.sendMessage(arm(true))
        let x = (msgProto.Move.VelocityX || 0) * 1000 // X is forward in the ROV
        let y = (msgProto.Move.VelocityY || 0) * 1000 // Y is left/right in the ROV)
        let z = (msgProto.Move.VelocityZ || 0) * 500 + 500
        let r = (msgProto.Move.AngularVelocityYaw || 0) * 500
        let buttonBitmask = msgProto.Move.ButtonBitmask || 0
        if (buttonBitmask) console.log("Move btn Message bitmask: ", buttonBitmask)
        irovMavlinkInterface.sendMessage(manualControl(x, y, z, r, buttonBitmask))
        return true;
    }

    // SHUTDOWN ROV Message - Send it to the BlueOS system
    else if (msgProto.ShutdownRov) {
        shutdownROV("poweroff").then((msg) => {
            internalConnManager.sendMessage(rov_actions_proto.RovResponse.create({
                ExchangeId: msgProto.ExchangeId,
                Done: { Message: msg }
            }), false, [])
        }).catch((err) => {
            internalConnManager.sendMessage(rov_actions_proto.RovResponse.create({
                ExchangeId: msgProto.ExchangeId,
                Error: { Message: err.message }
            }), false, [])
        })
        return true;
    }

    // REBOOT ROV Message - Send it to the BlueOS system
    else if (msgProto.RebootRov) {
        shutdownROV("reboot").then((msg) => {
            internalConnManager.sendMessage(rov_actions_proto.RovResponse.create({
                ExchangeId: msgProto.ExchangeId,
                Done: { Message: msg }
            }), false, [])
        }).catch((err) => {
            internalConnManager.sendMessage(rov_actions_proto.RovResponse.create({
                ExchangeId: msgProto.ExchangeId,
                Error: { Message: err.message }
            }), false, [])
        })
        return true;
    }

    // CLAW MOVE Message - Send it to the BlueOS system
    else if (msgProto.MoveClaw) {
        const position = 0.25;
        logInfo("Setting servo ", i, " of group ", j, " to ", position)
        irovMavlinkInterface.sendMessage(servoPositionControl(i, position, j))
        if (i == 7) {
            i = 0;
            j++;
        } else {
            i++;
        }
        return true;
    }

    // SET AUTOPILOT MODE Message - Send it to the BlueOS system
    else if (msgProto.SetAutopilotMode) {
        irovMavlinkInterface.sendMessage(setMode(msgProto.SetAutopilotMode.mode))
        return true;
    }

    // DISARM Message - Send it to the BlueOS system
    else if (msgProto.Disarm) {
        irovMavlinkInterface.sendMessage(disarm(true))
        should_be_armed = false;
        return true;
    }

    // TAKE CONTROL Message - Send it to the BlueOS system as arm and notify others of the take over
    else if (msgProto.TakeControl) {
        designated_driver_user_id = senderId;
        internalConnManager.sendMessage(rov_actions_proto.RovResponse.create({
            PilotChanged: { PilotIdentity: senderId }
        }), false, [])
        should_be_armed = true;
        irovMavlinkInterface.sendMessage(arm(true))
        return true;
    }

    // SEND LOGS Message - Send any new logs to everyone
    else if (msgProto.SendRovLogs) {
        const logLevelMap = {}
        logLevelMap[LogLevelConsole.Console] = rov_actions_proto.LogLevel.Debug
        logLevelMap[LogLevelConsole.Debug] = rov_actions_proto.LogLevel.Debug
        logLevelMap[LogLevelConsole.Info] = rov_actions_proto.LogLevel.Info
        logLevelMap[LogLevelConsole.Warn] = rov_actions_proto.LogLevel.Warning
        logLevelMap[LogLevelConsole.Error] = rov_actions_proto.LogLevel.Error
        mainLogr.sendQueuedLogs((logLevel, text) => {
            const msgProto = rov_actions_proto.RovResponse.create({
                LogMessage: {
                    Level: logLevelMap[logLevel],
                    Message: text,
                }
            })
            return internalConnManager.sendMessage(msgProto, true, [])
        })
        return true;
    }

    else if (msgProto.SetLivestreamingEnabled) {
        if (msgProto.SetLivestreamingEnabled.Enabled) {
            twitchStream.startStream()
        } else {
            twitchStream.stopStream()
        }
    }

    // SET LIVEKIT VIDEO OPTIONS Message - Update the livekit video stream config with the internalConnManager
    else if (msgProto.SetLivekitVideoOptions) {
        const vcDefaults = LIVEKIT_BACKEND_ROOM_CONFIG.videoCaptureDefaults;
        const pubDefaults = LIVEKIT_BACKEND_ROOM_CONFIG.publishDefaults

        const opts = msgProto.SetLivekitVideoOptions;
        const baseStream = opts.BaseStream;

        if (!opts.Enabled) {
            internalConnManager.setLivekitVideoOptions(false)
            return true;
        }

        logInfo("Got Livekit Video Options: ", opts)

        const aspectRatio = 16 / 9;
        const videoCaptureOpts: VideoCaptureOptions = {
            ...vcDefaults,
            resolution: {
                width: baseStream?.Width || Math.floor((baseStream?.Height || 0) * aspectRatio) || vcDefaults?.resolution?.height || 1920,
                height: baseStream?.Height || Math.floor((baseStream?.Width || 0) / aspectRatio) || vcDefaults?.resolution?.height || 1080,
                frameRate: baseStream?.Fps || vcDefaults?.resolution?.frameRate,
            },
            facingMode: vcDefaults?.facingMode,
        }

        const simulcastLayers = opts.SimulcastLayers ? opts.SimulcastLayers.map((l, i) => {
            const def = pubDefaults?.videoSimulcastLayers ? pubDefaults?.videoSimulcastLayers[i] : undefined;
            return {
                encoding: {
                    maxBitrate: baseStream?.MaxBitrate ?? def?.encoding?.maxBitrate,
                    maxFramerate: l.Fps || def?.encoding?.maxFramerate,
                    priority: "high",
                },
                width: l.Width || (l.Height ? l.Height * aspectRatio : null) || def?.width || vcDefaults?.resolution?.width,
                height: l.Height || (l.Width ? l.Width / aspectRatio : null) || def?.height || vcDefaults?.resolution?.height,
            } as VideoPreset
        }) : pubDefaults?.videoSimulcastLayers;

        const codec = (opts.Codec !== null && opts.Codec !== undefined) ? rov_actions_proto.VideoCodec[opts.Codec].toLowerCase() : pubDefaults?.videoCodec;
        const pubOpts: TrackPublishOptions = {
            ...pubDefaults,
            videoCodec: codec as TrackPublishOptions['videoCodec'],
            videoEncoding: {
                maxBitrate: baseStream?.MaxBitrate ?? pubDefaults?.videoEncoding?.maxBitrate ?? 0,
                maxFramerate: baseStream?.Fps || pubDefaults?.videoEncoding?.maxFramerate,
                priority: pubDefaults?.videoEncoding?.priority,
            },
            backupCodec: opts.AllowBackupCodec ?? pubDefaults?.backupCodec,
            simulcast: opts.SimulcastLayers ? opts.SimulcastLayers.length > 0 : pubDefaults?.simulcast,
            videoSimulcastLayers: simulcastLayers,
        }
        console.log("Setting Livekit Video Options: ", videoCaptureOpts, pubOpts)
        internalConnManager.setLivekitVideoOptions(true, videoCaptureOpts, pubOpts)
        return true;
    }

    else if (msgProto.SetSimplePeerVideoOptions) {
        const vcDefaults = LIVEKIT_BACKEND_ROOM_CONFIG.videoCaptureDefaults;
        const pubDefaults = LIVEKIT_BACKEND_ROOM_CONFIG.publishDefaults

        const opts = msgProto.SetSimplePeerVideoOptions;
        const baseStream = opts.BaseStream;
        logInfo("Got SimplePeer Video Options: ", opts)

        if (!opts.Enabled) {
            internalConnManager.setSimplePeerVideoOptions(false, senderId)
            return true;
        }

        const aspectRatio = 16 / 9;
        const videoCaptureOpts: VideoCaptureOptions = {
            ...vcDefaults,
            resolution: {
                width: Math.floor((baseStream?.Height || vcDefaults?.resolution?.height || 0) * aspectRatio),//baseStream?.Width || vcDefaults?.resolution?.width ||
                height: baseStream?.Height || vcDefaults?.resolution?.height || 0,
                frameRate: baseStream?.Fps || vcDefaults?.resolution?.frameRate || 60,
            },
            facingMode: vcDefaults?.facingMode,
        }

        const codec = opts.Codec ? rov_actions_proto.VideoCodec[opts.Codec].toLowerCase() : pubDefaults?.videoCodec;
        const videoPubOpts: TrackPublishOptions = {
            videoCodec: (codec as TrackPublishOptions['videoCodec']),
            videoEncoding: {
                maxBitrate: baseStream?.MaxBitrate || pubDefaults?.videoEncoding?.maxBitrate || 0,
                maxFramerate: baseStream?.Fps || pubDefaults?.videoEncoding?.maxFramerate,
            },
        }

        internalConnManager.setSimplePeerVideoOptions(true, senderId, videoCaptureOpts, videoPubOpts)
        return true;
    }


    //
    else {
        logWarn("Unknown Message Recived: ", msgProto.toJSON());
        return false;
    }
}

/*
    Intended to handle messages coming FROM Livekit/The Internet
*/
export function backendHandleWebrtcMsgRcvd(senderId: string, msgBytes: ArrayBufferLike) {
    let data = new Uint8Array(msgBytes)
    if (!data || data.length === 0) return;

    // Decode the protobuf object from bytes
    const msgProto = rov_actions_proto.RovAction.decode(data)
    if (handleInternalWebpageActions(senderId, msgProto)) return;

    // Stuff the protobuff object with metadata
    msgProto.BackendMetadata = msgProto.BackendMetadata || new rov_actions_proto.ActionBackendMetadata()
    msgProto.BackendMetadata.FromUserId = senderId
    const newMessage = rov_actions_proto.RovAction.encode(msgProto).finish()

    // Send the re-packaged up message bytes to the iROV python via webSocketRelay
    if (iRovWebSocketRelay.isConnected) iRovWebSocketRelay.sendMessage(newMessage)
}


/*
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
