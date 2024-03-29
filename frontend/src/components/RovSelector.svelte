<script lang="ts">
  import ChevronRight from "svelte-google-materialdesign-icons/Chevron_right.svelte";
  import { fade } from "svelte/transition";
  import { frontendConnMngr, type LivekitRoomInfo } from "../js/frontendConnManager";
  import { ConnectionStates, ENCRYPTED_AUTH_TOKEN_PREFIX } from "../js/shared/consts";
  import { showToastMessage, ToastSeverity } from "../js/toastMessageManager";
  import { modalPasswordPrompt } from "../js/uiDialogs";
  import { decrypt } from "../js/shared/encryption";
  import { waitfor } from "../js/shared/util";

  export let selectedRov = "";

  const connectionState = frontendConnMngr.connectionState;
  $: collapsedMode = selectedRov != "" && $connectionState !== ConnectionStates.disconnectedOk && $connectionState !== ConnectionStates.failed;

  const availableRovRooms = frontendConnMngr.openLivekitRoomInfo;
  const ourIdentity = frontendConnMngr.currentLivekitIdentity;

  async function connectToRov(rovRoomInfo: LivekitRoomInfo) {
    if (!rovRoomInfo.token) return showToastMessage("ROV is not available at the moment. Please wait & try again.", 5000, false, ToastSeverity.error);

    selectedRov = rovRoomInfo.name;
    let authToken = "";
    if (rovRoomInfo.token.encrypted) {
      selectedRov = rovRoomInfo.name;
      const salt = rovRoomInfo.token.salt;
      const iv = rovRoomInfo.token.iv;

      while (true) {
        await waitfor(200);
        const password = await modalPasswordPrompt("Enter ROV Password");
        if (!password) return;
        // decrypt the token
        try {
          const decryptedToken = await decrypt(rovRoomInfo.token.token, salt, iv, password);
          console.log('Decrypted Token:"' + decryptedToken + '"', rovRoomInfo.name);
          if (!decryptedToken || !decryptedToken.startsWith(ENCRYPTED_AUTH_TOKEN_PREFIX)) {
            showToastMessage("Incorrect password. Please try again.", 2000, false, ToastSeverity.warning);
            continue;
          }
          showToastMessage("Password accepted. Connecting...", 2000, false, ToastSeverity.success);
          authToken = decryptedToken.substring(ENCRYPTED_AUTH_TOKEN_PREFIX.length);
          break;
        } catch (e) {
          console.error("Token Decryption Failure:", e);
          showToastMessage("Incorrect password. Please try again. (Token Decryption Failure)", 2000, false, ToastSeverity.warning);
          continue;
        }
      }
    } else {
      // no password, just connect with token
      authToken = rovRoomInfo.token.token;
    }

    frontendConnMngr.connectToLivekitRoom(rovRoomInfo.name, authToken);
  }

  function disconnect() {
    frontendConnMngr.disconnect();
    selectedRov = "";
  }
</script>

<div id="rov_chooser" class={`absolute left-1/2 bottom-0  -translate-x-1/2 transition-all overflow-visible z-50  ${!collapsedMode ? "disconnected  top-0" : " "} `}>
  <!-- {#if collapsedMode}
    <p class="text-center p-2 text-white">You Are: <span class="font-bold">{$ourIdentity}</span></p>
  {/if} -->
  <div class:p-1={collapsedMode} class={` bg-surface-700 border-2 border-surface-500 m-0 items-center flex whitespace-nowrap text-center rounded-xl max-h-full  ${!collapsedMode ? "flex-col shadow-2xl" : "rounded-b-none border-b-0"}`}>
    {#if $availableRovRooms.length == 0}
      <h2 class="text-center py-4 px-6 font-bold">Searching for online ROVs...</h2>
    {:else if !collapsedMode}
      <h2 class="text-center py-4 px-6 font-bold">Connect to a ROV:</h2>
      <div class="flex flex-col align-stretch overflow-y-auto w-full p-3 pt-0">
        {#each $availableRovRooms as rovRoom}
          <button in:fade disabled={!rovRoom.token} on:click={() => connectToRov(rovRoom)} class="btn ring-white variant-filled-primary align-top block m-1"
            >{rovRoom.name}
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
