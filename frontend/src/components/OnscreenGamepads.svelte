<script lang="ts">
  import { ConnectionState } from "../js/consts";
  import { appReady } from "../js/globalContext";
  import GamepadLeftSvg from "../assets/gamepad/optimized/display-gamepad-left.svg?raw";
  import GamepadRightSvg from "../assets/gamepad/optimized/display-gamepad-right.svg?raw";
  import { gpadCtrl } from "../js/gamepad";
  import type { nStoreT } from "../js/shared/libraries/nStore";
  import { oneShotSubscribe } from "../js/shared/util";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  /**  @type {HTMLElement}  */
  let GPAD_DISPLAY_CONTAINER;
  let collapsedMode = false; //$rovDataChannelConnState === ConnectionState.connected || $rovDataChannelConnState === ConnectionState.connecting || $rovDataChannelConnState === ConnectionState.reconnecting || $peerServerConnState === ConnectionState.connecting || $peerServerConnState === ConnectionState.reconnecting || $peerServerConnState === ConnectionState.disconnected;

  export let visible: boolean = false;
  // export let disabled: boolean = false;
  // $: if (visible && !disabled) {
  //   gpadCtrl.clearExternalEventListenerCallbacks();
  // } else {
  //   gpadCtrl.setupGamepadEvents(10);
  // }

  // TODO? switch to onMount()?
  onMount(() => {
    gpadCtrl.setupOnscreenGamepad(GPAD_DISPLAY_CONTAINER);
  });
  // oneShotSubscribe(appReady, () => {
  //   gpadCtrl.start();
  //   gpadCtrl.setupOnscreenGamepad(GPAD_DISPLAY_CONTAINER);
  // });
</script>

<!-- <button
  on:click={() => {
    collapsedMode = !collapsedMode;
  }}>{collapsedMode ? "Show Gamepads" : "Hide Gamepads"}</button
> -->
<div id="gamepad-container" bind:this={GPAD_DISPLAY_CONTAINER} class:hidden={collapsedMode} class="inset-0 opacity-30 absolute pointer-events-none" transition:fade={{ duration: 100 }}>
  <!-- Gamepad joystick touch start areas -->
  <div id="gamepad-joystick-touch-area-left" class="gamepad-joystick-touch-area" />
  <div id="gamepad-joystick-touch-area-right" class="gamepad-joystick-touch-area" />

  <!-- SPLIT gamepad left -->
  <div class="gpad-display gpad-display-left" class:hidden={!visible}>
    {@html GamepadLeftSvg}
  </div>

  <!-- SPLIT gamepad right -->
  <div class="gpad-display gpad-display-right" class:hidden={!visible}>
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
</div>

<style>
  /* ********* Onscreen Gamepad Related ********* */
  /* *********  Gamepad Display Related ********* */

  :global(.gpad-display) {
    display: contents;
  }

  :global(.gpad-display svg) {
    position: absolute;
    user-select: none;
    width: max-content;
    bottom: 0;
    max-height: 14cm;
    pointer-events: none;
    /* z-index: 100; */
  }

  :global(.gpad-display-left svg) {
    left: 0;
    transform: translateX(-20%);
  }

  :global(.gpad-display-right svg) {
    right: 0;
    transform: translateX(20%);
  }

  :global(.gpad-display-full svg) {
    left: 50%;
    width: 100%;
    max-width: 100vw;
    transform: translateX(-50%);
  }

  :global(.gpad-highlight) {
    opacity: 0;
  }

  :global(.gpad-highlight.pressed.touched) {
    opacity: 1;
  }

  :global(.gpad-highlight.touched) {
    opacity: 0.5;
  }

  :global(.direction_highlight) {
    opacity: 0;
  }

  :global(.direction_highlight.moved) {
    opacity: 0.8;
  }

  :global(#l_touch_targets > *, #r_touch_targets > *) {
    visibility: hidden;

    /* cursor: none; */
    cursor: pointer;
    pointer-events: all;
  }

  .gamepad-joystick-touch-area {
    position: absolute;
    bottom: 0;

    width: 50%;
    height: 10cm;

    z-index: 0;
    /* background-color: #0c61d860; */
    pointer-events: none;
  }

  .gamepad-joystick-touch-area#gamepad-joystick-touch-area-left {
    left: 0;
  }

  .gamepad-joystick-touch-area#gamepad-joystick-touch-area-right {
    right: 0;
  }
</style>
