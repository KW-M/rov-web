import { writable } from 'svelte/store';

export const classInstances = {
    connManager: null,
    msgHandler: null,
    gpad: null,
};

export let connManager = null;

export const debugXstateMode = writable(false);
export const stressTest = writable(false);

export const peerServerConfig = writable({});
export const rovIpAddr = writable("raspberrypi.local");

export const rovPeerIdEndNumber = writable(0);
export const attemptingNewRovPeerId = writable(false);

export const thisPeer = writable(null);
export const gpad = writable(null);
