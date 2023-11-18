import { getToastStore } from "@skeletonlabs/skeleton";
import nStore, { type nStoreT } from "./shared/libraries/nStore";

type toastHistoryInfo = {
    msg: string;
    toastId: string;
    closed: boolean;
    messageRepeatCount: number;
};

const toastHistoryMap: Map<string, toastHistoryInfo> = new Map();
export const toastHistoryStore: nStoreT<toastHistoryInfo[]> = nStore([] as toastHistoryInfo[]);


const setToastHistory = (toast: toastHistoryInfo) => {
    toastHistoryMap.set(toast.msg, toast);
    toastHistoryStore.set(Array.from(toastHistoryMap.values()));
}

let toastTool;

export const setupToasts = () => {
    toastTool = getToastStore()
}

export const showToastMessage = (msg: string, duration: number = 2000, callback: (() => void) | null = null) => {
    const existingToast = toastHistoryMap.get(msg);
    if (!existingToast && toastTool) {
        let toastId = toastTool.trigger({
            message: msg,
            timeout: duration,
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
