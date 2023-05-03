import { toast } from '@zerodevx/svelte-toast';
import { ROV_PEERID_BASE } from './consts';
import { DIALOG_TYPE, rovPeerIdEndNumber, type dialogExtraDataType } from './globalContext';
import { hideLoadingUi, showLoadingUi } from '../components/LoadingIndicator.svelte';
import { getROVName } from './rovUtil';
import { openDialog } from '../components/dialogs/DialogSpawner.svelte';

// -------------------------------------------------------------
// ------ UI Stuff ---------------------------------------------
// -------------------------------------------------------------

// -----  Toast Notifications -----
let toastDeduplicationCache = {}
export function showToastMessage(message: string, durration: number = 2000, callback: () => void = null) {
    let existingToast = toastDeduplicationCache[message];
    if (existingToast) return;
    let toastId = toast.push({
        msg: message,
        duration: durration,
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
        passwordPromptOpen = false;
        if (password != null && callback) callback(password);
    })
}

export function showScrollableTextPopup(title: string, callback: (a: any) => void) {
    let modifyExtraData = openDialog(DIALOG_TYPE.ScrollingText, { title: title, messageLines: [] }, (_) => {
        if (callback) callback(null)
    })

    let addTextToPopup = (textLine: string) => {
        console.log("addTextToPopup", textLine)
        modifyExtraData((extraData: dialogExtraDataType) => {
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
