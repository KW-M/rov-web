import { DIALOG_TYPE, type dialogExtraDataType } from './globalContext';
import { openDialog } from '../components/dialogs/Dialogs.svelte';

// -------------------------------------------------------------
// ------ UI Stuff ---------------------------------------------
// -------------------------------------------------------------


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
