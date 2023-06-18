
import type { rov_actions_proto } from "../../../shared/js/protobufs/rovActionsProto";
import { frontendConnMngr } from "./frontendConnManager";
import { rovPeerIdEndNumber } from "./globalContext";
import { FrontendRovMsgHandlerClass, frontendRovMsgHandler } from "./rovMessageHandler"
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

    // ==== Helpers =====

    sendActionAndWaitForDone(msgData: rov_actions_proto.IRovAction, callback: (response: rov_actions_proto.RovResponse) => void) {
        frontendRovMsgHandler.sendRovMessage(msgData, (response: rov_actions_proto.RovResponse) => {
            if (callback && (response.Done || response.Error || response.ContinuedOutput)) {
                callback(response);
            }
        })
    }

    startPingLoop() {
        if (this.pingLoopIntervalId) return;
        this.pingLoopIntervalId = Number(setInterval(() => {
            frontendRovMsgHandler.sendRovMessage({ Ping: { Time: Date.now() } }, null);
        }, 3000))
    }

    stopPingLoop() {
        clearInterval(this.pingLoopIntervalId)
        this.pingLoopIntervalId = null;
    }

    showCommandOutputPopup(title, firstLine, doneLine) {
        let addTextToPopup = showScrollableTextPopup(title, null)
        addTextToPopup(firstLine)
        return (response: rov_actions_proto.RovResponse) => {
            if (response.ContinuedOutput) addTextToPopup(response.ContinuedOutput.Message + "\n");
            else if (response.Done) addTextToPopup(response.Done.Message + "\n" + doneLine);
            else if (response.Error) addTextToPopup(response.Error.Message + "\n");
        }
    }

    // ======= Actions ========

    takeControl() {
        // attempt to become the designated driver for this rov, rov will send a password prompt response if not already authorized
        frontendRovMsgHandler.sendRovMessage({ TakeControl: {} }, null);
    }

    moveRov(VelocityX, VelocityY, VelocityZ, AngularVelocityYaw) {
        if (VelocityX == this.lastMove.VelocityX && VelocityY == this.lastMove.VelocityY && VelocityZ == this.lastMove.VelocityZ && AngularVelocityYaw == this.lastMove.AngularVelocityYaw) return;
        const newMovement = { VelocityX, VelocityY, VelocityZ, AngularVelocityYaw }
        frontendRovMsgHandler.sendRovMessage({ Move: newMovement }, null);
        this.lastMove = newMovement;
    }

    refreshAllSensorData() {
        frontendRovMsgHandler.sendRovMessage({ RefreshAllSensors: {} }, null);
    }

    toggleLights() {
        frontendRovMsgHandler.sendRovMessage({ ToogleLights: {} }, null);
    }

    shutdownRov = () => {
        showConfirmationMsg("Are you sure you want to shutdown the ROV?", (ok) => {
            showToastMessage("Sending Shutdown Request...")
            this.sendActionAndWaitForDone({ ShutdownRov: {} }, (msgData) => {
                if (msgData.Error) {
                    showToastMessage("ROV Shutdown Error: " + msgData.Error.Message)
                } else if (msgData.Done) {
                    showToastMessage("Please wait 20 seconds before unplugging")
                    showToastMessage("ROV: " + msgData.Done.Message)
                    frontendConnMngr.disconnectFromLivekitRoom();
                }
            })
        })
    }

    rebootRov = () => {
        showConfirmationMsg("Are you sure you want to reboot the ROV?", (ok) => {
            showToastMessage("Sending Reboot Request...")
            this.sendActionAndWaitForDone({ RebootRov: {} }, (msgData) => {
                if (msgData.Error) {
                    showToastMessage("ROV Reboot Error: " + msgData.Error.Message)
                } else if (msgData.Done) {
                    showToastMessage("Press Connect again in about 30 seconds")
                    showToastMessage("ROV: " + msgData.Done.Message)
                    frontendConnMngr.disconnectFromLivekitRoom();
                }
            })
        })
    }

    restartRovServices = () => {
        showConfirmationMsg("Are you sure you want to restart services? - The ROV will stop responding for about a minute and then you can re-connect.", () => {
            let responseHandler = this.showCommandOutputPopup("Restarting ROV Services", "Sending Service Restart Request (Please Wait)...\n", "\n\nDone.");
            frontendRovMsgHandler.sendRovMessage({ RestartRovServices: {} }, responseHandler)
        })
    }

    getRovStatusReport = () => {
        let responseHandler = this.showCommandOutputPopup("ROV Status Report", "Sending Status Request (Please Wait)...\n", "\n\nDone.");
        frontendRovMsgHandler.sendRovMessage({ RovStatusReport: {} }, responseHandler)
    }

    getRovLogs = () => {
        let responseHandler = this.showCommandOutputPopup("ROV Logs", "Sending Request (Please Wait)...\n", "\n\nDone.");
        frontendRovMsgHandler.sendRovMessage({ RovLogs: {} }, responseHandler)
    }

    enableRovWifi = () => {
        showToastMessage("Sending Enable Wifi Command...")
        this.sendActionAndWaitForDone({ EnableWifi: {} }, (msgData) => {
            if (msgData.Error) {
                showToastMessage("Enable Wifi Error: " + msgData.Error.Message)
            } else if (msgData.Done) {
                showToastMessage("Wifi Enable: " + msgData.Done.Message)
            }
        })
    }

    disableRovWifi = () => {
        showConfirmationMsg("Are you sure you want to disable rov wifi? If the ROV is connected via wifi, don't do this!", () => {
            showToastMessage("Sending Disable Wifi Command...")
            this.sendActionAndWaitForDone({ DisableWifi: {} }, (msgData) => {
                if (msgData.Error) {
                    showToastMessage("Disable Wifi Error: " + msgData.Error.Message)
                } else if (msgData.Done) {
                    showToastMessage("Wifi Disable: " + msgData.Done.Message)
                }
            })
        })
    }

}
export const RovActions = new RovActionsClass();
