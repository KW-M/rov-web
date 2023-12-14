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

        this.runExchangeCallback(msgData.ExchangeId, msgData);
        if (msgData.Done) {
            return this.handleDoneMsgRecived(msgData.ExchangeId, msgData.Done);
        } else if (msgData.Error) {
            return this.handleErrorMsgRecived(msgData.ExchangeId, msgData.Error);
        } else if (msgData.Pong) {
            return this.handlePongMsgRecived(msgData.ExchangeId, msgData.Pong);
        } else if (msgData.ContinuedOutput) {
            return this.handleContinuedOutputMsgRecived(msgData.ExchangeId, msgData.ContinuedOutput);
        } else if (msgData.SensorUpdates) {
            return this.handleSensorUpdatesMsgRecived(msgData.ExchangeId, msgData.SensorUpdates);
        } else if (msgData.PasswordRequired) {
            return this.handlePasswordRequiredMsgRecived(msgData.ExchangeId, msgData.PasswordRequired);
        } else if (msgData.PasswordAccepted) {
            return this.handlePasswordAcceptedMsgRecived(msgData.ExchangeId, msgData.PasswordAccepted);
        } else if (msgData.PasswordInvalid) {
            return this.handlePasswordInvalidMsgRecived(msgData.ExchangeId, msgData.PasswordInvalid);
        } else if (msgData.DriverChanged) {
            return this.handleDriverChangedMsgRecived(msgData.ExchangeId, msgData.DriverChanged);
        } else if (msgData.ClientConnected) {
            return this.handleClientConnectedMsgRecived(msgData.ExchangeId, msgData.ClientConnected);
        } else if (msgData.ClientDisconnected) {
            return this.handleClientDisconnectedMsgRecived(msgData.ExchangeId, msgData.ClientDisconnected);
        } else if (msgData.SimplepeerSignal && msgData.SimplepeerSignal.Message) {
            frontendConnMngr.ingestSimplePeerSignallingMsg(msgData.SimplepeerSignal.Message);
        } else if (msgData.Mavlink) {
            return this.handleMavlinkMessageRecived(msgData.ExchangeId, msgData.Mavlink);
        } else if (msgData.SystemMonitor) {
            return this.handleSystemMonitorMsgRecived(msgData.ExchangeId, msgData.SystemMonitor);
        } else if (msgData.LogMessage) {
            return this.handleLogMsgRecived(msgData.ExchangeId, msgData.LogMessage);
        } else {
            console.warn("Unhandled ROV message recived: ", msgData);
        }
    }

    handleDoneMsgRecived(ExchangeId: number, msgData: rov_actions_proto.IDoneResponse) {
        if (URL_PARAMS.DEBUG_MODE) console.debug("Done: ", msgData);
    }

    handleErrorMsgRecived(ExchangeId: number, msgData: rov_actions_proto.IErrorResponse) {
        console.warn("ROV Error: ", msgData);
        showToastMessage("ROV Error: " + msgData.Message, 2000, null);
    }

    handlePongMsgRecived(ExchangeId: number, msgData: rov_actions_proto.IPongResponse) {
        lastTimeRecvdPong = Date.now();
        const networkPingDelay = lastTimeRecvdPong - Number.parseFloat(msgData.Time) // since the rpi replies with the ms time we sent in the ping in the pong message
        networkLatencyMs.set(networkPingDelay);
    }

    handleContinuedOutputMsgRecived(ExchangeId: number, msgData: rov_actions_proto.IContinuedOutputResponse) {
        if (URL_PARAMS.DEBUG_MODE) console.debug("ContinuedOutput: ", ExchangeId, msgData);
        // pass
    }

    handleSensorUpdatesMsgRecived(ExchangeId: number, msgData: rov_actions_proto.ISensorUpdatesResponse) {
        if (URL_PARAMS.DEBUG_MODE) console.debug("SensorUpdates: ", msgData);
        updateSensorValues(msgData);
    }

    handleSystemMonitorMsgRecived(ExchangeId: number, msgData: rov_actions_proto.ISystemMonitorResponse) {
        updateSystemMonitorDisplay(msgData.CpuTemp, msgData.CpuUsage, msgData.MemoryUsage, msgData.DiskUsage, msgData.Warnings);
    }

    handlePasswordRequiredMsgRecived(ExchangeId: number, msgData: rov_actions_proto.IPasswordRequiredResponse) {
        if (URL_PARAMS.DEBUG_MODE) console.debug("PasswordRequired for rovId:", msgData.RovId);
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

    handlePasswordAcceptedMsgRecived(ExchangeId: number, msgData: rov_actions_proto.IPasswordAcceptedResponse) {
        showToastMessage("Password Accepted", 1000, null);
    }

    handlePasswordInvalidMsgRecived(ExchangeId: number, msgData: rov_actions_proto.IPasswordInvalidResponse) {
        showToastMessage("Wrong Password", 1000, null);
        this.handlePasswordRequiredMsgRecived(ExchangeId, msgData);
    }

    // TODO:
    handleDriverChangedMsgRecived(ExchangeId: number, msgData: rov_actions_proto.IDriverChangedResponse) {
        let ourLivekitIdentity = frontendConnMngr.currentLivekitIdentity.get();
        if (msgData.DriverPeerId == ourLivekitIdentity) {
            showToastMessage("You are now the driver");
            isRovDriver.set(true);
        } else {
            showToastMessage("ROV Driver is now " + msgData.DriverPeerId);
            isRovDriver.set(false);
        }
    }

    handleMavlinkMessageRecived(ExchangeId: number, msgData: rov_actions_proto.IMavlinkResponse) {
        if (!msgData.Message) return;
        const mavMessage = DECODE_TXT(msgData.Message)
        try {
            const msg = JSON.parse(mavMessage);
            handleMavlinkMessage(msg);
        } catch (e) {
            console.warn("@ Mav MSG RECIVED W INVALID JSON: ", mavMessage);
        }
    }

    handleClientConnectedMsgRecived(ExchangeId: number, msgData: rov_actions_proto.IClientConnectedResponse) {
        showToastMessage(msgData.ClientPeerId + " Connected to ROV", 1500, null);
    }

    handleClientDisconnectedMsgRecived(ExchangeId: number, msgData: rov_actions_proto.IClientConnectedResponse) {
        showToastMessage(msgData.ClientPeerId + " Disconnected from ROV", 1500, null);
    }

    handleLogMsgRecived(ExchangeId: number, msgData: rov_actions_proto.ILogMessageResponse) {
        if (URL_PARAMS.SHOW_REMOTE_LOGS) {
            let logArgs = JSON.parse(msgData.Message);
            if (!Array.isArray(logArgs)) logArgs = [logArgs];
            if (logArgs.length === 0) return;
            if (typeof logArgs[0] === 'string') logArgs[0] = "REMOTE LOG: " + logArgs[0];
            else logArgs.unshift("REMOTE LOG: ");
            if (msgData.Level == rov_actions_proto.LogLevel.Debug) console.debug(...logArgs);
            else if (msgData.Level == rov_actions_proto.LogLevel.Info) console.info(...logArgs);
            else if (msgData.Level == rov_actions_proto.LogLevel.Warning) console.warn(...logArgs);
            else if (msgData.Level == rov_actions_proto.LogLevel.Error) console.error(...logArgs);
            else if (msgData.Level == rov_actions_proto.LogLevel.Critical) console.error(...logArgs);
        }
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
            console.info("Resending message: ", replyExchageData.originalMsgData)
            this.sendRovMessage(replyExchageData.originalMsgData, replyExchageData.callback);
        } else {
            console.warn("resendMessage(): No message to resend for ExchangeId: ", ExchangeId)
        }
    }

    runExchangeCallback(ExchangeId: number, msgData: rov_actions_proto.RovResponse) {
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
