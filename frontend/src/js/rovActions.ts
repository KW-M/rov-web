import { frontendConnMngr } from "./frontendConnManager";
import { frontendRovMsgHandler } from "./rovMessageHandler"
import { ToastSeverity, showToastMessage } from "./toastMessageManager";
import { calculateDesiredMotion } from "./rovUtil";
import type { buttonChangeDetails } from "virtual-gamepad-lib";
import { ConnectionStates } from "./shared/consts";
import type { FlightMode } from "./shared/mavlink2RestMessages";
import { GPAD_STANDARD_BUTTON_INDEX, GPAD_STANDARD_BUTTON_INDEX_TO_MAVLINK_INDEX, MOVE_MSG_TIMEOUT, PING_INTERVAL } from "./frontendConsts";
import { log, logDebug, logInfo, logWarn, logError } from "../js/shared/logging"
import { rovDrivingVector, throttleGain, tutorialModeActive } from "./globalContext";
import { openTestDriveTutModal, modalConfirm, modalScrollingText } from "../components/Modals/modals";
import { autopilotMode } from "./vehicleStats";
import { unixTimeNow } from "./shared/time";
import type { RovAction, RovResponse } from "./shared/protobufs/rov_actions";

class RovActionsClass {

    requiredMsgsLoopIntervalId: number = null;
    lastMove = {
        velocityX: 0,
        velocityY: 0,
        velocityZ: 0,
        angularVelocityYaw: 0,
        buttonBitmask: 0
    };
    lastMovementTime = 0;
    lastPingTime = 0;

    lastGpadLTriggerValue = 0;
    lastGpadRTriggerValue = 0;

    /** triggerNextFlightModeUi is function that is assigned BY the pilot page flight mode dropdown selector ui component to trigger a change to the next flight mode */
    triggerNextFlightModeUi: (delta: number) => void = null;

    gamepadButtonTriggers = (gamepad: Gamepad, buttonsChangedMask: (false | buttonChangeDetails)[]) => {
        const btnChanges = [...buttonsChangedMask]

        const BTN_A = GPAD_STANDARD_BUTTON_INDEX.A
        const BTN_B = GPAD_STANDARD_BUTTON_INDEX.B
        const BTN_X = GPAD_STANDARD_BUTTON_INDEX.X
        const BTN_Y = GPAD_STANDARD_BUTTON_INDEX.Y
        const BTN_LT = GPAD_STANDARD_BUTTON_INDEX.LT
        const BTN_RT = GPAD_STANDARD_BUTTON_INDEX.RT
        const BTN_RB = GPAD_STANDARD_BUTTON_INDEX.RB
        const BTN_LB = GPAD_STANDARD_BUTTON_INDEX.LB
        const BTN_LSTICK = GPAD_STANDARD_BUTTON_INDEX.LSTICK
        const BTN_RSTICK = GPAD_STANDARD_BUTTON_INDEX.RSTICK
        const BTN_HELP = GPAD_STANDARD_BUTTON_INDEX.SELECT

        if (btnChanges[BTN_LB] && btnChanges[BTN_LB].released) {
            throttleGain.update((val) => Math.min(Math.max(10, val - 10), 200))
            showToastMessage("Throttle " + throttleGain.get() + "%", 1000, false, ToastSeverity.info)
        } else if (btnChanges[BTN_RB] && btnChanges[BTN_RB].released) {
            throttleGain.update((val) => Math.min(Math.max(10, val + 10), 200))
            showToastMessage("Throttle " + throttleGain.get() + "%", 1000, false, ToastSeverity.info)
        }

        if (btnChanges[BTN_HELP] && btnChanges[BTN_HELP].released) {
            openTestDriveTutModal()
        }

        if (btnChanges[BTN_Y] && btnChanges[BTN_Y].released && this.triggerNextFlightModeUi) {
            if (!tutorialModeActive.get()) this.triggerNextFlightModeUi(1)
        }

        if (btnChanges[BTN_X] && btnChanges[BTN_X].released) {
            if (!tutorialModeActive.get()) this.moveClawToPosition(0)
        }

        if (btnChanges[BTN_LT] || btnChanges[BTN_RT]) {
            const LT = btnChanges[BTN_LT] ? gamepad.buttons[BTN_LT].value : 0;
            const RT = btnChanges[BTN_RT] ? gamepad.buttons[BTN_RT].value : 0;

            const deltaL = LT - this.lastGpadLTriggerValue;
            const deltaR = RT - this.lastGpadRTriggerValue;

            // do something with the claw

            this.lastGpadLTriggerValue = LT;
            this.lastGpadRTriggerValue = RT;

        }

        if (btnChanges[BTN_A] && btnChanges[BTN_A].released) {
            if (!tutorialModeActive.get()) this.takeControl()
        } else if (btnChanges[BTN_B] && btnChanges[BTN_B].released) {
            if (!tutorialModeActive.get()) this.disarm()
        }

        // FIXME: this is a hack to get the buttons to work with the mavlink message
        const rawExcludedButtons = [BTN_A, BTN_B, BTN_X, BTN_Y, BTN_LT, BTN_RT, BTN_LSTICK, BTN_RSTICK];
        // remap triggers to sholder buttons
        btnChanges[BTN_LB] = btnChanges[BTN_LT]
        btnChanges[BTN_RB] = btnChanges[BTN_RT]
        const pressedButtons = buttonsChangedMask.map((val, index) => {
            if (val === false) return false;
            if (rawExcludedButtons.includes(index)) return false;
            return val.pressed || val.heldDown;
        })
        this.sendButtonsToRov(pressedButtons);
    }

    gamepadAxisTriggers = (gamepad: Gamepad) => {
        const gain = throttleGain.get() / 100;
        const { velocityX, velocityY, velocityZ, angularVelocityYaw } = calculateDesiredMotion(gamepad.axes);
        if (velocityX == 0 && velocityY == 0 && velocityZ == 0 && angularVelocityYaw == 0) logInfo("GAMEPAD MOTION: STOPed")
        this.moveRov(velocityX * gain, velocityY * gain, velocityZ * gain, angularVelocityYaw * gain);
    }

    // ==== Helpers =====

    sendActionAndWaitForDone(msgData: RovAction, callback: (response: RovResponse) => void) {
        frontendRovMsgHandler.sendRovMessage(msgData, (response: RovResponse) => {
            const responseType = response.body.oneofKind;
            if (callback && (responseType === "done" || responseType === "error" || responseType === "continuedOutput")) {
                callback(response);
            }
        })
    }

    startRequiredMsgLoop() {
        if (this.requiredMsgsLoopIntervalId) return;
        this.requiredMsgsLoopIntervalId = Number(setInterval(() => {
            if (frontendConnMngr.connectionState.get() !== ConnectionStates.connected) return;
            const now = unixTimeNow();
            if (now - this.lastPingTime > PING_INTERVAL) {
                frontendRovMsgHandler.sendRovMessage({ body: { oneofKind: "ping", ping: { time: BigInt(now) } } }, null);
                this.lastPingTime = now;
            }
            if (now - this.lastMovementTime > MOVE_MSG_TIMEOUT) {
                frontendRovMsgHandler.sendRovMessage({ body: { oneofKind: "move", move: this.lastMove } }, null);
                this.lastMovementTime = now;
            }
        }, 10))
    }

    stopRequiredMsgLoop() {
        clearInterval(this.requiredMsgsLoopIntervalId)
        this.requiredMsgsLoopIntervalId = null;
    }

    showCommandOutputPopup(title, firstLine, doneLine) {
        let addTextToPopup = modalScrollingText(title, "", null)
        addTextToPopup(firstLine)
        return (response: RovResponse) => {
            const responseType = response.body.oneofKind;
            if (responseType === "continuedOutput") addTextToPopup(response.body.continuedOutput.message + "\n");
            else if (responseType === "done") addTextToPopup(response.body.done.message + "\n" + doneLine);
            else if (responseType === "error") addTextToPopup(response.body.error.message + "\n");
        }
    }

    // ======= Actions ========



    /** attempt to become the designated driver for this rov, rov will send a password prompt response if not already authorized */
    takeControl() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ body: { oneofKind: "takeControl", takeControl: {} } }, null);
    }

    /** disarm the rov, this will stop all motors and prevent any movement */
    disarm() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ body: { oneofKind: "disarm", disarm: {} } }, null);
    }

    setFlightMode(mode: FlightMode) {
        autopilotMode.set(mode);
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ body: { oneofKind: "setAutopilotMode", setAutopilotMode: { mode: mode } } }, null);
    }

    moveRov(velocityX, velocityY, velocityZ, angularVelocityYaw, btnBitmask: number = -1) {
        const buttonBitmask = btnBitmask === -1 ? this.lastMove.buttonBitmask : btnBitmask;
        // const movementDelta = (velocityX - this.lastMove.velocityX) + (velocityY - this.lastMove.velocityY) + (velocityZ - this.lastMove.velocityZ) + (angularVelocityYaw - this.lastMove.angularVelocityYaw);
        // const totalMovement = Math.abs(velocityX) + Math.abs(velocityY) + Math.abs(velocityZ) + Math.abs(angularVelocityYaw);
        // const timeSinceLastMoveCmd = unixTimeNow() - this.lastMovementTime;
        // if (movementDelta < 0.01 && timeSinceLastMoveCmd < 700) return;
        rovDrivingVector.set({ velocityX, velocityY, velocityZ, angularVelocityYaw, buttonBitmask })
        this.lastMove = rovDrivingVector.get();
        this.lastMovementTime = unixTimeNow();
        if (tutorialModeActive.get()) return; // don't send commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ body: { oneofKind: "move", move: { velocityX, velocityY, velocityZ, angularVelocityYaw, buttonBitmask } } }, null);
    }

    sendButtonsToRov(buttons: boolean[]) {
        const velocityX = this.lastMove.velocityX;
        const velocityY = this.lastMove.velocityY;
        const velocityZ = this.lastMove.velocityZ;
        const angularVelocityYaw = this.lastMove.angularVelocityYaw;
        const buttonBitmask = buttons.reduce((acc, val, index) => {
            if (val) {
                acc |= 1 << GPAD_STANDARD_BUTTON_INDEX_TO_MAVLINK_INDEX[index];;
            }
            return acc;
        }, 0)

        const timeSinceLastMoveCmd = unixTimeNow() - this.lastMovementTime;
        logInfo("btnBitmask" + buttonBitmask)
        if (this.lastMove.buttonBitmask === buttonBitmask && timeSinceLastMoveCmd < 700) return;
        rovDrivingVector.set({ velocityX, velocityY, velocityZ, angularVelocityYaw, buttonBitmask })

        this.lastMove.buttonBitmask = buttonBitmask;
        this.lastMovementTime = unixTimeNow();
        if (tutorialModeActive.get()) return; // don't send commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ body: { oneofKind: "move", move: { velocityX, velocityY, velocityZ, angularVelocityYaw, buttonBitmask } } }, null);
    }

    refreshAllSensorData() {
        frontendRovMsgHandler.sendRovMessage({ body: { oneofKind: "refreshAllSensors", refreshAllSensors: {} } }, null);
    }

    moveClawToPosition(position: number) {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ body: { oneofKind: "moveClaw", moveClaw: { value: position } } })
    }

    toggleLights() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ body: { oneofKind: "toggleLights", toggleLights: {} } }, null);
    }

    takePhoto() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ body: { oneofKind: "takePhoto", takePhoto: {} } }, null);
    }

    startVideoRecording() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ body: { oneofKind: "startVideoRec", startVideoRec: {} } }, null);
    }

    stopVideoRecording() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ body: { oneofKind: "stopVideoRec", stopVideoRec: {} } }, null);
    }

    shutdownRov = () => {
        modalConfirm("Shutdown ROV?", {
            response: (r) => {
                if (!r) return;
                showToastMessage("Sending Shutdown Request...", 2000, false, ToastSeverity.info)
                this.sendActionAndWaitForDone({ body: { oneofKind: "shutdownRov", shutdownRov: {} } }, (msgData) => {
                    if (msgData.body.oneofKind === "error") {
                        showToastMessage("ROV Shutdown Error: " + msgData.body.error.message, 5000, false, ToastSeverity.error)
                    } else if (msgData.body.oneofKind === "done") {
                        showToastMessage("Please wait 20 seconds before unplugging. ROV: " + msgData.body.done.message, 8000, false, ToastSeverity.success)
                        frontendConnMngr.close();
                    }
                })
            }
        })
    }

    rebootRov = () => {
        modalConfirm("Reboot the ROV?", {
            body: "The ROV will stop responding for about two minutes and then you can re-connect.",
            response: (r) => {
                if (!r) return;
                showToastMessage("Sending Reboot Request...", 2000, false, ToastSeverity.info);
                this.sendActionAndWaitForDone({ body: { oneofKind: "rebootRov", rebootRov: {} } }, (msgData) => {
                    if (msgData.body.oneofKind === "error") {
                        showToastMessage("ROV Reboot Error: " + msgData.body.error.message, 5000, false, ToastSeverity.error)
                    } else if (msgData.body.oneofKind === "done") {
                        showToastMessage("Press Connect again in about 30 seconds ROV: " + msgData.body.done.message, 8000, false, ToastSeverity.success)
                        showToastMessage("ROV: " + msgData.body.done.message)
                        frontendConnMngr.close();
                    }
                })
            }
        })
    }

    restartRovServices = () => {
        modalConfirm("Restart ROV services?", {
            body: "The ROV will stop responding for about a minute and then you can re-connect.",
            response: (r) => {
                if (!r) return;
                let responseHandler = this.showCommandOutputPopup("Restarting ROV Services", "Sending Service Restart Request (Please Wait)...\n", "\n\nDone.");
                frontendRovMsgHandler.sendRovMessage({ body: { oneofKind: "restartRovServices", RestartRovServices: {} } }, responseHandler)
            }
        })
    }


    getRovStatusReport = () => {
        let responseHandler = this.showCommandOutputPopup("ROV Status Report", "Sending Status Request (Please Wait)...\n", "\n\nDone.");
        frontendRovMsgHandler.sendRovMessage({ body: { oneofKind: "rovStatusReport", RovStatusReport: {} } }, responseHandler)
    }

    enableRovWifi = () => {
        showToastMessage("Sending Enable Wifi Command...", 2000, false, ToastSeverity.info)
        this.sendActionAndWaitForDone({ body: { oneofKind: "enableWifi", enableWifi: {} } }, (msgData) => {
            if (msgData.body.oneofKind === "error") {
                showToastMessage("Enable Wifi Error: " + msgData.body.error.message, 8000, false, ToastSeverity.error)
            } else if (msgData.body.oneofKind === "done") {
                showToastMessage("Wifi Enable: " + msgData.body.done.message, 2000, false, ToastSeverity.success)
            }
        })
    }

    disableRovWifi = () => {
        modalConfirm("Are you sure you want to disable rov wifi?", {
            body: "If the ROV is connected via wifi, <em>don't do this!</em>",
            response: (r) => {
                if (!r) return;
                showToastMessage("Sending Disable Wifi Command...", 2000, false, ToastSeverity.info)
                this.sendActionAndWaitForDone({ body: { oneofKind: "disableWifi", disableWifi: {} } }, (msgData) => {
                    if (msgData.body.oneofKind === "error") {
                        showToastMessage("Disable Wifi Error: " + msgData.body.error.message, 8000, false, ToastSeverity.error)
                    } else if (msgData.body.oneofKind === "done") {
                        showToastMessage("Wifi Disable: " + msgData.body.done.message, 2000, false, ToastSeverity.success)
                    }
                })
            }
        })
    }

}
export const RovActions = new RovActionsClass();
