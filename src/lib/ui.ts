import { toast } from '@zerodevx/svelte-toast';
import { ROV_PEERID_BASE } from './consts';
import { DIALOG_TYPE, rovPeerIdEndNumber } from './globalContext';
import { hideLoadingUi, showLoadingUi } from '../components/LoadingIndicator.svelte';
import { getROVName } from './rovUtil';
import { openDialog } from '../components/dialogs/DialogSpawner.svelte';

// -------------------------------------------------------------
// ------ UI Stuff ---------------------------------------------
// -------------------------------------------------------------

// -----  Toast Notifications -----
let toastDeduplicationCache = {}
export function showToastMessage(message, durration, callback) {
    let existingToast = toastDeduplicationCache[message];
    if (existingToast) return;
    let toastId = toast.push({
        msg: message,
        duration: durration || 5000,
    });
    toastDeduplicationCache[message] = toastId;
    toast.subscribe((toastArray) => {
        let ourToast = toastArray.find((toast) => { return toast.msg === message })
        if (!ourToast) {
            delete toastDeduplicationCache[message];
            callback && callback();
        }
    });
    return toastId
}

// -----  Dialogs -----
export function showConfirmationMsg(msg, callback) {
    openDialog(DIALOG_TYPE.Alert, { title: msg }, (ok) => {
        if (callback && (ok as boolean)) callback(ok);
    })
}

let passwordPromptOpen = false
export function showPasswordPrompt(message, callback) {
    if (passwordPromptOpen) return;
    passwordPromptOpen = true;

    openDialog(DIALOG_TYPE.Password, {}, (password) => {
        if (password != null && callback) callback(password);
    })
}

export function showScrollableTextPopup(title, callback) {
    let modifyExtraData = openDialog(DIALOG_TYPE.ScrollingText, { title: title, messageLines: [] }, (_) => {
        if (callback) callback(null)
    })

    let addTextToPopup = (textLine) => {
        modifyExtraData((extraData) => {
            return {
                ...extraData,
                messageLines: [...extraData.messageLines, textLine],
            };
        });
    }
    return addTextToPopup
}

const connectBtn = document.getElementById('connect_btn');
const connectBtnOptions = document.getElementById('connect_btn_options')
const disconnectBtn = document.getElementById('disconnect_btn');
const connectedRovLabel = document.getElementById('connected_rov_label');
const rovConnectionBar = document.getElementById('rov_connection_bar');
export function showROVDisconnectedUi() {
    // connectBtnOptions.style.display = 'flex';
    document.body.classList.remove("rov-connected");
    hideLoadingUi("all");
    // hideLivestreamUi();
}

export function showROVConnectingUi(rovPeerId) {
    console.log("showROVConnectingUi", connectBtnOptions);
    // connectBtnOptions.style.display = 'none';
    document.body.classList.remove("rov-connected");
}

export function showROVConnectedUi() {
    // connectBtnOptions.style.display = 'none';
    // disconnectBtn.style.display = 'block';
    updateRoleDisplay(false)
    document.body.classList.add("rov-connected");
    hideLoadingUi("webrtc-connecting")
    hideLoadingUi("webrtc-reconnecting")
}

export function showReloadingWebsiteUi() {
    connectBtn.style.display = 'none';
    // disconnectBtn.style.display = 'none';
    showLoadingUi("reloading-site", null);
}

export function setCurrentRovName() {
    let index = rovPeerIdEndNumber.get();
    let name = getROVName(index);
    let uiName = "ROV " + index + " (" + name.replace(ROV_PEERID_BASE, "") + ")";
    connectBtn.innerText = "Connect to " + uiName;
    // if (index == 0) switchToPrevRovBtn.setAttribute("disabled", "true");
    // else switchToPrevRovBtn.removeAttribute("disabled");
    connectedRovLabel.innerText = uiName
}

export function setupConnectBtnClickHandler(callback) {
    connectBtn.addEventListener('click', callback);
    return () => { // cleanup function
        connectBtn.removeEventListener('click', callback);
    }
}

export function setupDisconnectBtnClickHandler(callback) {
    disconnectBtn.addEventListener('click', callback);
    return () => { // cleanup function
        disconnectBtn.removeEventListener('click', callback);
    }
}

const clientPeerIdLabel = document.getElementById("client_peer_id_label")
export function setClientPeerIdDisplay(clientPeerId) {
    clientPeerIdLabel.innerText = clientPeerId
}

const roleDisplayText = document.getElementById('role_display_text');
const takeControlButton = document.getElementById('take_control_btn');
export function updateRoleDisplay(isDriver) {
    // roleDisplayText.innerText = isDriver ? "Driver" : "Spectator";
    if (isDriver) {
        document.body.classList.add('rov-driver')
        // takeControlButton.classList.add('hidden')
    } else {
        document.body.classList.remove('rov-driver')
        // takeControlButton.classList.remove('hidden')
    }
}

var pingDisplay = document.getElementById('ping_value');
export function updatePingDisplay(pingTimeMs) {
    // pingDisplay.innerText = pingTimeMs;
}

var battDisplay = document.getElementById('battery_value');
export function updateBatteryDisplay(batteryVolts, batteryPercent) {
    // battDisplay.innerText = batteryVolts + 'V (' + batteryPercent + '%)';
}

var pressureDisplay = document.getElementById('pressure_value');
var tempDisplay = document.getElementById('temp_value');
export function updateDisplayedSensorValues(sensorValues) {
    // if (sensorValues.pressure) {
    //     pressureDisplay.innerText = String(sensorValues.pressure / 0.001 * (1023.6 * 9.8065)); // to meters
    // }
    // if (sensorValues.temperature) tempDisplay.innerText = sensorValues.temperature;
    if (sensorValues.yaw) setCompassHeading(sensorValues.yaw);
    if (sensorValues.pitch && sensorValues.roll) setArtificialHorizonBackground(sensorValues.roll, -sensorValues.pitch);
}

let actionsMenu = document.getElementById("actions-menu-overlay")
let actionsMenuBtn = document.getElementById("actions-menu-button")
let actionsMenuHidden = true;
export function toggleActionsMenu() {
    actionsMenuHidden = !actionsMenuHidden;
    if (actionsMenuHidden)
        actionsMenu.classList.add("hidden")
    else
        actionsMenu.classList.remove("hidden")
}
// actionsMenuBtn.onclick = toggleActionsMenu;


/***** COMPASS AND ORIENTATION RELATED UI *******/

// https://codepen.io/fueru/pen/JjjoXez
var compassDisc = document.getElementById("compassDiscImg");
const compassOffset = 135;
export function setCompassHeading(headingDeg) {
    var totalDir = -(headingDeg + compassOffset);

    // document.getElementById("direction").innerHTML = "dir: " + Math.ceil(dir) + " + offset(" + offset + ") = " + Math.ceil(totalDir);
    compassDisc.style.transform = `translateX(${totalDir}px)`;
}

const gradientArtificialHorizonBackground = document.body//getElementById("artificial_horizon_gradient");
export function setArtificialHorizonBackground(roll, pitch) {
    var vShift = Math.min(Math.max(pitch, -90), 90) / 90 * 100;
    gradientArtificialHorizonBackground.style.backgroundImage = `linear-gradient(${roll}deg, rgba(2,0,36,1) ${-100 + vShift}%, rgba(9,88,116,1) ${50 + vShift}%, rgba(10,109,140,1) ${50 + vShift}%, rgba(0,255,235,1) ${200 + vShift}%)`;
}

// FOR DEBUGGING COMPASS:
// document.addEventListener("DOMContentLoaded", function () {
//     if (window.DeviceOrientationEvent) {
//         window.addEventListener('deviceorientation', function (eventData) {
//             // gamma: Tilting the device from left to right. Tilting the device to the right will result in a positive value.
//             // var tiltLR = eventData.gamma;

//             // beta: Tilting the device from the front to the back. Tilting the device to the front will result in a positive value.
//             var tiltFB = eventData.beta;
//             // this.document.getElementById("rov_connection_bar").innerHTML = "tiltLR: " + tiltLR + " tiltFB: " + (tiltFB - 90);

//             // alpha: The direction the compass of the device aims to in degrees.
//             var dir = eventData.alpha
//             setArtificialHorizonBackground(dir, -tiltFB);
//             // Call the function to use the data on the page.
//             setCompassHeading(dir);
//         }, false);
//     }
//     setArtificialHorizonBackground(0, 0);
// });
