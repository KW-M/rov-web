
import { ONSCREEN_GPAD_BUTTON_LABELS } from './frontendConsts';
import { GamepadApiWrapper, GamepadEmulator, GamepadDisplay, DEFAULT_GPAD_AXIS_COUNT, DEFAULT_GPAD_BUTTON_COUNT, gamepadButtonType, gamepadDirection, CenterTransformOrigin, type VariableButtonConfig, type ButtonConfig, type GamepadDisplayVariableButton, type GamepadDisplayButton, type buttonChangeDetails, type EGamepad } from "virtual-gamepad-lib";
// import { gamepadEmulationState, CenterTransformOriginDebug } from "virtual-gamepad-lib";
import { GAME_CONTROLLER_BUTTON_CONFIG } from "./frontendConsts";
import { throttle } from "./util";
import { RovActions } from "./rovActions";
import { calculateDesiredMotion } from "./rovUtil";
import { showToastMessage } from "./toastMessageManager";
import { frontendConnMngr } from './frontendConnManager';
import { addTooltip } from '../components/HelpTooltips.svelte';
import { tutorialModeActive } from './globalContext';
import { log } from './shared/logging';
import nStore from './shared/libraries/nStore';

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
const EMULATED_GPAD_INDEX = 0; // in this example we will only add one emulated gamepad at position/index 0 in the navigator.getGamepads() array.


export class GamepadController {
    gpadEmulator: GamepadEmulator;
    gpadApiWrapper: GamepadApiWrapper;
    onAxisChange: null | ((gamepad: Gamepad) => void);
    onButtonChange: null | ((gamepad: Gamepad, buttonsChangedMask: (false | buttonChangeDetails)[]) => void);
    realGamepadsConnected = nStore(0);

    constructor() {

    }

    start(onAxisChange: null | ((gamepad: Gamepad) => void), onButtonChange: null | ((gamepad: Gamepad, buttonsChangedMask: (false | buttonChangeDetails)[]) => void)) {
        if (this.gpadEmulator) return;

        // override the default browser gamepad api with the gamepad emulator before setting up the events,
        // the emulator will either use the real gamepad api if a gamepad is plugged in or it will inject the onscreen gamepad as if it were comming from the gamepad api.
        this.gpadEmulator = new GamepadEmulator(0.1);
        this.gpadEmulator.AddEmulatedGamepad(EMULATED_GPAD_INDEX, true, DEFAULT_GPAD_BUTTON_COUNT, DEFAULT_GPAD_AXIS_COUNT);
        this.addEmulatedGamepadKeyboardBindings(EMULATED_GPAD_INDEX);

        // initilize the GamepadInterface class with the config from the button consts file
        this.gpadApiWrapper = new GamepadApiWrapper({
            axisDeadZone: 0.05,
            updateDelay: 28,
            buttonConfigs: GAME_CONTROLLER_BUTTON_CONFIG
        });

        // setup gpadApiWrapper gamepad events.
        this.onAxisChange = onAxisChange;
        this.onButtonChange = onButtonChange;
        this.gpadApiWrapper.onGamepadConnect(this.gamepadConnectDisconnectHandler);
        this.gpadApiWrapper.onGamepadDisconnect(this.gamepadConnectDisconnectHandler);
        this.gpadApiWrapper.onGamepadAxisChange(this.handleAxisChange);
        this.gpadApiWrapper.onGamepadButtonChange(this.handleButtonChange);
    }

    gamepadApiSupported() {
        return this.gpadApiWrapper.gamepadApiSupported()
    }

    gamepadConnectDisconnectHandler = () => {
        const gamepads = navigator.getGamepads() as EGamepad[];
        let connectedGamepadCount = gamepads.reduce((acc, gpad) => gpad ? acc + 1 : acc, 0);
        if (connectedGamepadCount != 0 && gamepads[0]?.emulation === "emulated") connectedGamepadCount -= 1;
        if (connectedGamepadCount > 1) log("WARNING: More than one gamepad connected!", gamepads);
        this.realGamepadsConnected.set(connectedGamepadCount);
    }

    handleButtonChange = (gpadIndex, gamepad, buttonsChangedMask) => {
        if (gpadIndex != 0 || !gamepad || !gamepad.buttons) return;
        if (this.onButtonChange) this.onButtonChange(gamepad, buttonsChangedMask);
    }

    handleAxisChange = (gpadIndex, gamepad) => {
        if (gpadIndex != 0 || !gamepad || !gamepad.axes) return;
        if (this.onAxisChange) this.onAxisChange(gamepad);
    }

    /** Add events to translate keyboard events to to the gamepad emulator (NOTE that this is through the gamepad emulator. The page thinks it is reciving gamepad events) */
    addEmulatedGamepadKeyboardBindings(EMULATED_GPAD_INDEX) {
        const handleKeyEvent = (keyDown, e: KeyboardEvent) => {
            // don't handle keyboard events if the user is typing in an input field
            const formElements = ['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'];
            if (e.target && formElements.includes((e.target as HTMLElement).tagName)) return;

            // try to parse the key name as a digit (0-9) or a lowercase letter
            const numberKey = parseInt(e.key);
            const lowercaseKey = e.key.toLowerCase();

            if (e.key === "Space" && keyDown) this.gpadEmulator.PressButton(EMULATED_GPAD_INDEX, X_BUTTON_INDEX, 1, true); // spacebar to press the "start" button

            // wasd to move the left stick
            if (lowercaseKey === "a") this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, LEFT_X_AXIS_INDEX, keyDown ? -1 : 0);
            else if (lowercaseKey === "d") this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, LEFT_X_AXIS_INDEX, keyDown ? 1 : 0);
            else if (lowercaseKey === "w") this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, LEFT_Y_AXIS_INDEX, keyDown ? -1 : 0);
            else if (lowercaseKey === "s") this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, LEFT_Y_AXIS_INDEX, keyDown ? 1 : 0);

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


    cleanup() {
        if (this.gpadEmulator) this.gpadEmulator.cleanup();
        if (this.gpadApiWrapper) this.gpadApiWrapper.cleanup();
        this.gpadApiWrapper = null;
        this.gpadEmulator = null;
    }
}

let _gpadCtrl: GamepadController | null = null;
export const getGpadCtrl = () => (_gpadCtrl = _gpadCtrl ?? new GamepadController());
