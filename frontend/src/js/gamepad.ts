
import { GamepadApiWrapper, GamepadEmulator, DEFAULT_GPAD_AXIS_COUNT, DEFAULT_GPAD_BUTTON_COUNT, type buttonChangeDetails, type EGamepad, standardGpadButtonMap } from "virtual-gamepad-lib";
import { GAME_CONTROLLER_BUTTON_CONFIG } from "./frontendConsts";
import { throttle } from "./util";
import { RovActions } from "./rovActions";
import { calculateDesiredMotion } from "./rovUtil";
import { showToastMessage } from "./toastMessageManager";
import { frontendConnMngr } from './frontendConnManager';
import { addTooltip } from '../components/HelpTooltips.svelte';
import { tutorialModeActive } from './globalContext';
import { log } from './shared/logging';
import nStore, { type nStoreT } from './shared/libraries/nStore';

// CONSTS
const LEFT_X_AXIS_INDEX = 0;
const LEFT_Y_AXIS_INDEX = 1;
const RIGHT_X_AXIS_INDEX = 2;
const RIGHT_Y_AXIS_INDEX = 3;
const X_BUTTON_INDEX = 0;
const A_BUTTON_INDEX = 1;
const B_BUTTON_INDEX = 2;
const Y_BUTTON_INDEX = 3;
const EMULATED_GPAD_INDEX = 0; // in this example we will only add one emulated gamepad at position/index 0 in the navigator.getGamepads() array.


const KEYMAP = {
    " ": standardGpadButtonMap.A,
    "\\": standardGpadButtonMap.Y,
    "enter": standardGpadButtonMap.B,
    "shift": standardGpadButtonMap.X,
    "tab": standardGpadButtonMap.Back,
    "?": standardGpadButtonMap.Start,
    "/": standardGpadButtonMap.Start,
    ",": standardGpadButtonMap.DPadLeft,
    "<": standardGpadButtonMap.DPadLeft,
    ".": standardGpadButtonMap.DPadRight,
    ">": standardGpadButtonMap.DPadRight,
    "1": standardGpadButtonMap.DPadLeft,
    "2": standardGpadButtonMap.DPadLeft,
    "3": standardGpadButtonMap.DPadRight,
    "4": standardGpadButtonMap.DPadRight,
    "q": standardGpadButtonMap.DPadUp,
    "e": standardGpadButtonMap.DPadDown,
    "-": standardGpadButtonMap.LTrigger,
    "_": standardGpadButtonMap.LTrigger,
    "+": standardGpadButtonMap.RTrigger,
    "=": standardGpadButtonMap.RTrigger,
    "]": standardGpadButtonMap.RShoulder,
    "[": standardGpadButtonMap.LShoulder,
    "}": standardGpadButtonMap.RShoulder,
    "{": standardGpadButtonMap.LShoulder,
}

// export const latestGamepadButtonState: nStoreT<{ gamepad: Gamepad, buttonsChangedMask: (false | buttonChangeDetails)[] } | null> = nStore(null);
// export const latestGamepadAxisState: nStoreT<Gamepad | null> = nStore(null);

export const latestGamepadButtonChanges: nStoreT<(false | (buttonChangeDetails & { value: number }))[]> = nStore([]);
export const latestGamepadAxisState: nStoreT<number[]> = nStore([0, 0, 0, 0]);


export class GamepadController {
    gpadEmulator: GamepadEmulator;
    gpadApiWrapper: GamepadApiWrapper;
    realGamepadsConnected = nStore(0);

    constructor() { }

    start(onAxisChange: (axes: number[]) => void, onButtonChange: (buttonsChangedMask: (false | (buttonChangeDetails & { value: number }))[]) => void) {
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
        latestGamepadAxisState.subscribe(onAxisChange);
        latestGamepadButtonChanges.subscribe(onButtonChange);
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
        // if (this.onButtonChange) this.onButtonChange(gamepad, buttonsChangedMask);
        buttonsChangedMask.forEach((btn, i) => {
            if (btn) btn.value = gamepad.buttons[i].value;
        });
        latestGamepadButtonChanges.set(buttonsChangedMask);
    }

    handleAxisChange = (gpadIndex, gamepad) => {
        if (gpadIndex != 0 || !gamepad || !gamepad.axes) return;
        // if (this.onAxisChange) this.onAxisChange(gamepad);
        latestGamepadAxisState.set(gamepad.axes);
    }

    /** Add events to translate keyboard events to to the gamepad emulator (NOTE that this is through the gamepad emulator. The page thinks it is reciving gamepad events) */
    addEmulatedGamepadKeyboardBindings(EMULATED_GPAD_INDEX) {
        const handleKeyEvent = (keyDown, e: KeyboardEvent) => {
            // IGNORE if the user is typing in an input field
            const formElements = ['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'];
            if (e.target && formElements.includes((e.target as HTMLElement).tagName)) return;

            // convert the key to lowercase and get the value (1 or 0) for the button press
            const lowercaseKey = e.key.toLowerCase();
            const value = keyDown ? 1 : 0;
            const touched = keyDown

            // RIGHT JOYSTICK: arrow keys to move the right stick (prevent default is to prevent scrolling)
            if (e.key === "ArrowLeft") {
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

            // LEFT JOYSTICK: wasd to move the left stick
            else if (lowercaseKey === "a") this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, LEFT_X_AXIS_INDEX, keyDown ? -1 : 0);
            else if (lowercaseKey === "d") this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, LEFT_X_AXIS_INDEX, keyDown ? 1 : 0);
            else if (lowercaseKey === "w") this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, LEFT_Y_AXIS_INDEX, keyDown ? -1 : 0);
            else if (lowercaseKey === "s") this.gpadEmulator.MoveAxis(EMULATED_GPAD_INDEX, LEFT_Y_AXIS_INDEX, keyDown ? 1 : 0);

            // BUTTONS: handle keybindings for buttons
            else if (KEYMAP[lowercaseKey] !== undefined) {
                this.gpadEmulator.PressButton(EMULATED_GPAD_INDEX, KEYMAP[lowercaseKey], value, touched);
            }

            // else logDebug("KEY NOT MAPPED: ", `"${lowercaseKey}"`);
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
