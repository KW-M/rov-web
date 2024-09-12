import { default as nStore, type nStoreT } from "./shared/libraries/nStore";

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
    VelocityX: number,
    VelocityY: number,
    VelocityZ: number,
    AngularVelocityYaw: number,
    ButtonBitmask: number,
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


export const attemptingNewRovPeerId: nStoreT<boolean> = nStore(false);
export const isRovDriver: nStoreT<boolean> = nStore(false);
export const ourPeerId: nStoreT<string> = nStore("No Peer Id");
export const currentVideoSource: nStoreT<VideoSource> = nStore(VideoSource.None);
export const takenLivekitUsernameIds: nStoreT<Set<string>> = nStore(new Set());

export const rovDrivingVector: nStoreT<RovMovementVector> = nStore({
    VelocityX: 0,
    VelocityY: 0,
    VelocityZ: 0,
    AngularVelocityYaw: 0,
    ButtonBitmask: 0,
});
