<script>
  // import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from "@rgossiaux/svelte-headlessui";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { ChevronRight } from "@steeze-ui/heroicons";
  import { ChevronLeft } from "@steeze-ui/heroicons";
  import { fade } from "svelte/transition";
  import { ourPeerId, rovPeerIdEndNumber, rovDataChannelConnState, peerServerConnState, isRovDriver } from "../lib/globalContext";
  import { RovActions } from "../lib/rovActions";
  import { getROVName } from "../lib/rovUtil";
  import { ConnectionState } from "../lib/consts";
  import { addTooltip } from "./HelpTooltips.svelte";

  $: collapsedMode = $rovDataChannelConnState === ConnectionState.connected || $rovDataChannelConnState === ConnectionState.connecting || $rovDataChannelConnState === ConnectionState.reconnecting || $peerServerConnState === ConnectionState.connecting || $peerServerConnState === ConnectionState.reconnecting || $peerServerConnState === ConnectionState.disconnected;
  export let selectedRov = "";
  let rovDisplayName = "";
  $: selectedRov = getROVName($rovPeerIdEndNumber);
  $: rovDisplayName = "ROV " + $rovPeerIdEndNumber + selectedRov.replace("ROV-", " | ");

  export const nextRov = () => {
    RovActions.disconnectFromRov();
    $rovPeerIdEndNumber = $rovPeerIdEndNumber + 1;
    if (collapsedMode) RovActions.connectToRov();
    // RovActions.switchToNextRovPeerId();
  };

  export const prevRov = () => {
    RovActions.disconnectFromRov();
    $rovPeerIdEndNumber = Math.max($rovPeerIdEndNumber - 1, 0);
    if (collapsedMode) RovActions.connectToRov();
    // RovActions.switchToPrevRovPeerId();
  };

  let hovering = false;
</script>

<div id="rov_chooser" class={`absolute left-1/2 bottom-0  -translate-x-1/2 transition-all overflow-hidden z-50  ${!collapsedMode ? "disconnected" : " "} `}>
  {#if collapsedMode}
    <!-- client_peer_id_label -->
    <p class="text-center p-2 text-white">You Are: <span class="font-bold">{$ourPeerId}</span></p>
  {/if}
  <div class={`bg-base-100 m-0 p-2 pb-1 whitespace-nowrap text-center rounded-xl  ${!collapsedMode ? "" : "rounded-b-none"}`}>
    {#if !collapsedMode}
      <h2 class="text-center p-2 pt-0 font-bold ">{rovDisplayName}</h2>
    {/if}
    <button class="btn btn-sm btn-ghost btn-secondary" on:click={prevRov} aria-label="Switch to Previous ROV" use:addTooltip={{ label: "Switch to Previous ROV", placement: "bottom" }}>
      <!-- ❮ -->
      <Icon theme="solid" src={ChevronLeft} class="w-6 h-6 pointer-events-none" />
    </button>
    {#if !collapsedMode}
      <button
        in:fade
        class={`btn btn-sm btn-primary align-top`}
        on:click={() => {
          RovActions.connectToRov();
        }}>Connect</button
      >
    {:else}
      <button
        in:fade
        class={`btn btn-sm btn-primary align-top swap ${hovering ? "swap-active" : ""}`}
        on:mouseenter={() => {
          hovering = true;
        }}
        on:mouseleave={() => {
          hovering = false;
        }}
        on:click={() => {
          RovActions.disconnectFromRov();
          hovering = false;
        }}
      >
        <!-- × -->
        <span class="swap-off">{rovDisplayName}</span>
        <span class="swap-on whitespace-nowrap inline">{!collapsedMode ? "Connect" : "Disconnect"}</span>
        <!-- <XIcon class="inline-block align-middle w-6 h-6" /> -->

        <!-- pl-2 border-l-2 border-solid border-white  -->
      </button>
    {/if}
    <button class="btn btn-sm btn-ghost  btn-secondary" on:click={nextRov} aria-label="Switch to Next ROV" use:addTooltip={{ label: "Switch to Next ROV", placement: "bottom" }}>
      <!-- ❯ -->
      <Icon theme="solid" src={ChevronRight} class="w-6 h-6 pointer-events-none" />
    </button>
    {#if !$isRovDriver}
      <button
        class={`btn btn-sm btn-warning align-top`}
        on:click={() => {
          RovActions.takeControl();
        }}
      >
        <span>Drive ROV</span>
      </button>
    {/if}
  </div>
</div>

<style>
  #rov_chooser.disconnected {
    @apply rounded-b-xl bottom-1/2 scale-150 translate-y-1/2;
  }
</style>
