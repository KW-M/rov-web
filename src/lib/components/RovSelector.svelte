<script>
  import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from "@rgossiaux/svelte-headlessui";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { ChevronRight } from "@steeze-ui/heroicons";
  import { ChevronLeft } from "@steeze-ui/heroicons";
  import { fade } from "svelte/transition";
  import { ourPeerId, rovPeerIdEndNumber } from "../globalContext";
  import { RovActions } from "../rovActions";
  import { getROVName } from "../rovUtil";

  export let rovDisconnected = true;
  export let selectedRov = "";
  let rovDisplayName = "";
  $: selectedRov = getROVName($rovPeerIdEndNumber);
  $: rovDisplayName = "ROV " + $rovPeerIdEndNumber + selectedRov.replace("ROV-", " | ");

  export const nextRov = () => {
    $rovPeerIdEndNumber = $rovPeerIdEndNumber + 1;
    // RovActions.switchToNextRovPeerId();
  };

  export const prevRov = () => {
    $rovPeerIdEndNumber = Math.max($rovPeerIdEndNumber - 1, 0);
    // RovActions.switchToPrevRovPeerId();
  };

  let hovering = false;
</script>

<div id="rov_chooser" class={`fixed left-1/2 bottom-0  -translate-x-1/2 transition-all overflow-hidden z-50  ${rovDisconnected ? "disconnected" : " "} `}>
  {#if !rovDisconnected}
    <!-- client_peer_id_label -->
    <p class="text-center p-2 text-white">You Are: <span class="font-bold">{$ourPeerId}</span></p>
  {/if}
  <div class={`bg-base-100 m-0 p-2 pb-1 whitespace-nowrap text-center rounded-xl  ${rovDisconnected ? "" : "rounded-b-none"}`}>
    {#if rovDisconnected}
      <h2 class="text-center p-2 pt-0 font-bold ">{rovDisplayName}</h2>
    {/if}
    <button class="btn btn-sm btn-ghost btn-secondary" on:click={prevRov} aria-label="Switch to Previous ROV">
      <!-- ❮ -->
      <Icon theme="solid" src={ChevronLeft} class="w-6 h-6" />
    </button>
    {#if rovDisconnected}
      <button
        in:fade
        class={`btn btn-sm btn-primary align-top`}
        on:click={() => {
          rovDisconnected = !rovDisconnected;
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
          rovDisconnected = !rovDisconnected;
          hovering = false;
        }}
      >
        <!-- × -->
        <span class="swap-off">{rovDisplayName}</span>
        <span class="swap-on whitespace-nowrap inline">{rovDisconnected ? "Connect" : "Disconnect"}</span>
        <!-- <XIcon class="inline-block align-middle w-6 h-6" /> -->

        <!-- pl-2 border-l-2 border-solid border-white  -->
      </button>
    {/if}
    <button class="btn btn-sm btn-ghost  btn-secondary" on:click={nextRov} aria-label="Switch to Next ROV">
      <!-- ❯ -->
      <Icon theme="solid" src={ChevronRight} class="w-6 h-6" />
    </button>
  </div>
</div>

<style>
  #rov_chooser.disconnected {
    @apply rounded-b-xl bottom-1/2 scale-150 translate-y-1/2;
  }
</style>
