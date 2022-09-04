import { globalContext } from "./globalContext.js"
import { MessageHandler } from "./messageHandler.js"
import { showScrollableTextPopup, showToastMessage } from "./ui"

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
            MessageHandler.sendRovMessage({ "action": "ping", "val": Date.now() });
        }, 2000)
        return () => { clearInterval(intervalId) } // return a cleanup function
    }

    static showCommandOutputPopup(title, firstLine, doneLine) {
        let popup = showScrollableTextPopup(title)
        popup.addText(firstLine)
        return (response) => {
            if (response['status'] == "password-required" || response['status'] == "password-invalid") {
                // password prompt is handled elsewhere
                popup.close();
                console.log("closing Pupusd")
            } else if (response['status'] == "password-accepted") {
                popup = showScrollableTextPopup(title);
            }
            else if (response['status'] == "error") popup.addText("\nError:\n" + response['val']);
            else if (response['val']) popup.addText(response['val'])
            else if (response['status'] == "done") popup.addText(doneLine);
        }
    }

    // ======= Actions ========

    static connectToRov() {
        globalContext.RovConnectionMachine.send("DO_CONNECT");
    }

    static disconnectFromRov() {
        globalContext.RovConnectionMachine.send("DO_DISCONNECT");
        globalContext.RovMediaChannelMachine.send("DO_DISCONNECT");
    }

    static takeControl() {
        // attempt to become the designated driver for this rov, rov will send a password prompt response if not already authorized
        MessageHandler.sendRovMessage({ "action": "take_control" }, null);
    }

    static moveRov(thrustVector, turnRate) {
        MessageHandler.sendRovMessage({ "action": "move", "val": { thrustVector: thrustVector, turnRate: turnRate } }, null);
    }

    static toggleLights() {
        MessageHandler.sendRovMessage({ "action": "toggle_lights" }, null);
    }


    static shutdownRov = () => {
        if (confirm("Are you sure you want to shutdown the ROV?")) {
            showToastMessage("Sending Shutdown Request...")
            RovActions.sendActionAndWaitForDone({ "action": "shutdown_rov" }, (doneMsg) => {
                showToastMessage("Please wait 20 seconds before unplugging")
                showToastMessage("ROV:" + doneMsg)
                RovActions.disconnectFromRov();
            })
        }
    }

    static rebootRov = () => {
        if (confirm("Are you sure you want to reboot the ROV?")) {
            showToastMessage("Sending Reboot Request...")
            RovActions.sendActionAndWaitForDone({ "action": "reboot_rov" }, (doneMsg) => {
                showToastMessage("Press Connect again in about 30 seconds")
                showToastMessage("ROV:" + doneMsg)
                RovActions.disconnectFromRov();
            })
        }
    }

    static restartRovServices = () => {
        if (confirm("Are you sure you want to restart services? - The ROV will stop responding for about a minute and then you can re-connect.")) {
            let responseHandler = RovActions.showCommandOutputPopup("Restarting ROV Services", "Sending Service Restart Request (Please Wait)...\n", "\n\nDone.");
            MessageHandler.sendRovMessage({ "action": "restart_rov_services" }, responseHandler)
        }
    }

    static getRovStatusReport = () => {
        let responseHandler = RovActions.showCommandOutputPopup("ROV Status Report", "Sending Status Request (Please Wait)...\n", "\n\nDone.");
        MessageHandler.sendRovMessage({ "action": "rov_status_report" }, responseHandler)
    }

    static getRovLogs = () => {
        let responseHandler = RovActions.showCommandOutputPopup("ROV Logs", "Sending Request (Please Wait)...\n", "\n\nDone.");
        MessageHandler.sendRovMessage({ "action": "rov_logs" }, responseHandler)
    }

    static rePullRovGithubCode = () => {
        alert("Make sure to choose 'Restart ROV Services' from this menu after the pull completes.")
        const addTextToPopup = showScrollableTextPopup("Pulling Updated Code...")
        addTextToPopup("Sending Code Pull Request (Please Wait)...\n")
        MessageHandler.sendRovMessage({ "action": "pull_rov_github_code" }, (response) => {
            if (response['status'] == "error") addTextToPopup("\nError:\n" + response['val']);
            else if (response['val']) addTextToPopup(response['val'])
            else if (response['status'] == "done") {
                addTextToPopup("\n\nDone")
                addTextToPopup("Please run 'Restart ROV Services' from the same menu in ~30 seconds to fully apply any code changes.")
            }
        });
    }

    static enableRovWifi = () => {
        showToastMessage("Sending Enable Wifi Command...")
        RovActions.sendActionAndWaitForDone({ "action": "enable_wifi" }, (doneMsg) => {
            showToastMessage("Wifi Enabled! " + doneMsg)
        })
    }

    static disableRovWifi = () => {
        if (confirm("Are you sure you want to disable rov wifi? If the ROV is connected via wifi, don't do this!")) {
            showToastMessage("Sending Disable Wifi Command...")
            RovActions.sendActionAndWaitForDone({ "action": "disable_wifi" }, (doneMsg) => {
                showToastMessage("Wifi Disabled! " + doneMsg)
            })
        }
    }

}

window.RovActions = RovActions;
