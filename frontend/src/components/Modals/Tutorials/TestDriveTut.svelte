<script lang="ts">
  import { Close, Gamepad, Keyboard, Touch_app, Games, Warning } from "svelte-google-materialdesign-icons";
  import RadioSelectGrid from "../../RadioSelectGrid.svelte";
  import RovViz from "../../3dScene/rovViz.svelte";
  import OnscreenGamepads from "../../OnscreenGamepads.svelte";
  import HelpTooltips from "../../HelpTooltips.svelte";
  import { onDestroy, onMount } from "svelte";
  import { tutorialModeActive } from "../../../js/globalContext";
  import { closeModal, openFlyModesTutModal } from "../modals";
  import { getGpadCtrl } from "../../../js/gamepad";
  import WarningNoticeBlock from "../../NoticeBlocks/WarningNoticeBlock.svelte";
  import InfoNoticeBlock from "../../NoticeBlocks/InfoNoticeBlock.svelte";
  import SuccessNoticeBlock from "../../NoticeBlocks/SuccessNoticeBlock.svelte";
  import { RovActions } from "../../../js/rovActions";
  const gpadCtrl = getGpadCtrl();
  const gpadsConnectedStore = gpadCtrl.realGamepadsConnected;

  // export let parent: HTMLElement;
  let controlScheme = "gamepad";
  let closeBtn;
  let gamepadsSupported: boolean = false;
  $: gamepadConnected = $gpadsConnectedStore > 0;
  $: multipleGamepadsConnected = $gpadsConnectedStore > 1;
  onMount(() => {
    tutorialModeActive.set(true);
    const gpadCtrl = getGpadCtrl();
    gpadCtrl.start(RovActions.gamepadAxisTriggers, RovActions.gamepadButtonTriggers);
    gamepadsSupported = getGpadCtrl().gamepadApiSupported();
  });
  onDestroy(() => {
    tutorialModeActive.set(false);
    localStorage.setItem("tutorialComplete", "true");
  });
</script>

<div class="h-full w-full rounded-3xl overflow-hidden shadow-2xl mt-auto flex flex-1 flex-col items-center justify-center relative bg-surface-800 p-4">
  {#if (controlScheme === "gamepad" && gamepadsSupported && gamepadConnected) || controlScheme === "touchscreen"}
    <OnscreenGamepads visible={!((controlScheme === "gamepad" && gamepadsSupported && gamepadConnected) || controlScheme === "touchscreen")} tooltipDelay={300} />
  {/if}

  <div class="flex flex-col justify-center align-middle right-2 top-2 absolute">
    <button on:click={() => closeModal()} class="btn btn-icon-lg btn-icon" bind:this={closeBtn}>
      <Close class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
    </button>
  </div>
  <h2 class="h2 mt-3">Tutorial</h2>
  <RovViz canvasClass="relative block rounded-full m-8 bg-black text-white text-center vertical-center" showEnvironment={true} useRovOrientationData={false} />
  <RadioSelectGrid
    bind:value={controlScheme}
    onChange={() => {
      closeBtn.focus();
      closeBtn.blur();
    }}
    variant="-surface"
    options={[
      { label: "Gamepad", value: "gamepad", icon: Games },
      { label: "Keyboard", value: "keyboard", icon: Keyboard },
      { label: "Touchscreen", value: "touchscreen", icon: Touch_app },
    ]}
  />

  <b class="w-full rounded-xl px-8 py-4 text-center">
    {#if controlScheme === "gamepad"}
      {#if gamepadsSupported}
        {#if gamepadConnected}
          <SuccessNoticeBlock heading="Game controller connected!">
            Use the joysticks to test drive the ROV.<br />
            Press & hold buttons to learn what they do.
          </SuccessNoticeBlock>
        {:else}
          <InfoNoticeBlock heading="Connect a game controller to your computer">
            1. Connect bluetooth controllers in your device's settings.<br />
            2. Press any button to enable your game controller.
          </InfoNoticeBlock>
        {/if}
      {:else}
        <WarningNoticeBlock heading="This browser does not support game controllers">
          Please use keyboard or touch controls<br />
          or try a different browser.
        </WarningNoticeBlock>
      {/if}
    {:else if controlScheme === "keyboard"}
      <InfoNoticeBlock heading="Keyboard Controls">
        Use W A S D and arrow keys to test drive the ROV.<br />
        Press & hold number keys to learn what they do.
      </InfoNoticeBlock>
    {:else if controlScheme === "touchscreen"}
      <InfoNoticeBlock heading="Touch Controls">
        Use the on-screen joysticks to test drive the ROV.<br />
        Touch & hold buttons to learn what they do.
      </InfoNoticeBlock>
    {/if}
  </b>

  <div class="space-x-4 z-10">
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
