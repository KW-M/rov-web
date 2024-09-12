import { rov_actions_proto } from "./shared/protobufs/rovActionsProto";
import { ToastSeverity, showToastMessage } from "./toastMessageManager";
import { debugPageModeActive, isRovDriver } from "./globalContext";
import { frontendConnMngr } from "./frontendConnManager";
import { networkLatencyMs, updateSensorValues } from "./sensors";
import { DECODE_TXT } from "./shared/consts";
import { modalPasswordPrompt } from "./uiDialogs";
import { handleMavlinkMessage } from "./mavlinkMessageHandler";
import { updateSystemMonitorDisplay } from "./vehicleStats";
import { URL_PARAMS } from "./frontendConsts";
import { log, logDebug, logInfo, logWarn, logError, mainLogr } from "./shared/logging"
import { onLivekitVideoOptionsChange, onSimplePeerVideoOptionsChange } from "../components/Modals/VideoSettings.svelte";

let lastTimeRecvdPong = NaN;

type ReplyExchangeData = { callback: null | ((replyMsgData: rov_actions_proto.RovResponse) => void), originalMsgData: rov_actions_proto.IRovAction };

export class FrontendRovMsgHandlerClass {
    // replyContinuityCallbacks: keep track of functions to run when we get a reply to a message we sent with some ExchangeId
    // (index is the ExchangeId number of the sent message)
    replyContinuityCallbacks: ReplyExchangeData[] = [];

    handleRecivedMessage(msgBytes: ArrayBufferLike) {

        let rawData = new Uint8Array(msgBytes)
        if (!rawData || rawData.length === 0) return;
        const msgData = rov_actions_proto.RovResponse.decode(new Uint8Array(msgBytes));
        const ExchangeId = msgData.ExchangeId;

        this.runExchangeCallback(msgData, ExchangeId);
        if (msgData.Done) {
            return this.handleDoneMsgRecived(msgData.Done, ExchangeId);
        } else if (msgData.Error) {
            return this.handleErrorMsgRecived(msgData.Error, ExchangeId);
        } else if (msgData.Pong) {
            return this.handlePongMsgRecived(msgData.Pong, ExchangeId);
        } else if (msgData.ContinuedOutput) {
            return this.handleContinuedOutputMsgRecived(msgData.ContinuedOutput, ExchangeId);
        } else if (msgData.SensorUpdates) {
            return this.handleSensorUpdatesMsgRecived(msgData.SensorUpdates, ExchangeId);
            // } else if (msgData.PasswordRequired) {
            //     return this.handlePasswordRequiredMsgRecived(msgData.PasswordRequired, ExchangeId);
            // } else if (msgData.PasswordAccepted) {
            //     return this.handlePasswordAcceptedMsgRecived(msgData.PasswordAccepted, ExchangeId);
            // } else if (msgData.PasswordInvalid) {
            //     return this.handlePasswordInvalidMsgRecived(msgData.PasswordInvalid, ExchangeId);
        } else if (msgData.PilotChanged) {
            return this.handlePilotChangedMsgRecived(msgData.PilotChanged, ExchangeId);
        } else if (msgData.ClientConnected) {
            return this.handleClientConnectedMsgRecived(msgData.ClientConnected, ExchangeId);
        } else if (msgData.ClientDisconnected) {
            return this.handleClientDisconnectedMsgRecived(msgData.ClientDisconnected, ExchangeId);
        } else if (msgData.SimplePeerSignal && msgData.SimplePeerSignal.Message) {
            frontendConnMngr.ingestSimplePeerSignallingMsg(msgData.SimplePeerSignal.Message);
        } else if (msgData.Mavlink) {
            return this.handleMavlinkMessageRecived(msgData.Mavlink, ExchangeId);
        } else if (msgData.SystemMonitor) {
            return this.handleSystemMonitorMsgRecived(msgData.SystemMonitor, ExchangeId);
        } else if (msgData.LogMessage) {
            return this.handleLogMsgRecived(msgData.LogMessage, ExchangeId);
        } else if (msgData.LivekitVideoStats) {
            return this.handleLivekitVideoStatsMsgRecived(msgData.LivekitVideoStats, ExchangeId);
        } else if (msgData.SimplePeerVideoStats) {
            return this.handleSimplePeerVideoStatsMsgRecived(msgData.SimplePeerVideoStats, ExchangeId);
        } else {
            logWarn("Unhandled ROV message recived: ", msgData);
        }
    }

    handleDoneMsgRecived(msgData: rov_actions_proto.IDoneResponse, ExchangeId: number) {
        if (URL_PARAMS.DEBUG_MODE) logDebug("Done: ", msgData);
    }

    handleErrorMsgRecived(msgData: rov_actions_proto.IErrorResponse, ExchangeId: number) {
        logWarn("ROV Error: ", msgData);
        showToastMessage("ROV Error: " + msgData.Message, 2000, null);
    }

    handlePongMsgRecived(msgData: rov_actions_proto.IPongResponse, ExchangeId: number) {
        lastTimeRecvdPong = Date.now();
        const networkPingDelay = lastTimeRecvdPong - Number.parseFloat(msgData.Time) // since the rpi replies with the ms time we sent in the ping in the pong message
        networkLatencyMs.set(networkPingDelay);
    }

    handleContinuedOutputMsgRecived(msgData: rov_actions_proto.IContinuedOutputResponse, ExchangeId: number) {
        if (URL_PARAMS.DEBUG_MODE) logDebug("ContinuedOutput: ", ExchangeId, msgData);
    }

    handleSensorUpdatesMsgRecived(msgData: rov_actions_proto.ISensorUpdatesResponse, ExchangeId: number) {
        if (URL_PARAMS.DEBUG_MODE) logDebug("SensorUpdates: ", msgData);
        updateSensorValues(msgData);
    }

    handleSystemMonitorMsgRecived(msgData: rov_actions_proto.ISystemMonitorResponse, ExchangeId: number) {
        updateSystemMonitorDisplay(msgData.CpuTemp, msgData.CpuUsage, msgData.MemoryUsage, msgData.DiskUsage, msgData.Warnings);
    }

    handlePasswordRequiredMsgRecived(msgData: rov_actions_proto.IPasswordRequiredResponse, ExchangeId: number) {
        if (URL_PARAMS.DEBUG_MODE) logDebug("PasswordRequired for rovId:", msgData.RovId);
        // TODO: use the rovId to determine if we have authtoken
        modalPasswordPrompt("Enter ROV Password", "").then((password) => {
            if (password) {
                this.sendRovMessage({
                    PasswordAttempt: {
                        Password: password,
                    }, ExchangeId: ExchangeId
                }, null);
            } else {
                // remove the reply callback if the user cancels the password prompt (empty password)
                delete this.replyContinuityCallbacks[ExchangeId]
            }
        })
    }

    handlePasswordAcceptedMsgRecived(msgData: rov_actions_proto.IPasswordAcceptedResponse, ExchangeId: number) {
        showToastMessage("Password Accepted", 1000, null);
    }

    handlePasswordInvalidMsgRecived(msgData: rov_actions_proto.IPasswordInvalidResponse, ExchangeId: number) {
        showToastMessage("Wrong Password", 1000, null);
        this.handlePasswordRequiredMsgRecived(msgData, ExchangeId);
    }

    handlePilotChangedMsgRecived(msgData: rov_actions_proto.IPilotChangedResponse, ExchangeId: number) {
        let ourLivekitIdentity = frontendConnMngr.currentLivekitIdentity.get();
        if (msgData.PilotIdentity == ourLivekitIdentity) {
            showToastMessage("You are now the driver");
            isRovDriver.set(true);
        } else {
            showToastMessage("ROV Driver is now " + msgData.PilotIdentity);
            isRovDriver.set(false);
        }
    }

    handleMavlinkMessageRecived(msgData: rov_actions_proto.IMavlinkResponse, ExchangeId: number) {
        if (!msgData.Message) return;
        const mavMessage = DECODE_TXT(msgData.Message)
        try {
            const msg = JSON.parse(mavMessage);
            handleMavlinkMessage(msg);
        } catch (e) {
            logWarn("@ Mav MSG RECIVED W INVALID JSON: ", mavMessage);
        }
    }

    handleClientConnectedMsgRecived(msgData: rov_actions_proto.IClientConnectedResponse, ExchangeId: number) {
        showToastMessage(msgData.ClientPeerId + " Connected to ROV", 1500, null);
    }

    handleClientDisconnectedMsgRecived(msgData: rov_actions_proto.IClientConnectedResponse, ExchangeId: number) {
        showToastMessage(msgData.ClientPeerId + " Disconnected from ROV", 1500, null);
    }

    handleLogMsgRecived(msgData: rov_actions_proto.ILogMessageResponse, ExchangeId: number) {
        if (URL_PARAMS.SHOW_REMOTE_LOGS) {
            const {
                level, timestamp, args, trace, kind, origin,
            } = JSON.parse(msgData.Message);
            mainLogr.addLog(level, args, trace, kind, origin, timestamp);
            // if (msgData.Level == rov_actions_proto.LogLevel.Debug) logDebug(...logArgs);
            // else if (msgData.Level == rov_actions_proto.LogLevel.Info) logInfo(...logArgs);
            // else if (msgData.Level == rov_actions_proto.LogLevel.Warning) logWarn(...logArgs);
            // else if (msgData.Level == rov_actions_proto.LogLevel.Error) logError(...logArgs);
            // else if (msgData.Level == rov_actions_proto.LogLevel.Critical) logError(...logArgs);
        }
    }

    handleLivekitVideoStatsMsgRecived(msgData: rov_actions_proto.ILivekitVideoStatsResponse, ExchangeId: number) {
        logDebug("LivekitVideoStats: ", msgData);
        onLivekitVideoOptionsChange(msgData);
    };

    handleSimplePeerVideoStatsMsgRecived(msgData: rov_actions_proto.ISimplePeerVideoStatsResponse, ExchangeId: number) {
        logDebug("SimplePeerVideoStats: ", msgData);
        onSimplePeerVideoOptionsChange(msgData);
    }

    sendRovMessage(msg: rov_actions_proto.IRovAction, replyCallback: null | ((replyMsgData: rov_actions_proto.RovResponse) => void) = null) {
        if (frontendConnMngr.currentLivekitIdentity.get() === null) return;
        if (!msg.ExchangeId) msg.ExchangeId = this.replyContinuityCallbacks.length + 1;//uuidV4().substring(0, 8); // generate a random exchange id if none is provided
        if (!this.replyContinuityCallbacks[msg.ExchangeId]) this.replyContinuityCallbacks[msg.ExchangeId] = { callback: replyCallback, originalMsgData: msg };
        frontendConnMngr.sendMessageToRov(msg, false);
    }

    resendMessage(ExchangeId: number) {
        const replyExchageData = this.replyContinuityCallbacks[ExchangeId];
        if (replyExchageData && replyExchageData.originalMsgData) {
            logInfo("Resending message: ", replyExchageData.originalMsgData)
            this.sendRovMessage(replyExchageData.originalMsgData, replyExchageData.callback);
        } else {
            logWarn("resendMessage(): No message to resend for ExchangeId: ", ExchangeId)
        }
    }

    runExchangeCallback(msgData: rov_actions_proto.RovResponse, ExchangeId: number) {
        const replyExchageData = this.replyContinuityCallbacks[ExchangeId];
        if (replyExchageData) {
            replyExchageData.callback && replyExchageData.callback(msgData);
            // remove the echange data since the exchange is done
            if (msgData.Done || msgData.Error)
                delete this.replyContinuityCallbacks[ExchangeId]
        }
    }
}
export const frontendRovMsgHandler = new FrontendRovMsgHandlerClass();
