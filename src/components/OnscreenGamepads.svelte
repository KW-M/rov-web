<script>
  import { ConnectionState } from "../lib/consts";
  import { onMount } from "svelte";
  import { ClassInstances, peerServerConnState, rovDataChannelConnState } from "../lib/globalContext";
  import GamepadLeftSvg from "../assets/optimized/display-gamepad-left.svg?raw";
  import GamepadRightSvg from "../assets/optimized/display-gamepad-right.svg?raw";

  /**  @type {HTMLElement}  */
  let GPAD_DISPLAY_CONTAINER;
  $: collapsedMode = $rovDataChannelConnState === ConnectionState.connected || $rovDataChannelConnState === ConnectionState.connecting || $rovDataChannelConnState === ConnectionState.reconnecting || $peerServerConnState === ConnectionState.connecting || $peerServerConnState === ConnectionState.reconnecting || $peerServerConnState === ConnectionState.disconnected;

  onMount(() => {
    const gpadCtrl = ClassInstances.gpadCtrl;
    if (gpadCtrl) gpadCtrl.setupOnscreenGamepad(GPAD_DISPLAY_CONTAINER);
  });
</script>

<div id="gamepad-container" bind:this={GPAD_DISPLAY_CONTAINER} class={collapsedMode ? "" : "hidden"}>
  <!-- SPLIT gamepad left -->
  <div class="hidden gpad-display gpad-display-left">
    {@html GamepadLeftSvg}
  </div>

  <!-- SPLIT gamepad right -->
  <div class="hidden gpad-display gpad-display-right">
    {@html GamepadRightSvg}
  </div>

  <!-- Gamepad Info -->
  <!-- <div id="gamepad-help-notice">
      <p id="gamepad-connect-notice" class="gamepad-notice left text-lg">Connect a gamepad & press any button to activate</p>

      <p id="too-many-gamepads-notice" style="display: none;" class="gamepad-notice center text-lg">Multiple gamepads connected, only one will be used</p>
      <p class="gamepad-notice right text-lg">Press, click or drag controls to see what they do.</p>
    </div> -->

  <!-- Gamepad Help Tooltip Stuff -->
  <!-- <div id="gamepad-help-tooltip" class="hide-when-not-driver popper-tooltip" role="tooltip">
    <span id="gamepad-help-text">Gamepad Help</span>
  </div> -->

  <!-- Gamepad joystick touch start areas -->
  <div id="gamepad-joystick-touch-area-left" class="gamepad-joystick-touch-area" />
  <div id="gamepad-joystick-touch-area-right" class="gamepad-joystick-touch-area" />
</div>

<style>
  /* ********* Onscreen Gamepad Related ********* */
  :global(.display-gamepad) {
    position: absolute;
    bottom: -12px;

    width: 72%;
    max-width: 47.5vh;
    max-height: 14cm;
    transition: opacity 0.5s ease-in-out;

    pointer-events: none;
  }

  /* .display-gamepad svg {
    bottom: 0;
  } */

  :global(#display-gamepad-left) {
    left: 0;

    transition: transform 0.4s, left 0.4s;
    transform: translateX(-120%);
  }

  :global(#display-gamepad-right) {
    right: 0;

    transition: transform 0.4s, right 0.4s;
    transform: translateX(120%);
  }

  :global(#display-gamepad-full) {
    left: 50%;
    width: 100%;
    max-width: 100vw;

    transition: transform 0.4s, left 0.4s;
    transform: translateX(-50%);
  }

  :global(body.gamepad-help-open #display-gamepad-left) {
    /* bottom: 15px; */
    left: 50% !important;

    transform: translateX(-98%) !important;

    opacity: 1 !important;
  }

  :global(body.gamepad-help-open #display-gamepad-right) {
    right: 50% !important;
    /* bottom: 15px; */

    transform: translateX(98%) !important;

    opacity: 1 !important;
  }

  :global(body.gamepad-help-open #gamepad-help-tooltip) {
    display: block !important;
  }

  :global(body.rov-driver #gamepad-container:not(.gamepad-connected) #display-gamepad-left) {
    transform: translateX(-42%);
  }

  :global(body.rov-driver #gamepad-container:not(.gamepad-connected) #display-gamepad-right) {
    transform: translateX(42%);
  }

  :global(.gpad-btn-highlight) {
    visibility: hidden;

    cursor: pointer;
    pointer-events: all;
  }

  :global(#stick_button_right_highlight) {
    visibility: hidden;
  }

  :global(#stick_button_right_highlight\.gpad-btn-highlight) {
    opacity: 0.5;
  }

  :global(.gpad-btn-highlight.touched) {
    visibility: visible;

    opacity: 0.5;
  }

  :global(.gpad-btn-highlight.pressed) {
    visibility: visible;

    opacity: 1 !important;
  }

  :global(.gpad-arrow-highlight) {
    /* visibility: hidden; */
    pointer-events: none;

    opacity: 0;
  }

  :global(.gpad-arrow-highlight.touched) {
    visibility: visible;
  }

  :global(.gpad-arrow-highlight.axis-moved) {
    visibility: visible;

    opacity: 0.5 !important;
  }

  :global(#stick_button_right_touch_target, #stick_button_left_touch_target) {
    pointer-events: none;
  }

  .gamepad-joystick-touch-area {
    position: fixed;
    bottom: 0;

    width: 50%;
    height: 10cm;

    z-index: 0;
    background-color: #0c61d860;
    pointer-events: all;
  }

  .gamepad-joystick-touch-area#gamepad-joystick-touch-area-left {
    left: 0;
  }

  .gamepad-joystick-touch-area#gamepad-joystick-touch-area-right {
    right: 0;
  }
</style>
