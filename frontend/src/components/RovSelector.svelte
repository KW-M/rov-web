<script lang="ts">
  import { fade } from "svelte/transition";
  import { frontendConnMngr, type LivekitRoomInfo } from "../js/frontendConnManager";
  import { ConnectionStates } from "../js/shared/consts";
  import { showToastMessage, ToastSeverity } from "../js/toastMessageManager";
  import { modalAlert, modalConfirm, modalPasswordPrompt } from "./Modals/modals.ts";
  import { decrypt, supportsCryptoApi } from "../js/shared/encryption";
  import { waitfor } from "../js/shared/util";
  import { log, logDebug, logInfo, logWarn, logError } from "../js/shared/logging";
  import { fullscreenOpen, takenLivekitUsernames } from "../js/globalContext";
  import { isTokenValid } from "../js/shared/livekit/livekitTokens";
  import { type AuthTokenInfo } from "../js/shared/livekit/adminlessActions";
  import { Chevron_right } from "svelte-google-materialdesign-icons";
  import { getLocalStore } from "../js/localStorage";

  export let selectedRov = "";

  const connectionState = frontendConnMngr.connectionState;
  $: collapsedMode = selectedRov != "" && $connectionState !== ConnectionStates.disconnectedOk && $connectionState !== ConnectionStates.failed;

  const availableRovRooms = frontendConnMngr.openLivekitRoomInfo;
  const ourIdentity = frontendConnMngr.currentLivekitIdentity;

  async function connectToRov(rovRoomInfo: LivekitRoomInfo) {
    if (!rovRoomInfo.token) return showToastMessage("ROV is not ready. Please wait & try again.", 5000, false, ToastSeverity.error);

    selectedRov = rovRoomInfo.name;

    // check if there is a saved token for this ROV in local storage
    const authTokens = getLocalStore().getItem("authTokens") || {};
    let authToken = authTokens[rovRoomInfo.name] || null;
    if (authToken) {
      const validUserId = await isTokenValid(authToken);
      if (validUserId && rovRoomInfo.token.encrypted && !takenLivekitUsernames.get().has(validUserId)) {
        logInfo("Using cached token for ROV", rovRoomInfo.name);
        return frontendConnMngr.connectToLivekitRoom(rovRoomInfo.name, authToken);
      } else {
        logInfo("Cached token is invalid. Removing it.", rovRoomInfo.name, rovRoomInfo.token);
        // remove the invalid token from local storage
        getLocalStore().updateItem("authTokens", { [rovRoomInfo.name]: undefined });
        authToken = null;
      }
    }

    // if we DON'T have a saved token, and the provided token is encrypted, ask for password and decrypt
    if (rovRoomInfo.token.encrypted) {
      selectedRov = rovRoomInfo.name;
      const salt = rovRoomInfo.token.salt;
      const iv = rovRoomInfo.token.iv;

      if (!supportsCryptoApi()) {
        if (!window.isSecureContext || window.location.protocol !== "https:") {
          return modalConfirm("Cannot access password protected ROV", {
            body: "<b>Non-secure web address detected</b><br/>For a better experience, please use the secure website (https). Password protected ROVs and game controllers will only work on the secure site.",
            modalClasses: "variant-filled-warning !bg-warning-500 w-fit max-w-xs px-6 py-5",
            buttonTextConfirm: "Go Secure",
            buttonTextCancel: "Cancel",
            response: (r) => {
              if (r) window.location.protocol = "https:";
              else selectedRov = "";
            },
          });
        } else {
          return modalAlert("Cannot access password protected ROV", {
            body: "This browser does not support the required encryption features.<br/>Please use a more modern browser.",
            modalClasses: "variant-filled-warning !bg-warning-500 w-fit max-w-xs px-6 py-5",
            response: () => (selectedRov = ""),
          });
        }
      }

      while (true) {
        await waitfor(200);
        const password = await modalPasswordPrompt("Enter ROV Password");
        if (!password) return;

        try {
          // decrypt the encrypted auth token
          authToken = await decrypt(rovRoomInfo.token.token, salt, iv, password);
          if (!authToken || (await isTokenValid(authToken)) === false) {
            showToastMessage("Incorrect password. <br/> Please try again.", 2000, false, ToastSeverity.warning);
            continue;
          }

          showToastMessage("Password accepted. Connecting...", 2000, false, ToastSeverity.success);
          break;
        } catch (e) {
          logError("Token Decryption Failure:", e);
          showToastMessage("Invalid password. Please try again. <br/> (Token Decryption Failure)", 2000, false, ToastSeverity.warning);
          continue;
        }
      }
    } else {
      // if the provided token is NOT encrypted, just use it
      authToken = rovRoomInfo.token.token;
    }

    // if we finally have a valid authToken, connect
    if (authToken && (await isTokenValid(authToken))) {
      // save the token to local storage
      getLocalStore().updateItem("authTokens", { [rovRoomInfo.name]: authToken });
      frontendConnMngr.connectToLivekitRoom(rovRoomInfo.name, authToken);
    } else {
      showToastMessage("ROV is not ready yet <br/>(Token expired or invalid)", 6000, false, ToastSeverity.warning);
      selectedRov = "";
    }
  }

  const tokenAvailable = (tokenInfo: AuthTokenInfo) => tokenInfo && !takenLivekitUsernames.get().has(tokenInfo.userGivenIdentity);

  const disconnect = () => {
    frontendConnMngr.close();
    selectedRov = "";
  };
</script>

<div id="rov_chooser" class={`absolute left-1/2 bottom-0  -translate-x-1/2 transition-all overflow-visible pointer-events-none select-none  ${!collapsedMode ? "disconnected  top-0 pt-12 sm:pt-0" : "  "} `}>
  <!-- {#if collapsedMode}
    <p class="text-center p-2 text-white">You Are: <span class="font-bold">{$ourIdentity}</span></p>
  {/if} -->
  <div class:p-1={collapsedMode} class={`border-2 border-surface-500 m-0 items-center flex whitespace-nowrap text-center rounded-xl max-h-full  ${!collapsedMode ? "flex-col shadow-2xl variant-glass-surface" : "rounded-b-none border-b-0 bg-surface-100-800-token"} ${collapsedMode && $fullscreenOpen ? "hidden" : ""}`}>
    {#if $availableRovRooms.length == 0}
      <h2 class="text-center py-4 px-6 font-bold">Searching for online ROVs...</h2>
    {:else if !collapsedMode}
      <h2 class="text-center py-4 px-6 font-bold">Connect to a ROV:</h2>
      <div class="flex flex-col align-stretch overflow-y-auto w-full p-3 pt-0">
        {#each $availableRovRooms as rovRoom}
          <button in:fade disabled={!tokenAvailable(rovRoom.token)} on:click={() => connectToRov(rovRoom)} class="btn ring-white variant-filled-primary align-top block m-1 pointer-events-auto"
            >{rovRoom.name}
            <Chevron_right variant="round" class="text-2xl inline-block pointer-events-none" tabindex="-1" />
          </button>
        {/each}
      </div>
    {:else}
      <span class=" px-3 align-middle text-right text-white">
        <p class="m-0 p-0 font-bold">{selectedRov}</p>
        <p class="m-0 p-0 text-primary-200">You Are: <span class="font-bold">{$ourIdentity || "..."}</span></p>
      </span>
      <button in:fade class={`btn mr-3 btn-md variant-filled-error align-top pointer-events-auto`} on:click={() => disconnect()}>
        <span class="whitespace-nowrap inline">{!collapsedMode ? "Connect" : "Disconnect"}</span>
      </button>
    {/if}
  </div>
</div>

<style lang="postcss">
  #rov_chooser.disconnected {
    @apply rounded-b-xl bottom-1/2 scale-150 translate-y-1/2;
  }
</style>
