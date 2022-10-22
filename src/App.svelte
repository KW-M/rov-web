<script>
  import { onMount, onDestroy } from "svelte";
  import { inspect } from "@xstate/inspect";

  import { ConnectionState, LOADING_MESSAGE } from "./lib/consts";
  import { appReady, ClassInstances, debugXstateMode, ourPeerId, peerServerConnState, rovDataChannelConnState, rovPeerIdEndNumber } from "./lib/globalContext";

  import { ConnectionManager } from "./lib/connectionManager";
  import { MessageHandler } from "./lib/messageHandler";
  import { GamepadController } from "./lib/gamepad";
  import { RovActions } from "./lib/rovActions";
  import { runSiteInitMachine } from "./lib/siteInit";
  import { showToastMessage } from "./lib/ui";
  import { getURLQueryStringVariable } from "./lib/util";
  import { getROVName } from "./lib/rovUtil";

  import { SvelteToast } from "@zerodevx/svelte-toast";
  import DialogSpawner from "./components/DialogSpawner.svelte";
  import RovSelector from "./components/RovSelector.svelte";
  import TopBar from "./components/TopBar.svelte";
  import OnscreenGamepads from "./components/OnscreenGamepads.svelte";
  import LoadingIndicator from "./components/LoadingIndicator.svelte";
  import VideoPlayer from "./components/VideoPlayer.svelte";
  import SensorDisplay from "./components/SensorDisplay.svelte";
  import HelpTooltips from "./components/HelpTooltips.svelte";
  import AhrsViz from "./components/AHRSViz.svelte";

  ClassInstances.gpadCtrl = new GamepadController(100);
  const debugModeActive = getURLQueryStringVariable("debug") != undefined;
  if (debugModeActive) {
    inspect({ iframe: false });
  }
  debugXstateMode.set(debugModeActive);
  rovPeerIdEndNumber.set(parseInt(localStorage.getItem("rovPeerIdEndNumber") || "0"));
  ourPeerId.set(localStorage.getItem("ourPeerId") || null);
  ourPeerId.subscribe((newVal) => {
    localStorage.setItem("ourPeerId", newVal);
  });

  $: if ($appReady === true) {
    if ($rovDataChannelConnState == ConnectionState.connecting) {
      ClassInstances.showLoadingUi(LOADING_MESSAGE.webrtcConnecting, "Searching for " + getROVName($rovPeerIdEndNumber));
      ClassInstances.gpadCtrl.clearExternalEventListenerCallbacks();
      RovActions.stopPingLoop();
    } else if ($rovDataChannelConnState == ConnectionState.reconnecting) {
      ClassInstances.showLoadingUi(LOADING_MESSAGE.webrtcReconnecting);
      ClassInstances.gpadCtrl.clearExternalEventListenerCallbacks();
      RovActions.stopPingLoop();
    } else if ($rovDataChannelConnState == ConnectionState.disconnected) {
      ClassInstances.gpadCtrl.clearExternalEventListenerCallbacks();
      ClassInstances.hideLoadingUi(LOADING_MESSAGE.webrtcReconnecting);
      ClassInstances.hideLoadingUi(LOADING_MESSAGE.webrtcConnecting);
      RovActions.stopPingLoop();
    } else if ($rovDataChannelConnState == ConnectionState.connected) {
      showToastMessage("Connected to ROV!", 1000);
      // setupGamepadEvents(250);
      RovActions.startPingLoop();
    }

    // as svelte reactive statement:
    if ($peerServerConnState == ConnectionState.connecting) {
      ClassInstances.showLoadingUi(LOADING_MESSAGE.serverConnecting);
    } else if ($peerServerConnState == ConnectionState.reconnecting) {
      ClassInstances.hideLoadingUi(LOADING_MESSAGE.serverReconnecting);
    } else if ($peerServerConnState == ConnectionState.disconnected || $peerServerConnState == ConnectionState.connected) {
      ClassInstances.hideLoadingUi(LOADING_MESSAGE.serverConnecting);
      ClassInstances.hideLoadingUi(LOADING_MESSAGE.serverReconnecting);
    }
  }

  onMount(() => {
    appReady.set(true);
    ClassInstances.showLoadingUi(LOADING_MESSAGE.internetCheck);
    runSiteInitMachine(() => {
      ClassInstances.hideLoadingUi(LOADING_MESSAGE.internetCheck);
      let msgHandler = (ClassInstances.msgHandler = MessageHandler);
      let connMngr = (ClassInstances.connManager = new ConnectionManager(MessageHandler.handleRecivedMessage));
      msgHandler.setSendMessageCallback(connMngr.sendMessageToCurrentRov.bind(connMngr));
      connMngr.start();
    });
  });

  onDestroy(() => {
    console.log("cleaning up");
    RovActions.stopPingLoop();
    RovActions.disconnectFromRov();
    ClassInstances.connManager && ClassInstances.connManager.cleanup();
    ClassInstances.gpadCtrl.gpadEmulator.cleanup();
  });
</script>

<main>
  <!-- UI Layout -->
  <VideoPlayer />
  <OnscreenGamepads />
  <SensorDisplay />

  <!-- UI Spawners -->
  <DialogSpawner />
  <LoadingIndicator />

  <!-- UI Layout -->

  <AhrsViz />
  <TopBar />
  <RovSelector />
  <!-- UI Layout -->
  <SvelteToast options={{ reversed: true, intro: { y: 192 }, pausable: true, classes: ["toast-msg"] }} />
  <HelpTooltips />
</main>

<style>
  main {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
</style>
