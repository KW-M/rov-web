<script lang="ts">
  import { Close, Download_done, Drag_handle, Flight_land, Gamepad, Keyboard, Rotate_left, Touch_app, Upload } from "svelte-google-materialdesign-icons";
  import RadioSelectGrid from "../../RadioSelectGrid.svelte";
  import { onDestroy, onMount } from "svelte";
  import { tutorialModeActive } from "../../../js/globalContext";
  import { closeModal, openTestDriveTutModal } from "../modals";
  import { FlightMode } from "../../../js/shared/mavlink2RestMessages";
  import WarningNoticeBlock from "../../NoticeBlocks/WarningNoticeBlock.svelte";
  import SuccessNoticeBlock from "../../NoticeBlocks/SuccessNoticeBlock.svelte";
  import InfoNoticeBlock from "../../NoticeBlocks/InfoNoticeBlock.svelte";

  // export let parent: HTMLElement;
  let flyMode = FlightMode.manual;
  let closeBtn;
  onMount(() => {
    tutorialModeActive.set(true);
  });
  onDestroy(() => {
    tutorialModeActive.set(false);
  });
</script>

<div class="w-full rounded-3xl shadow-2xl mt-auto flex flex-1 flex-col items-center justify-center relative bg-surface-800 p-4">
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
      // { value: FlightMode.surface, label: "Surface", icon: Upload },
      { value: FlightMode.acrobatic, label: "Acro", icon: Rotate_left },
    ]}
  />

  <div class="w-full rounded-xl px-8 py-8 space-y-2 h-64 min-h-fit">
    {#if flyMode === FlightMode.manual}
      <InfoNoticeBlock heading="Manual mode is the ROV's basic driving mode." />
      <SuccessNoticeBlock heading="Good control in tight spaces and over seabed"></SuccessNoticeBlock>
    {:else if flyMode === FlightMode.stabilize}
      <InfoNoticeBlock heading="Stabilize mode keeps the ROV level and stable."></InfoNoticeBlock>
      <SuccessNoticeBlock heading="Good for general driving"></SuccessNoticeBlock>
      <WarningNoticeBlock heading="Avoid in tight spaces"></WarningNoticeBlock>
    {:else if flyMode === FlightMode.depth_hold}
      <InfoNoticeBlock heading="Stabilize Depth mode maintains depth and stability"></InfoNoticeBlock>
      <SuccessNoticeBlock heading="Good for getting photos and videos"></SuccessNoticeBlock>
      <WarningNoticeBlock heading="Avoid near the seabed or obstacles"></WarningNoticeBlock>
    {:else if flyMode === FlightMode.acrobatic}
      <InfoNoticeBlock heading="Acro mode drives the rov based on angular velocity"></InfoNoticeBlock>
      <SuccessNoticeBlock heading="Good for... IDK :)"></SuccessNoticeBlock>
    {/if}
  </div>

  <div class="space-x-4">
    <button
      class="btn btn-md variant-outline-surface"
      on:click={() => {
        closeModal();
        openTestDriveTutModal();
      }}>BACK</button
    >
    <button class="btn btn-md variant-filled-primary shadow-md" on:click={() => closeModal()}>DONE</button>
  </div>
</div>
