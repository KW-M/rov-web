import { RovResponse, RovAction } from "./shared/protobufs/rov_actions";
import type { DoneResponse, ErrorResponse, PongResponse, ContinuedOutputResponse, SensorUpdatesResponse, SystemMonitorResponse, PasswordRequiredResponse, PasswordAcceptedResponse, PasswordInvalidResponse, PilotChangedResponse, MavlinkResponse, ClientConnectedResponse, LogMessageResponse, ClientDisconnectedResponse, LivekitVideoStatsResponse, SimplePeerVideoStatsResponse, ArmingResponse } from "./shared/protobufs/rov_actions";
import { ToastSeverity, showToastMessage } from "./toastMessageManager";
import { currentRovDriverId, debugPageModeActive, isRovDriver } from "./globalContext";
import { frontendConnMngr } from "./frontendConnManager";
import { networkLatencyMs, updateSensorValues } from "./sensors";
import { DECODE_TXT } from "./shared/consts";
import { handleMavlinkMessage } from "./mavlinkMessageHandler";
import { autopilotArmed, updateSystemMonitorDisplay } from "./vehicleStats";
import { URL_PARAMS } from "./frontendConsts";
import { log, logDebug, logInfo, logWarn, logError, mainLogr } from "./shared/logging"
import { onLivekitVideoOptionsChange, onSimplePeerVideoOptionsChange } from "../components/Modals/VideoSettings.svelte";
import { unixTimeNow } from "./shared/time";

let lastTimeRecvdPong = NaN;

type ReplyExchangeData = { callback: null | ((replyMsgData: RovResponse) => void), originalMsgData: RovAction };

export class FrontendRovMsgHandlerClass {
    // replyContinuityCallbacks: keep track of functions to run when we get a reply to a message we sent with some ExchangeId
    // (index is the ExchangeId number of the sent message)
    replyContinuityCallbacks: ReplyExchangeData[] = [];

    handleRecivedMessage(msgBytes: ArrayBufferLike) {
        let rawData = new Uint8Array(msgBytes)
        if (!rawData || rawData.length === 0) return;
        const msgData = RovResponse.fromBinary(rawData);
        const msgBody = msgData.body;
        const ExchangeId = msgData.exchangeId;
        const msgType = msgBody.oneofKind;

        this.runExchangeCallback(msgData, ExchangeId);
        if (msgType === "done") {
            return this.handleDoneMsgRecived(msgBody.done, ExchangeId);
        } else if (msgType === "error") {
            return this.handleErrorMsgRecived(msgBody.error, ExchangeId);
        } else if (msgType === "pong") {
            return this.handlePongMsgRecived(msgBody.pong, ExchangeId);
        } else if (msgType === "continuedOutput") {
            return this.handleContinuedOutputMsgRecived(msgBody.continuedOutput, ExchangeId);
        } else if (msgType === "sensorUpdates") {
            return this.handleSensorUpdatesMsgRecived(msgBody.sensorUpdates, ExchangeId);
            // } else if (msgType === "passwordRequired") {
            //     return this.handlePasswordRequiredMsgRecived(msgBody.passwordRequired, ExchangeId);
            // } else if (msgType === "passwordAccepted") {
            //     return this.handlePasswordAcceptedMsgRecived(msgBody.passwordAccepted, ExchangeId);
            // } else if (msgType === "passwordInvalid") {
            //     return this.handlePasswordInvalidMsgRecived(msgBody.passwordInvalid, ExchangeId);


        } else if (msgType === "pilotChanged") {
            return this.handlePilotChangedMsgRecived(msgBody.pilotChanged, ExchangeId);
        } else if (msgType === "arming") {
            return this.handleArmingMessageRecived(msgBody.arming, ExchangeId);
        } else if (msgType === "clientConnected") {
            return this.handleClientConnectedMsgRecived(msgBody.clientConnected, ExchangeId);
        } else if (msgType === "clientDisconnected") {
            return this.handleClientDisconnectedMsgRecived(msgBody.clientDisconnected, ExchangeId);
        } else if (msgType === "simplePeerSignal") {
            if (msgBody.simplePeerSignal.message) frontendConnMngr.ingestSimplePeerSignallingMsg(msgBody.simplePeerSignal.message);
        }

        if (msgType === "mavlink") {
            return this.handleMavlinkMessageRecived(msgBody.mavlink, ExchangeId);
        } else if (msgType === "systemMonitor") {
            // @ts-expect-error unfortunate limit on union types in ts
            return this.handleSystemMonitorMsgRecived(msgBody.systemMonitor, ExchangeId);
        } else if (msgType === "logMessage") {
            // @ts-expect-error unfortunate limit on union types in ts
            return this.handleLogMsgRecived(msgBody.logMessage, ExchangeId);
        } else if (msgType === "livekitVideoStats") {
            // @ts-expect-error unfortunate limit on union types in ts
            return this.handleLivekitVideoStatsMsgRecived(msgBody.livekitVideoStats, ExchangeId);
        } else if (msgType === "simplePeerVideoStats") {
            // @ts-expect-error unfortunate limit on union types in ts
            return this.handleSimplePeerVideoStatsMsgRecived(msgBody.simplePeerVideoStats, ExchangeId);
        } else {
            logWarn("Unhandled ROV message recived: ", msgData);
        }
    }

    handleDoneMsgRecived(msgData: DoneResponse, ExchangeId: number) {
        if (URL_PARAMS.DEBUG_MODE) logDebug("Done: ", msgData);
    }

    handleErrorMsgRecived(msgData: ErrorResponse, ExchangeId: number) {
        logWarn("ROV Error: ", msgData);
        showToastMessage("ROV Error: " + msgData.message, 2000, null);
    }

    handlePongMsgRecived(msgData: PongResponse, ExchangeId: number) {
        lastTimeRecvdPong = unixTimeNow();
        // The ROV pong reply contains the timestamp we sent to the ROV in the ping message.
        const networkPingDelay = lastTimeRecvdPong - Number(msgData.time)
        networkLatencyMs.set(networkPingDelay);
    }

    handleContinuedOutputMsgRecived(msgData: ContinuedOutputResponse, ExchangeId: number) {
        if (URL_PARAMS.DEBUG_MODE) logDebug("ContinuedOutput: ", ExchangeId, msgData);
    }

    handleSensorUpdatesMsgRecived(msgData: SensorUpdatesResponse, ExchangeId: number) {
        if (URL_PARAMS.DEBUG_MODE) logDebug("SensorUpdates: ", msgData);
        updateSensorValues(msgData);
    }

    handleSystemMonitorMsgRecived(msgData: SystemMonitorResponse, ExchangeId: number) {
        updateSystemMonitorDisplay(msgData.cpuTemp, msgData.cpuUsage, msgData.memoryUsage, msgData.diskUsage, msgData.warnings);
    }

    // handlePasswordRequiredMsgRecived(msgData: PasswordRequiredResponse, ExchangeId: number) {
    //     if (URL_PARAMS.DEBUG_MODE) logDebug("PasswordRequired for rovId:", msgData.rovId);
    //     // TODO: use the rovId to determine if we have authtoken
    //     modalPasswordPrompt("Enter ROV Password", "").then((password) => {
    //         if (password) {
    //             this.sendRovMessage({
    //                 Body: {
    //                     case: "PasswordAttempt", value: {
    //                         Password: password,
    //                     }
    //                 }, ExchangeId: ExchangeId
    //             } as RovAction, null);
    //         } else {
    //             // remove the reply callback if the user cancels the password prompt (empty password)
    //             delete this.replyContinuityCallbacks[ExchangeId]
    //         }
    //     })
    // }

    // handlePasswordAcceptedMsgRecived(msgData: PasswordAcceptedResponse, ExchangeId: number) {
    //     showToastMessage("Password Accepted", 1000, null);
    // }

    // handlePasswordInvalidMsgRecived(msgData: PasswordInvalidResponse, ExchangeId: number) {
    //     showToastMessage("Wrong Password", 1000, null);
    //     this.handlePasswordRequiredMsgRecived(msgData, ExchangeId);
    // }

    handlePilotChangedMsgRecived(msgData: PilotChangedResponse, ExchangeId: number) {
        let ourLivekitIdentity = frontendConnMngr.currentLivekitIdentity.get();
        if (msgData.pilotIdentity == ourLivekitIdentity) {
            showToastMessage("You are now the driver");
            isRovDriver.set(true);
        } else {
            showToastMessage("ROV Driver is now " + msgData.pilotIdentity);
            isRovDriver.set(false);
        }
        currentRovDriverId.set(msgData.pilotIdentity);
    }

    handleMavlinkMessageRecived(msgData: MavlinkResponse, ExchangeId: number) {
        if (!msgData.message) return;
        const mavMessage = DECODE_TXT(msgData.message)
        try {
            const msg = JSON.parse(mavMessage);
            handleMavlinkMessage(msg);
        } catch (e) {
            logWarn("@ Mav MSG RECIVED W INVALID JSON: ", mavMessage);
        }
    }

    handleArmingMessageRecived(msgData: ArmingResponse, ExchangeId: number) {
        const armed = msgData.armed;
        autopilotArmed.set(armed)
    }

    handleClientConnectedMsgRecived(msgData: ClientConnectedResponse, ExchangeId: number) {
        showToastMessage(msgData.clientPeerId + " Connected to ROV", 1500, null);
    }

    handleClientDisconnectedMsgRecived(msgData: ClientDisconnectedResponse, ExchangeId: number) {
        showToastMessage(msgData.clientPeerId + " Disconnected from ROV", 1500, null);
    }

    handleLogMsgRecived(msgData: LogMessageResponse, ExchangeId: number) {
        const {
            level, timestamp, args, trace, kind, origin,
        } = JSON.parse(msgData.message);
        mainLogr.addLog(level, args, trace, kind, origin, timestamp);
    }

    handleLivekitVideoStatsMsgRecived(msgData: LivekitVideoStatsResponse, ExchangeId: number) {
        // logDebug("LivekitVideoStats: ", msgData);
        onLivekitVideoOptionsChange(msgData);
    };

    handleSimplePeerVideoStatsMsgRecived(msgData: SimplePeerVideoStatsResponse, ExchangeId: number) {
        // logDebug("SimplePeerVideoStats: ", msgData);
        onSimplePeerVideoOptionsChange(msgData);
    }

    sendRovMessage(msg: RovAction, replyCallback: ((replyMsgData: RovResponse) => void) | null = null) {
        if (frontendConnMngr.currentLivekitIdentity.get() === null) return;
        if (!msg.exchangeId) msg.exchangeId = this.replyContinuityCallbacks.length + 1;//uuidV4().substring(0, 8); // generate a random exchange id if none is provided
        if (!this.replyContinuityCallbacks[msg.exchangeId]) this.replyContinuityCallbacks[msg.exchangeId] = { callback: replyCallback, originalMsgData: msg };
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

    runExchangeCallback(msgData: RovResponse, ExchangeId: number) {
        const replyExchageData = this.replyContinuityCallbacks[ExchangeId];
        if (replyExchageData) {
            replyExchageData.callback && replyExchageData.callback(msgData);
            // remove the echange data since the exchange is done
            const msgType = msgData.body.oneofKind;
            if (msgType === "done" || msgType === "error")
                delete this.replyContinuityCallbacks[ExchangeId]
        }
    }
}
export const frontendRovMsgHandler = new FrontendRovMsgHandlerClass();
