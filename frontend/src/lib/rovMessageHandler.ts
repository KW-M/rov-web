import { rov_actions_proto } from "../../../shared/js/protobufs/rovActionsProto";
import { showPasswordPrompt, showToastMessage } from "./ui";
import { debugPageModeActive, isRovDriver } from "./globalContext";
import { connectionManager } from "./connectionManager";
import { networkLatencyMs, updateSensorValues } from "./sensors";
import { sendSignalingDataToSimplePeerSubscriber } from "./simplePeerSub";

let lastTimeRecvdPong = NaN;

type ReplyExchangeData = { callback: (replyMsgData: rov_actions_proto.RovResponse) => void, originalMsgData: rov_actions_proto.IRovAction };

export class RovMsgHandlerClass {
    // replyContinuityCallbacks: keep track of functions to run when we get a reply to a message we sent with some RovExchangeId
    // (index is the RovExchangeId number of the sent message)
    replyContinuityCallbacks: ReplyExchangeData[] = [];

    // sendMessageCallback: Function that will send the message to the rov peer.
    // This callback should be set in the constructor below.
    sendMessageCallback?: (msgData: Uint8Array) => boolean;
    setSendMessageCallback = (callback: (msgData: Uint8Array) => boolean) => {
        this.sendMessageCallback = callback;
    }

    handleRecivedMessage(msgBytes: Uint8Array) {
        let rawData = new Uint8Array(msgBytes)
        if (!rawData || rawData.length === 0) return;
        console.log("GOT DC DATA:", rawData);
        const msgData = rov_actions_proto.RovResponse.decode(new Uint8Array(msgBytes));
        if (debugPageModeActive.get()) showToastMessage(JSON.stringify(msgData.toJSON()), 800);
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
            // } else if (msgData.TokenAccepted) {
            //     return this.handleTokenAcceptedMsgRecived(msgData.RovExchangeId, msgData.TokenAccepted);
            // } else if (msgData.TokenInvalid) {
            //     return this.handleTokenInvalidMsgRecived(msgData.RovExchangeId, msgData.TokenInvalid);
        } else if (msgData.DriverChanged) {
            return this.handleDriverChangedMsgRecived(msgData.RovExchangeId, msgData.DriverChanged);
        } else if (msgData.ClientConnected) {
            return this.handleClientConnectedMsgRecived(msgData.RovExchangeId, msgData.ClientConnected);
        } else if (msgData.ClientDisconnected) {
            return this.handleClientDisconnectedMsgRecived(msgData.RovExchangeId, msgData.ClientDisconnected);
        } else if (msgData.SimplepeerSignal) {
            // Handle and reply
            // sendSignalingDataToSimplePeerSubscriber(msgData.SimplepeerSignal.Message);
        }
    }

    handleDoneMsgRecived(rovExchangeId: number, msgData: rov_actions_proto.IDoneResponse) {
        console.log("Done: ", msgData);
    }

    handleErrorMsgRecived(rovExchangeId: number, msgData: rov_actions_proto.IErrorResponse) {
        console.warn("ROV Error: ", msgData);
        showToastMessage("ROV Error: " + msgData.Message, 2000, null);
    }

    handlePongMsgRecived(rovExchangeId: number, msgData: rov_actions_proto.IPongResponse) {
        lastTimeRecvdPong = Date.now();
        const networkPingDelay = lastTimeRecvdPong - Number.parseFloat(msgData.Time) // since the rpi replies with the ms time we sent in the ping in the pong message
        networkLatencyMs.set(networkPingDelay);
    }

    handleContinuedOutputMsgRecived(rovExchangeId: number, msgData: rov_actions_proto.IContinuedOutputResponse) {
        console.log("ContinuedOutput: ", rovExchangeId, msgData);
        // pass
    }

    handleSensorUpdatesMsgRecived(rovExchangeId: number, msgData: rov_actions_proto.ISensorUpdatesResponse) {
        // console.log("SensorUpdates: ", msgData);
        updateSensorValues(msgData.MeasurementUpdates);
    }

    handlePasswordRequiredMsgRecived(rovExchangeId: number, msgData: rov_actions_proto.IPasswordRequiredResponse) {
        console.log("PasswordRequired for rovId:", msgData.RovId);
        // TODO: use the rovId to determine if we have authtoken
        showPasswordPrompt("Enter Driver Password", (password) => {
            if (password) {
                this.sendRovMessage({
                    PasswordAttempt: {
                        Password: password,
                    }, RovExchangeId: rovExchangeId
                }, null);
            } else {
                // remove the reply callback if the user cancels the password prompt (empty password)
                delete this.replyContinuityCallbacks[rovExchangeId]
            }
        })
    }

    handlePasswordAcceptedMsgRecived(rovExchangeId: number, msgData: rov_actions_proto.IPasswordAcceptedResponse) {
        showToastMessage("Password Accepted", 1000, null);
        // TODO: save the auth token
        console.log("TODO: Got AuthToken:", msgData.AuthToken)
    }

    handlePasswordInvalidMsgRecived(rovExchangeId: number, msgData: rov_actions_proto.IPasswordInvalidResponse) {
        showToastMessage("Wrong Password", 1000, null);
        this.handlePasswordRequiredMsgRecived(rovExchangeId, msgData);
    }

    handleDriverChangedMsgRecived(rovExchangeId: number, msgData: rov_actions_proto.IDriverChangedResponse) {
        console.info("Driver Changed: ", msgData);
        let thisPeerId = connectionManager.getThisPeerId();
        if (msgData.DriverPeerId == thisPeerId) {
            showToastMessage("You are now the driver");
            isRovDriver.set(true);
        } else {
            showToastMessage("ROV Driver is now " + msgData.DriverPeerId);
            isRovDriver.set(false);
        }
    }

    handleClientConnectedMsgRecived(rovExchangeId: number, msgData: rov_actions_proto.IClientConnectedResponse) {
        showToastMessage(msgData.ClientPeerId + " Connected to ROV", 1500, null);
    }

    handleClientDisconnectedMsgRecived(rovExchangeId: number, msgData: rov_actions_proto.IClientConnectedResponse) {
        showToastMessage(msgData.ClientPeerId + " Disconnected from ROV", 1500, null);
    }

    sendRovMessage(msgData: rov_actions_proto.IRovAction, replyCallback: (replyMsgData: rov_actions_proto.RovResponse) => void = null) {
        if (!msgData.RovExchangeId && replyCallback) msgData.RovExchangeId = this.replyContinuityCallbacks.length + 1;//uuidV4().substring(0, 8); // generate a random cid if none is provided
        if (!this.replyContinuityCallbacks[msgData.RovExchangeId]) this.replyContinuityCallbacks[msgData.RovExchangeId] = { callback: replyCallback, originalMsgData: msgData };
        console.info("Sending RovMessage: ", msgData);
        const msgBytes = rov_actions_proto.RovAction.encode(msgData).finish();
        this.sendMessageCallback(msgBytes);
    }

    resendMessage(rovExchangeId: number) {
        const replyExchageData = this.replyContinuityCallbacks[rovExchangeId];
        if (replyExchageData && replyExchageData.originalMsgData) {
            console.info("Resending message: ", replyExchageData.originalMsgData)
            this.sendRovMessage(replyExchageData.originalMsgData, replyExchageData.callback);
        } else {
            console.info("No message to resend for rovExchangeId: ", rovExchangeId)
        }
    }

    runExchangeCallback(rovExchangeId: number, msgData: rov_actions_proto.RovResponse) {
        const replyExchageData = this.replyContinuityCallbacks[rovExchangeId];
        if (replyExchageData) {
            replyExchageData.callback && replyExchageData.callback(msgData);
            // remove the echange data since the exchange is done
            if (msgData.Done || msgData.Error)
                delete this.replyContinuityCallbacks[rovExchangeId]
        }
    }
}
export const rovMessageHandler = new RovMsgHandlerClass();