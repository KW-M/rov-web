function checkIfPointIsInRect(x, y, rect) {
    return (x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height);
}

export const gamepadEmulator = {

    // The list of emulated gamepads, corresponds 1-1 to the list output by navigator.getGamepads().
    // when an emulated gamepad is "connected" ie: call addEmulatedGamepad(), it is added to this list.
    // when an emulated gamepad is "disconnected" ie: call removeEmulatedGamepad(), it is removed from this list.
    // if a real gamepad is found at the same array index as an emulated gamepad, the navigator.getGamepads() list
    // will report buttons pressed or axies moved on both the real gamepad and the emulated one.
    emulatedGamepads: [],

    // A number of typical buttons recognized by Gamepad API and mapped to
    // standard controls. Any extraneous buttons will have larger indexes.
    DEFAULT_BUTTON_COUNT: 18,

    // A number of typical axes recognized by Gamepad API and mapped to
    // standard controls. Any extraneous axies will have larger indexes.
    DEFAULT_AXIS_COUNT: 4,

    /* creates a new emmulated gamepad at the given index as would be read in navigator.getGamepads
     * @param {number} gpadIndex - the index of the gamepad to create, pass null to create a new gamepad at the next available index
     * @param {number} buttonCount - normally 18, the number of buttons on the gamepad
     * @param {number} axisCount - normally 4, the number of axes on the gamepad
    */
    addEmulatedGamepad: function (gpadIndex, buttonCount, axisCount) {
        // create the new gamepad object
        var gpad = {
            connected: true,
            displayId: "Emulated Gamepad " + gpadIndex,
            id: "Emulated Gamepad " + gpadIndex + " (Xinput STANDARD GAMEPAD)",
            mapping: "standard",
            timestamp: Math.floor(Date.now() / 1000),
            index: gpadIndex || this.emulatedGamepads.length,
            buttons: new Array(buttonCount).fill({ pressed: false, value: 0, touched: false }, 0, buttonCount),
            axes: new Array(axisCount).fill(0, 0, axisCount),
        };

        // Add the new gamepad object to the list of emulated gamepads
        if (!gpadIndex) gpadIndex = this.emulatedGamepads.length
        this.emulatedGamepads[gpadIndex] = gpad;

        // Trigger the (system) gamepad connected event on the window object
        const event = new Event("gamepadconnected");
        event["gamepad"] = gpad;
        // setTimeout(() => window.dispatchEvent(event), 0);
        window.dispatchEvent(event);
        console.log("added gamepad", gpad);
        return gpad
    },

    /* removes the emmulated gamepad at the passed index as would be read from the list in navigator.getGamepads
     * @param {number} gpadIndex - the index of the gamepad to remove
    */
    disconnectEmulatedGamepad: function (gpadIndex) {
        var gpad = this.emulatedGamepads[gpadIndex];
        if (gpad) {
            this.emulatedGamepads.splice(gpadIndex, 1);
            let gpads = navigator.getGamepads()
            if (!gpads[gpadIndex]) {
                gpad.connected = false;
                gpad.timestamp = Math.floor(Date.now() / 1000);
                const event = new Event("gamepaddisconnected");
                event["gamepad"] = gpad;
                window.dispatchEvent(event);
            }
        }
    },

    /* emulates pressing a button on the gamepad at the given button index
    gpadIndex - the index of the emulated gamepad to press the button on
    buttonIndex - the index of the button to press
    value - the value to set the button to between 0 and 1 (0 = unpressed, 1 = pressed)
    touched - whether the button is considered "touched" or not, a "pressed" button is always considered "touched"
    */
    pressButton: function (gpadIndex, buttonIndex, value, touched) {
        var gpad = this.emulatedGamepads[gpadIndex];
        if (!gpad) gpad = this.addEmulatedGamepad(gpadIndex, this.DEFAULT_BUTTON_COUNT, this.DEFAULT_AXIS_COUNT);

        var isPressed = value > 0.1;

        this.emulatedGamepads[gpadIndex].buttons[buttonIndex] = {
            pressed: isPressed,
            value: value || 0,
            touched: isPressed || touched || false
        };
    },

    /* emulates moving an axis on the gamepad at the given axis index
    gpadIndex - the index of the emulated gamepad to move the axis on
    axisIndex - the index of the axis to move
    value - the value to set the axis to between -1 and 1 (0 = center, -1 = left/up, 1 = right/down)
    */
    moveAxis: function (gpadIndex, axisIndex, value) {
        var gpad = this.emulatedGamepads[gpadIndex];
        if (!gpad) gpad = this.addEmulatedGamepad(gpadIndex, this.DEFAULT_BUTTON_COUNT, this.DEFAULT_AXIS_COUNT);
        this.emulatedGamepads[gpadIndex].axes[axisIndex] = value;
    },

    /* add event listeners to the html button elements of an onscreen gamepad to emulate gamepad input
        * @param {number} gpadIndex - the index of the emulated gamepad to register events for
        * @param {array} buttonTapZoneElements - an array of elements that are the tap targets for the buttons on the onscreen gamepad, in same order as the gamepad api would use.
        * @param {array} buttonHighlightElements - an array of elements that should have the classes applied for the buttons on the onscreen gamepad, in same order as the gamepad api would use.
        * @param {string} btnTouchedClass - the class to apply to the buttonHighlightElement when it is hovered over or "touched"
        * @param {string} btnPressedClass - the class to apply to the buttonHighlightElement when it is pressed / clicked
    */
    registerOnScreenGamepadButtonEvents: function (gpadIndex, buttonTapZoneElements) {
        // for (var btnIndx = 0; btnIndx < buttonTapZoneElements.length; btnIndx++) {
        var self = this;
        buttonTapZoneElements.forEach(function (btnEl, btnIndx) {
            if (!btnEl) return;

            btnEl.addEventListener("pointerover", () => {
                // tell the emulator this button is being "touched", ie: hovered over
                self.pressButton(gpadIndex, btnIndx, 0, true);
            });
            btnEl.addEventListener("pointerleave", () => {
                // tell the emulator this button is no longer being "touched", ie: not hovered over
                self.pressButton(gpadIndex, btnIndx, 0, false);

            });
            btnEl.addEventListener("pointerdown", () => {
                // tell the emulator this button is being pressed, ie: clicked / tapped
                self.pressButton(gpadIndex, btnIndx, 1, true);
            });
            btnEl.addEventListener("pointerup", () => {
                // tell the emulator this button is no longer being pressed
                self.pressButton(gpadIndex, btnIndx, 0, true);
            });
        });
    },

    registerOnScreenGamepadAxisEvents: function (gpadIndex, joysticksTouchDetails) {
        var axisTouchRadius = 100;
        var self = this
        var pointerToJoystickMapping = {};
        const pointerMoveHandler = function (me) {
            var pointerId = me.pointerId;

            for (const pointerIdKey in pointerToJoystickMapping) {
                if (pointerIdKey == pointerId) {

                    const joystickData = pointerToJoystickMapping[pointerIdKey];
                    var deltaX = Math.max(Math.min((me.clientX - joystickData.startX) / axisTouchRadius, 1), -1)
                    var deltaY = Math.max(Math.min((me.clientY - joystickData.startY) / axisTouchRadius, 1), -1)
                    // horizontal component
                    if (joystickData.horizontalGpadAction && joystickData.horizontalGpadAction.type == "axis") {
                        self.moveAxis(gpadIndex, joystickData.horizontalGpadAction.index, deltaX);
                    } else if (joystickData.horizontalGpadAction && joystickData.horizontalGpadAction.type == "button") {
                        self.pressButton(gpadIndex, joystickData.horizontalGpadAction.index, deltaX, true);
                    }
                    // vertical component
                    if (joystickData.verticalGpadAction && joystickData.verticalGpadAction.type == "axis") {
                        self.moveAxis(gpadIndex, joystickData.verticalGpadAction.index, deltaY);
                    } else if (joystickData.verticalGpadAction && joystickData.verticalGpadAction.type == "button") {
                        self.pressButton(gpadIndex, joystickData.verticalGpadAction.index, deltaY, true);
                    }
                }
            }
        }
        const pointerUpHandler = function (me) {
            var pointerId = me.pointerId;
            for (const pointerIdKey in pointerToJoystickMapping) {
                if (pointerIdKey == pointerId) {
                    const joystickData = pointerToJoystickMapping[pointerIdKey];
                    // horizontal component
                    if (joystickData.horizontalGpadAction && joystickData.horizontalGpadAction.type == "axis") {
                        self.moveAxis(gpadIndex, joystickData.horizontalGpadAction.index, 0);
                    } else if (joystickData.horizontalGpadAction && joystickData.horizontalGpadAction.type == "button") {
                        self.pressButton(gpadIndex, joystickData.horizontalGpadAction.index, 0, false);
                    }
                    // vertical component
                    if (joystickData.verticalGpadAction && joystickData.verticalGpadAction.type == "axis") {
                        self.moveAxis(gpadIndex, joystickData.verticalGpadAction.index, 0);
                    } else if (joystickData.verticalGpadAction && joystickData.verticalGpadAction.type == "button") {
                        self.pressButton(gpadIndex, joystickData.verticalGpadAction.index, 0, false);
                    }
                    delete pointerToJoystickMapping[pointerIdKey];
                }
            }
            if (Object.keys(pointerToJoystickMapping).length == 0) {
                // axisHighlightElements[index].classList.remove(axisMovedClass);
                document.removeEventListener("pointermove", pointerMoveHandler, false);
                document.removeEventListener("pointerup", pointerUpHandler, false);
            }
        }
        document.addEventListener("pointerdown", function (de) {
            joysticksTouchDetails.forEach(function (joystickTouchDetails) {
                const targetRect = joystickTouchDetails.elem.getBoundingClientRect();
                if (checkIfPointIsInRect(de.clientX, de.clientY, targetRect)) {
                    joystickTouchDetails.startX = de.clientX;
                    joystickTouchDetails.startY = de.clientY;
                    pointerToJoystickMapping[de.pointerId] = joystickTouchDetails;
                }
            });
            if (Object.keys(pointerToJoystickMapping).length == 1) {
                document.addEventListener("pointermove", pointerMoveHandler, false);
                document.addEventListener("pointerup", pointerUpHandler, false);
            }
        })
    },

    cloneGamepad: function (original) {
        // from @maulingmonkey's gamepad library
        if (!original)
            return original;

        var axesCount = original.axes ? original.axes.length : 0;
        var buttonsCount = original.buttons ? original.buttons.length : 0;
        var clone = {
            id: original.id || undefined,
            displayId: original.displayId || undefined,
            mapping: original.mapping || undefined,
            index: original.index || undefined,
            timestamp: original.timestamp || undefined,
            connected: original.connected || undefined,
            axes: new Array(axesCount),
            buttons: new Array(buttonsCount)
        };
        for (var i = 0; i < axesCount; ++i) {
            clone.axes[i] = Number(original.axes[i]);
        }
        for (var i = 0; i < buttonsCount; ++i) {
            var _a = original.buttons[i], pressed = _a.pressed, value = _a.value, touched = _a.touched;
            touched = touched || false;
            clone.buttons[i] = { pressed: pressed, value: value, touched: touched };
        }
        return clone;
    },

    /* overwrite the browser gamepad api getGamepads() to return the emulated gamepad data for gamepad indexes corresponding to emulated gamepads
     so long as the same index don't have a real gamepad connected  */
    monkeyPatchGetGamepads: function () {
        console.log("new monkey patching getGamepads");
        // @ts-ignore
        let getNativeGamepads = navigator.getGamepads || navigator.webkitGetGamepads || navigator.mozGetGamepads || navigator.msGetGamepads;
        if (getNativeGamepads) getNativeGamepads = getNativeGamepads.bind(navigator);
        let self = this;
        navigator.getGamepads = function () {
            let nativeGamepadsObjArray = getNativeGamepads != undefined ? getNativeGamepads() : [];
            let nativeGpads = nativeGamepadsObjArray.map((gpad) => {
                let clone = self.cloneGamepad(gpad);
                if (clone) clone.real = true;
                return clone;
            });
            let emulatedGpads = self.emulatedGamepads;
            for (let i = 0; i < emulatedGpads.length; i++) {
                let n_gpad = nativeGpads[i];
                let e_gpad = emulatedGpads[i];
                if (e_gpad && n_gpad) {
                    // if both an emulated gamepad and a real one is available for this index, combine their inputs
                    // add a property on the gamepad to indicate that it is emulated
                    n_gpad.emulated = true; // gamepad.real will already be true;

                    // merge button presses:
                    let btnCount = Math.max(n_gpad.buttons.length, e_gpad.buttons.length);
                    for (let btnIdx = 0; btnIdx < btnCount; btnIdx++) {
                        const e_btn = e_gpad.buttons[btnIdx] || { touched: false, pressed: false, value: 0 };
                        const n_btn = n_gpad.buttons[btnIdx] || { touched: false, pressed: false, value: 0 };
                        nativeGpads[i].buttons[btnIdx] = {
                            touched: e_btn.touched || n_btn.touched || false,
                            pressed: e_btn.pressed || n_btn.pressed || false,
                            value: Math.max(e_btn.value, n_btn.value) || 0,
                        }
                    }

                    // merge axis values:
                    let axisCount = Math.max(e_gpad.axes.length, n_gpad.axes.length);
                    for (let axisIndex = 0; axisIndex < axisCount; axisIndex++) {
                        const e_axis = e_gpad.axes[axisIndex] || 0;
                        const n_axis = n_gpad.axes[axisIndex] || 0;
                        nativeGpads[i].axes[axisIndex] = Math.abs(e_axis || 0) > Math.abs(n_axis || 0) ? (e_axis || 0) : (n_axis || 0);
                    }
                } else if (e_gpad) {
                    // if only the emulated gamepad is available, use it
                    // add a property on the gamepad to indicate that it is emulated
                    e_gpad.emulated = true; // gamepad.real will be undefined;
                    e_gpad.timestamp = Math.floor(Date.now() / 1000);
                    nativeGpads[i] = self.cloneGamepad(e_gpad);
                }
            }
            return nativeGpads;
        }
    },
};
