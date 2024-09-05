<script lang="ts">
  import { Close, Download_done, Drag_handle, Flight_land, Gamepad, Keyboard, Rotate_left, Touch_app, Upload } from "svelte-google-materialdesign-icons";
  import RadioSelectGrid from "../../RadioSelectGrid.svelte";
  import RovViz from "../../3dScene/rovViz.svelte";
  import OnscreenGamepads from "../../OnscreenGamepads.svelte";
  import HelpTooltips from "../../HelpTooltips.svelte";
  import { onDestroy, onMount } from "svelte";
  import { tutorialModeActive } from "../../../js/globalContext";
  import { closeModal, openControlTutModal } from "../modals";
  import { FlightMode } from "../../../js/shared/mavlink2RestMessages";

  export let parent: HTMLElement;
  let flyMode = FlightMode.manual;
  let closeBtn;
  onMount(() => {
    tutorialModeActive.set(true);
  });
  onDestroy(() => {
    tutorialModeActive.set(false);
  });
</script>

<div class="h-full w-full rounded-3xl overflow-hidden shadow-2xl mt-auto flex flex-1 flex-col items-center justify-center relative bg-surface-800 p-4">
  <div class="flex flex-col justify-center align-middle right-2 top-2 absolute">
    <button on:click={() => closeModal()} class="btn btn-icon-lg btn-icon" bind:this={closeBtn}>
      <Close class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
    </button>
  </div>
  <h2 class="h2 m-8 mb-10">Fly Modes</h2>
  <RadioSelectGrid
    bind:value={flyMode}
    variant="-surface"
    options={[
      { value: FlightMode.manual, label: "Manual", icon: Flight_land },
      { value: FlightMode.stabilize, label: "Stabilize", icon: Drag_handle },
      { value: FlightMode.depth_hold, label: "Stabilize Depth", icon: Download_done },
      { value: FlightMode.surface, label: "Surface", icon: Upload },
      { value: FlightMode.acrobatic, label: "Acro", icon: Rotate_left },
    ]}
  />

  <b class="w-full rounded-xl px-8 py-8 text-center">
    {#if flyMode === FlightMode.manual}
      Manual mode is the ROV's basic driving mode. <br /> No stabilization is applied.
    {:else if flyMode === FlightMode.stabilize}
      Stabilize mode is easier to drive as the rov shifts around less <br /> Good for getting started.
    {:else if flyMode === FlightMode.depth_hold}
      Stabilize Depth mode is like Stabilize mode but also holds the ROV at a constant depth. <br /> Good for getting pictures!
      <blockquote class="blockquote variant-ghost-warning max-w-lg mx-auto m-4 p-2">Be careful using this mode at the bottom. The ROV can go crazy & kick up lots of dust when it hits the ground.</blockquote>
    {:else if flyMode === FlightMode.surface}
      Surface mode drives the ROV to the surface and keeps it there. <br /> Good for finding your ROV!
      <blockquote class="blockquote variant-ghost-warning max-w-md mx-auto m-4 p-2">Make sure the rov is not underneath obstacles!</blockquote>
    {:else if flyMode === FlightMode.acrobatic}
      Acro mode drives the rov based on velocity? I think... <br /> Good for tight turns!
      <blockquote class="blockquote variant-ghost-warning max-w-md mx-auto m-4 p-2">Make sure the rov is not underneath obstacles!</blockquote>
    {/if}
  </b>

  <div class="space-x-4">
    <button
      class="btn btn-md variant-outline-surface"
      on:click={() => {
        closeModal();
        openControlTutModal();
      }}>BACK</button
    >
    <button class="btn btn-md variant-filled-primary shadow-md" on:click={() => closeModal()}>DONE</button>
  </div>
</div>
