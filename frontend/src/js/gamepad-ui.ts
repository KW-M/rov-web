import { ONSCREEN_GPAD_BUTTON_LABELS, ONSCREEN_GPAD_BUTTON_PRESSED_CLASS, ONSCREEN_GPAD_BUTTON_TOUCHED_CLASS } from './consts';
import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";

export class GamepadUi {
    gpadButtonHighlightElements: HTMLElement[];
    gamepadContainer: HTMLElement;
    gamepadHelpTooltip: HTMLElement;
    gamepadHelpTooltipText: HTMLElement;
    defaultTooltipTarget: HTMLElement;
    tooManyGamepadsNotice: HTMLElement;
    currentPopperTarget: HTMLElement;
    touchingButtonsCount: number = 0;
    someAxiesNotCentered: boolean = false;
    someButtonsPressed: boolean = false;
    gamepadHelpVisible: boolean = false;
    cleanupTooltip: () => void;

    start() {
        this.gamepadContainer = document.getElementById("gamepad-container");
        this.gpadButtonHighlightElements = ONSCREEN_GPAD_BUTTON_LABELS.map((btnLabel) => document.getElementById(btnLabel + "_highlight"));
        this.gamepadHelpTooltip = document.querySelector('#gamepad-help-tooltip');
        this.gamepadHelpTooltipText = document.querySelector('#gamepad-help-text');
        this.defaultTooltipTarget = document.querySelector('#select_button');
        this.tooManyGamepadsNotice = document.getElementById("too-many-gamepads-notice")
        this.currentPopperTarget = this.defaultTooltipTarget;

        // When the floating element is open on the screen
        // this.cleanupTooltip = autoUpdate(this.currentPopperTarget, this.gamepadHelpTooltip, () => {
        //     this.updateTooltip();
        // });
    }

    updateTooltip() {
        computePosition(this.currentPopperTarget, this.gamepadHelpTooltip, {
            middleware: [flip(), shift()],
            placement: 'right',
            strategy: 'absolute',
        }).then(({ x, y }) => {
            Object.assign(this.gamepadHelpTooltip.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }


    toggleGamepadHelpScreen() {
        this.gamepadHelpVisible = !this.gamepadHelpVisible // toggle it
        if (this.gamepadHelpVisible) {
            document.body.classList.add("gamepad-help-open")
            document.body.classList.remove("driving-now")
        } else {
            document.body.classList.remove("gamepad-help-open")
        }

        let count = 0;
        let updateFunc = () => { this.updateTooltip(); count++; if (count < 60) requestAnimationFrame(updateFunc) }
        updateFunc();
    }

    showNotSupported() {
        alert('Gamepad interface not supported, please use a more modern browser.');
        // showGamepadConnected(true);
    }

    showHelpTooltip(btnElem, btnHelpText) {
        if (this.gamepadHelpVisible) {
            if (btnElem) {
                this.currentPopperTarget = btnElem;
                this.gamepadHelpTooltipText.innerText = btnHelpText;
                this.gamepadHelpTooltip.style.opacity = "0.9";
            } else {
                this.gamepadHelpTooltip.style.opacity = "0";
            }
        } else if (!btnHelpText) {
            this.currentPopperTarget = this.defaultTooltipTarget;
            this.gamepadHelpTooltipText.innerText = "Gamepad Help";
            this.gamepadHelpTooltip.style.opacity = "0.8";
        }
        this.updateTooltip()
    }

    handleGamepadVisualFeedbackAxisEvents(axiesMaping, directionalHelpThreshold) { //axisHoveredClass, axisMovedClass
        axiesMaping.forEach((axisMap) => {
            // if (axisValue > 0 || axisValue < 0) {
            let thumbstick = axisMap.thumbStickElement;
            let axisRange = axisMap.axisRange;
            let xValue = axisMap.xValue || 0;
            let yValue = axisMap.yValue || 0;
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
        let gpadButton = gamepadButtonStates[btnIndx];
        let btnElem = this.gpadButtonHighlightElements[btnIndx];
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
        for (let btnIndx = 0; btnIndx < gamepadButtonStates.length; btnIndx++) {
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
        for (let i = 0; i < triggerConfigs.length; i++) {
            const triggerConfig = triggerConfigs[i];
            const btnIndx = triggerConfig.buttonIndex;
            this.setGamepadButtonClass(btnIndx, gamepadButtonStates);
            let yValue = gamepadButtonStates[btnIndx] ? gamepadButtonStates[btnIndx].value : 0;
            triggerConfig.buttonElement.style.transform = `rotateX(${yValue * 30}deg) translateY(${yValue * triggerConfig.axisRange}px)`;
        }
    }

    getButtonHighlightElements() {
        console.log("getButtonHighlightElements", this.gpadButtonHighlightElements);
        return this.gpadButtonHighlightElements
    }

}
