<script lang="ts">
  import "../app.css";
  import { onDestroy, onMount } from "svelte";
  import { initializeStores } from "@skeletonlabs/skeleton";
  import { Modal, Toast } from "@skeletonlabs/skeleton";
  import { setupToasts, showToastMessage, ToastSeverity } from "../js/toastMessageManager";
  import { setupModals } from "../components/Modals/modals";
  import { RovActions } from "../js/rovActions";

  // Floating UI for Popups
  import { storePopup } from "@skeletonlabs/skeleton";
  import { computePosition, autoUpdate, flip, shift, offset, arrow, autoPlacement } from "@floating-ui/dom";
  import RovSelector from "../components/RovSelector.svelte";
  import LoadingIndicator from "../components/LoadingIndicator.svelte";
  import { frontendConnMngr } from "../js/frontendConnManager";
  import { page } from "$app/stores";
  import LogTimeline from "../components/Modals/LogTimeline.svelte";
  import TestDriveTut from "../components/Modals/Tutorials/TestDriveTut.svelte";
  import FlyModesTut from "../components/Modals/Tutorials/FlyModesTut.svelte";
  import { type LogEntry, mainLogr } from "../js/shared/logging";
  import { currentServerTimeOffset, perfUnixTimeNow, unixTimeNow } from "../js/shared/time";
  import { getGpadCtrl } from "../js/gamepad";
  import { debugModeOn, fullscreenOpen } from "../js/globalContext";
  import { frontendStartupFlow } from "../js/startupFlow";
  import { URL_PARAMS } from "../js/frontendConsts";

  // DISABLE VITE HOT MOUDLE RELOADING:
  if (import.meta.hot) {
    import.meta.hot.accept(() => import.meta.hot.invalidate());
    // import.meta.hot.on("vite:beforeFullReload", () => {
    //   throw "(skipping full reload)";
    // });
  }

  initializeStores();
  setupToasts();
  const MODAL_COMPONENTS = setupModals();
  storePopup.set({ computePosition, autoUpdate, autoPlacement, flip, shift, offset, arrow });
  $: isRolePage = !$page.error && $page.route.id !== "/";

  // Store logs in local storage
  let logStoringInterval: NodeJS.Timeout;
  const storeLogs = () => {
    mainLogr.sendLogsAllowed = true;
    logStoringInterval = setInterval(() => {
      mainLogr.sendQueuedLogs((_, msg, id) => {
        localStorage.setItem("log_" + id, msg);
        return Promise.resolve(true);
      });
    }, 5000);
  };

  const getStoredLogs = () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("log_")) {
        const jsonLog = localStorage.getItem(key);
        if (jsonLog) {
          const log = JSON.parse(jsonLog) as LogEntry;
          mainLogr.addLog(log.level, log.args, log.trace, log.kind, log.origin, log.timestamp);
        }
      }
    }
  };

  // Check server time in case the user's clock is off
  let serverTimeCheckInterval: NodeJS.Timeout;
  const checkServerTime = () => {
    const TEN_MINUTES = 600_000; // in ms
    const timeOffset = currentServerTimeOffset();
    if (timeOffset === null) return;
    if (Math.abs(timeOffset) > TEN_MINUTES) {
      console.log("Client device - Server time offset is large:", timeOffset);
      showToastMessage(`<h4 class="h4 mb-1">The clock on this device is off</h4>Please set the date & time in your computer settings`, 15000, false, ToastSeverity.warning);
    }
    clearInterval(serverTimeCheckInterval);
  };

  onMount(() => {
    debugModeOn.set(URL_PARAMS.DEBUG_MODE);

    // pull stored logs from local storage
    getStoredLogs();

    const fullscreenChange = () => {
      fullscreenOpen.set(document.fullscreenElement !== null);
    };

    const beforeunload = () => {
      //TODO uncomment
      // frontendConnMngr.close();
    };

    document.addEventListener("fullscreenchange", fullscreenChange);
    window.addEventListener("beforeunload", beforeunload);

    serverTimeCheckInterval = setInterval(checkServerTime, 2000);
    checkServerTime();

    // start app:
    frontendStartupFlow.start();
    RovActions.startRequiredMsgLoop();
    return () => {
      window.removeEventListener("beforeunload", beforeunload);
      document.removeEventListener("fullscreenchange", fullscreenChange);
    };
  });

  onDestroy(() => {
    clearInterval(logStoringInterval);
    clearInterval(serverTimeCheckInterval);
    RovActions.stopRequiredMsgLoop();
    frontendConnMngr.close();
    getGpadCtrl().cleanup();
  });
</script>

<Modal height="h-auto max-h-screen" width="w-modal max-w-full" zIndex="z-40" regionBackdrop="!overflow-y-auto" components={MODAL_COMPONENTS} />
<Toast position="b" zIndex="z-50" shadow="shadow-3xl ring-2 ring-black" width="w-fit max-w-full" padding="py-3 px-4 lg:py-4 lg:px-4" max={5} />

<slot />
{#if isRolePage}
  <RovSelector />
  <LoadingIndicator />
{/if}
