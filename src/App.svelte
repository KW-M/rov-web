<script>
  import { onMount, onDestroy } from "svelte";
  import { inspect } from "@xstate/inspect";

  import { ConnectionState, LOADING_MESSAGE } from "./lib/consts";
  import { appReady, debugPageModeActive, gamepadController, ourPeerId, peerServerConnState, rovDataChannelConnState, rovPeerIdEndNumber } from "./lib/globalContext";

  import { connectionManager } from "./lib/connectionManager";
  import { rovMessageHandler } from "./lib/rovMessageHandler";
  import { GamepadController } from "./lib/gamepad";
  import { RovActions } from "./lib/rovActions";
  import { runSiteInitMachine } from "./lib/siteInit";
  import { showToastMessage } from "./lib/ui";
  import { getURLQueryStringVariable } from "./lib/util";
  import { getROVName } from "./lib/rovUtil";

  import { SvelteToast } from "@zerodevx/svelte-toast";
  import DialogSpawner from "./components/dialogs/DialogSpawner.svelte";
  import RovSelector from "./components/RovSelector.svelte";
  import TopBar from "./components/TopBar.svelte";
  import OnscreenGamepads from "./components/OnscreenGamepads.svelte";
  import LoadingIndicator, { showLoadingUi, hideLoadingUi } from "./components/LoadingIndicator.svelte";
  import VideoPlayer from "./components/VideoPlayer.svelte";
  import SensorDisplay from "./components/sensors/SensorDisplay.svelte";
  import HelpTooltips, { addTooltip } from "./components/HelpTooltips.svelte";
  import AhrsViz from "./components/sensors/AHRSViz.svelte";

  let gpadCtrl = new GamepadController(10);
  gamepadController.set(gpadCtrl);
  // if (debugModeActive) {
  //   inspect({ iframe: false });
  // }
  rovPeerIdEndNumber.set(parseInt(localStorage.getItem("rovPeerIdEndNumber") || "0"));
  ourPeerId.set(localStorage.getItem("ourPeerId") || null);
  ourPeerId.subscribe((newVal) => {
    localStorage.setItem("ourPeerId", newVal);
  });

  $: if ($appReady === true) {
    if ($rovDataChannelConnState == ConnectionState.connecting) {
      showLoadingUi(LOADING_MESSAGE.webrtcConnecting, "Searching for " + getROVName($rovPeerIdEndNumber));
      gpadCtrl.clearExternalEventListenerCallbacks();
      RovActions.stopPingLoop();
    } else if ($rovDataChannelConnState == ConnectionState.reconnecting) {
      showLoadingUi(LOADING_MESSAGE.webrtcReconnecting, null);
      gpadCtrl.clearExternalEventListenerCallbacks();
      RovActions.stopPingLoop();
    } else if ($rovDataChannelConnState == ConnectionState.disconnected) {
      gpadCtrl.clearExternalEventListenerCallbacks();
      hideLoadingUi(LOADING_MESSAGE.webrtcReconnecting);
      hideLoadingUi(LOADING_MESSAGE.webrtcConnecting);
      RovActions.stopPingLoop();
    } else if ($rovDataChannelConnState == ConnectionState.connected) {
      showToastMessage("Connected to ROV!", 1000);
      gpadCtrl.setupGamepadEvents(10);
      hideLoadingUi(LOADING_MESSAGE.webrtcReconnecting);
      hideLoadingUi(LOADING_MESSAGE.webrtcConnecting);
      RovActions.startPingLoop();
    }

    // as svelte reactive statement:
    if ($peerServerConnState == ConnectionState.connecting) {
      showLoadingUi(LOADING_MESSAGE.serverConnecting, null);
    } else if ($peerServerConnState == ConnectionState.reconnecting) {
      hideLoadingUi(LOADING_MESSAGE.serverReconnecting);
    } else if ($peerServerConnState == ConnectionState.disconnected || $peerServerConnState == ConnectionState.connected) {
      hideLoadingUi(LOADING_MESSAGE.serverConnecting);
      hideLoadingUi(LOADING_MESSAGE.serverReconnecting);
    }
  }

  onMount(() => {
    // const loading = loadingIndicator.get();
    appReady.set(true);
    showLoadingUi(LOADING_MESSAGE.internetCheck, null);
    runSiteInitMachine(() => {
      hideLoadingUi(LOADING_MESSAGE.internetCheck);
      rovMessageHandler.setSendMessageCallback(connectionManager.sendMessageToCurrentRov.bind(connectionManager));
      connectionManager.start();
      // connMngr.connectToCurrentTargetRov(); /// DON"T DO THIS HERE
    });
  });

  onDestroy(() => {
    RovActions.stopPingLoop();
    // RovActions.disconnectFromRov();
    // connectionManager.cleanup();
    gpadCtrl.gpadEmulator.cleanup();
  });
</script>

<main>
  <!-- UI Spawners -->
  <SvelteToast options={{ reversed: true, intro: { y: 192 }, pausable: true, classes: ["toast-msg"] }} />
  <HelpTooltips />
  <DialogSpawner />
  <LoadingIndicator />

  <VideoPlayer />

  <!-- UI Layout -->
  <VideoPlayer />
  <OnscreenGamepads />
  <SensorDisplay />

  <AhrsViz />
  <TopBar />
  <RovSelector />
  <!-- UI Layout -->
</main>

<style>
  main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
</style>
