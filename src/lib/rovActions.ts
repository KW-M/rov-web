import { connectionManager, rovPeerIdEndNumber } from "./globalContext";
import type { rov_action_api } from "./proto/rovActionsCompiled";
import { RovMsgHandlerClass, rovMessageHandler } from "./rovMessageHandler"
import { setCurrentRovName, showConfirmationMsg, showScrollableTextPopup, showToastMessage } from "./ui"
import { arraysEqual } from "./util";

class RovActionsClass {

    pingLoopIntervalId: number = null;
    lastMove = {
        VelocityX: 0,
        VelocityY: 0,
        VelocityZ: 0,
        AngularVelocityYaw: 0
    };
    rovMsgHandler: RovMsgHandlerClass = null;
    constructor(rovMsgHandler: RovMsgHandlerClass) {
        this.rovMsgHandler = rovMsgHandler;
    }

    // ==== Helpers =====

    sendActionAndWaitForDone(msgData: rov_action_api.IRovAction, callback) {
        this.rovMsgHandler.sendRovMessage(msgData, (response: rov_action_api.RovResponse) => {
            if (response.Done && callback) {
                if (callback) callback(null);
            } else if (response.Error && callback) {
                callback(response.Error.Message + "\n");
                callback(null);
            } else if (response.ContinuedOutput && callback) {
                callback(response.ContinuedOutput.Message + "\n");
            }
        })
    }

    startPingLoop() {
        if (this.pingLoopIntervalId) return;
        this.pingLoopIntervalId = setInterval(() => {
            this.rovMsgHandler.sendRovMessage({ Ping: { Time: Date.now() } }, null);
        }, 3000)
    }

    stopPingLoop() {
        clearInterval(this.pingLoopIntervalId)
        this.pingLoopIntervalId = null;
    }

    showCommandOutputPopup(title, firstLine, doneLine) {
        let addTextToPopup = showScrollableTextPopup(title, null)
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

    connectToRov() {
        const connMangr = connectionManager.get();
        connMangr && connMangr.connectToCurrentTargetRov();
    }

    disconnectFromRov() {
        const connMangr = connectionManager.get();
        connMangr && connMangr.disconnectFromCurrentRov();
    }

    switchToNextRovPeerId() {
        rovPeerIdEndNumber.update((n) => {
            n++;
            localStorage.setItem("rovPeerIdEndNumber", n.toString());
            return n;
        });
        setCurrentRovName();
        this.disconnectFromRov();
    }

    switchToPrevRovPeerId() {
        rovPeerIdEndNumber.update((n) => {
            n = Math.max(n - 1, 0);
            localStorage.setItem("rovPeerIdEndNumber", n.toString());
            return n;
        });
        setCurrentRovName();
        this.disconnectFromRov();
    }

    takeControl() {
        // attempt to become the designated driver for this rov, rov will send a password prompt response if not already authorized
        this.rovMsgHandler.sendRovMessage({ TakeControl: {} }, null);
    }


    moveRov(VelocityX, VelocityY, VelocityZ, AngularVelocityYaw) {
        if (VelocityX == this.lastMove.VelocityX && VelocityY == this.lastMove.VelocityY && VelocityZ == this.lastMove.VelocityZ && AngularVelocityYaw == this.lastMove.AngularVelocityYaw) return;
        const newMovement = { VelocityX, VelocityY, VelocityZ, AngularVelocityYaw }
        this.rovMsgHandler.sendRovMessage({ Move: this.lastMove }, null);
        this.lastMove = newMovement;
    }

    toggleLights() {
        this.rovMsgHandler.sendRovMessage({ ToogleLights: {} }, null);
    }


    shutdownRov = () => {
        showConfirmationMsg("Are you sure you want to shutdown the ROV?", (ok) => {
            showToastMessage("Sending Shutdown Request...")
            this.sendActionAndWaitForDone({ ShutdownRov: {} }, (doneMsg) => {
                showToastMessage("Please wait 20 seconds before unplugging")
                showToastMessage("ROV:" + doneMsg)
                this.disconnectFromRov();
            })
        })
    }

    rebootRov = () => {
        showConfirmationMsg("Are you sure you want to reboot the ROV?", (ok) => {
            showToastMessage("Sending Reboot Request...")
            this.sendActionAndWaitForDone({ RebootRov: {} }, (doneMsg) => {
                showToastMessage("Press Connect again in about 30 seconds")
                showToastMessage("ROV:" + doneMsg)
                this.disconnectFromRov();
            })
        })
    }

    restartRovServices = () => {
        showConfirmationMsg("Are you sure you want to restart services? - The ROV will stop responding for about a minute and then you can re-connect.", () => {
            let responseHandler = this.showCommandOutputPopup("Restarting ROV Services", "Sending Service Restart Request (Please Wait)...\n", "\n\nDone.");
            this.rovMsgHandler.sendRovMessage({ RestartRovServices: {} }, responseHandler)
        })
    }

    getRovStatusReport = () => {
        let responseHandler = this.showCommandOutputPopup("ROV Status Report", "Sending Status Request (Please Wait)...\n", "\n\nDone.");
        this.rovMsgHandler.sendRovMessage({ RovStatusReport: {} }, responseHandler)
    }

    getRovLogs = () => {
        let responseHandler = this.showCommandOutputPopup("ROV Logs", "Sending Request (Please Wait)...\n", "\n\nDone.");
        this.rovMsgHandler.sendRovMessage({ RovLogs: {} }, responseHandler)
    }

    enableRovWifi = () => {
        showToastMessage("Sending Enable Wifi Command...")
        this.sendActionAndWaitForDone({}, (doneMsg) => {
            showToastMessage("Wifi Enabled! " + doneMsg)
        })
    }

    disableRovWifi = () => {
        showConfirmationMsg("Are you sure you want to disable rov wifi? If the ROV is connected via wifi, don't do this!", () => {
            showToastMessage("Sending Disable Wifi Command...")
            this.sendActionAndWaitForDone({ DisableWifi: {} }, (doneMsg) => {
                showToastMessage("Wifi Disabled! " + doneMsg)
            })
        })
    }

}
export const RovActions = new RovActionsClass(rovMessageHandler);
