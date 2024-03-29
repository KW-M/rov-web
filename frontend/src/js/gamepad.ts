
import { ONSCREEN_GPAD_BUTTON_LABELS } from './frontendConsts';
import { GamepadApiWrapper, GamepadEmulator, GamepadDisplay, DEFAULT_GPAD_AXIS_COUNT, DEFAULT_GPAD_BUTTON_COUNT, gamepadButtonType, gamepadDirection, gamepadEmulationState, CenterTransformOrigin, CenterTransformOriginDebug, type VariableButtonConfig, type ButtonConfig, type GamepadDisplayVariableButton, type GamepadDisplayButton, type buttonChangeDetails } from "virtual-gamepad-lib";
import { GamepadUi } from "./gamepad-ui"
import { GAME_CONTROLLER_BUTTON_CONFIG } from "./frontendConsts";
import { throttle } from "./util";
import { RovActions } from "./rovActions";
import { calculateDesiredMotion } from "./rovUtil";
import { showToastMessage } from "./toastMessageManager";
import { frontendConnMngr } from './frontendConnManager';
import { addTooltip } from '../components/HelpTooltips.svelte';

// CONSTS
const LEFT_X_AXIS_INDEX = 0;
const LEFT_Y_AXIS_INDEX = 1;
const RIGHT_X_AXIS_INDEX = 2;
const RIGHT_Y_AXIS_INDEX = 3;
const X_BUTTON_INDEX = 0;
const A_BUTTON_INDEX = 1;
const B_BUTTON_INDEX = 2;
const Y_BUTTON_INDEX = 3;
const gpadHelpTooltips = [];

export class GamepadController {
    gpadUi: GamepadUi;
    gpadEmulator: GamepadEmulator;
    gpadApiWrapper: GamepadApiWrapper;
    touchedGpadButtonCount: number = 0;
    onAxisChange: null | ((gamepad: Gamepad) => void);
    onButtonChange: null | ((gamepad: Gamepad, buttonsChangedMask: (false | buttonChangeDetails)[]) => void);

    constructor() {
        this.gpadUi = new GamepadUi();
        this.touchedGpadButtonCount = 0
    }

    start(onAxisChange: null | ((gamepad: Gamepad) => void), onButtonChange: null | ((gamepad: Gamepad, buttonsChangedMask: (false | buttonChangeDetails)[]) => void)) {
        this.gpadUi.start();
        // override the default browser gamepad api with the gamepad emulator before setting up the events,
        // the emulator will either use the real gamepad api if a gamepad is plugged in or it will inject the onscreen gamepad as if it were comming from the gamepad api.
        this.gpadEmulator = new GamepadEmulator(0.1);

        // check if gamepads are't supported and show a message if they aren't
        if (!new GamepadApiWrapper({}).gamepadApiSupported()) this.gpadUi.showNotSupported();

        // initilize the GamepadInterface class with the config from the button consts file
        this.gpadApiWrapper = new GamepadApiWrapper({
            axisDeadZone: 0.05,
            updateDelay: 28,
            buttonConfigs: GAME_CONTROLLER_BUTTON_CONFIG,
        });

        // setup gpadApiWrapper gamepad events.
        this.onAxisChange = onAxisChange;
        this.onButtonChange = onButtonChange;
        this.gpadApiWrapper.onGamepadConnect(this.gamepadConnectDisconnectHandler.bind(this));
        this.gpadApiWrapper.onGamepadDisconnect(this.gamepadConnectDisconnectHandler.bind(this));
        this.gpadApiWrapper.onGamepadAxisChange(this.handleAxisChange.bind(this));
        this.gpadApiWrapper.onGamepadButtonChange(this.handleButtonChange.bind(this));
    }

    setupOnscreenGamepad(GPAD_DISPLAY_CONTAINER) {
        // setup the onscreen emulated gamepad:
        const EMULATED_GPAD_INDEX = 0; // in this example we will only add one emulated gamepad at position/index 0 in the navigator.getGamepads() array.
        this.gpadEmulator.AddEmulatedGamepad(EMULATED_GPAD_INDEX, true, DEFAULT_GPAD_BUTTON_COUNT, DEFAULT_GPAD_AXIS_COUNT);
        this.setupGamepadDisplay(EMULATED_GPAD_INDEX, GPAD_DISPLAY_CONTAINER); // setup the display buttons to react to the events FROM the gamepad api directly
        this.setupEmulatedGamepadInput(EMULATED_GPAD_INDEX, GPAD_DISPLAY_CONTAINER); // setup event listeners on the buttons/joysticks to send button/axis updates TO the emulated gamepad.
        this.addEmulatedGamepadKeyboardBindings(EMULATED_GPAD_INDEX);
        this.addHelpTooltips();
    }

    gamepadConnectDisconnectHandler() {
        const gamepads = navigator.getGamepads();
        let connectedGamepadCount = gamepads.reduce((acc, gpad) => gpad ? acc + 1 : acc, 0);
        if (connectedGamepadCount != 0 && gamepads[0]["emulated"]) connectedGamepadCount -= 1;
        // this.gpadUi.showGamepadStatus(connectedGamepadCount);
        if (connectedGamepadCount > 1) console.log("WARNING: More than one gamepad connected!", gamepads);
    }

    handleButtonChange(gpadIndex, gamepad, buttonsChangedMask) {
        if (gpadIndex != 0 || !gamepad || !gamepad.buttons) return;
        if (this.onButtonChange) this.onButtonChange(gamepad, buttonsChangedMask);

        let noGamepadButtonTouched = true;
        for (let i = 0; i < buttonsChangedMask.length; i++) {
            if (buttonsChangedMask[i] && buttonsChangedMask[i].touchDown) {
                if (gpadHelpTooltips[i]) gpadHelpTooltips[i].open();
                noGamepadButtonTouched = false;
            }
            else if (buttonsChangedMask[i] && buttonsChangedMask[i].touchUp) {
                if (gpadHelpTooltips[i]) gpadHelpTooltips[i].close();
            }
        }
    }

    handleAxisChange(gpadIndex, gamepad) {

        // console.log("handleAxisChange", gpadIndex, gamepad)
        if (gpadIndex != 0 || !gamepad || !gamepad.axes) return;
        if (this.onAxisChange) this.onAxisChange(gamepad);

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
        this.gpadUi.handleGamepadVisualFeedbackAxisEvents(axisStates, 0.4);
    }



    /** Setup the display buttons & axes of the onscreen gamepad to react to the state of the gamepad from the browser gamepad api (uses the gamepadApiWrapper) */
    setupGamepadDisplay(gpadIndex, GPAD_DISPLAY_CONTAINER) {
        // Set the transform origins of the display joysticks to their centers:
        GPAD_DISPLAY_CONTAINER.querySelectorAll("#stick_right, #stick_left").forEach((element) => {
            CenterTransformOrigin(element as SVGGraphicsElement); // useful if you want to visually transform the joystick with rotation and scaling
            // CenterTransformOriginDebug(element as SVGGraphicsElement); // show debug bounding boxes used in this feature.
        });

        /* ----- SETUP BUTTON DISPLAY ----- */
        /** @type { (import("virtual-gamepad-lib").GamepadDisplayButton | import("virtual-gamepad-lib").GamepadDisplayVariableButton)[] }*/
        const buttons = ONSCREEN_GPAD_BUTTON_LABELS.map((name, i) => {
            if (name.includes("trigger")) {
                // trigger buttons usually take variable pressure so can be represented by a variable button that is dragged down.
                return {
                    type: gamepadButtonType.variable,
                    highlight: GPAD_DISPLAY_CONTAINER.querySelector("#" + name + "_highlight"),
                    buttonElement: GPAD_DISPLAY_CONTAINER.querySelector("#" + name),
                    direction: gamepadDirection.down,
                    directionHighlight: GPAD_DISPLAY_CONTAINER.querySelector("#" + name + "_direction_highlight"),
                    movementRange: 10,
                } as GamepadDisplayVariableButton;

            } else {
                // all other buttons are simply on (pressed) or off (not pressed).
                return {
                    type: gamepadButtonType.onOff,
                    highlight: GPAD_DISPLAY_CONTAINER.querySelector("#" + name + "_highlight"),
                } as GamepadDisplayButton;
            }
        });

        /* ----- SETUP JOYSTICK DISPLAY ----- */
        /** @type { import("virtual-gamepad-lib").GamepadDisplayJoystick[] }*/
        const joysticks = [
            {
                joystickElement: GPAD_DISPLAY_CONTAINER.querySelector("#stick_left"),
                xAxisIndex: 0,
                yAxisIndex: 1,
                movementRange: 10,
                highlights: {
                    [gamepadDirection.up]: GPAD_DISPLAY_CONTAINER.querySelector("#l_stick_up_direction_highlight"),
                    [gamepadDirection.down]: GPAD_DISPLAY_CONTAINER.querySelector("#l_stick_down_direction_highlight"),
                    [gamepadDirection.left]: GPAD_DISPLAY_CONTAINER.querySelector("#l_stick_left_direction_highlight"),
                    [gamepadDirection.right]: GPAD_DISPLAY_CONTAINER.querySelector("#l_stick_right_direction_highlight"),
                },
            },
            {
                joystickElement: GPAD_DISPLAY_CONTAINER.querySelector("#stick_right"),
                xAxisIndex: 2,
                yAxisIndex: 3,
                movementRange: 10,
                highlights: {
                    [gamepadDirection.up]: GPAD_DISPLAY_CONTAINER.querySelector("#r_stick_up_direction_highlight"),
                    [gamepadDirection.down]: GPAD_DISPLAY_CONTAINER.querySelector("#r_stick_down_direction_highlight"),
                    [gamepadDirection.left]: GPAD_DISPLAY_CONTAINER.querySelector("#r_stick_left_direction_highlight"),
                    [gamepadDirection.right]: GPAD_DISPLAY_CONTAINER.querySelector("#r_stick_right_direction_highlight"),
                },
            },
        ];
        // create the gamepad display class instance and pass the config
        const display = new GamepadDisplay(
            {
                gamepadIndex: gpadIndex,
                pressedHighlightClass: "pressed",
                touchedHighlightClass: "touched",
                moveDirectionHighlightClass: "moved",
                buttons: buttons,
                sticks: joysticks,
            },
            this.gpadApiWrapper // we can pass our existing instance of the gpadApiWrapper to the gamepad display so that it can use it to update the gamepad state efficiently.
        );
    }

    /** Setup the touch targets & input parameters for translating onscreen events into events for the emulated gamepad (part of the emulated gamepad module) */
    setupEmulatedGamepadInput(gpadIndex, display_gpad) {
        /* ----- SETUP BUTTON INPUTS ----- */
        /** @type { (import("virtual-gamepad-lib").ButtonConfig | import("virtual-gamepad-lib").VariableButtonConfig)[] }*/
        const emulatorButtonConfigs = ONSCREEN_GPAD_BUTTON_LABELS.map((name, i) => {
            if (name.includes("trigger")) {
                // trigger buttons usually take variable pressure so can be represented by a variable button that is dragged down.
                return {
                    type: gamepadButtonType.variable,
                    buttonIndex: i,
                    tapTarget: display_gpad.querySelector("#" + name + "_touch_target"),
                    dragDistance: 50,
                    lockTargetWhilePressed: true,
                    directions: {
                        [gamepadDirection.up]: false,
                        [gamepadDirection.down]: true,
                        [gamepadDirection.left]: false,
                        [gamepadDirection.right]: false,
                    },
                } as VariableButtonConfig;
            } else {
                return {
                    type: gamepadButtonType.onOff,
                    buttonIndex: i,
                    lockTargetWhilePressed: name.includes("stick"),
                    tapTarget: display_gpad.querySelector("#" + name + "_touch_target"),
                } as ButtonConfig;
            }
        });
        this.gpadEmulator.AddDisplayButtonEventListeners(gpadIndex, emulatorButtonConfigs);

        /* ----- SETUP JOYSTICK INPUTS ----- */
        const emulatorStickConfigs = [
            {
                tapTarget: display_gpad.querySelector("#gamepad-joystick-touch-area-left"),
                dragDistance: 30,
                xAxisIndex: 0,
                yAxisIndex: 1,
                lockTargetWhilePressed: true,
                directions: {
                    [gamepadDirection.up]: true,
                    [gamepadDirection.down]: true,
                    [gamepadDirection.left]: true,
                    [gamepadDirection.right]: true,
                },
            },
            {
                tapTarget: display_gpad.querySelector("#gamepad-joystick-touch-area-right"),
                dragDistance: 30,
                xAxisIndex: 2,
                yAxisIndex: 3,
                lockTargetWhilePressed: true,
                directions: {
                    [gamepadDirection.up]: true,
                    [gamepadDirection.down]: true,
                    [gamepadDirection.left]: true,
                    [gamepadDirection.right]: true,
                },
            },
            {
                tapTarget: display_gpad.querySelector("#stick_button_left_touch_target"),
                dragDistance: 30,
                xAxisIndex: 0,
                yAxisIndex: 1,
                lockTargetWhilePressed: true,
                directions: {
                    [gamepadDirection.up]: true,
                    [gamepadDirection.down]: true,
                    [gamepadDirection.left]: true,
                    [gamepadDirection.right]: true,
                },
            },
            {
                tapTarget: display_gpad.querySelector("#stick_button_right_touch_target"),
                dragDistance: 30,
                xAxisIndex: 2,
                yAxisIndex: 3,
                lockTargetWhilePressed: true,
                directions: {
                    [gamepadDirection.up]: true,
                    [gamepadDirection.down]: true,
                    [gamepadDirection.left]: true,
                    [gamepadDirection.right]: true,
                },
            },
        ];
        this.gpadEmulator.AddDisplayJoystickEventListeners(gpadIndex, emulatorStickConfigs);
    }

    /** Add events to translate keyboard events to to the gamepad emulator (NOTE that this is through the gamepad emulator. The page thinks it is reciving gamepad events) */
    addEmulatedGamepadKeyboardBindings(EMULATED_GPAD_INDEX) {
        const handleKeyEvent = (keyDown, e) => {


            // don't handle keyboard events if the user is typing in an input field
            const formElements = ['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'];
            e = e || window.event;
            if (formElements.includes(e.target.tagName)) return;

            // try to parse the key name as a digit (0-9)
            const numberKey = parseInt(e.key);

            if (e.key === "Space" && keyDown) this.gpadEmulator.PressButton(EMULATED_GPAD_INDEX, X_BUTTON_INDEX, 1, true); // spacebar to press the "start" button

            // wasd to move the left stick
            if (e.key === "a") this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, LEFT_X_AXIS_INDEX, keyDown ? -1 : 0);
            else if (e.key === "d") this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, LEFT_X_AXIS_INDEX, keyDown ? 1 : 0);
            else if (e.key === "w") this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, LEFT_Y_AXIS_INDEX, keyDown ? -1 : 0);
            else if (e.key === "s") this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, LEFT_Y_AXIS_INDEX, keyDown ? 1 : 0);

            // arrow keys to move the right stick (prevent default to prevent scrolling)
            else if (e.key === "ArrowLeft") {
                this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, RIGHT_X_AXIS_INDEX, keyDown ? -1 : 0);
                e.preventDefault();
            } else if (e.key === "ArrowRight") {
                this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, RIGHT_X_AXIS_INDEX, keyDown ? 1 : 0);
                e.preventDefault();
            } else if (e.key === "ArrowUp") {
                this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, RIGHT_Y_AXIS_INDEX, keyDown ? -1 : 0);
                e.preventDefault();
            } else if (e.key === "ArrowDown") {
                this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, RIGHT_Y_AXIS_INDEX, keyDown ? 1 : 0);
                e.preventDefault();
            }

            // all other gamepad buttons are mapped to the number keys or keycodes for high button numbers
            else if (!isNaN(numberKey)) this.gpadEmulator.PressButton(EMULATED_GPAD_INDEX, Math.max(numberKey - 1, 0), keyDown ? 1 : 0, keyDown);
            else if (e.keyCode) this.gpadEmulator.PressButton(EMULATED_GPAD_INDEX, e.keyCode - 66 + 9, keyDown ? 1 : 0, keyDown); // 66 is the keycode for "B" (A is already used), 10 is the count of number keys on the keyboard (0-9), so "b" is button #10, "c" is button #11, etc.
        }
        window.onkeydown = (e) => handleKeyEvent(true, e);
        window.onkeyup = (e) => handleKeyEvent(false, e);
    }

    testGamepadJoysticks() {
        // fake gamepad joystick movements for testing:
        setInterval(() => {
            const EMULATED_GPAD_INDEX = 0;
            this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, 0, Math.random() * 2 - 1);
            this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, 1, Math.random() * 2 - 1);
            this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, 2, Math.random() * 2 - 1);
            this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, 3, Math.random() * 2 - 1);
        }, 10)
    }

    addHelpTooltips() {
        ONSCREEN_GPAD_BUTTON_LABELS.forEach(async (name, i) => {
            const elem = document.getElementById(name + "_touch_target");
            if (elem) gpadHelpTooltips[i] = await addTooltip(elem, GAME_CONTROLLER_BUTTON_CONFIG[i].helpLabel, { placement: GAME_CONTROLLER_BUTTON_CONFIG[i].tooltipPlacement });
        })
    }
}


export const gpadCtrl = new GamepadController()
