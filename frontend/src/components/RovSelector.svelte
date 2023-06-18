<script lang="ts">
  // import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from "@rgossiaux/svelte-headlessui";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { ChevronRight } from "@steeze-ui/heroicons";
  import { fade } from "svelte/transition";
  import { frontendConnMngr } from "../js/frontendConnManager";
  import { ConnectionStates } from "../../../shared/js/consts";

  export let selectedRov = "";

  const connectionState = frontendConnMngr.connectionState;
  $: collapsedMode = $connectionState === ConnectionStates.connected || $connectionState === ConnectionStates.connecting;

  const availableRovNames = frontendConnMngr.openLivekitRoomNames;
  const ourIdentity = frontendConnMngr.currentLivekitIdentity;

  function connectToRov(rovName: string) {
    selectedRov = rovName;
    frontendConnMngr.connectToLivekitRoom(rovName);
  }

  function disconnect() {
    frontendConnMngr.disconnectFromLivekitRoom();
  }
</script>

<div id="rov_chooser" class={`absolute left-1/2 bottom-0  -translate-x-1/2 transition-all overflow-hidden z-50  ${!collapsedMode ? "disconnected  top-0" : " "} `}>
  {#if collapsedMode}
    <!-- client_peer_id_label -->
    <p class="text-center p-2 text-white">You Are: <span class="font-bold">{$ourIdentity}</span></p>
  {/if}
  <div class:p-2={collapsedMode} class={`bg-base-100 m-0 items-center flex whitespace-nowrap text-center rounded-xl max-h-full  ${!collapsedMode ? "flex-col" : "rounded-b-none"}`}>
    {#if $availableRovNames.length == 0}
      <h2 class="text-center py-4 px-6 font-bold">Searching for online ROVs...</h2>
    {:else if !collapsedMode}
      <h2 class="text-center p-2 font-bold">Connect to a ROV:</h2>
      <div class="flex flex-col align-stretch overflow-y-auto p-3">
        {#each $availableRovNames as rovName}
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
