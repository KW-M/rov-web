// Modals Utils
import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
import { getModalStore } from '@skeletonlabs/skeleton';
import { log, logDebug, logInfo, logWarn, logError } from "../js/shared/logging"

// Variants ---

let modalTool;

export const setupModals = () => {
    modalTool = getModalStore()
}

export function modalAlert(title: string, body: string): void {
    const modal: ModalSettings = {
        type: 'alert',
        title: title,
        body: body,
    };
    modalTool.trigger(modal);
}

export function modalConfirm(title: string, body: string, callback: () => void): void {
    const modal: ModalSettings = {
        type: 'confirm',
        title: title,
        body: body,
        response: (r: boolean) => { if (r && callback) callback() }
    };
    modalTool.trigger(modal);
}

let passwordModalOpen = false
export function modalPasswordPrompt(title: string, body: string = ""): Promise<string> {
    return new Promise((resolve, reject) => {
        if (passwordModalOpen) return reject("Password modal already open");
        passwordModalOpen = true;
        const modal: ModalSettings = {
            type: 'prompt',
            title: title,
            body: body,
            valueAttr: { type: 'text', placeholder: "password", required: true },

            response: (r: string) => {
                log("modalPasswordPrompt response", r)
                passwordModalOpen = false; resolve(r)
            }
        };
        try {
            modalTool.trigger(modal);
        } catch (e) {
            passwordModalOpen = false;
            reject(e);
        }
    })
}


export function modalScrollingText(title: string, body: string, callback: (ok: boolean) => void) {
    const modal: ModalSettings = {
        type: 'alert',
        title: title,
        body: body,
        response: (r: boolean) => { if (callback) callback(r) }
    };
    modalTool.trigger(modal);
    return (newText: string) => {
        modalTool.update((modals: ModalSettings[]) => {
            let i = modals.indexOf(modal)
            modals[i].body = modals[i].body + "\n" + newText;
            return modals;
        })
    };
}
