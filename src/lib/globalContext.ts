import nStore from './libraries/nStore';
import type { nStoreT } from './libraries/nStore';
import type Peer from 'peerjs';
import { ConnectionState } from './consts.js';
import type { ConnectionManager } from './connectionManager.js';
import type { GamepadController } from './gamepad.js';
import type { MessageHandler } from './messageHandler.js';

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
    isOpen: boolean;
    dialogType: DIALOG_TYPE;
    callback: (e: any) => void;
    extraData: dialogExtraDataType;
};

// export const : {
//     connManager: ConnectionManager,
//     msgHandler: MessageHandler,
//     gpadCtrl: GamepadController,
//     openDialog: (type: DIALOG_TYPE, extraData: dialogExtraDataType, callback: (d: dialogExtraDataType) => (dialogExtraDataType | void)) => (b: String | Boolean | null | ((dialogExtraDataType) => dialogExtraDataType)) => void,
//     showLoadingUi: (msgId: LOADING_MESSAGE, customLoadingMessage?: string) => void,
//     hideLoadingUi: (msgId: LOADING_MESSAGE) => void,
//     addTooltip: (node: Element, config: { label: string, placement: Placement, timeout?: number }, addListeners?: boolean) => void
// } = {
//     connManager: null,
//     msgHandler: null,
//     gpadCtrl: null,
//     openDialog: null, //(type, extraData, callback) => { return (b) => { } },
//     showLoadingUi: null,
//     hideLoadingUi: null,
//     addTooltip: null,
// };

export const appReady: nStoreT<boolean> = nStore(false);
export const debugXstateMode: nStoreT<boolean> = nStore(false);
export const stressTest: nStoreT<boolean> = nStore(false);
export const fullscreenOpen: nStoreT<boolean> = nStore(false);
document.addEventListener('fullscreenchange', (e) => {
    fullscreenOpen.set(document.fullscreenElement !== null);
});

export const peerServerConfig: nStoreT<any | null> = nStore(null);
export const rovIpAddr: nStoreT<string> = nStore("raspberrypi.local");
export const rovPeerIdEndNumber: nStoreT<number> = nStore(0);
export const attemptingNewRovPeerId: nStoreT<boolean> = nStore(false);
export const isRovDriver: nStoreT<boolean> = nStore(false);
export const ourPeerId: nStoreT<string> = nStore("No Peer Id");
export const rovMainVideoTrack: nStoreT<MediaStreamTrack | null> = nStore(null);

export const thisPeer: nStoreT<Peer | null> = nStore(null);
export const connectionManager: nStoreT<ConnectionManager | null> = nStore(null);
export const messageHandler: nStoreT<MessageHandler | null> = nStore(null);
export const gamepadController: nStoreT<GamepadController | null> = nStore(null);

export const peerServerConnState: nStoreT<ConnectionState> = nStore(ConnectionState.disconnected);
export const rovDataChannelConnState: nStoreT<ConnectionState> = nStore(ConnectionState.disconnected);
export const rovVideoStreamConnState: nStoreT<ConnectionState> = nStore(ConnectionState.disconnected);
export const rovVideoStream: nStoreT<MediaStream | null> = nStore(null);
