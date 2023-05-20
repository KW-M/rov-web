<script lang="ts">
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
  import { LocationSearching } from "@steeze-ui/material-design-icons";

  $: collapsedMode = false; // $rovDataChannelConnState === ConnectionState.connected || $rovDataChannelConnState === ConnectionState.connecting || $rovDataChannelConnState === ConnectionState.reconnecting || $peerServerConnState === ConnectionState.connecting || $peerServerConnState === ConnectionState.reconnecting || $peerServerConnState === ConnectionState.disconnected;
  export let selectedRov = "";

  let rovNames = [];
  setInterval(() => {
    rovNames.push("rov-" + (Date.now() + 1));
    rovNames = rovNames;
  }, 2000);

  function connectToRov(rovName: string) {
    collapsedMode = true;
    selectedRov = rovName;
    RovActions.connectToRov();
  }

  function disconnect() {
    collapsedMode = false;
    RovActions.disconnectFromRov();
  }
</script>

<div id="rov_chooser" class={`absolute left-1/2 bottom-0  -translate-x-1/2 transition-all overflow-hidden z-50  ${!collapsedMode ? "disconnected  top-0" : " "} `}>
  {#if collapsedMode}
    <!-- client_peer_id_label -->
    <p class="text-center p-2 text-white">You Are: <span class="font-bold">{$ourPeerId}</span></p>
  {/if}
  <div class:p-2={collapsedMode} class={`bg-base-100 m-0 items-center flex whitespace-nowrap text-center rounded-xl max-h-full  ${!collapsedMode ? "flex-col" : "rounded-b-none"}`}>
    {#if rovNames.length == 0}
      <h2 class="text-center py-4 px-6 font-bold">Searching for online ROVs...</h2>
    {:else if !collapsedMode}
      <h2 class="text-center p-2 font-bold">Connect to a ROV:</h2>
      <div class="flex flex-col align-stretch overflow-y-auto p-3">
        {#each rovNames as rovName}
          <button in:fade on:click={() => connectToRov(rovName)} class="btn ring-white btn-primary align-top block m-1"
            >{rovName}
            <Icon theme="solid" src={ChevronRight} class="w-6 h-6 inline-block pointer-events-none" />
          </button>
        {/each}
      </div>
    {:else}
      <span class="font-bold p-3 align-middle">{selectedRov}</span>
      <button in:fade class={`btn btn-sm btn-error align-top`} on:click={() => disconnect()}>
        <span class="whitespace-nowrap inline">{!collapsedMode ? "Connect" : "Disconnect"}</span>
      </button>
    {/if}
  </div>
</div>

<style>
  #rov_chooser.disconnected {
    @apply rounded-b-xl bottom-1/2 scale-150 translate-y-1/2;
  }
</style>
