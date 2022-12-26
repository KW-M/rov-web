import { rov_action_api } from "./proto/rovActionsCompiled";
import { showPasswordPrompt, showToastMessage, updateDisplayedSensorValues, updatePingDisplay, updateRoleDisplay } from "./ui";
import { connectionManager, isRovDriver } from "./globalContext";

let lastTimeRecvdPong = NaN;

type ReplyExchageData = { callback: (replyMsgData: rov_action_api.RovResponse) => void, originalMsgData: rov_action_api.IRovAction };

export class RovMsgHandlerClass {
    // replyContinuityCallbacks: keep track of functions to run when we get a reply to a message we sent with some RovExchangeId
    // (index is the RovExchangeId number of the sent message)
    replyContinuityCallbacks: ReplyExchageData[] = [];

    // sendMessageCallback: Function that will send the message to the rov peer.
    // This callback should be set in the constructor below.
    sendMessageCallback: (msgData: Uint8Array) => boolean = null;
    setSendMessageCallback = (callback: (msgData: Uint8Array) => boolean) => {
        this.sendMessageCallback = callback;
    }

    handleRecivedMessage(msgBytes: Uint8Array) {
        const msgData = rov_action_api.RovResponse.decode(msgBytes);
        this.runExchangeCallback(msgData.RovExchangeId, msgData);
        if (msgData.Done) {
            return this.handleDoneMsgRecived(msgData.RovExchangeId, msgData.Done);
        } else if (msgData.Error) {
            return this.handleErrorMsgRecived(msgData.RovExchangeId, msgData.Error);
        } else if (msgData.Pong) {
            return this.handlePongMsgRecived(msgData.RovExchangeId, msgData.Pong);
        } else if (msgData.ContinuedOutput) {
            return this.handleContinuedOutputMsgRecived(msgData.RovExchangeId, msgData.ContinuedOutput);
        } else if (msgData.SensorUpdates) {
            return this.handleSensorUpdatesMsgRecived(msgData.RovExchangeId, msgData.SensorUpdates);
        } else if (msgData.PasswordRequired) {
            return this.handlePasswordRequiredMsgRecived(msgData.RovExchangeId, msgData.PasswordRequired);
        } else if (msgData.PasswordAccepted) {
            return this.handlePasswordAcceptedMsgRecived(msgData.RovExchangeId, msgData.PasswordAccepted);
        } else if (msgData.PasswordInvalid) {
            return this.handlePasswordInvalidMsgRecived(msgData.RovExchangeId, msgData.PasswordInvalid);
        } else if (msgData.TokenAccepted) {
            return this.handleTokenAcceptedMsgRecived(msgData.RovExchangeId, msgData.TokenAccepted);
        } else if (msgData.TokenInvalid) {
            return this.handleTokenInvalidMsgRecived(msgData.RovExchangeId, msgData.TokenInvalid);
        } else if (msgData.DriverChanged) {
            return this.handleDriverChangedMsgRecived(msgData.RovExchangeId, msgData.DriverChanged);
        } else if (msgData.ClientConnected) {
            return this.handleClientConnectedMsgRecived(msgData.RovExchangeId, msgData.ClientConnected);
        } else if (msgData.ClientDisconnected) {
            return this.handleClientDisconnectedMsgRecived(msgData.RovExchangeId, msgData.ClientDisconnected);
        }
    }

    handleDoneMsgRecived(exchangeId: number, msgData: rov_action_api.IDoneResponse) {
        console.log("Done: ", msgData);
    }

    handleErrorMsgRecived(exchangeId: number, msgData: rov_action_api.IErrorResponse) {
        console.warn("ROV Error: ", msgData);
        showToastMessage("ROV Error: " + msgData.Message, 2000, null);
    }

    handlePongMsgRecived(exchangeId: number, msgData: rov_action_api.IPongResponse) {
        console.log("Pong: ", msgData);
        lastTimeRecvdPong = Date.now();
        const networkPingDelay = lastTimeRecvdPong - Number.parseFloat(msgData.Time) // since the rpi replies with the ms time we sent in the ping in the pong message
        updatePingDisplay(networkPingDelay);
    }

    handleContinuedOutputMsgRecived(exchangeId: number, msgData: rov_action_api.IContinuedOutputResponse) {
        // pass
    }

    handleSensorUpdatesMsgRecived(exchangeId: number, msgData: rov_action_api.ISensorUpdatesResponse) {
        console.log("SensorUpdates: ", msgData);
        updateDisplayedSensorValues(msgData.SensorUpdates);
    }

    handlePasswordRequiredMsgRecived(exchangeId: number, msgData: rov_action_api.IPasswordRequiredResponse) {
        console.log("PasswordRequired for rovId:", msgData.RovId);
        // TODO: use the rovId to determine if we have authtoken
        showPasswordPrompt("Enter Driver Password", (password) => {
            if (password) {
                this.sendRovMessage({
                    PasswordAttempt: {
                        Password: password,
                    }, RovExchangeId: exchangeId
                }, null);
            } else {
                // remove the reply callback if the user cancels the password prompt (empty password)
                delete this.replyContinuityCallbacks[exchangeId]
            }
        })
    }

    handlePasswordAcceptedMsgRecived(exchangeId: number, msgData: rov_action_api.IPasswordAcceptedResponse) {
        showToastMessage("Password Accepted", 1000, null);
        // TODO: save the auth token
        console.log("TODO: Got AuthToken:", msgData.AuthToken)
        this.resendMessage(exchangeId);
    }

    handlePasswordInvalidMsgRecived(exchangeId: number, msgData: rov_action_api.IPasswordInvalidResponse) {
        showToastMessage("Wrong Password", 1000, null);
        this.handlePasswordRequiredMsgRecived(exchangeId, msgData);
    }

    handleTokenAcceptedMsgRecived(exchangeId: number, msgData: rov_action_api.ITokenAcceptedResponse) {
        console.debug("Token Accepted: ", msgData);
        this.resendMessage(exchangeId);
    }

    handleTokenInvalidMsgRecived(exchangeId: number, msgData: rov_action_api.ITokenInvalidResponse) {
        console.debug("Token Invalid: ", msgData);
        this.handlePasswordRequiredMsgRecived(exchangeId, msgData);
    }

    handleDriverChangedMsgRecived(exchangeId: number, msgData: rov_action_api.IDriverChangedResponse) {
        console.info("Driver Changed: ", msgData);
        let thisPeerId = connectionManager.get().getThisPeerId();
        if (msgData.DriverPeerId == thisPeerId) {
            showToastMessage("You are now the driver");
            updateRoleDisplay(true);
            isRovDriver.set(true);
        } else {
            showToastMessage("ROV Driver is now " + msgData.DriverPeerId);
            updateRoleDisplay(false);
            isRovDriver.set(false);
        }
    }

    handleClientConnectedMsgRecived(exchangeId: number, msgData: rov_action_api.IClientConnectedResponse) {
        showToastMessage(msgData.ClientPeerId + " Connected to ROV", 1500, null);
    }

    handleClientDisconnectedMsgRecived(exchangeId: number, msgData: rov_action_api.IClientConnectedResponse) {
        showToastMessage(msgData.ClientPeerId + " Disconnected from ROV", 1500, null);
    }

    sendRovMessage(msgData: rov_action_api.IRovAction, replyCallback: (replyMsgData: rov_action_api.RovResponse) => void = null) {
        if (!msgData.RovExchangeId && replyCallback) msgData.RovExchangeId = this.replyContinuityCallbacks.length;//uuidV4().substring(0, 8); // generate a random cid if none is provided
        if (!this.replyContinuityCallbacks[msgData.RovExchangeId]) this.replyContinuityCallbacks[msgData.RovExchangeId] = { callback: replyCallback, originalMsgData: msgData };
        const msgBytes = rov_action_api.RovAction.encode(msgData).finish();
        this.sendMessageCallback(msgBytes);
    }


    // getExchangeCallback(exchangeId: number) {
    //     const replyExchageData = this.replyContinuityCallbacks[exchangeId];
    //     if (replyExchageData && replyExchageData.callback) return replyExchageData.callback;
    //     return null;
    // }

    resendMessage(exchangeId: number) {
        const replyExchageData = this.replyContinuityCallbacks[exchangeId];
        if (replyExchageData && replyExchageData.originalMsgData) {
            this.sendRovMessage(replyExchageData.originalMsgData, replyExchageData.callback);
        }
    }

    runExchangeCallback(exchangeId: number, msgData: rov_action_api.RovResponse) {
        const replyExchageData = this.replyContinuityCallbacks[exchangeId];
        if (replyExchageData) {
            replyExchageData.callback && replyExchageData.callback(msgData);
            // remove the echange data since the exchange is done
            delete this.replyContinuityCallbacks[exchangeId]
        }
    }
}
export const rovMessageHandler = new RovMsgHandlerClass();
