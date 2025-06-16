import { frontendConnMngr } from "./frontendConnManager";
import { frontendRovMsgHandler } from "./rovMessageHandler"
import { ToastSeverity, showToastMessage } from "./toastMessageManager";
import { calculateDesiredMotion } from "./rovUtil";
import { standardGpadButtonMap, type buttonChangeDetails } from "virtual-gamepad-lib";
import { ConnectionStates } from "./shared/consts";
import type { FlightMode } from "./shared/mavlink2RestMessages";
import { GPAD_STANDARD_BUTTON_INDEX_TO_MAVLINK_INDEX, MOVE_MSG_TIMEOUT, PING_INTERVAL } from "./frontendConsts";
import { log, logDebug, logInfo, logWarn, logError } from "../js/shared/logging"
import { armButtonPressed, rovDrivingVector, throttleGain, tutorialModeActive } from "./globalContext";
import { openTestDriveTutModal, modalConfirm, modalScrollingText } from "../components/Modals/modals";
import { autopilotArmed, autopilotMode } from "./vehicleStats";
import { unixTimeNow } from "./shared/time";
import { RovAction, type RovResponse } from "./shared/protobufs/rov_actions";

const BTN_A = standardGpadButtonMap.A
const BTN_B = standardGpadButtonMap.B
const BTN_X = standardGpadButtonMap.X
const BTN_Y = standardGpadButtonMap.Y
const BTN_LT = standardGpadButtonMap.LTrigger
const BTN_RT = standardGpadButtonMap.RTrigger
const BTN_RB = standardGpadButtonMap.RShoulder
const BTN_LB = standardGpadButtonMap.LShoulder
const BTN_LSTICK = standardGpadButtonMap.LStick
const BTN_RSTICK = standardGpadButtonMap.RStick
const BTN_HELP = standardGpadButtonMap.Back

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

    gamepadButtonTriggers = (buttonsChanges: (false | (buttonChangeDetails & { value: number }))[]) => {
        const btnChanges = [...buttonsChanges]

        // HELP BUTTON
        if (btnChanges[BTN_HELP] && btnChanges[BTN_HELP].released) {
            openTestDriveTutModal()
        }

        // X
        if (btnChanges[BTN_X] && btnChanges[BTN_X].released) {
            // if (!tutorialModeActive.get()) this.moveClawToPosition(0)
        }

        // Y
        if (btnChanges[BTN_Y] && btnChanges[BTN_Y].released && this.triggerNextFlightModeUi) {
            if (!tutorialModeActive.get()) this.triggerNextFlightModeUi(1)
        }

        // A
        if (btnChanges[BTN_A] && btnChanges[BTN_A].pressed) {
            armButtonPressed.set(true)
        } else if (btnChanges[BTN_A] && btnChanges[BTN_A].released) {
            armButtonPressed.set(false)
        }

        // B
        if (btnChanges[BTN_B] && btnChanges[BTN_B].released) {
            if (!tutorialModeActive.get()) this.startVideoRecording()
        }

        // SHOULDER BUTTONS
        if (btnChanges[BTN_LB] && btnChanges[BTN_LB].released) {
            throttleGain.update((val) => Math.min(Math.max(10, val - 10), 200))
            showToastMessage("Throttle " + throttleGain.get() + "%", 1000, false, ToastSeverity.info)
        } else if (btnChanges[BTN_RB] && btnChanges[BTN_RB].released) {
            throttleGain.update((val) => Math.min(Math.max(10, val + 10), 200))
            showToastMessage("Throttle " + throttleGain.get() + "%", 1000, false, ToastSeverity.info)
        }


        // TRIGGERS
        if (btnChanges[BTN_LT] || btnChanges[BTN_RT]) {
            const LT = btnChanges[BTN_LT] ? btnChanges[BTN_LT].value : 0;
            const RT = btnChanges[BTN_RT] ? btnChanges[BTN_RT].value : 0;

            const deltaL = LT - this.lastGpadLTriggerValue;
            const deltaR = RT - this.lastGpadRTriggerValue;

            // do something with the claw

            this.lastGpadLTriggerValue = LT;
            this.lastGpadRTriggerValue = RT;

        }


        // FIXME: this is a hack to get the buttons to work with the mavlink message
        const rawExcludedButtons = [BTN_A, BTN_B, BTN_X, BTN_Y, BTN_LT, BTN_RT, BTN_LSTICK, BTN_RSTICK];
        // remap triggers to sholder buttons
        btnChanges[BTN_LB] = btnChanges[BTN_LT]
        btnChanges[BTN_RB] = btnChanges[BTN_RT]
        const pressedButtons = btnChanges.map((val, index) => {
            if (!val || rawExcludedButtons.includes(index)) return false;
            return val.pressed || val.heldDown;
        })
        this.sendButtonsToRov(pressedButtons);
    }

    gamepadAxisTriggers = (axes: number[]) => {
        const gain = throttleGain.get() / 100;
        const { velocityX, velocityY, velocityZ, angularVelocityYaw } = calculateDesiredMotion(axes);
        // if (velocityX === 0 && velocityY === 0 && velocityZ === 0 && angularVelocityYaw === 0) return;
        this.moveRov(velocityX * gain, velocityY * gain, velocityZ * gain, angularVelocityYaw * gain);
    }

    // ==== Helpers =====

    sendActionAndWaitForDone(msgData: RovAction, reliable: boolean, callback: (response: RovResponse) => void) {
        frontendRovMsgHandler.sendRovMessage(msgData, reliable, (response: RovResponse) => {
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
                frontendRovMsgHandler.sendRovMessage(RovAction.create({ body: { oneofKind: "ping", ping: { time: now } } }), true, null);
                this.lastPingTime = now;
            }
            if (now - this.lastMovementTime > MOVE_MSG_TIMEOUT) {
                frontendRovMsgHandler.sendRovMessage(RovAction.create({ body: { oneofKind: "move", move: this.lastMove } }), false, null);
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
        // autopilotArmed.set(true); // proactively display the autopilot armed status
        frontendRovMsgHandler.sendRovMessage(RovAction.create({ body: { oneofKind: "takeControl", takeControl: {} } }), true, null);
    }

    /** disarm the rov, this will stop all motors and prevent any movement */
    disarm() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        // autopilotArmed.set(false); // proactively display the autopilot armed status
        frontendRovMsgHandler.sendRovMessage(RovAction.create({ body: { oneofKind: "disarm", disarm: {} } }), true, null);
    }

    setFlightMode(mode: FlightMode) {
        autopilotMode.set(mode);
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage(RovAction.create({ body: { oneofKind: "setAutopilotMode", setAutopilotMode: { mode: mode } } }), true, null);
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
        frontendRovMsgHandler.sendRovMessage(RovAction.create({ body: { oneofKind: "move", move: { velocityX, velocityY, velocityZ, angularVelocityYaw, buttonBitmask } } }), false, null);
    }

    sendButtonsToRov(buttons: boolean[]) {
        const velocityX = this.lastMove.velocityX;
        const velocityY = this.lastMove.velocityY;
        const velocityZ = this.lastMove.velocityZ;
        const angularVelocityYaw = this.lastMove.angularVelocityYaw;
        const buttonBitmask = buttons.reduce((acc, val, index) => {
            if (val) {
                acc |= 1 << GPAD_STANDARD_BUTTON_INDEX_TO_MAVLINK_INDEX[index];
            }
            return acc;
        }, 0)

        const timeSinceLastMoveCmd = unixTimeNow() - this.lastMovementTime;
        if (this.lastMove.buttonBitmask === buttonBitmask && timeSinceLastMoveCmd < 700) return;
        rovDrivingVector.set({ velocityX, velocityY, velocityZ, angularVelocityYaw, buttonBitmask })

        this.lastMove.buttonBitmask = buttonBitmask;
        this.lastMovementTime = unixTimeNow();
        if (tutorialModeActive.get()) return; // don't send commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage(RovAction.create({ body: { oneofKind: "move", move: { velocityX, velocityY, velocityZ, angularVelocityYaw, buttonBitmask } } }), true, null);
    }

    refreshAllSensorData() {
        frontendRovMsgHandler.sendRovMessage(RovAction.create({ body: { oneofKind: "refreshAllSensors", refreshAllSensors: {} } }), true, null);
    }

    moveClawToPosition(position: number) {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage(RovAction.create({ body: { oneofKind: "moveClaw", moveClaw: { value: position } } }), false, null);
    }

    toggleLights() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage(RovAction.create({ body: { oneofKind: "toggleLights", toggleLights: {} } }), true, null);
    }

    takePhoto() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage(RovAction.create({ body: { oneofKind: "takePhoto", takePhoto: {} } }), false, null);
    }

    startVideoRecording() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage(RovAction.create({ body: { oneofKind: "startVideoRec", startVideoRec: {} } }), true, null);
    }

    stopVideoRecording() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage(RovAction.create({ body: { oneofKind: "stopVideoRec", stopVideoRec: {} } }), true, null);
    }

    shutdownRov = () => {
        modalConfirm("Shutdown ROV?", {
            response: (r) => {
                if (!r) return;
                showToastMessage("Sending Shutdown Request...", 2000, false, ToastSeverity.info)
                this.sendActionAndWaitForDone(RovAction.create({ body: { oneofKind: "shutdownRov", shutdownRov: {} } }), true, (msgData) => {
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
                this.sendActionAndWaitForDone(RovAction.create({ body: { oneofKind: "rebootRov", rebootRov: {} } }), true, (msgData) => {
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
                frontendRovMsgHandler.sendRovMessage(RovAction.create({ body: { oneofKind: "restartRovServices", restartRovServices: {} } }), true, responseHandler)
            }
        })
    }


    getRovStatusReport = () => {
        let responseHandler = this.showCommandOutputPopup("ROV Status Report", "Sending Status Request (Please Wait)...\n", "\n\nDone.");
        frontendRovMsgHandler.sendRovMessage(RovAction.create({ body: { oneofKind: "rovStatusReport", rovStatusReport: {} } }), true, responseHandler)
    }

    enableRovWifi = () => {
        showToastMessage("Sending Enable Wifi Command...", 2000, false, ToastSeverity.info)
        this.sendActionAndWaitForDone(RovAction.create({ body: { oneofKind: "enableWifi", enableWifi: {} } }), true, (msgData) => {
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
                this.sendActionAndWaitForDone(RovAction.create({ body: { oneofKind: "disableWifi", disableWifi: {} } }), true, (msgData) => {
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
