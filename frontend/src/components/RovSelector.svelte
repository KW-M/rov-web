<script lang="ts">
  import ChevronRight from "svelte-google-materialdesign-icons/Chevron_right.svelte";
  import { fade } from "svelte/transition";
  import { frontendConnMngr } from "../js/frontendConnManager";
  import { ConnectionStates } from "../js/shared/consts";

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
    frontendConnMngr.disconnect();
  }
</script>

<div id="rov_chooser" class={`absolute left-1/2 bottom-0  -translate-x-1/2 transition-all overflow-visible z-50  ${!collapsedMode ? "disconnected  top-0" : " "} `}>
  <!-- {#if collapsedMode}
    <p class="text-center p-2 text-white">You Are: <span class="font-bold">{$ourIdentity}</span></p>
  {/if} -->
  <div class:p-1={collapsedMode} class={` bg-surface-700 border-2 border-surface-500 m-0 items-center flex whitespace-nowrap text-center rounded-xl max-h-full  ${!collapsedMode ? "flex-col shadow-2xl" : "rounded-b-none border-b-0"}`}>
    {#if $availableRovNames.length == 0}
      <h2 class="text-center py-4 px-6 font-bold">Searching for online ROVs...</h2>
    {:else if !collapsedMode}
      <h2 class="text-center py-4 px-6 font-bold">Connect to a ROV:</h2>
      <div class="flex flex-col align-stretch overflow-y-auto w-full p-3 pt-0">
        {#each $availableRovNames as rovName}
          <button in:fade on:click={() => connectToRov(rovName)} class="btn ring-white variant-filled-primary align-top block m-1"
            >{rovName}
            <ChevronRight variant="round" class="text-2xl inline-block pointer-events-none" tabindex="-1" />
          </button>
        {/each}
      </div>
    {:else}
      <span class=" px-3 align-middle text-right text-white">
        <p class="m-0 p-0 font-bold">{selectedRov}</p>
        <p class="m-0 p-0 text-primary-200">You Are: <span class="font-bold">{$ourIdentity}</span></p>
      </span>
      <button in:fade class={`btn mr-3 btn-md variant-filled-error align-top`} on:click={() => disconnect()}>
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
