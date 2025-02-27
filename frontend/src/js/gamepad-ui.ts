import { GAME_CONTROLLER_BUTTON_CONFIG, ONSCREEN_GPAD_BUTTON_LABELS, ONSCREEN_GPAD_BUTTON_PRESSED_CLASS, ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS } from './frontendConsts';
import { log, logDebug, logInfo, logWarn, logError } from "../js/shared/logging"
import { GamepadApiWrapper, gamepadDirection, GamepadDisplay, GamepadEmulator, setupPresetInteractiveGamepad } from 'virtual-gamepad-lib';

import { addTooltip, type TooltipOptions } from '../components/HelpTooltips.svelte';
import { tutorialModeActive } from './globalContext';

export class GamepadUi {
    gpadEmulator: GamepadEmulator;
    gpadApiWrapper: GamepadApiWrapper;
    gpadDisplay: GamepadDisplay;
    gpadHtmlContainer: HTMLElement;
    gpadButtonHighlightElements: HTMLElement[];
    touchingButtonsCount: number = 0;
    someAxiesNotCentered: boolean = false;
    someButtonsPressed: boolean = false;

    tooltips: any[];

    constructor(gpadApiWrapper: GamepadApiWrapper, gpadEmulator: GamepadEmulator, GPAD_HTML_CONTAINER: HTMLElement, tooltipDelay: number = 1000) {
        this.gpadApiWrapper = gpadApiWrapper;
        this.gpadEmulator = gpadEmulator;
        this.gpadHtmlContainer = GPAD_HTML_CONTAINER;
        this.gpadButtonHighlightElements = ONSCREEN_GPAD_BUTTON_LABELS.map((btnLabel) => document.getElementById(btnLabel + "_highlight"));
        // this.setupGamepadDisplay(0, GPAD_HTML_CONTAINER);
        this.setupEmulatedGamepadInput(0, GPAD_HTML_CONTAINER);
        const { gpadDisplay } = setupPresetInteractiveGamepad(GPAD_HTML_CONTAINER, {
            AllowDpadDiagonals: false,
            ClickableJoysticks: true,
            VariableTriggers: true,
            EmulatedGamepadOverlayMode: true,
            GpadApiWrapper: gpadApiWrapper,
            GpadEmulator: gpadEmulator,
            JoystickDragDistance: 30,
            TriggerDragDistance: 50,
            EmulatedGamepadIndex: 0,
            GpadDisplayConfig: {
                gamepadIndex: 0,
            }
            // GpadDisplayConfig: {
            //     sticks: [{}]
            // }
        });
        this.gpadDisplay = gpadDisplay;

        this.addHelpTooltips(GPAD_HTML_CONTAINER, tooltipDelay);
        gpadApiWrapper.onGamepadButtonChange(this.handleButtonChange);
    }


    addHelpTooltips(GPAD_HTML_CONTAINER: HTMLElement, tooltipDelay: number) {
        this.tooltips = ONSCREEN_GPAD_BUTTON_LABELS.map((name, i) => {
            const elem = GPAD_HTML_CONTAINER.querySelector(`#${name}_touch_target`) as SVGElement | HTMLElement;
            if (elem) return addTooltip(elem, {
                label: GAME_CONTROLLER_BUTTON_CONFIG[i].helpLabel,
                config: {
                    placement: GAME_CONTROLLER_BUTTON_CONFIG[i].tooltipPlacement,
                    delay: tooltipDelay,
                }
            } as TooltipOptions);
            return null;
        })
    }

    handleButtonChange = (gpadIndex, gamepad, buttonsChangedMask) => {
        if (gpadIndex != 0 || !gamepad || !gamepad.buttons) return;
        const tutorialModeOn = tutorialModeActive.get();

        for (let i = 0; i < buttonsChangedMask.length; i++) {
            if (buttonsChangedMask[i] && buttonsChangedMask[i].touchDown && (!buttonsChangedMask[i].pressed || tutorialModeOn)) {
                if (this.tooltips[i]) this.tooltips[i].open();
            }
            else if (buttonsChangedMask[i] && buttonsChangedMask[i].touchUp || (buttonsChangedMask[i].pressed && !tutorialModeOn)) {
                if (this.tooltips[i]) this.tooltips[i].close();
            }
        }
    }


    // handleGamepadVisualFeedbackAxisEvents(axiesMaping, directionalHelpThreshold) { //axisHoveredClass, axisMovedClass
    //     axiesMaping.forEach((axisMap) => {
    //         // if (axisValue > 0 || axisValue < 0) {
    //         let thumbstick = axisMap.thumbStickElement;
    //         let axisRange = axisMap.axisRange;
    //         let xValue = axisMap.xValue || 0;
    //         let yValue = axisMap.yValue || 0;
    //         thumbstick.style.transform = `rotateY(${-xValue * 30}deg) rotateX(${yValue * 30}deg) translate(${xValue * axisRange}px,${yValue * axisRange}px)`;

    //         if (axisMap.upIndicatorElement && axisMap.downIndicatorElement) {
    //             if (Math.abs(xValue) < directionalHelpThreshold) {
    //                 if (yValue < -directionalHelpThreshold) {
    //                     axisMap.upIndicatorElement.style.opacity = Math.max(-yValue, 0);
    //                     axisMap.downIndicatorElement.style.opacity = 0;
    //                 } else if (yValue > directionalHelpThreshold) {
    //                     axisMap.upIndicatorElement.style.opacity = 0;
    //                     axisMap.downIndicatorElement.style.opacity = Math.max(yValue, 0);
    //                 } else {
    //                     axisMap.upIndicatorElement.style.opacity = 0;
    //                     axisMap.downIndicatorElement.style.opacity = 0;
    //                 }
    //             } else {
    //                 axisMap.upIndicatorElement.style.opacity = 0;
    //                 axisMap.downIndicatorElement.style.opacity = 0;
    //             }
    //         }

    //         if (axisMap.leftIndicatorElement && axisMap.rightIndicatorElement) {
    //             if (Math.abs(yValue) < directionalHelpThreshold) {
    //                 if (xValue < -directionalHelpThreshold) {
    //                     axisMap.leftIndicatorElement.style.opacity = Math.max(-xValue, 0);
    //                     axisMap.rightIndicatorElement.style.opacity = 0;
    //                 }
    //                 else if (xValue > directionalHelpThreshold) {
    //                     axisMap.leftIndicatorElement.style.opacity = 0;
    //                     axisMap.rightIndicatorElement.style.opacity = Math.max(xValue, 0);
    //                 } else {
    //                     axisMap.leftIndicatorElement.style.opacity = 0;
    //                     axisMap.rightIndicatorElement.style.opacity = 0;
    //                 }
    //             } else {
    //                 axisMap.leftIndicatorElement.style.opacity = 0;
    //                 axisMap.rightIndicatorElement.style.opacity = 0;
    //             }
    //         }
    //     });

    //     let movedAxiesCount = axiesMaping.reduce((acc, axisMap) => {
    //         return acc + Math.abs(axisMap.xValue) + Math.abs(axisMap.yValue) > 0.05 ? 1 : 0;
    //     }, 0);


    //     // if (!this.gamepadHelpVisible && movedAxiesCount > 0 && this.someAxiesNotCentered == false) {
    //     //     this.someAxiesNotCentered = true;
    //     // } else if (this.someAxiesNotCentered == true && movedAxiesCount == 0) {
    //     //     this.someAxiesNotCentered = false;
    //     // }
    // }

    // setGamepadButtonClass(btnIndx, gamepadButtonStates) {
    //     let gpadButton = gamepadButtonStates[btnIndx];
    //     const highlightElems = this.gpadButtonHighlightElements ?? this.getGpadButtonHighlightElems();
    //     let btnElem = highlightElems[btnIndx];
    //     if (!gpadButton || !btnElem) return;
    //     if (gpadButton.touched) {
    //         btnElem.classList.add(ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS);
    //     } else {
    //         btnElem.classList.remove(ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS);
    //     }
    //     if (gpadButton.pressed) {
    //         btnElem.classList.add(ONSCREEN_GPAD_BUTTON_PRESSED_CLASS);
    //     } else {
    //         btnElem.classList.remove(ONSCREEN_GPAD_BUTTON_PRESSED_CLASS);
    //     }
    // }

    // handleGamepadVisualFeedbackButtonEvents(gamepadButtonStates) {
    //     let pressedBtnCount = 0;
    //     for (let btnIndx = 0; btnIndx < gamepadButtonStates.length; btnIndx++) {
    //         this.setGamepadButtonClass(btnIndx, gamepadButtonStates);
    //         pressedBtnCount += gamepadButtonStates[btnIndx].pressed ? 1 : 0;
    //     }

    //     // if (!this.gamepadHelpVisible && pressedBtnCount > 0 && this.someButtonsPressed == false) {
    //     //     this.someButtonsPressed = true;
    //     // } else if (this.someButtonsPressed == true) {
    //     //     this.someButtonsPressed = false;
    //     // }
    // }

    // handleGamepadVisualFeedbackVariableTriggerButtonEvents(gamepadButtonStates, triggerConfigs) { //axisHoveredClass, axisMovedClass
    //     for (let i = 0; i < triggerConfigs.length; i++) {
    //         const triggerConfig = triggerConfigs[i];
    //         const btnIndx = triggerConfig.buttonIndex;
    //         this.setGamepadButtonClass(btnIndx, gamepadButtonStates);
    //         let yValue = gamepadButtonStates[btnIndx] ? gamepadButtonStates[btnIndx].value : 0;
    //         triggerConfig.buttonElement.style.transform = `rotateX(${yValue * 30}deg) translateY(${yValue * triggerConfig.axisRange}px)`;
    //     }
    // }



    // handleAxisChange(gpadIndex, gamepad) {
    //     if (gpadIndex != 0 || !gamepad || !gamepad.axes) return;

    //     const axisStates = [{
    //         axisRange: 14,
    //         xValue: gamepad.axes[0] || 0,
    //         yValue: gamepad.axes[1] || 0,
    //         thumbStickElement: document.getElementById("stick_left"),
    //         upIndicatorElement: document.getElementById("l_stick_up_direction_highlight"),
    //         downIndicatorElement: document.getElementById("l_stick_down_direction_highlight"),
    //         leftIndicatorElement: document.getElementById("l_stick_left_direction_highlight"),
    //         rightIndicatorElement: document.getElementById("l_stick_right_direction_highlight"),
    //         upHelpText: "Forward",
    //         downHelpText: "Back",
    //         leftHelpText: "Turn Left",
    //         rightHelpText: "Turn Right",
    //     },
    //     {
    //         axisRange: 14,
    //         xValue: gamepad.axes[2] || 0,
    //         yValue: gamepad.axes[3] || 0,
    //         thumbStickElement: document.getElementById("stick_right"),
    //         upIndicatorElement: document.getElementById("r_stick_up_direction_highlight"),
    //         downIndicatorElement: document.getElementById("r_stick_down_direction_highlight"),
    //         leftIndicatorElement: document.getElementById("r_stick_left_direction_highlight"),
    //         rightIndicatorElement: document.getElementById("r_stick_right_direction_highlight"),
    //         upHelpText: "Up",
    //         downHelpText: "Down",
    //         leftHelpText: "Strafe Left",
    //         rightHelpText: "Strafe Right",
    //     }]
    //     this.handleGamepadVisualFeedbackAxisEvents(axisStates, 0.4);
    // }



    // /** Setup the display buttons & axes of the onscreen gamepad to react to the state of the gamepad from the browser gamepad api (uses the gamepadApiWrapper) */
    // setupGamepadDisplay(gpadIndex: number, GPAD_HTML_CONTAINER: HTMLElement) {
    //     // Set the transform origins of the display joysticks to their centers:
    //     GPAD_HTML_CONTAINER.querySelectorAll("#stick_right, #stick_left").forEach((element) => {
    //         CenterTransformOrigin(element as SVGGraphicsElement); // useful if you want to visually transform the joystick with rotation and scaling
    //         // CenterTransformOriginDebug(element as SVGGraphicsElement); // show debug bounding boxes used in this feature.
    //     });

    //     /* ----- SETUP BUTTON DISPLAY ----- */
    //     const buttons = ONSCREEN_GPAD_BUTTON_LABELS.map((name) => {
    //         if (name.includes("trigger")) {
    //             // trigger buttons usually take variable pressure so can be represented by a variable button that is dragged down.
    //             return {
    //                 type: gamepadButtonType.variable,
    //                 highlight: GPAD_HTML_CONTAINER.querySelector("#" + name + "_highlight"),
    //                 buttonElement: GPAD_HTML_CONTAINER.querySelector("#" + name),
    //                 direction: gamepadDirection.down,
    //                 directionHighlight: GPAD_HTML_CONTAINER.querySelector("#" + name + "_direction_highlight"),
    //                 movementRange: 10,
    //             } as GamepadDisplayVariableButton;
    //             // return null

    //         } else {
    //             // all other buttons are simply on (pressed) or off (not pressed).
    //             return {
    //                 type: gamepadButtonType.onOff,
    //                 highlight: GPAD_HTML_CONTAINER.querySelector("#" + name + "_highlight"),
    //             } as GamepadDisplayButton;
    //         }
    //     });

    //     /* ----- SETUP JOYSTICK DISPLAY ----- */
    //     const joysticks = [
    //         {
    //             joystickElement: GPAD_HTML_CONTAINER.querySelector("#stick_left"),
    //             xAxisIndex: 0,
    //             yAxisIndex: 1,
    //             movementRange: 10,
    //             // highlights: {
    //             //     [gamepadDirection.up]: GPAD_HTML_CONTAINER.querySelector("#l_stick_up_direction_highlight"),
    //             //     [gamepadDirection.down]: GPAD_HTML_CONTAINER.querySelector("#l_stick_down_direction_highlight"),
    //             //     [gamepadDirection.left]: GPAD_HTML_CONTAINER.querySelector("#l_stick_left_direction_highlight"),
    //             //     [gamepadDirection.right]: GPAD_HTML_CONTAINER.querySelector("#l_stick_right_direction_highlight"),
    //             // },
    //         },
    //         {
    //             joystickElement: GPAD_HTML_CONTAINER.querySelector("#stick_right"),
    //             xAxisIndex: 2,
    //             yAxisIndex: 3,
    //             movementRange: 10,
    //             // highlights: {
    //             //     [gamepadDirection.up]: GPAD_HTML_CONTAINER.querySelector("#r_stick_up_direction_highlight"),
    //             //     [gamepadDirection.down]: GPAD_HTML_CONTAINER.querySelector("#r_stick_down_direction_highlight"),
    //             //     [gamepadDirection.left]: GPAD_HTML_CONTAINER.querySelector("#r_stick_left_direction_highlight"),
    //             //     [gamepadDirection.right]: GPAD_HTML_CONTAINER.querySelector("#r_stick_right_direction_highlight"),
    //             // },
    //         },
    //     ] as GamepadDisplayJoystick[];
    //     // create the gamepad display class instance and pass the config
    //     this.gpadDisplay = new GamepadDisplay(
    //         {
    //             gamepadIndex: gpadIndex,
    //             pressedHighlightClass: "pressed",
    //             touchedHighlightClass: "touched",
    //             moveDirectionHighlightClass: "moved",
    //             buttons: buttons,
    //             sticks: joysticks,
    //         },
    //         this.gpadApiWrapper // we can pass our existing instance of the gpadApiWrapper to the gamepad display so that it can use it to update the gamepad state efficiently.
    //     );
    // }

    /** Setup the touch targets & input parameters for translating onscreen events into events for the emulated gamepad (part of the emulated gamepad module) */
    setupEmulatedGamepadInput(gpadIndex: number, GPAD_HTML_CONTAINER: HTMLElement) {
        /* ----- SETUP Extra JOYSTICK INPUTS ----- */
        this.gpadEmulator.AddJoystickTouchEventListeners(gpadIndex, [
            {
                tapTarget: GPAD_HTML_CONTAINER.querySelector("#gamepad-joystick-touch-area-left"),
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
                tapTarget: GPAD_HTML_CONTAINER.querySelector("#gamepad-joystick-touch-area-right"),
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
        ]);
    }

    cleanup() {
        this.gpadDisplay.Cleanup();
        this.gpadApiWrapper.offGamepadButtonChange(this.handleButtonChange);
        if (this.tooltips) for (const tooltip of this.tooltips) {
            if (tooltip) tooltip.destroy();
        }
    }

}
