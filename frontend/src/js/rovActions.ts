
import type { rov_actions_proto } from "./shared/protobufs/rovActionsProto";
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

class RovActionsClass {

    requiredMsgsLoopIntervalId: number = null;
    lastMove = {
        VelocityX: 0,
        VelocityY: 0,
        VelocityZ: 0,
        AngularVelocityYaw: 0,
        ButtonBitmask: 0
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
        const { VelocityX, VelocityY, VelocityZ, AngularVelocityYaw } = calculateDesiredMotion(gamepad.axes);
        if (VelocityX == 0 && VelocityY == 0 && VelocityZ == 0 && AngularVelocityYaw == 0) logInfo("GAMEPAD MOTION: STOPed")
        this.moveRov(VelocityX * gain, VelocityY * gain, VelocityZ * gain, AngularVelocityYaw * gain);
    }

    // ==== Helpers =====

    sendActionAndWaitForDone(msgData: rov_actions_proto.IRovAction, callback: (response: rov_actions_proto.RovResponse) => void) {
        frontendRovMsgHandler.sendRovMessage(msgData, (response: rov_actions_proto.RovResponse) => {
            if (callback && (response.Done || response.Error || response.ContinuedOutput)) {
                callback(response);
            }
        })
    }

    startRequiredMsgLoop() {
        if (this.requiredMsgsLoopIntervalId) return;
        this.requiredMsgsLoopIntervalId = Number(setInterval(() => {
            if (frontendConnMngr.connectionState.get() != ConnectionStates.connected) return;
            const now = unixTimeNow();
            if (now - this.lastPingTime > PING_INTERVAL) {
                frontendRovMsgHandler.sendRovMessage({ Ping: { Time: now } }, null);
                this.lastPingTime = now;
            }
            if (now - this.lastMovementTime > MOVE_MSG_TIMEOUT) {
                frontendRovMsgHandler.sendRovMessage({ Move: this.lastMove }, null);
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
        return (response: rov_actions_proto.RovResponse) => {
            if (response.ContinuedOutput) addTextToPopup(response.ContinuedOutput.Message + "\n");
            else if (response.Done) addTextToPopup(response.Done.Message + "\n" + doneLine);
            else if (response.Error) addTextToPopup(response.Error.Message + "\n");
        }
    }

    // ======= Actions ========



    /** attempt to become the designated driver for this rov, rov will send a password prompt response if not already authorized */
    takeControl() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ TakeControl: {} }, null);
    }

    /** disarm the rov, this will stop all motors and prevent any movement */
    disarm() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ Disarm: {} }, null);
    }

    setFlightMode(mode: FlightMode) {
        autopilotMode.set(mode);
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ SetAutopilotMode: { mode: mode } }, null);
    }

    moveRov(VelocityX, VelocityY, VelocityZ, AngularVelocityYaw, btnBitmask: number = -1) {
        const ButtonBitmask = btnBitmask === -1 ? this.lastMove.ButtonBitmask : btnBitmask;
        // const movementDelta = (VelocityX - this.lastMove.VelocityX) + (VelocityY - this.lastMove.VelocityY) + (VelocityZ - this.lastMove.VelocityZ) + (AngularVelocityYaw - this.lastMove.AngularVelocityYaw);
        // const totalMovement = Math.abs(VelocityX) + Math.abs(VelocityY) + Math.abs(VelocityZ) + Math.abs(AngularVelocityYaw);
        // const timeSinceLastMoveCmd = unixTimeNow() - this.lastMovementTime;
        // if (movementDelta < 0.01 && timeSinceLastMoveCmd < 700) return;
        rovDrivingVector.set({ VelocityX, VelocityY, VelocityZ, AngularVelocityYaw, ButtonBitmask })
        this.lastMove = rovDrivingVector.get();
        this.lastMovementTime = unixTimeNow();
        if (tutorialModeActive.get()) return; // don't send commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ Move: { VelocityX, VelocityY, VelocityZ, AngularVelocityYaw, ButtonBitmask } }, null);
    }

    sendButtonsToRov(buttons: boolean[]) {
        const VelocityX = this.lastMove.VelocityX;
        const VelocityY = this.lastMove.VelocityY;
        const VelocityZ = this.lastMove.VelocityZ;
        const AngularVelocityYaw = this.lastMove.AngularVelocityYaw;
        const ButtonBitmask = buttons.reduce((acc, val, index) => {
            if (val) {
                acc |= 1 << GPAD_STANDARD_BUTTON_INDEX_TO_MAVLINK_INDEX[index];;
            }
            return acc;
        }, 0)

        const timeSinceLastMoveCmd = unixTimeNow() - this.lastMovementTime;
        logInfo("btnBitmask" + ButtonBitmask)
        if (this.lastMove.ButtonBitmask === ButtonBitmask && timeSinceLastMoveCmd < 700) return;
        rovDrivingVector.set({ VelocityX, VelocityY, VelocityZ, AngularVelocityYaw, ButtonBitmask })

        this.lastMove.ButtonBitmask = ButtonBitmask;
        this.lastMovementTime = unixTimeNow();
        if (tutorialModeActive.get()) return; // don't send commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ Move: { VelocityX, VelocityY, VelocityZ, AngularVelocityYaw, ButtonBitmask } }, null);
    }

    refreshAllSensorData() {
        frontendRovMsgHandler.sendRovMessage({ RefreshAllSensors: {} }, null);
    }

    moveClawToPosition(position: number) {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ MoveClaw: { Value: position } })
    }

    toggleLights() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ ToggleLights: {} }, null);
    }

    takePhoto() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ TakePhoto: {} }, null);
    }

    startVideoRecording() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ StartVideoRec: {} }, null);
    }

    stopVideoRecording() {
        if (tutorialModeActive.get()) return; // don't send button commands in tutorial mode
        frontendRovMsgHandler.sendRovMessage({ StopVideoRec: {} }, null);
    }

    shutdownRov = () => {
        modalConfirm("Shutdown ROV?", {
            response: (r) => {
                if (!r) return;
                showToastMessage("Sending Shutdown Request...", 2000, false, ToastSeverity.info)
                this.sendActionAndWaitForDone({ ShutdownRov: {} }, (msgData) => {
                    if (msgData.Error) {
                        showToastMessage("ROV Shutdown Error: " + msgData.Error.Message, 5000, false, ToastSeverity.error)
                    } else if (msgData.Done) {
                        showToastMessage("Please wait 20 seconds before unplugging. ROV: " + msgData.Done.Message, 8000, false, ToastSeverity.success)
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
                this.sendActionAndWaitForDone({ RebootRov: {} }, (msgData) => {
                    if (msgData.Error) {
                        showToastMessage("ROV Reboot Error: " + msgData.Error.Message, 5000, false, ToastSeverity.error)
                    } else if (msgData.Done) {
                        showToastMessage("Press Connect again in about 30 seconds ROV: " + msgData.Done.Message, 8000, false, ToastSeverity.success)
                        showToastMessage("ROV: " + msgData.Done.Message)
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
                frontendRovMsgHandler.sendRovMessage({ RestartRovServices: {} }, responseHandler)
            }
        })
    }


    getRovStatusReport = () => {
        let responseHandler = this.showCommandOutputPopup("ROV Status Report", "Sending Status Request (Please Wait)...\n", "\n\nDone.");
        frontendRovMsgHandler.sendRovMessage({ RovStatusReport: {} }, responseHandler)
    }

    enableRovWifi = () => {
        showToastMessage("Sending Enable Wifi Command...", 2000, false, ToastSeverity.info)
        this.sendActionAndWaitForDone({ EnableWifi: {} }, (msgData) => {
            if (msgData.Error) {
                showToastMessage("Enable Wifi Error: " + msgData.Error.Message, 8000, false, ToastSeverity.error)
            } else if (msgData.Done) {
                showToastMessage("Wifi Enable: " + msgData.Done.Message, 2000, false, ToastSeverity.success)
            }
        })
    }

    disableRovWifi = () => {
        modalConfirm("Are you sure you want to disable rov wifi?", {
            body: "If the ROV is connected via wifi, <em>don't do this!</em>",
            response: (r) => {
                if (!r) return;
                showToastMessage("Sending Disable Wifi Command...", 2000, false, ToastSeverity.info)
                this.sendActionAndWaitForDone({ DisableWifi: {} }, (msgData) => {
                    if (msgData.Error) {
                        showToastMessage("Disable Wifi Error: " + msgData.Error.Message, 8000, false, ToastSeverity.error)
                    } else if (msgData.Done) {
                        showToastMessage("Wifi Disable: " + msgData.Done.Message, 2000, false, ToastSeverity.success)
                    }
                })
            }
        })
    }

}
export const RovActions = new RovActionsClass();
