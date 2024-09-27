// Modals Utils
import type { ModalSettings, ModalComponent, Modal, ModalStore } from '@skeletonlabs/skeleton';
import { getModalStore } from '@skeletonlabs/skeleton';
import { get } from "svelte/store";
import LogTimeline from './LogTimeline.svelte';
import TestDriveTut from './Tutorials/TestDriveTut.svelte';
import FlyModesTut from './Tutorials/FlyModesTut.svelte';
import ConnectionCheck from './Tutorials/ConnectionCheck.svelte';
import { frontendConnMngr } from '../../js/frontendConnManager';

const MODAL_COMPONENTS = {
    LogTimeline: { ref: LogTimeline },
    TestDriveTut: { ref: TestDriveTut },
    FlyModesTut: { ref: FlyModesTut },
    ConnectionCheck: { ref: ConnectionCheck }
}

let modalStore: ModalStore = null;
export const setupModals = () => {
    modalStore = getModalStore();
    return MODAL_COMPONENTS;
}

/** Close the topmost modal dialog */
export const closeModal = () => (modalStore.close());

/** Shows an alert dialog */
export function modalAlert(title: string, options?: Omit<ModalSettings, "type">): void {
    const modal: ModalSettings = {
        type: 'alert',
        title: title,
        modalClasses: "w-fit max-w-sm px-6 py-5",
        buttonTextCancel: "OK",
        ...(options || {})
    };
    modalStore.trigger(modal);
}

/** Shows a confirmation dialog */
export function modalConfirm(title: string, options?: Omit<ModalSettings, "type">): void {
    const modal: ModalSettings = {
        type: 'confirm',
        title: title,
        modalClasses: "w-fit max-w-sm px-6 py-5",
        buttonTextCancel: "Cancel",
        buttonTextConfirm: "OK",
        ...(options || {})
    };
    modalStore.trigger(modal);
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
            modalClasses: "w-fit max-w-sm px-6 py-5",
            valueAttr: { type: 'text', placeholder: "password", required: true },
            response: (r: string) => {
                passwordModalOpen = false;
                resolve(r)
            }
        }
        try {
            modalStore.trigger(modal);
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
    modalStore.trigger(modal);
    return (newText: string) => {
        modalStore.update((modals: ModalSettings[]) => {
            let i = modals.indexOf(modal)
            modals[i].body = modals[i].body + "\n" + newText;
            return modals;
        })
    };
}

/*******************************
------- Component Modals -------
********************************/

const closeExistingComponentModal = (componentName: string) => {
    const topModal = Array.from(get(modalStore)).pop()
    if (topModal && topModal.component === componentName) {
        closeModal();
        return true;
    } else return false;
}

export const openLogsTimelineModal = () => {
    if (!closeExistingComponentModal("LogTimeline")) {
        modalStore.trigger({
            type: "component",
            component: "LogTimeline"
        });
    }
};

export const openConnectionCheckModal = () => {
    frontendConnMngr.connectToLivekitRoom("connection-test-room", "eyJhbGciOiJIUzI1NiJ9.eyJ2aWRlbyI6eyJoaWRkZW4iOmZhbHNlLCJyb29tIjoiY29ubmVjdGlvbi10ZXN0LXJvb20iLCJyb29tTGlzdCI6dHJ1ZSwicm9vbUpvaW4iOnRydWUsInJvb21SZWNvcmQiOmZhbHNlLCJyb29tQ3JlYXRlIjpmYWxzZSwicm9vbUFkbWluIjpmYWxzZSwiY2FuUHVibGlzaCI6ZmFsc2UsImNhblN1YnNjcmliZSI6ZmFsc2UsImNhblB1Ymxpc2hEYXRhIjpmYWxzZSwiY2FuVXBkYXRlT3duTWV0YWRhdGEiOmZhbHNlfSwiaXNzIjoiQVBJSGQ3Qm9hOVJVVWlUIiwiZXhwIjoxNzI3Mzc3NjIzLCJuYmYiOjAsInN1YiI6Imx0In0.8Lo33O52i_II6ZnrbmdQt3H7uOlcwSjuvzxm6P4TJ-M");
    if (!closeExistingComponentModal("ConnectionCheck")) {
        modalStore.trigger({
            type: "component",
            component: "ConnectionCheck"
        });
    }
};


export const openTestDriveTutModal = () => {
    if (!closeExistingComponentModal("TestDriveTut")) {
        modalStore.trigger({
            type: "component",
            component: "TestDriveTut"
        });
    }
};

export const openFlyModesTutModal = () => {
    if (!closeExistingComponentModal("FlyModesTut")) {
        modalStore.trigger({
            type: "component",
            component: "FlyModesTut"
        });
    }
};
