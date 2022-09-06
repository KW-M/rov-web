const globalContext = window.globalContext = {
    debugXstateMode: false,
    stressTest: false,
    peerServerConfig: {},
    rovIpAddr: "",
    rovPeerIdEndNumber: 0,
    attemptingNewRovPeerId: false,
    thisPeer: null,
    gpad: null,
}

export { globalContext };
