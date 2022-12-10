<script context="module" lang="ts">
  import AlertDialog from "./AlertDialog.svelte";
  import PasswordDialog from "./PasswordDialog.svelte";
  import { DIALOG_TYPE } from "../../lib/globalContext";
  import ScrollingTextDialog from "./ScrollingTextDialog.svelte";
  import nStore from "../../lib/libraries/nStore";
  import type { nStoreT } from "../../lib/libraries/nStore";
  import type { dialogInfoType } from "../../lib/globalContext";

  let dialogStack = [];
  let topDialog: nStoreT<dialogInfoType> = nStore(null);

  export const openDialog = (dialogType, extraData, callback) => {
    let isOpen = true;
    let thisDialog = { isOpen, dialogType, callback, extraData };
    dialogStack = [...dialogStack, thisDialog];
    topDialog.set(thisDialog);
    return (modifyExtraDataCallback) => {
      thisDialog.extraData = modifyExtraDataCallback(thisDialog.extraData);
      topDialog = topDialog;
    };
  };

  export const closeTopDialog = (e) => {
    const tDialog = topDialog.get();
    tDialog.isOpen = false;
    if (tDialog.callback) tDialog.callback(e.detail);
    dialogStack.pop();
    let newTopDialog = dialogStack[dialogStack.length - 1];
    if (newTopDialog) {
      newTopDialog.isOpen = true;
      topDialog.set(newTopDialog);
    } else {
      topDialog.set(null);
    }
  };

  // let modifyExtraData = openDialog("scrollText", { title: "hi", messageLines: ["bo"] }, (e) => {
  //   console.log("scroll dialog closed", e);
  // });
  // let i = 0;
  // setInterval(() => {
  //   modifyExtraData((extraData) => {
  //     i++;
  //     return {
  //       ...extraData,
  //       messageLines: [...extraData.messageLines, i + "This is a new line"],
  //     };
  //   });
  // }, 500);

  // setTimeout(() => {
  //   openDialog("password", {}, (e) => {
  //     console.log("password dialog closed", e);
  //   });
  // }, 9000);
</script>

<!-- <button class="btn" on:click={() => openDialog("alert", (e) => console.log("alert closed", e))}>Open Alert Dialog</button>
<button class="btn" on:click={() => openDialog("password", (e) => console.log("password closed", e))}>Open Password Dialog</button> -->
{#if $topDialog}
  {#if $topDialog.dialogType == DIALOG_TYPE.Password}
    <PasswordDialog bind:isOpen={$topDialog.isOpen} on:close={closeTopDialog} />
  {:else if $topDialog.dialogType == DIALOG_TYPE.Alert}
    <AlertDialog bind:isOpen={$topDialog.isOpen} bind:extraData={$topDialog.extraData} on:close={closeTopDialog} />
  {:else if $topDialog.dialogType == DIALOG_TYPE.ScrollingText}
    <ScrollingTextDialog bind:isOpen={$topDialog.isOpen} bind:extraData={$topDialog.extraData} on:close={closeTopDialog} />
  {/if}
{/if}
