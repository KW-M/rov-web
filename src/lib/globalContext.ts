import type Peer from 'peerjs';
import { Writable, writable } from 'svelte/store';
import type { GamepadApiWrapper } from 'virtual-gamepad-lib/GamepadApiWrapper';
import type { ConnectionManager } from './connectionManager.js';
import { ConnectionState } from './consts.js';
import type { GamepadController } from './gamepad.js';
import type { MessageHandler } from './messageHandler.js';

export enum DIALOG_TYPE {
    Alert = 0,
    Password = 1,
    ScrollingText = 2,
}

type dialogExtraDataType = {
    title?: string,
    message?: string,
    messageLines?: string[],
}

export const ClassInstances: {
    connManager: ConnectionManager,
    msgHandler: MessageHandler,
    gpadCtrl: GamepadController,
    openDialog: (type: DIALOG_TYPE, extraData: dialogExtraDataType, callback: (d: dialogExtraDataType) => (dialogExtraDataType | void)) => (b: String | Boolean | null | ((dialogExtraDataType) => dialogExtraDataType)) => void,
} = {
    connManager: null,
    msgHandler: null,
    gpadCtrl: null,
    openDialog: (type, extraData, callback) => { return (b) => { } },
};

export let connManager = null;

export const debugXstateMode = writable(false);
export const stressTest = writable(false);
export const fullscreenOpen = writable(false);

document.addEventListener('fullscreenchange', (e) => {
    console.log('fullscreenchange', e);
    fullscreenOpen.set(document.fullscreenElement !== null);
});

export const peerServerConfig = writable({});
export const rovIpAddr = writable("raspberrypi.local");

export const rovPeerIdEndNumber = writable(0);
export const attemptingNewRovPeerId = writable(false);
export const isRovDriver = writable(false);
export const ourPeerId = writable("No Peer Id");

// export const thisPeer: Writable<Peer | null> = writable(null);
// export const gpad: Writable<null> = writable(null);

export const peerServerConnState = writable(ConnectionState.disconnected);
export const rovDataChannelConnState = writable(ConnectionState.disconnected);
export const rovVideoStreamConnState = writable(ConnectionState.disconnected);
export const rovVideoStream: Writable<MediaStream | null> = writable(null);
