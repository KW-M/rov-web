import { rov_actions_proto } from "../../../shared/js/protobufs/rovActionsProto";
import { showPasswordPrompt, showToastMessage } from "./ui";
import { debugPageModeActive, isRovDriver } from "./globalContext";
import { frontendConnMngr } from "./frontendConnManager";
import { networkLatencyMs, updateSensorValues } from "./sensors";

let lastTimeRecvdPong = NaN;

type ReplyExchangeData = { callback: (replyMsgData: rov_actions_proto.RovResponse) => void, originalMsgData: rov_actions_proto.IRovAction };

export class FrontendRovMsgHandlerClass {
    // replyContinuityCallbacks: keep track of functions to run when we get a reply to a message we sent with some ExchangeId
    // (index is the ExchangeId number of the sent message)
    replyContinuityCallbacks: ReplyExchangeData[] = [];

    handleRecivedMessage(msgBytes: ArrayBufferLike) {

        let rawData = new Uint8Array(msgBytes)
        if (!rawData || rawData.length === 0) return;
        console.log("GOT DC DATA:", rawData);
        const msgData = rov_actions_proto.RovResponse.decode(new Uint8Array(msgBytes));
        if (debugPageModeActive.get()) showToastMessage(JSON.stringify(msgData.toJSON()), 800);
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
            // } else if (msgData.TokenAccepted) {
            //     return this.handleTokenAcceptedMsgRecived(msgData.ExchangeId, msgData.TokenAccepted);
            // } else if (msgData.TokenInvalid) {
            //     return this.handleTokenInvalidMsgRecived(msgData.ExchangeId, msgData.TokenInvalid);
        } else if (msgData.DriverChanged) {
            return this.handleDriverChangedMsgRecived(msgData.ExchangeId, msgData.DriverChanged);
        } else if (msgData.ClientConnected) {
            return this.handleClientConnectedMsgRecived(msgData.ExchangeId, msgData.ClientConnected);
        } else if (msgData.ClientDisconnected) {
            return this.handleClientDisconnectedMsgRecived(msgData.ExchangeId, msgData.ClientDisconnected);
        } else if (msgData.SimplepeerSignal) {
            frontendConnMngr.ingestSimplePeerSignallingMsg(msgData.SimplepeerSignal.Message);
        }
    }

    handleDoneMsgRecived(ExchangeId: number, msgData: rov_actions_proto.IDoneResponse) {
        console.log("Done: ", msgData);
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
        console.log("ContinuedOutput: ", ExchangeId, msgData);
        // pass
    }

    handleSensorUpdatesMsgRecived(ExchangeId: number, msgData: rov_actions_proto.ISensorUpdatesResponse) {
        // console.log("SensorUpdates: ", msgData);
        updateSensorValues(msgData);
    }

    handlePasswordRequiredMsgRecived(ExchangeId: number, msgData: rov_actions_proto.IPasswordRequiredResponse) {
        console.log("PasswordRequired for rovId:", msgData.RovId);
        // TODO: use the rovId to determine if we have authtoken
        showPasswordPrompt("Enter Driver Password", (password) => {
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
        // TODO: save the auth token
        console.log("TODO: Got AuthToken:", msgData.AuthToken)
    }

    handlePasswordInvalidMsgRecived(ExchangeId: number, msgData: rov_actions_proto.IPasswordInvalidResponse) {
        showToastMessage("Wrong Password", 1000, null);
        this.handlePasswordRequiredMsgRecived(ExchangeId, msgData);
    }

    // TODO:
    handleDriverChangedMsgRecived(ExchangeId: number, msgData: rov_actions_proto.IDriverChangedResponse) {
        console.info("Driver Changed: ", msgData);
        let thisPeerId = "wooooooo!"//'frontendConnMngr.getThisPeerId();
        console.log("TODO: handleDriverChangedMsgRecived ", thisPeerId);
        if (msgData.DriverPeerId == thisPeerId) {
            showToastMessage("You are now the driver");
            isRovDriver.set(true);
        } else {
            showToastMessage("ROV Driver is now " + msgData.DriverPeerId);
            isRovDriver.set(false);
        }
    }

    handleClientConnectedMsgRecived(ExchangeId: number, msgData: rov_actions_proto.IClientConnectedResponse) {
        showToastMessage(msgData.ClientPeerId + " Connected to ROV", 1500, null);
    }

    handleClientDisconnectedMsgRecived(ExchangeId: number, msgData: rov_actions_proto.IClientConnectedResponse) {
        showToastMessage(msgData.ClientPeerId + " Disconnected from ROV", 1500, null);
    }

    sendRovMessage(msgData: rov_actions_proto.IRovAction, replyCallback: (replyMsgData: rov_actions_proto.RovResponse) => void = null) {
        if (!msgData.ExchangeId && replyCallback) msgData.ExchangeId = this.replyContinuityCallbacks.length + 1;//uuidV4().substring(0, 8); // generate a random cid if none is provided
        if (!this.replyContinuityCallbacks[msgData.ExchangeId]) this.replyContinuityCallbacks[msgData.ExchangeId] = { callback: replyCallback, originalMsgData: msgData };
        // const msgBytes = rov_actions_proto.RovAction.encode(msgData).finish();
        frontendConnMngr.sendMessageToRov(msgData, true);
    }

    resendMessage(ExchangeId: number) {
        const replyExchageData = this.replyContinuityCallbacks[ExchangeId];
        if (replyExchageData && replyExchageData.originalMsgData) {
            console.info("Resending message: ", replyExchageData.originalMsgData)
            this.sendRovMessage(replyExchageData.originalMsgData, replyExchageData.callback);
        } else {
            console.info("No message to resend for ExchangeId: ", ExchangeId)
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
