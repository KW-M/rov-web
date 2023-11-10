<script>
  import { onMount, onDestroy } from "svelte";

  import { ConnectionState, LOADING_MESSAGE } from "./js/consts";
  import { appReady, ourPeerId, rovPeerIdEndNumber } from "./js/globalContext";
  import { bindNumberSvelteStoreToLocalStorage, bindStringSvelteStoreToLocalStorage, getURLQueryStringVariable } from "./js/util";

  import { gpadCtrl } from "./js/gamepad";
  import { frontendStartupFlow } from "./js/startupFlow";
  import { RovActions } from "./js/rovActions";

  // [ Component Imports ]
  import TopBar from "./components/TopBar.svelte";
  import AhrsViz from "./components/sensors/AHRSViz.svelte";
  import RovSelector from "./components/RovSelector.svelte";
  import VideoPlayer from "./components/VideoPlayer.svelte";
  import OnscreenGamepads from "./components/OnscreenGamepads.svelte";
  import SensorDisplay from "./components/sensors/SensorDisplay.svelte";
  import Dialogs from "./components/dialogs/Dialogs.svelte";
  import SystemStateMenu from "./components/SystemStateMenu.svelte";
  import LoadingIndicator, { showLoadingUi, hideLoadingUi } from "./components/LoadingIndicator.svelte";
  import HelpTooltips, { addTooltip } from "./components/HelpTooltips.svelte";
  import ToastMessages, { showToastMessage } from "./components/ToastMessages.svelte";

  // -- init svelte stores --
  bindNumberSvelteStoreToLocalStorage("rovPeerIdEndNumber", rovPeerIdEndNumber, 0);
  bindStringSvelteStoreToLocalStorage("ourPeerId", ourPeerId);

  // start app:
  frontendStartupFlow.start();
  gpadCtrl.start(RovActions.gamepadAxisTriggers.bind(RovActions), RovActions.gamepadButtonTriggers.bind(RovActions), 10);
  RovActions.startPingLoop();

  // if (debugModeActive) { inspect({ iframe: false }); }

  // $: if ($appReady === true) {
  //   if ($rovDataChannelConnState == ConnectionState.connecting) {
  //     showLoadingUi(LOADING_MESSAGE.webrtcConnecting, "Searching for " + getROVName($rovPeerIdEndNumber));
  //     RovActions.stopPingLoop();
  //   } else if ($rovDataChannelConnState == ConnectionState.reconnecting) {
  //     showLoadingUi(LOADING_MESSAGE.webrtcReconnecting, null);
  //     RovActions.stopPingLoop();
  //   } else if ($rovDataChannelConnState == ConnectionState.disconnected) {
  //     hideLoadingUi(LOADING_MESSAGE.webrtcReconnecting);
  //     hideLoadingUi(LOADING_MESSAGE.webrtcConnecting);
  //     RovActions.stopPingLoop();
  //   } else if ($rovDataChannelConnState == ConnectionState.connected) {
  //     showToastMessage("Connected to ROV!", 1000);
  //     hideLoadingUi(LOADING_MESSAGE.webrtcReconnecting);
  //     hideLoadingUi(LOADING_MESSAGE.webrtcConnecting);
  //     RovActions.startPingLoop();
  //   }

  //   // as svelte reactive statement:
  //   if ($peerServerConnState == ConnectionState.connecting) {
  //     showLoadingUi(LOADING_MESSAGE.serverConnecting, null);
  //   } else if ($peerServerConnState == ConnectionState.reconnecting) {
  //     hideLoadingUi(LOADING_MESSAGE.serverReconnecting);
  //   } else if ($peerServerConnState == ConnectionState.disconnected || $peerServerConnState == ConnectionState.connected) {
  //     hideLoadingUi(LOADING_MESSAGE.serverConnecting);
  //     hideLoadingUi(LOADING_MESSAGE.serverReconnecting);
  //   }
  // }

  onMount(() => {
    // const loading = loadingIndicator.get();
    appReady.set(true);
    // showLoadingUi(LOADING_MESSAGE.internetCheck, null);
    // runSiteInitMachine(() => {
    //   hideLoadingUi(LOADING_MESSAGE.internetCheck);
    //   rovMessageHandler.setSendMessageCallback(frontendConnMngr.sendMessageToCurrentRov.bind(connectionManager));
    //   // connMngr.connectToCurrentTargetRov(); /// DON"T DO THIS HERE
    // });
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
  <ToastMessages />
  <HelpTooltips />
  <Dialogs />
  <LoadingIndicator />
  <SystemStateMenu />

  <!-- UI Layout -->
  <VideoPlayer />
  <OnscreenGamepads disabled={true} />
  <SensorDisplay />

  <!-- <AhrsViz /> -->
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
