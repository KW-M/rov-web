import { frontendConnMngr } from './js/frontendConnManager';
import { gpadCtrl } from './js/gamepad';
import { debugPageModeActive, fullscreenOpen, ourPeerId, rovPeerIdEndNumber } from './js/globalContext';
import { RovActions } from './js/rovActions';
import { frontendStartupFlow } from './js/startupFlow';
import { bindNumberSvelteStoreToLocalStorage, bindStringSvelteStoreToLocalStorage, getURLQueryStringVariable } from './js/util';

// DISABLE VITE HOT MOUDLE RELOADING:
if (import.meta.hot)
    import.meta.hot.accept(() => import.meta.hot.invalidate())

export const initPage = () => {

    debugPageModeActive.set(getURLQueryStringVariable("debug") != undefined);

    document.addEventListener('fullscreenchange', (e) => {
        fullscreenOpen.set(document.fullscreenElement !== null);
    });

    window.onbeforeunload = () => {
        frontendConnMngr.disconnect();
    }

    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('/service-worker.js')
    // }

    // Use pagehide instead of unload to ensure the page cash isn't broken
    // https://web.dev/bfcache/#optimize-your-pages-for-bfcache
    // window.addEventListener('pagehide', () => {
    //   // TODO: Close connections
    //   connectionManager.cleanup();
    // });

    // // page is loaded or restored from bfcache.
    // window.addEventListener('pageshow', () => {
    //   // TODO: Reopen connections
    //   connectionManager.start();
    // });

    // -- init svelte stores --
    bindNumberSvelteStoreToLocalStorage("rovPeerIdEndNumber", rovPeerIdEndNumber, 0);
    bindStringSvelteStoreToLocalStorage("ourPeerId", ourPeerId);

    // start app:
    frontendStartupFlow.start();
    gpadCtrl.start(RovActions.gamepadAxisTriggers.bind(RovActions), RovActions.gamepadButtonTriggers.bind(RovActions), 10);
    RovActions.startRequiredMsgLoop();

}
