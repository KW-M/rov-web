<script lang="ts">
  import { Close, Gamepad, Keyboard, Touch_app } from "svelte-google-materialdesign-icons";
  import RadioSelectGrid from "../../RadioSelectGrid.svelte";
  import RovViz from "../../3dScene/rovViz.svelte";
  import OnscreenGamepads from "../../OnscreenGamepads.svelte";
  import HelpTooltips from "../../HelpTooltips.svelte";
  import { onDestroy, onMount } from "svelte";
  import { tutorialModeActive } from "../../../js/globalContext";
  import { closeModal, openFlyModesTutModal } from "../modals";

  export let parent: HTMLElement;
  let controlScheme = "gamepad";
  let closeBtn;
  onMount(() => {
    console.log("Modal Parent", parent);
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
  <h2 class="h2 mt-3">Tutorial</h2>
  {#if controlScheme === "gamepad"}
    <!-- <div class=" h3 mt-4">Connect a Gamepad</div> -->
  {/if}
  <RovViz canvasClass="relative block rounded-full m-8 bg-black text-white text-center vertical-center" showEnvironment={true} />
  <RadioSelectGrid
    bind:value={controlScheme}
    onChange={() => {
      closeBtn.focus();
      closeBtn.blur();
    }}
    variant="-surface"
    options={[
      { label: "Gamepad", value: "gamepad", icon: Gamepad },
      { label: "Keyboard", value: "keyboard", icon: Keyboard },
      { label: "Touchscreen", value: "touchscreen", icon: Touch_app },
    ]}
  />

  <b class="w-full rounded-xl px-8 py-4 text-center">
    {#if controlScheme === "gamepad"}
      Use the joysticks to drive the ROV. <br />Press & hold buttons to learn what they do.
    {:else if controlScheme === "keyboard"}
      Use W A S D and Arrow Keys to drive the ROV.<br /> Press & hold keys to learn what they do.
    {:else if controlScheme === "touchscreen"}
      Use the on-screen joysticks with your thumbs to drive the ROV.<br /> Touch & hold buttons to learn what they do.
    {/if}
  </b>

  {#if controlScheme === "gamepad" || controlScheme === "touchscreen"}
    <OnscreenGamepads />
    <HelpTooltips />
  {/if}

  <div class="space-x-4">
    <button class="btn btn-md variant-outline-surface" on:click={() => closeModal()}>SKIP</button>
    <button
      class="btn btn-md variant-filled-primary shadow-md"
      on:click={() => {
        closeModal();
        openFlyModesTutModal();
      }}>NEXT</button
    >
  </div>
</div>
