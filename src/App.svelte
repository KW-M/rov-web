<script>
  import { onMount, onDestroy } from "svelte";
  import { get } from "svelte/store";
  import { inspect } from "@xstate/inspect";
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";

  import DialogSpawner from "./lib/components/DialogSpawner.svelte";

  import { ClassInstances, debugXstateMode, ourPeerId, peerServerConnState, rovDataChannelConnState, rovPeerIdEndNumber, rovVideoStreamConnState } from "./lib/globalContext";
  import { getURLQueryStringVariable } from "./lib/util";
  import { ConnectionManager } from "./lib/connectionManager";
  import { GamepadController } from "./lib/gamepad";
  import { MessageHandler } from "./lib/messageHandler";

  import { runSiteInitMachine } from "./lib/siteInit";
  import { hideLivestreamUi, hideLoadingUi, setClientPeerIdDisplay, setCurrentRovName, setupConnectBtnClickHandler, setupDisconnectBtnClickHandler, showLivestreamUi, showLoadingUi, showROVConnectedUi, showROVConnectingUi, showROVDisconnectedUi, showToastMessage } from "./lib/ui";
  import { RovActions } from "./lib/rovActions";
  import { ConnectionState } from "./lib/consts";
  import { calculateDesiredMotion } from "./lib/rovUtil";

  debugXstateMode.set(!!getURLQueryStringVariable("debug"));
  rovPeerIdEndNumber.set(parseInt(localStorage.getItem("rovPeerIdEndNumber") || "0"));
  ClassInstances.gpadCtrl = new GamepadController(); /* init gamepad support */
  ourPeerId.set(localStorage.getItem("ourPeerId") || null);
  ourPeerId.subscribe((newVal) => {
    localStorage.setItem("ourPeerId", newVal);
    setClientPeerIdDisplay(newVal);
  });

  console.log(ClassInstances.gpadCtrl);
  if (get(debugXstateMode)) {
    inspect({
      iframe: false,
    });
  }

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

  let ignoreInitalVideoState = true;
  rovVideoStreamConnState.subscribe((videoState) => {
    // if (ignoreInitalVideoState) {
    //   ignoreInitalVideoState = false;
    //   return;
    // }
    console.log("rovVideoStreamConnState: ", videoState);
    if (videoState == ConnectionState.connecting) {
      showLoadingUi("awaiting-video-call");
      hideLivestreamUi();
    } else if (videoState == ConnectionState.reconnecting) {
      showLoadingUi("awaiting-video-call");
      showLivestreamUi();
    } else if (videoState == ConnectionState.disconnected) {
      hideLoadingUi("awaiting-video-call");
      hideLivestreamUi();
    } else if (videoState == ConnectionState.connected) {
      hideLoadingUi("awaiting-video-call");
      showLivestreamUi();
    }
  });

  let ignoreInitalDataState = true;
  rovDataChannelConnState.subscribe((dcState) => {
    if (ignoreInitalDataState) {
      ignoreInitalDataState = false;
      return;
    }
    console.log("rovDataChannelConnState: ", dcState, ClassInstances.gpadCtrl);

    ClassInstances.gpadCtrl.clearExternalEventListenerCallbacks();
    if (dcState == ConnectionState.connecting) {
      showROVConnectingUi(ClassInstances.connManager && ClassInstances.connManager.currentTargetRovId);
    } else if (dcState == ConnectionState.reconnecting) {
      showLoadingUi("webrtc-reconnecting");
      showROVConnectingUi(ClassInstances.connManager && ClassInstances.connManager.currentTargetRovId);
      showLoadingUi("webrtc-connecting");
    } else if (dcState == ConnectionState.disconnected) {
      showROVDisconnectedUi();
      hideLoadingUi("webrtc-reconnecting");
      hideLoadingUi("webrtc-connecting");
    } else if (dcState == ConnectionState.connected) {
      showROVConnectedUi();
      showToastMessage("Connected to ROV!", 1000);
      ClassInstances.gpadCtrl.setupExternalEventListenerCallbacks(
        (gamepad, buttonsChangedMask) => {},
        (gamepad) => {
          var { thrustVector, turnRate } = calculateDesiredMotion(gamepad.axes);
          RovActions.moveRov(thrustVector, turnRate);
        }
      );
    }
  });

  onMount(() => {
    runSiteInitMachine((eventName) => {
      hideLoadingUi("internet-check");

      let msgHandler = (ClassInstances.msgHandler = MessageHandler);
      let connMngr = (ClassInstances.connManager = new ConnectionManager(MessageHandler.handleRecivedMessage));
      msgHandler.setSendMessageCallback(connMngr.sendMessageToCurrentRov.bind(connMngr));
      connMngr.start();

      msgHandler.startPingLoop();

      setCurrentRovName();
      setupConnectBtnClickHandler(RovActions.connectToRov);
      setupDisconnectBtnClickHandler(RovActions.disconnectFromRov);
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
</main>
