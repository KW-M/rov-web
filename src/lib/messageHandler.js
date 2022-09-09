import { showPasswordPrompt, showScrollableTextPopup, showToastMessage, updateDisplayedSensorValues, updatePingDisplay, updateRoleDisplay } from "./ui";
import { v4 as uuidV4 } from "uuid"
import { ClassInstances, isRovDriver } from "./globalContext";

let lastTimeRecvdPong = NaN;

// function showPasswordPrompt(d, e) {
//     console.log("showPasswordPrompt: " + d);
// }

// function showToastMessage(d, e) {
//     console.log("showToast: " + d);
// }

// function updateDisplayedSensorValues(d) {
//     console.log("updateDisplayedSensorValues: " + d);
// }

// function updatePingDisplay(d) {
//     console.log("updatePingDisplay: " + d);
// }

// function updateRoleDisplay(d) {
//     console.log("updateRoleDisplay: " + d);
// }

export class MessageHandler {

    // replyContinuityCallbacks: keep track of functions to run when we get a reply to a message we sent with some "cid" aka continuityId
    // object format: (key is the cid of the sent message): { '1234': { callback: function() {}, original_msg: "{action:'move'}" }, etc... }
    static replyContinuityCallbacks = {};

    // sendMessageCallback: Function that will send the message to the rov peer.
    // This callback should be set in the constructor below.
    static sendMessageCallback = (msg) => { };
    static setSendMessageCallback = (callback) => {
        MessageHandler.sendMessageCallback = callback;
    }

    // sendRovMessage: Send a message to the rov peer and setup reply callbacks based on a message cid if reply(ies) are expected.
    static sendRovMessage = (msgObject, replyCallback) => {
        // setup the reply callback
        let cid = msgObject["cid"]
        if (!cid) {
            cid = msgObject["cid"] = uuidV4().substring(0, 8); // generate a random cid if none is provided
        }
        if (!MessageHandler.replyContinuityCallbacks[cid]) MessageHandler.replyContinuityCallbacks[cid] = { original_msg: msgObject };
        if (replyCallback) MessageHandler.replyContinuityCallbacks[cid].callback = replyCallback;

        // send the message to the rov
        const messageString = JSON.stringify(msgObject);
        if (MessageHandler.sendMessageCallback) MessageHandler.sendMessageCallback(messageString);
    }

    static handlePasswordChallenge(msg_cid) {
        showPasswordPrompt("Please enter the driver password", (password) => {
            if (password) {
                const msg_data = {
                    "cid": msg_cid,
                    "action": "password_attempt",
                    "val": password
                };
                MessageHandler.sendRovMessage(msg_data, null);
            } else {
                // remove the reply callback if the user cancels the password prompt (empty password)
                delete MessageHandler.replyContinuityCallbacks[msg_cid]
            }
        })
    }

    static handleReplyMsgRecived(msg_data, msg_cid) {
        const msg_status = msg_data["status"];
        const msg_value = msg_data["val"];
        const replyContinuityCallback = MessageHandler.replyContinuityCallbacks[msg_cid].callback


        if (msg_status == "error") {
            console.warn("Rov Action Error: " + msg_value);
            showToastMessage(msg_value);

        } else if (msg_status == "pong") {
            console.log("Ping->Pong received");
            lastTimeRecvdPong = Date.now();
            const networkPingDelay = lastTimeRecvdPong - Number.parseFloat(msg_value) // since the rpi replies with the ms time we sent in the ping in the pong message
            updatePingDisplay(networkPingDelay);

        } else if (msg_status == "done") {
            if (replyContinuityCallback) replyContinuityCallback(msg_data);
            else showToastMessage(MessageHandler.replyContinuityCallbacks[msg_cid].originalMsgData.action + ": OK");
        } else if (msg_status == "password-required") {
            if (replyContinuityCallback) replyContinuityCallback(msg_data);
            MessageHandler.handlePasswordChallenge(msg_cid);
        } else if (msg_status == "password-invalid") {
            if (replyContinuityCallback) replyContinuityCallback(msg_data);
            showToastMessage("Invalid password");
            if (replyContinuityCallback) replyContinuityCallback(msg_data);
            MessageHandler.handlePasswordChallenge(msg_cid);
        } else if (msg_status == "password-accepted") {
            showToastMessage("Password accepted");
            if (replyContinuityCallback) replyContinuityCallback(msg_data);
            const originalMsgData = MessageHandler.replyContinuityCallbacks[msg_cid].original_msg
            console.log("originalMsgData: ", originalMsgData);
            MessageHandler.sendRovMessage(originalMsgData, null);
        } else if (replyContinuityCallback) {
            replyContinuityCallback(msg_data);
        }
    }

    static handleDriverChange(newDriverId) {
        let thisPeerId = ClassInstances.connManager.getThisPeerId();
        if (newDriverId == thisPeerId) {
            showToastMessage("You are now the driver");
            updateRoleDisplay(true);
            isRovDriver.set(true);
        } else {
            showToastMessage("ROV Driver is now " + newDriverId);
            updateRoleDisplay(false);
            isRovDriver.set(false);
        }
    }

    static handleBroadcastMsgRecived(msg_data) {
        const msg_status = msg_data["status"];
        const msg_value = msg_data["val"];

        if (msg_status == "error") {
            console.error("Rov Error: " + msg_value);

        } else if (msg_status == "sensor-update") {

            updateDisplayedSensorValues(msg_value);

        } else if (msg_status == "driver-changed") {
            MessageHandler.handleDriverChange(msg_value);
        }

    }

    static handleRecivedMessage(messageString) {
        console.info("Msg recived: " + messageString);
        const msg_data = JSON.parse(messageString);
        const msg_cid = msg_data["cid"];

        if (msg_cid && msg_cid in MessageHandler.replyContinuityCallbacks) {

            // --- this IS a reply to a message we sent ---
            MessageHandler.handleReplyMsgRecived(msg_data, msg_cid);

        } else {

            // --- this is NOT a reply to a message we sent ---
            MessageHandler.handleBroadcastMsgRecived(msg_data);

        }
    }


}
