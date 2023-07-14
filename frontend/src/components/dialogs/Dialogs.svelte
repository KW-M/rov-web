<script context="module" lang="ts">
  import { default as nStore, type nStoreT } from "../../../../shared/js/libraries/nStore";
  import { DIALOG_TYPE, type dialogExtraDataType, type dialogInfoType } from "../../js/globalContext";

  import AlertDialog from "./AlertDialog.svelte";
  import PasswordDialog from "./PasswordDialog.svelte";
  import ScrollingTextDialog from "./ScrollingTextDialog.svelte";

  let dialogStack: dialogInfoType[] = [];
  let topDialog: nStoreT<dialogInfoType> = nStore(null);

  /** Open a dialog
   * @param {DIALOG_TYPE} type
   * @param {dialogExtraDataType} extraData
   * @param {(response?: any) => void} callback
   * @returns {(modifyExtraDataCallback: (d: dialogExtraDataType) => dialogExtraDataType) => void}
   * @example openDialog(DIALOG_TYPE.Password, { title: "Enter password" }, (response) => { console.log("Password entered", response); });
   */
  export const openDialog = (dialogType: DIALOG_TYPE, extraData: dialogExtraDataType, callback: (response?: any) => void) => {
    const currDialog = topDialog.get();
    const newDialog: dialogInfoType = { dialogType, extraData, callback };
    if (currDialog) dialogStack = [...dialogStack, currDialog];
    topDialog.set(newDialog);
    return (modifyExtraDataCallback: (d: dialogExtraDataType) => dialogExtraDataType) => {
      newDialog.extraData = modifyExtraDataCallback(newDialog.extraData);
      // console.log("newDialog.extraData", newDialog.extraData, newDialog === dialogStack[dialogStack.length - 1], dialogStack[dialogStack.length - 1], topDialog.get() === newDialog, topDialog.get());
      if (topDialog.get() === newDialog) topDialog.set(newDialog); // Force update
    };
  };

  /** Close the frontmost dialog. */
  export const closeTopDialog = (e: { detail: any }) => {
    const currDialog = topDialog.get();
    if (currDialog.callback) currDialog.callback(e.detail);
    topDialog.set(dialogStack.pop());
  };
</script>

{#if $topDialog && $topDialog.dialogType == DIALOG_TYPE.Password}
  <PasswordDialog on:close={closeTopDialog} />
{:else if $topDialog && $topDialog.dialogType == DIALOG_TYPE.Alert}
  <AlertDialog extraData={$topDialog.extraData} on:close={closeTopDialog} />
{:else if $topDialog && $topDialog.dialogType == DIALOG_TYPE.ScrollingText}
  <ScrollingTextDialog extraData={$topDialog.extraData} on:close={closeTopDialog} />
{/if}
