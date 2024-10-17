<script lang="ts">
  import { fade } from "svelte/transition";
  import enableButtonSvg from "../assets/gamepad/optimized/enable-button.svg?raw";
  import { onMount } from "svelte";
  import { autopilotArmed } from "../js/vehicleStats";
  import { changesSubscribe } from "../js/shared/util";
  import { armButtonPressed, currentRovDriverId, isRovDriver } from "../js/globalContext";
  import { RovActions } from "../js/rovActions";
  import { latestGamepadAxisState } from "../js/gamepad";
  armButtonPressed;

  const ARMRATE = 2;
  const DISARMRATE = 6;

  let visible = false;
  let holdPercent = 0;
  let holdDone = false;
  let tryingToDrive = false;
  $: otherUserIsDriver = $currentRovDriverId && !$isRovDriver;

  let timeoutId: NodeJS.Timeout;
  const flashVisible = (delay) => {
    visible = true;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      visible = false;
      setTimeout(() => {
        if (!visible) tryingToDrive = false;
      }, 100);
    }, delay);
  };

  const updateHoldPercent = () => {
    const rate = autopilotArmed.get() ? DISARMRATE : ARMRATE;
    const delta = armButtonPressed.get() ? rate : -6;

    holdPercent = Math.min(100, Math.max(0, holdPercent + delta));
    holdDone = holdPercent === 100;
    if (holdPercent === 0) return;
    else if (holdPercent === 100) {
      flashVisible(1000);
      //   autopilotArmed.update((prev) => !prev);
      const armed = autopilotArmed.get();
      if (!armed || (!isRovDriver.get() && tryingToDrive)) RovActions.takeControl();
      else RovActions.disarm();
    } else requestAnimationFrame(updateHoldPercent);
  };

  onMount(() => {
    changesSubscribe(autopilotArmed, (armed) => {
      flashVisible(2000);
    });
    changesSubscribe(latestGamepadAxisState, (axes) => {
      const total = axes.reduce((acc, val) => acc + Math.abs(val), 0);
      if (total < 0.15) return;
      if (isRovDriver.get() && autopilotArmed.get()) return;
      tryingToDrive = true;
      flashVisible(isRovDriver.get() ? 1500 : 6000);
    });
    changesSubscribe(armButtonPressed, (pressed) => {
      if (pressed) {
        holdPercent = 0;
        flashVisible(1500);
        requestAnimationFrame(updateHoldPercent);
      }
    });
  });
</script>

<div class:opacity-100={visible} class="absolute left-1/2 bottom-1/2 z-50 opacity-0 -translate-x-1/2 -translate-y-1/2 border-0 border-surface-500 backdrop-blur-sm text-center whitespace-nowrap rounded-3xl max-h-full shadow-2xl overflow-hidden prose prose-invert transition-opacity pointer-events-none select-none">
  {#if otherUserIsDriver && tryingToDrive}
    <div class="py-4 bg-yellow-500 m-0 px-6 text-black">
      <h2 class="h2 m-0 text-black">{$currentRovDriverId} is Driving</h2>
      <!-- <br />
      <h4 class="h4 m-0 text-black">Thrusters Disabled</h4> -->
    </div>
  {:else if $autopilotArmed === true}
    <h2 class="h2 py-4 bg-success-500 m-0 text-black px-6">Thrusters Enabled</h2>
  {:else}
    <h2 class="h2 py-4 bg-orange-500 m-0 text-black px-6">Thrusters Disabled</h2>
  {/if}

  <div class="bg-black/80 px-6 py-4 relative">
    <div class="absolute inset-0 bg-opacity-80 bg-gradient-to-b from-orange-500 to-success-500 -z-10 transition-opacity" class:!bg-gradient-to-t={$autopilotArmed} class:opacity-0={holdDone} class:duration-500={holdDone} style={`transform:translateX(-${100 - holdPercent}%)`}></div>

    <b class="relative">HOLD to {otherUserIsDriver ? "TAKE CONTROL" : $autopilotArmed ? "DISABLE" : "ENABLE"}</b>
    <div class="flex justify-center items-center z-10">
      <kbd class="variant-filled px-6 py-0.5 scale-150 mr-9 ml-8">Space</kbd>
      <b class="h2 mx-2.5">/</b>
      <div class="gpad-btn size-16 inline-block" class:rov-armed={$autopilotArmed}>
        {@html enableButtonSvg}
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  :global(.gpad-btn svg) {
    user-select: none;
    width: 100%;
    height: 100%;
  }

  :global(.gpad-btn.rov-armed svg .go-icon) {
    visibility: hidden;
  }

  :global(.gpad-btn:not(.rov-armed) svg .stop-icon) {
    visibility: hidden;
  }
</style>
