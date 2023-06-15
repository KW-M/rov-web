<script context="module" lang="ts">
  import AlertDialog from "./AlertDialog.svelte";
  import PasswordDialog from "./PasswordDialog.svelte";
  import { DIALOG_TYPE, type dialogExtraDataType } from "../../js/globalContext";
  import ScrollingTextDialog from "./ScrollingTextDialog.svelte";
  import { default as nStore, type nStoreT } from "../../../../shared/js/libraries/nStore";
  import type { dialogInfoType } from "../../js/globalContext";

  let dialogStack: dialogInfoType[] = [];
  let topDialog: nStoreT<dialogInfoType> = nStore(null);

  export const openDialog = (type: DIALOG_TYPE, extraData: dialogExtraDataType, callback: (response?: any) => void) => {
    const lastTopDialog = topDialog.get();
    const newDialog = { dialogType: type, callback, extraData };
    if (lastTopDialog) dialogStack = [...dialogStack, lastTopDialog];
    topDialog.set(newDialog);
    return (modifyExtraDataCallback: (d: dialogExtraDataType) => dialogExtraDataType) => {
      newDialog.extraData = modifyExtraDataCallback(newDialog.extraData);
      console.log("newDialog.extraData", newDialog.extraData, newDialog === dialogStack[dialogStack.length - 1], dialogStack[dialogStack.length - 1], topDialog.get() === newDialog, topDialog.get());
      if (topDialog.get() === newDialog) {
        topDialog.set(newDialog);
      }
    };
  };

  export const closeTopDialog = (e) => {
    const lastTopDialog = topDialog.get();
    lastTopDialog.callback && lastTopDialog.callback(e.detail);
    if (dialogStack.length > 0) {
      topDialog.set(dialogStack.pop());
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
{#if $topDialog && $topDialog.dialogType == DIALOG_TYPE.Password}
  <PasswordDialog on:close={closeTopDialog} />
{:else if $topDialog && $topDialog.dialogType == DIALOG_TYPE.Alert}
  <AlertDialog extraData={$topDialog.extraData} on:close={closeTopDialog} />
{:else if $topDialog && $topDialog.dialogType == DIALOG_TYPE.ScrollingText}
  <ScrollingTextDialog extraData={$topDialog.extraData} on:close={closeTopDialog} />
{/if}
