import { type ModalStore } from "@skeletonlabs/skeleton";
import { get } from "svelte/store";

let modalStore: ModalStore = null;
export const setModalStore = (store) => (modalStore = store);

export const openLogsTimelineModal = () => {
    modalStore.trigger({
        type: "component",
        component: "LogTimeline",
    });
};

export const openControlTutModal = () => {
    const topModal = Array.from(get(modalStore)).pop()
    if (topModal && topModal.component === "ControlSchemeTut") {
        closeModal();
    } else {
        modalStore.trigger({
            type: "component",
            component: "ControlSchemeTut"
        });
    }
};

export const openFlyModesTutModal = () => {
    const topModal = Array.from(get(modalStore)).pop()
    if (topModal && topModal.component === "FlyModesTut") {
        closeModal();
    } else {
        modalStore.trigger({
            type: "component",
            component: "FlyModesTut"
        });
    }
};

/** Close the topmost modal dialog */
export const closeModal = () => (modalStore.close());
