
import type { rov_actions_proto } from "../../../shared/js/protobufs/rovActionsProto";
import { frontendConnMngr } from "./frontendConnManager";
import { frontendRovMsgHandler } from "./rovMessageHandler"
import { showConfirmationMsg, showScrollableTextPopup } from "./ui"
import { showToastMessage } from "../components/ToastMessages.svelte";
import { calculateDesiredMotion } from "./rovUtil";
import { gpadCtrl } from "./gamepad";
import type { buttonChangeDetails } from "virtual-gamepad-lib";
import { ConnectionStates } from "../../../shared/js/consts";

class RovActionsClass {

    pingLoopIntervalId: number = null;
    lastMove = {
        VelocityX: 0,
        VelocityY: 0,
        VelocityZ: 0,
        AngularVelocityYaw: 0,
    };
    lastMovementTime = 0;

    gamepadButtonTriggers(gamepad: Gamepad, buttonsChangedMask: (false | buttonChangeDetails)[]) {

        if (buttonsChangedMask[0] && buttonsChangedMask[0].released) {
            this.takeControl()
        } else if (buttonsChangedMask[1] && buttonsChangedMask[1].released) {
            this.startVideoRecording()
        } else if (buttonsChangedMask[2] && buttonsChangedMask[2].released) {
            this.takePhoto()
        } else if (buttonsChangedMask[3] && buttonsChangedMask[3].released) {
            frontendConnMngr.toggleSimplePeerConnection();
        }


        // else if (gamepad.buttons[12].pressed) {
        //     let delay = gpadCtrl.throttleDelay + 1;
        //     // this.setInputThrottle(delay);
        // } else if (gamepad.buttons[13].pressed) {
        //     let delay = Math.max(this.throttleDelay - 1, 1);
        //     this.setInputThrottle(delay);
        // } else if (gamepad.buttons[14].pressed) {
        //     this.setInputThrottle(10);
        // } else if (gamepad.buttons[15].pressed) {
        //     this.setInputThrottle(100);
        // }
    }

    gamepadAxisTriggers(gamepad: Gamepad) {
        const { VelocityX, VelocityY, VelocityZ, AngularVelocityYaw } = calculateDesiredMotion(gamepad.axes);
        if (VelocityX == 0 && VelocityY == 0 && VelocityZ == 0 && AngularVelocityYaw == 0) console.info("GAMEPAD MOTION: STOPed")
        this.moveRov(VelocityX, VelocityY, VelocityZ, AngularVelocityYaw);
    }

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
            if (frontendConnMngr.connectionState.get() != ConnectionStates.connected) return;
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
        const movementDelta = (VelocityX - this.lastMove.VelocityX) + (VelocityY - this.lastMove.VelocityY) + (VelocityZ - this.lastMove.VelocityZ) + (AngularVelocityYaw - this.lastMove.AngularVelocityYaw);
        const totalMovement = Math.abs(VelocityX) + Math.abs(VelocityY) + Math.abs(VelocityZ) + Math.abs(AngularVelocityYaw);
        const timeSinceLastMoveCmd = Date.now() - this.lastMovementTime;
        if (totalMovement > 0.1 && movementDelta < 0.01 && timeSinceLastMoveCmd < 500) return;
        frontendRovMsgHandler.sendRovMessage({ Move: { VelocityX, VelocityY, VelocityZ, AngularVelocityYaw } }, null);
        this.lastMove = { VelocityX, VelocityY, VelocityZ, AngularVelocityYaw };
        this.lastMovementTime = Date.now();
    }

    refreshAllSensorData() {
        frontendRovMsgHandler.sendRovMessage({ RefreshAllSensors: {} }, null);
    }

    toggleLights() {
        frontendRovMsgHandler.sendRovMessage({ ToogleLights: {} }, null);
    }

    takePhoto() {
        frontendRovMsgHandler.sendRovMessage({ TakePhoto: {} }, null);
    }

    startVideoRecording() {
        frontendRovMsgHandler.sendRovMessage({ StartVideoRec: {} }, null);
    }

    stopVideoRecording() {
        frontendRovMsgHandler.sendRovMessage({ StopVideoRec: {} }, null);
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
