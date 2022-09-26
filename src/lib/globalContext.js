import { writable } from 'svelte/store';
import { ConnectionState } from './consts';

export const ClassInstances = {
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

export const thisPeer = writable(null);
export const gpad = writable(null);

export const peerServerConnState = writable(ConnectionState.disconnected);
export const rovDataChannelConnState = writable(ConnectionState.disconnected);
export const rovVideoStreamConnState = writable(ConnectionState.disconnected);
