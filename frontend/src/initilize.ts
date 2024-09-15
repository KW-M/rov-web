import { frontendConnMngr } from './js/frontendConnManager';
import { gpadCtrl } from './js/gamepad';
import { debugPageModeActive, fullscreenOpen } from './js/globalContext';
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
        frontendConnMngr.close();
    }

    // start app:
    frontendStartupFlow.start();
    RovActions.startRequiredMsgLoop();
}
