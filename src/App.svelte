<script>
  import { onMount, onDestroy } from "svelte";
  import { get } from "svelte/store";
  import { inspect } from "@xstate/inspect";
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";

  import DialogSpawner from "./components/DialogSpawner.svelte";
  import RovSelector from "./components/RovSelector.svelte";
  import TopBar from "./components/TopBar.svelte";
  import OnscreenGamepads from "./components/OnscreenGamepads.svelte";

  import { ClassInstances, debugXstateMode, ourPeerId, peerServerConnState, rovDataChannelConnState, rovPeerIdEndNumber, rovVideoStreamConnState } from "./lib/globalContext";
  import { getURLQueryStringVariable } from "./lib/util";
  import { ConnectionManager } from "./lib/connectionManager";
  import { MessageHandler } from "./lib/messageHandler";

  import { runSiteInitMachine } from "./lib/siteInit";
  import { hideLoadingUi, showLoadingUi, showROVConnectedUi, showROVConnectingUi, showROVDisconnectedUi, showToastMessage } from "./lib/ui";
  import { RovActions } from "./lib/rovActions";
  import { ConnectionState } from "./lib/consts";
  import { calculateDesiredMotion } from "./lib/rovUtil";
  import { GamepadController } from "./lib/gamepad";
  import VideoPlayer from "./components/VideoPlayer.svelte";

  debugXstateMode.set(!!getURLQueryStringVariable("debug"));
  rovPeerIdEndNumber.set(parseInt(localStorage.getItem("rovPeerIdEndNumber") || "0"));
  ourPeerId.set(localStorage.getItem("ourPeerId") || null);
  ourPeerId.subscribe((newVal) => {
    localStorage.setItem("ourPeerId", newVal);
  });
  ClassInstances["gpadCtrl"] = new GamepadController(100);
  let clearPingLoop = null;

  if (get(debugXstateMode)) {
    inspect({
      iframe: false,
    });
  }

  // $: {
  //   if ($rovDataChannelConnState == ConnectionState.connected) {
  //     showROVConnectedUi();
  //     clearPingLoop = RovActions.startPingLoop();
  //   } else if ($rovDataChannelConnState == ConnectionState.connecting) {
  //     console.debug("ROV connecting");
  //     showROVConnectingUi();
  //     if (clearPingLoop) clearPingLoop();
  //   } else {
  //     console.debug("ROV disconnected");
  //     showROVDisconnectedUi();
  //   }
  // }

  $: if ($rovDataChannelConnState == ConnectionState.connecting) {
    if (clearPingLoop) clearPingLoop();
    ClassInstances.gpadCtrl.clearExternalEventListenerCallbacks();
    showROVConnectingUi(ClassInstances.connManager && ClassInstances.connManager.currentTargetRovId);
  } else if ($rovDataChannelConnState == ConnectionState.reconnecting) {
    if (clearPingLoop) clearPingLoop();
    ClassInstances.gpadCtrl.clearExternalEventListenerCallbacks();
    showLoadingUi("webrtc-reconnecting");
    showROVConnectingUi(ClassInstances.connManager && ClassInstances.connManager.currentTargetRovId);
    showLoadingUi("webrtc-connecting");
  } else if ($rovDataChannelConnState == ConnectionState.disconnected) {
    if (clearPingLoop) clearPingLoop();
    ClassInstances.gpadCtrl.clearExternalEventListenerCallbacks();
    showROVDisconnectedUi();
    hideLoadingUi("webrtc-reconnecting");
    hideLoadingUi("webrtc-connecting");
  } else if ($rovDataChannelConnState == ConnectionState.connected) {
    showROVConnectedUi();
    showToastMessage("Connected to ROV!", 1000);
    // setupGamepadEvents(250);
    clearPingLoop = RovActions.startPingLoop();
  }

  onMount(() => {
    let ignoreInitalPeerState = true;
    peerServerConnState.subscribe((serverConnState) => {
      if (ignoreInitalPeerState) {
        ignoreInitalPeerState = false;
        return;
      }
      console.log("peerServerConnState: ", serverConnState);
      if (serverConnState == ConnectionState.connecting) {
        showLoadingUi("server-connecting");
      } else if (serverConnState == ConnectionState.reconnecting) {
        hideLoadingUi("server-reconnecting");
      } else if (serverConnState == ConnectionState.disconnected) {
        hideLoadingUi("server-connecting");
        hideLoadingUi("server-reconnecting");
        showROVDisconnectedUi();
      } else if (serverConnState == ConnectionState.connected) {
        hideLoadingUi("server-connecting");
        hideLoadingUi("server-reconnecting");
      }
    });

    let ignoreInitalDataState = true;
    // rovDataChannelConnState.subscribe((dcState) => {
    //   if (ignoreInitalDataState) {
    //     ignoreInitalDataState = false;
    //     return;
    //   }
    //   console.log("rovDataChannelConnState: ", dcState);

    // });

    runSiteInitMachine((eventName) => {
      hideLoadingUi("internet-check");
      let msgHandler = (ClassInstances.msgHandler = MessageHandler);
      let connMngr = (ClassInstances.connManager = new ConnectionManager(MessageHandler.handleRecivedMessage));
      msgHandler.setSendMessageCallback(connMngr.sendMessageToCurrentRov.bind(connMngr));
      connMngr.start();

      // setCurrentRovName();
      // setupConnectBtnClickHandler(RovActions.connectToRov);
      // setupDisconnectBtnClickHandler(RovActions.disconnectFromRov);
    });
  });

  onDestroy(() => {
    console.log("cleaning up");

    ClassInstances.connManager && ClassInstances.connManager.cleanup();
  });
</script>

<main>
  <DialogSpawner />
  <SvelteToast options={{ reversed: true, intro: { y: 192 }, pausable: true, classes: ["toast-msg"] }} />

  <TopBar />
  <RovSelector />
  <VideoPlayer />
  <OnscreenGamepads />
</main>

<style>
</style>
