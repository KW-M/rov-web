import { default as nStore, type nStoreT } from "../../../shared/js/libraries/nStore";

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

export const appReady: nStoreT<boolean> = nStore(false);
export const debugPageModeActive: nStoreT<boolean> = nStore(false);
export const stressTest: nStoreT<boolean> = nStore(false);
export const fullscreenOpen: nStoreT<boolean> = nStore(false);

export const peerServerConfig: nStoreT<any | null> = nStore(null);
export const rovIpAddr: nStoreT<string> = nStore("raspberrypi.local");
export const rovPeerIdEndNumber: nStoreT<number> = nStore(0);
export const attemptingNewRovPeerId: nStoreT<boolean> = nStore(false);
export const isRovDriver: nStoreT<boolean> = nStore(false);
export const ourPeerId: nStoreT<string> = nStore("No Peer Id");
export const rovMainVideoTrack: nStoreT<MediaStreamTrack | null> = nStore(null);
export const rovVideoStream: nStoreT<MediaStream | null> = nStore(null);
