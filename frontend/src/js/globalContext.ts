import { default as nStore, type nStoreT } from "./shared/libraries/nStore";
import { getBooleanQueryParam, getStringQueryParam } from "./shared/urlParameters";

export enum DIALOG_TYPE {
    Alert = 0,
    Password = 1,
    ScrollingText = 2,
}

export type dialogExtraDataType = {
    title?: string,
    message?: string,
    messageLines?: string[],
}

export type dialogInfoType = {
    dialogType: DIALOG_TYPE;
    callback: (e: any) => void;
    extraData: dialogExtraDataType;
};

// export const : {
//     msgHandler: MessageHandler,
//     gpadCtrl: GamepadController,
//     openDialog: (type: DIALOG_TYPE, extraData: dialogExtraDataType, callback: (d: dialogExtraDataType) => (dialogExtraDataType | void)) => (b: String | Boolean | null | ((dialogExtraDataType) => dialogExtraDataType)) => void,
//     showLoadingUi: (msgId: LOADING_MESSAGE, customLoadingMessage?: string) => void,
//     hideLoadingUi: (msgId: LOADING_MESSAGE) => void,
//     addTooltip: (node: Element, config: { label: string, placement: Placement, timeout?: number }, addListeners?: boolean) => void
// } = {
//     msgHandler: null,
//     gpadCtrl: null,
//     openDialog: null, //(type, extraData, callback) => { return (b) => { } },
//     showLoadingUi: null,
//     hideLoadingUi: null,
//     addTooltip: null,
// };

export interface RovMovementVector {
    velocityX: number,
    velocityY: number,
    velocityZ: number,
    angularVelocityYaw: number,
    buttonBitmask: number,
}

export enum VideoSource {
    None = "",
    Livekit = "LK",
    SimplePeer = "SP",
}

export const debugPageModeActive: nStoreT<boolean> = nStore(false);
export const fullscreenOpen: nStoreT<boolean> = nStore(false);
export const sidebarExpanded: nStoreT<boolean> = nStore(false);
export const tutorialModeActive: nStoreT<boolean> = nStore(false);
export const throttleGain: nStoreT<number> = nStore(50);
export const armButtonPressed = nStore(false);

export const isRovDriver: nStoreT<boolean> = nStore(false);
export const currentRovDriverId: nStoreT<string> = nStore("");
export const currentVideoSource: nStoreT<VideoSource> = nStore(VideoSource.None);
export const takenLivekitUsernames: nStoreT<Set<string>> = nStore(new Set());

export const rovDrivingVector: nStoreT<RovMovementVector> = nStore({
    velocityX: 0,
    velocityY: 0,
    velocityZ: 0,
    angularVelocityYaw: 0,
    buttonBitmask: 0,
});
