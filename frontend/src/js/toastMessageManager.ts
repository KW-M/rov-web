import { getDrawerStore, getToastStore, type ToastStore } from "@skeletonlabs/skeleton";
import nStore, { type nStoreT } from "./shared/libraries/nStore";
import {  sidebarExpanded } from "./globalContext";

export enum ToastSeverity {
    success = "success",
    info = "tertiary",
    warning = "warning",
    error = "error",
}

type toastHistoryInfo = {
    msg: string;
    toastId: string;
    closed: boolean;
    severity: ToastSeverity;
    messageRepeatCount: number;
};


const toastHistoryMap: Map<string, toastHistoryInfo> = new Map();
export const toastHistoryStore: nStoreT<toastHistoryInfo[]> = nStore([] as toastHistoryInfo[]);


const setToastHistory = (toast: toastHistoryInfo) => {
    toastHistoryMap.set(toast.msg, toast);
    toastHistoryStore.set(Array.from(toastHistoryMap.values()).reverse());
}

let toastTool: ToastStore;
export const setupToasts = () => {
    toastTool = getToastStore()
    sidebarExpanded.subscribe((sb) => {
        if (sb) {
            toastHistoryMap.forEach((toast) => {
                toast.closed = true;
                toastTool.close(toast.toastId)
            })
        }
    })
}

function randomUUID() {
    const random = Math.random();
    return Number(random).toString(32);
}

export const showToastMessage = (msg: string, duration: number = 2000, ignoreDuplicates:boolean = true, severity:ToastSeverity = ToastSeverity.info, callback: (() => void) | null = null) => {
    const existingToast = toastHistoryMap.get(msg);
    const UUID = existingToast ? existingToast.toastId : randomUUID();
    if (sidebarExpanded.get()) {
       setToastHistory({
            msg: msg,
            severity: severity,
            messageRepeatCount: existingToast ? existingToast.messageRepeatCount + 1 : 1,
            toastId: UUID,
            closed: true,
        });
        return UUID;
    };
    if (toastTool && (!existingToast || !ignoreDuplicates)) {
        let toastId = toastTool.trigger({
            classes: `variant-filled-${severity} w-72`,
            message: msg,
            timeout:duration,
            callback: ({ id, status }) => {
                if (status == "closed") {
                    const existingToast = toastHistoryMap.get(msg)
                    if (existingToast) setToastHistory({
                        ...existingToast,
                        closed: true,
                    });
                    if (callback) callback()
                }
            },
            hoverable: true,
            autohide: true,
        })
        toastHistoryMap.set(msg, {
            msg: msg,
            toastId: toastId,
            closed: false,
            severity: severity,
            messageRepeatCount: 1,
        });
        return toastId;

    } else {
        if (existingToast.closed) toastHistoryMap.delete(msg);
        setToastHistory({
            ...existingToast,
            messageRepeatCount: existingToast.messageRepeatCount + 1,
        });
    }
}
