import { RovApiAction } from "./consts";
import { ClassInstances } from "./globalContext";
import { MessageHandler } from "./messageHandler.js"
import { showConfirmationMsg, showScrollableTextPopup, showToastMessage } from "./ui"

export class RovActions {

    // ==== Helpers =====

    static sendActionAndWaitForDone(msg_data, callback) {
        let responseMessage = "";
        MessageHandler.sendRovMessage(msg_data, (response) => {

            const responseText = response["val"] || ""
            responseMessage += responseText + "\n";

            const status = response["status"]
            if (status && callback) {
                if (status == "done") callback(responseMessage);
                else if (status == "error") callback("Error: " + responseMessage);
            }

        })
    }

    static startPingMessageSenderLoop() {
        const intervalId = setInterval(() => {
            // MessageHandler.sendRovMessage({ "action": "ping", "val": Date.now() });
        }, 2000)
        return () => { clearInterval(intervalId) } // return a cleanup function
    }

    static showCommandOutputPopup(title, firstLine, doneLine) {
        let addTextToPopup = showScrollableTextPopup(title)
        addTextToPopup(firstLine)
        return (response) => {
            let status = response["status"]
            if (status == "password-required" || status == "password-invalid" || status == "password-accepted" || status == "token-accepted") {
                return; // ignore these messages
            }
            else if (status == "error") addTextToPopup("\nError:\n" + response['val']);
            else if (response['val']) addTextToPopup(response['val'])
            else if (response['status'] == "done") addTextToPopup(doneLine);
        }
    }

    // ======= Actions ========

    static connectToRov() {
        ClassInstances.connManager && ClassInstances.connManager.connectToCurrentTargetRov();
    }

    static disconnectFromRov() {
        ClassInstances.connManager && ClassInstances.connManager.disconnectFromCurrentRov();
    }

    static takeControl() {
        // attempt to become the designated driver for this rov, rov will send a password prompt response if not already authorized
        MessageHandler.sendRovMessage({ "action": RovApiAction.take_control }, null);
    }

    static moveRov(thrustVector, turnRate) {
        MessageHandler.sendRovMessage({ "action": RovApiAction.move, "val": { thrustVector: thrustVector, turnRate: turnRate } }, null);
    }

    static toggleLights() {
        MessageHandler.sendRovMessage({ "action": RovApiAction.toogle_lights }, null);
    }


    static shutdownRov = () => {
        showConfirmationMsg("Are you sure you want to shutdown the ROV?", (ok) => {
            showToastMessage("Sending Shutdown Request...")
            RovActions.sendActionAndWaitForDone({ "action": "shutdown_rov" }, (doneMsg) => {
                showToastMessage("Please wait 20 seconds before unplugging")
                showToastMessage("ROV:" + doneMsg)
                RovActions.disconnectFromRov();
            })
        })
    }

    static rebootRov = () => {
        showConfirmationMsg("Are you sure you want to reboot the ROV?", (ok) => {
            showToastMessage("Sending Reboot Request...")
            RovActions.sendActionAndWaitForDone({ "action": "reboot_rov" }, (doneMsg) => {
                showToastMessage("Press Connect again in about 30 seconds")
                showToastMessage("ROV:" + doneMsg)
                RovActions.disconnectFromRov();
            })
        })
    }

    static restartRovServices = () => {
        showConfirmationMsg("Are you sure you want to restart services? - The ROV will stop responding for about a minute and then you can re-connect.", () => {
            let responseHandler = RovActions.showCommandOutputPopup("Restarting ROV Services", "Sending Service Restart Request (Please Wait)...\n", "\n\nDone.");
            MessageHandler.sendRovMessage({ "action": "restart_rov_services" }, responseHandler)
        })
    }

    static getRovStatusReport = () => {
        let responseHandler = RovActions.showCommandOutputPopup("ROV Status Report", "Sending Status Request (Please Wait)...\n", "\n\nDone.");
        MessageHandler.sendRovMessage({ "action": "rov_status_report" }, responseHandler)
    }

    static getRovLogs = () => {
        let responseHandler = RovActions.showCommandOutputPopup("ROV Logs", "Sending Request (Please Wait)...\n", "\n\nDone.");
        MessageHandler.sendRovMessage({ "action": "rov_logs" }, responseHandler)
    }

    static enableRovWifi = () => {
        showToastMessage("Sending Enable Wifi Command...")
        RovActions.sendActionAndWaitForDone({ "action": "enable_wifi" }, (doneMsg) => {
            showToastMessage("Wifi Enabled! " + doneMsg)
        })
    }

    static disableRovWifi = () => {
        showConfirmationMsg("Are you sure you want to disable rov wifi? If the ROV is connected via wifi, don't do this!", () => {
            showToastMessage("Sending Disable Wifi Command...")
            RovActions.sendActionAndWaitForDone({ "action": "disable_wifi" }, (doneMsg) => {
                showToastMessage("Wifi Disabled! " + doneMsg)
            })
        })
    }

}

window["RovActions"] = RovActions;
