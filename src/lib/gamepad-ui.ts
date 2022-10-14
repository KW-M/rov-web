import { createPopper } from '@popperjs/core/lib/popper-lite';
import flip from '@popperjs/core/lib/modifiers/flip';
import { ONSCREEN_GPAD_BUTTON_LABELS, ONSCREEN_GPAD_BUTTON_PRESSED_CLASS, ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS } from './consts';



// export class OnscreenGamepadUi {
//     constructor(config) {

//     }

//     handleGamepadVisualFeedbackAxisEvents(axiesMaping, directionalHelpThreshold) { //axisHoveredClass, axisMovedClass
//         for (let i = 0; i < axiesMaping.length; i++) {
//             const axisMap = axiesMaping[i];

//             // if (axisValue > 0 || axisValue < 0) {
//             var thumbstick = axisMap.thumbStickElement;
//             var axisRange = axisMap.axisRange;
//             var xValue = axisMap.xValue || 0;
//             var yValue = axisMap.yValue || 0;
//             thumbstick.style.transform = `rotateY(${-xValue * 30}deg) rotateX(${yValue * 30}deg) translate(${xValue * axisRange}px,${yValue * axisRange}px)`;

//             if (axisMap.upIndicatorElement && axisMap.downIndicatorElement) {
//                 if (Math.abs(xValue) < directionalHelpThreshold) {
//                     if (yValue < -directionalHelpThreshold) {
//                         axisMap.upIndicatorElement.style.opacity = Math.max(-yValue, 0);
//                         axisMap.downIndicatorElement.style.opacity = 0;
//                         this.showHelpTooltip(axisMap.upIndicatorElement, axisMap.upHelpText || "None");
//                     } else if (yValue > directionalHelpThreshold) {
//                         axisMap.upIndicatorElement.style.opacity = 0;
//                         axisMap.downIndicatorElement.style.opacity = Math.max(yValue, 0);
//                         this.showHelpTooltip(axisMap.downIndicatorElement, axisMap.downHelpText || "None");
//                     } else {
//                         axisMap.upIndicatorElement.style.opacity = 0;
//                         axisMap.downIndicatorElement.style.opacity = 0;
//                     }
//                 } else {
//                     axisMap.upIndicatorElement.style.opacity = 0;
//                     axisMap.downIndicatorElement.style.opacity = 0;
//                 }
//             }

//             if (axisMap.leftIndicatorElement && axisMap.rightIndicatorElement) {
//                 if (Math.abs(yValue) < directionalHelpThreshold) {
//                     if (xValue < -directionalHelpThreshold) {
//                         axisMap.leftIndicatorElement.style.opacity = Math.max(-xValue, 0);
//                         axisMap.rightIndicatorElement.style.opacity = 0;
//                         this.showHelpTooltip(axisMap.leftIndicatorElement, axisMap.leftHelpText || "None");
//                     }
//                     else if (xValue > directionalHelpThreshold) {
//                         axisMap.leftIndicatorElement.style.opacity = 0;
//                         axisMap.rightIndicatorElement.style.opacity = Math.max(xValue, 0);
//                         this.showHelpTooltip(axisMap.rightIndicatorElement, axisMap.rightHelpText || "None");
//                     } else {
//                         axisMap.leftIndicatorElement.style.opacity = 0;
//                         axisMap.rightIndicatorElement.style.opacity = 0;
//                     }
//                 } else {
//                     axisMap.leftIndicatorElement.style.opacity = 0;
//                     axisMap.rightIndicatorElement.style.opacity = 0;
//                 }
//             }
//         }

//         let movedAxiesCount = axiesMaping.reduce((acc, axisMap) => {
//             return acc + Math.abs(axisMap.xValue) + Math.abs(axisMap.yValue) > 0.05 ? 1 : 0;
//         }, 0);


//         // if (!this.gamepadHelpVisible && movedAxiesCount > 0 && this.someAxiesNotCentered == false) {
//         //     this.someAxiesNotCentered = true;
//         //     this.setGamepadVisability();
//         // } else if (this.someAxiesNotCentered == true && movedAxiesCount == 0) {
//         //     this.someAxiesNotCentered = false;
//         //     this.setGamepadVisability();
//         // }
//     }

//     setGamepadVisability() {
//         if (!this.gamepadHelpVisible && (this.someAxiesNotCentered || this.someButtonsPressed)) {
//             document.body.classList.add("driving-now")
//         } else {
//             document.body.classList.remove("driving-now")
//         }
//     }

//     setGamepadButtonClass(btnIndx, gamepadButtonStates) {
//         var gpadButton = gamepadButtonStates[btnIndx];
//         var btnElem = this.gpadButtonHighlightElements[btnIndx];
//         if (!gpadButton || !btnElem) return;

//         if (gpadButton.touched) {
//             btnElem.classList.add(ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS);
//         } else {
//             btnElem.classList.remove(ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS);
//         }

//         if (gpadButton.pressed) {
//             btnElem.classList.add(ONSCREEN_GPAD_BUTTON_PRESSED_CLASS);
//         } else {
//             btnElem.classList.remove(ONSCREEN_GPAD_BUTTON_PRESSED_CLASS);
//         }
//     }

//     handleGamepadVisualFeedbackButtonEvents(gamepadButtonStates) {
//         let pressedBtnCount = 0;
//         for (var btnIndx = 0; btnIndx < gamepadButtonStates.length; btnIndx++) {
//             this.setGamepadButtonClass(btnIndx, gamepadButtonStates);
//             pressedBtnCount += gamepadButtonStates[btnIndx].pressed ? 1 : 0;
//         }

//         if (!this.gamepadHelpVisible && pressedBtnCount > 0 && this.someButtonsPressed == false) {
//             this.someButtonsPressed = true;
//             this.setGamepadVisability();
//         } else if (this.someButtonsPressed == true) {
//             this.someButtonsPressed = false;
//             this.setGamepadVisability();
//         }
//     }

//     handleGamepadVisualFeedbackVariableTriggerButtonEvents(gamepadButtonStates, triggerConfigs) { //axisHoveredClass, axisMovedClass
//         for (var i = 0; i < triggerConfigs.length; i++) {
//             const triggerConfig = triggerConfigs[i];
//             const btnIndx = triggerConfig.buttonIndex;
//             this.setGamepadButtonClass(btnIndx, gamepadButtonStates);
//             var yValue = gamepadButtonStates[btnIndx] ? gamepadButtonStates[btnIndx].value : 0;
//             triggerConfig.buttonElement.style.transform = `rotateX(${yValue * 30}deg) translateY(${yValue * triggerConfig.axisRange}px)`;
//         }
//     }

//     getButtonHighlightElements() {
//         console.log("getButtonHighlightElements", this.gpadButtonHighlightElements);
//         return this.gpadButtonHighlightElements
//     }

// }



export class GamepadUi {
    constructor() {
        this.gpadButtonHighlightElements = ONSCREEN_GPAD_BUTTON_LABELS.map((btnLabel) => document.getElementById(btnLabel + "_highlight"));
        this.gamepadHelpTooltip = document.querySelector('#gamepad-help-tooltip');
        this.gamepadHelpTooltipText = document.querySelector('#gamepad-help-text');
        this.defaultTooltipTarget = document.querySelector('#select_button');
        this.gamepadConnectNotice = document.getElementById("gamepad-connect-notice");
        this.tooManyGamepadsNotice = document.getElementById("too-many-gamepads-notice")
        this.currentPopperTarget = this.defaultTooltipTarget;
        this.touchingButtonsCount = 0;
        this.someAxiesNotCentered = false;
        this.someButtonsPressed = false;
        this.gamepadContainer = document.getElementById("gamepad-container");
        this.gamepadHelpVisible = false;

        // this.helpTooltip = createPopper({
        //     getBoundingClientRect: () => this.currentPopperTarget.getBoundingClientRect(),
        //     contextElement: document.body,
        // }, this.gamepadHelpTooltip, {
        //     modifiers: [flip],
        //     placement: 'right',
        //     strategy: 'fixed',
        // });
    }

    showExtraniousGamepadsConnected(tooManyGamepads) {
        this.tooManyGamepadsNotice.style.display = tooManyGamepads ? "block" : "none";
    }


    showGamepadConnected(show) {
        if (show) {
            this.gamepadContainer.classList.add("gamepad-connected");
        } else {
            this.gamepadContainer.classList.remove("gamepad-connected");
        }
    }


    showNoGamepads(show) {
        this.gamepadConnectNotice.style.display = show ? "block" : "none";
    }


    toggleGamepadHelpScreen() {
        this.gamepadHelpVisible = !this.gamepadHelpVisible // toggle it
        if (this.gamepadHelpVisible) {
            document.body.classList.add("gamepad-help-open")
            document.body.classList.remove("driving-now")
        } else {
            document.body.classList.remove("gamepad-help-open")
        }

        // let count = 0;
        // var updateFunc = () => { this.helpTooltip.update(); count++; if (count < 60) requestAnimationFrame(updateFunc) }
        // updateFunc();
    }
    // document.querySelector('#gamepad-help-button').addEventListener("click", toggleGamepadHelpScreen);

    showGamepadStatus(connectedGamepadCount) {
        // showNoGamepads(connectedGamepadCount == 0);
        // showGamepadConnected(connectedGamepadCount != 0);
        // showExtraniousGamepadsConnected(connectedGamepadCount > 1);
    }

    showNotSupported() {
        alert('Gamepad interface not supported, please use a more modern browser.');
        // showGamepadConnected(true);
    }

    showHelpTooltip(btnElem, btnHelpText) {
        // if (this.gamepadHelpVisible) {
        //     if (btnElem) {
        //         this.currentPopperTarget = btnElem;
        //         this.gamepadHelpTooltipText.innerText = btnHelpText;
        //         this.gamepadHelpTooltip.style.opacity = "0.9";
        //     } else {
        //         this.gamepadHelpTooltip.style.opacity = "0";
        //     }
        // } else if (!btnHelpText) {
        //     this.currentPopperTarget = this.defaultTooltipTarget;
        //     this.gamepadHelpTooltipText.innerText = "Gamepad Help";
        //     this.gamepadHelpTooltip.style.opacity = "0.8";
        // }
        // this.helpTooltip.update()
    }

    handleGamepadVisualFeedbackAxisEvents(axiesMaping, directionalHelpThreshold) { //axisHoveredClass, axisMovedClass
        axiesMaping.forEach((axisMap) => {
            // if (axisValue > 0 || axisValue < 0) {
            var thumbstick = axisMap.thumbStickElement;
            var axisRange = axisMap.axisRange;
            var xValue = axisMap.xValue || 0;
            var yValue = axisMap.yValue || 0;
            thumbstick.style.transform = `rotateY(${-xValue * 30}deg) rotateX(${yValue * 30}deg) translate(${xValue * axisRange}px,${yValue * axisRange}px)`;

            if (this.gamepadHelpVisible) {
                if (axisMap.upIndicatorElement && axisMap.downIndicatorElement) {
                    if (Math.abs(xValue) < directionalHelpThreshold) {
                        if (yValue < -directionalHelpThreshold) {
                            axisMap.upIndicatorElement.style.opacity = Math.max(-yValue, 0);
                            axisMap.downIndicatorElement.style.opacity = 0;
                            this.showHelpTooltip(axisMap.upIndicatorElement, axisMap.upHelpText || "None");
                        } else if (yValue > directionalHelpThreshold) {
                            axisMap.upIndicatorElement.style.opacity = 0;
                            axisMap.downIndicatorElement.style.opacity = Math.max(yValue, 0);
                            this.showHelpTooltip(axisMap.downIndicatorElement, axisMap.downHelpText || "None");
                        } else {
                            axisMap.upIndicatorElement.style.opacity = 0;
                            axisMap.downIndicatorElement.style.opacity = 0;
                        }
                    } else {
                        axisMap.upIndicatorElement.style.opacity = 0;
                        axisMap.downIndicatorElement.style.opacity = 0;
                    }
                }

                if (axisMap.leftIndicatorElement && axisMap.rightIndicatorElement) {
                    if (Math.abs(yValue) < directionalHelpThreshold) {
                        if (xValue < -directionalHelpThreshold) {
                            axisMap.leftIndicatorElement.style.opacity = Math.max(-xValue, 0);
                            axisMap.rightIndicatorElement.style.opacity = 0;
                            this.showHelpTooltip(axisMap.leftIndicatorElement, axisMap.leftHelpText || "None");
                        }
                        else if (xValue > directionalHelpThreshold) {
                            axisMap.leftIndicatorElement.style.opacity = 0;
                            axisMap.rightIndicatorElement.style.opacity = Math.max(xValue, 0);
                            this.showHelpTooltip(axisMap.rightIndicatorElement, axisMap.rightHelpText || "None");
                        } else {
                            axisMap.leftIndicatorElement.style.opacity = 0;
                            axisMap.rightIndicatorElement.style.opacity = 0;
                        }
                    } else {
                        axisMap.leftIndicatorElement.style.opacity = 0;
                        axisMap.rightIndicatorElement.style.opacity = 0;
                    }
                }
            }
        });

        let movedAxiesCount = axiesMaping.reduce((acc, axisMap) => {
            return acc + Math.abs(axisMap.xValue) + Math.abs(axisMap.yValue) > 0.05 ? 1 : 0;
        }, 0);


        if (!this.gamepadHelpVisible && movedAxiesCount > 0 && this.someAxiesNotCentered == false) {
            this.someAxiesNotCentered = true;
            this.setGamepadVisability();
        } else if (this.someAxiesNotCentered == true && movedAxiesCount == 0) {
            this.someAxiesNotCentered = false;
            this.setGamepadVisability();
        }
    }

    setGamepadVisability() {
        if (!this.gamepadHelpVisible && (this.someAxiesNotCentered || this.someButtonsPressed)) {
            document.body.classList.add("driving-now")
        } else {
            document.body.classList.remove("driving-now")
        }
    }

    setGamepadButtonClass(btnIndx, gamepadButtonStates) {
        var gpadButton = gamepadButtonStates[btnIndx];
        var btnElem = this.gpadButtonHighlightElements[btnIndx];
        if (!gpadButton || !btnElem) return;

        if (gpadButton.touched) {
            btnElem.classList.add(ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS);
        } else {
            btnElem.classList.remove(ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS);
        }

        if (gpadButton.pressed) {
            btnElem.classList.add(ONSCREEN_GPAD_BUTTON_PRESSED_CLASS);
        } else {
            btnElem.classList.remove(ONSCREEN_GPAD_BUTTON_PRESSED_CLASS);
        }
    }

    handleGamepadVisualFeedbackButtonEvents(gamepadButtonStates) {
        let pressedBtnCount = 0;
        for (var btnIndx = 0; btnIndx < gamepadButtonStates.length; btnIndx++) {
            this.setGamepadButtonClass(btnIndx, gamepadButtonStates);
            pressedBtnCount += gamepadButtonStates[btnIndx].pressed ? 1 : 0;
        }

        if (!this.gamepadHelpVisible && pressedBtnCount > 0 && this.someButtonsPressed == false) {
            this.someButtonsPressed = true;
            this.setGamepadVisability();
        } else if (this.someButtonsPressed == true) {
            this.someButtonsPressed = false;
            this.setGamepadVisability();
        }
    }

    handleGamepadVisualFeedbackVariableTriggerButtonEvents(gamepadButtonStates, triggerConfigs) { //axisHoveredClass, axisMovedClass
        for (var i = 0; i < triggerConfigs.length; i++) {
            const triggerConfig = triggerConfigs[i];
            const btnIndx = triggerConfig.buttonIndex;
            this.setGamepadButtonClass(btnIndx, gamepadButtonStates);
            var yValue = gamepadButtonStates[btnIndx] ? gamepadButtonStates[btnIndx].value : 0;
            triggerConfig.buttonElement.style.transform = `rotateX(${yValue * 30}deg) translateY(${yValue * triggerConfig.axisRange}px)`;
        }
    }

    getButtonHighlightElements() {
        console.log("getButtonHighlightElements", this.gpadButtonHighlightElements);
        return this.gpadButtonHighlightElements
    }

}
