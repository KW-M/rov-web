
// import { startGamepadEventLoop, getGamepadsStandardized, gamepadApiSupported, onGamepadAxisValueChange, onGamepadButtonValueChange, onGamepadConnect, onGamepadDisconnect } from "./gamepad_mmk"
import { gamepadEmulator } from "./gamepadEmulator"
import { gamepadHelpVisible, getButtonHighlightElements, handleGamepadVisualFeedbackAxisEvents, handleGamepadVisualFeedbackButtonEvents, handleGamepadVisualFeedbackVariableTriggerButtonEvents, showGamepadStatus, showHelpTooltip, showNotSupported as showGamepadNotSupported, toggleGamepadHelpScreen } from "./gamepad-ui"
import { GamepadInterface } from "./libraries/gamepadInterface";
import { GAME_CONTROLLER_BUTTON_CONFIG } from "./consts";
import { throttle, throttleTrailing } from "./util";

export class GamepadController {
    constructor(throttleDelay = 250) {
        this.touchedGpadButtonCount = 0
        this.buttonHighlightElements = getButtonHighlightElements();
        this.throttleDelay = throttleDelay;

        // override the default browser gamepad api with the gamepad emulator before setting up the events,
        // the emulator will either use the real gamepad api if a gamepad is plugged in or it will inject the onscreen gamepad as if it were comming from the gamepad api.
        gamepadEmulator.monkeyPatchGetGamepads();

        // initilize the GamepadInterface class with the config from the consts file
        const gamepad = new GamepadInterface(GAME_CONTROLLER_BUTTON_CONFIG);
        if (!gamepad) showGamepadNotSupported();

        // setupgamepad lib gamepad events.
        gamepad.onGamepadConnect = this.gamepadConnectDisconnectHandler.bind(this)
        gamepad.onGamepadDisconnect = this.gamepadConnectDisconnectHandler.bind(this)
        gamepad.onGamepadAxisChange = this.handleAxisChange.bind(this)
        gamepad.onGamepadButtonChange = this.handleButtonChange.bind(this)

        // setup onscreen emulated gamepad interaction events
        gamepadEmulator.registerOnScreenGamepadButtonEvents(0, this.buttonHighlightElements.map((elm) => elm.id.startsWith("shoulder_trigger") ? null : elm))
        gamepadEmulator.registerOnScreenGamepadAxisEvents(0, [{
            horizontalGpadAction: { type: "axis", index: 0 },
            verticalGpadAction: { type: "axis", index: 1 },
            elem: document.getElementById("gamepad-joystick-touch-area-left"),
        }, {
            horizontalGpadAction: { type: "axis", index: 2 },
            verticalGpadAction: { type: "axis", index: 3 },
            elem: document.getElementById("gamepad-joystick-touch-area-right"),
        }, {
            verticalGpadAction: { type: "button", index: 3 },
            elem: document.getElementById("shoulder_trigger_back_right_highlight"),
        }, {
            verticalGpadAction: { type: "button", index: 4 },
            elem: document.getElementById("shoulder_trigger_back_left_highlight"),
        }]);
    }

    gamepadConnectDisconnectHandler() {
        const gamepads = navigator.getGamepads();
        var connectedGamepadCount = gamepads.reduce((acc, gpad) => gpad ? acc + 1 : acc, 0);
        if (connectedGamepadCount != 0 && gamepads[0]["emulated"]) connectedGamepadCount -= 1;
        showGamepadStatus(connectedGamepadCount);
        if (connectedGamepadCount > 1) console.log("WARNING: More than one gamepad connected!", gamepads);
    }

    setupExternalEventListenerCallbacks(onButtonChange, onAxisChange) {
        this.onButtonChange = throttleTrailing(onButtonChange, this.throttleDelay);
        this.onAxisChange = throttleTrailing(onAxisChange, this.throttleDelay);
    }

    clearExternalEventListenerCallbacks() {
        this.onButtonChange = null;
        this.onAxisChange = null;
    }

    handleButtonChange(gpadIndex, gamepad, buttonsChangedMask) {
        if (gpadIndex != 0 || !gamepad || !gamepad.buttons) return;

        if (this.onButtonChange && !gamepadHelpVisible) this.onButtonChange(gamepad, buttonsChangedMask);

        handleGamepadVisualFeedbackButtonEvents(gamepad.buttons);

        // if (buttonsChangedMask[6] || buttonsChangedMask[7]) {
        //     handleGamepadVisualFeedbackVariableTriggerButtonEvents(gamepad.buttons, [
        //         {
        //             buttonIndex: 6,
        //             buttonElement: document.getElementById("shoulder_trigger_left_back"),
        //             axisRange: 26,
        //         },
        //         {
        //             buttonIndex: 7,
        //             buttonElement: document.getElementById("shoulder_trigger_right_back"),
        //             axisRange: 26,
        //         },
        //     ]);
        // }

        if ((buttonsChangedMask[8] && buttonsChangedMask[8].released) || (buttonsChangedMask[9] && buttonsChangedMask[9].released)) {
            toggleGamepadHelpScreen();
        }

        let noGamepadButtonTouched = true;
        for (let i = 0; i < buttonsChangedMask.length; i++) {
            if (buttonsChangedMask[i] && buttonsChangedMask[i].touchDown) {
                showHelpTooltip(this.buttonHighlightElements[i], GAME_CONTROLLER_BUTTON_CONFIG[i].helpLabel);
                noGamepadButtonTouched = false;
            } else if (gamepad.buttons[i] && gamepad.buttons[i].touched) {
                noGamepadButtonTouched = false;
            }
        }

        if (noGamepadButtonTouched) showHelpTooltip(null, "Gamepad Help");
    }

    handleAxisChange(gpadIndex, gamepad) {

        // console.log("handleAxisChange", gpadIndex, gamepad, axiesChangedMask)
        if (gpadIndex != 0 || !gamepad || !gamepad.axes) return;

        if (this.onAxisChange && !gamepadHelpVisible) this.onAxisChange(gamepad);

        const axisStates = [{
            axisRange: 14,
            xValue: gamepad.axes[0] || 0,
            yValue: gamepad.axes[1] || 0,
            thumbStickElement: document.getElementById("stick_left"),
            upIndicatorElement: document.getElementById("l_stick_up_direction_highlight"),
            downIndicatorElement: document.getElementById("l_stick_down_direction_highlight"),
            leftIndicatorElement: document.getElementById("l_stick_left_direction_highlight"),
            rightIndicatorElement: document.getElementById("l_stick_right_direction_highlight"),
            upHelpText: "Forward",
            downHelpText: "Back",
            leftHelpText: "Turn Left",
            rightHelpText: "Turn Right",
        },
        {
            axisRange: 14,
            xValue: gamepad.axes[2] || 0,
            yValue: gamepad.axes[3] || 0,
            thumbStickElement: document.getElementById("stick_right"),
            upIndicatorElement: document.getElementById("r_stick_up_direction_highlight"),
            downIndicatorElement: document.getElementById("r_stick_down_direction_highlight"),
            leftIndicatorElement: document.getElementById("r_stick_left_direction_highlight"),
            rightIndicatorElement: document.getElementById("r_stick_right_direction_highlight"),
            upHelpText: "Up",
            downHelpText: "Down",
            leftHelpText: "Strafe Left",
            rightHelpText: "Strafe Right",
        }]
        handleGamepadVisualFeedbackAxisEvents(axisStates, 0.4);
    }
}
