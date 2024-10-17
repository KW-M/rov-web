<script lang="ts">
  import GamepadLeftSvg from "../assets/gamepad/optimized/display-gamepad-left.svg?raw";
  import GamepadRightSvg from "../assets/gamepad/optimized/display-gamepad-right.svg?raw";

  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { RovActions } from "../js/rovActions";
  import { getGpadCtrl } from "../js/gamepad";
  import { browser } from "$app/environment";
  import { GamepadUi } from "../js/gamepad-ui";
  import { autopilotArmed } from "../js/vehicleStats";

  /**  @type {HTMLElement}  */
  let GPAD_DISPLAY_CONTAINER;
  export let collapsedMode = false; //$rovDataChannelConnState === ConnectionState.connected || $rovDataChannelConnState === ConnectionState.connecting || $rovDataChannelConnState === ConnectionState.reconnecting || $peerServerConnState === ConnectionState.connecting || $peerServerConnState === ConnectionState.reconnecting || $peerServerConnState === ConnectionState.disconnected;

  export let visible: boolean = false;
  export let tooltipDelay: number = 0;
  let gpadUi: GamepadUi;
  $: rovArmed = $autopilotArmed;

  onMount(() => {
    if (browser) {
      if (!GPAD_DISPLAY_CONTAINER) console.error("missing GPAD_DISPLAY_CONTAINER", GPAD_DISPLAY_CONTAINER);
      const gpadCtrl = getGpadCtrl();
      gpadCtrl.start(RovActions.gamepadAxisTriggers, RovActions.gamepadButtonTriggers);
      gpadUi = new GamepadUi(gpadCtrl.gpadApiWrapper, gpadCtrl.gpadEmulator, GPAD_DISPLAY_CONTAINER, tooltipDelay);
    }
  });

  onDestroy(() => {
    if (browser) {
      gpadUi.cleanup();
      // NOTE: gpadCtrl is stopped when the main layout is unloaded
    }
  });
</script>

<div bind:this={GPAD_DISPLAY_CONTAINER} class="contents">
  <!-- Gamepad joystick touch start areas -->
  <div id="gamepad-joystick-touch-area-left" class="gamepad-joystick-touch-area" />

  <div id="gamepad-joystick-touch-area-right" class="gamepad-joystick-touch-area" />

  <div class:hidden={collapsedMode} class="inset-0 opacity-100 absolute pointer-events-none" transition:fade={{ duration: 100 }}>
    <!-- SPLIT gamepad left -->
    <div class="gpad-display gpad-display-left" class:hidden={!visible}>
      {@html GamepadLeftSvg}
    </div>

    <!-- SPLIT gamepad right -->
    <div class="gpad-display gpad-display-right" class:hidden={!visible} class:rov-armed={$autopilotArmed}>
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
  <!-- <button
    on:click={() => {
      collapsedMode = !collapsedMode;
    }}>{collapsedMode ? "Show Gamepads" : "Hide Gamepads"}</button
  > -->
</div>

<style lang="postcss">
  /* ********* Onscreen Gamepad Related ********* */
  /* *********  Gamepad Display Related ********* */

  .gamepad-joystick-touch-area {
    position: absolute;
    bottom: 0;
    cursor: all-scroll;
    width: 10cm;
    height: 10cm;
    max-height: 50vh;
    max-width: 33vw;
    background: #000;

    background-color: #0c61d800;
    pointer-events: all;
  }

  .gamepad-joystick-touch-area#gamepad-joystick-touch-area-left {
    left: 0;
  }

  .gamepad-joystick-touch-area#gamepad-joystick-touch-area-right {
    right: 0;
  }

  /* gamepad related styles */
  .gpad-display {
    display: contents;
  }

  :global(.gpad-display svg) {
    position: absolute;
    user-select: none;
    width: max-content;
    bottom: 0;
    max-height: 14cm;
    pointer-events: none;
    z-index: 1;
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

  :global(.gpad-display.rov-armed svg .go-icon) {
    visibility: hidden;
  }

  :global(.gpad-display:not(.rov-armed) svg .stop-icon) {
    visibility: hidden;
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
</style>
