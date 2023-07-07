<script>
  import { createEventDispatcher } from "svelte";
  import { DialogTitle } from "@rgossiaux/svelte-headlessui";
  import BaseDialog from "./BaseDialog.svelte";
  const dispatch = createEventDispatcher();

  export let extraData = {};
  $: title = extraData.title || "Are you sure?";

  function onClose(ok_clicked) {
    dispatch("close", ok_clicked);
  }
</script>

<BaseDialog on:close={() => onClose(false)} modalStyle={"max-width:16rem; text-align:center"} modalClass="modal-bottom">
  <DialogTitle as="h3" class="font-bold text-lg mb-5">{title}</DialogTitle>
  <button type="button" on:click={() => onClose(true)} class="btn btn-primary btn-block flex-1 mb-2">Ok</button>
  <button type="button" on:click={() => onClose(false)} class="btn btn-outline btn-block flex-1">Cancel</button>
</BaseDialog>

<!-- <br/>
<input type="text" placeholder="Type here" class="input input-bordered input-error w-full max-w-xs" bind:value={msgValue} />
<button class="btn" on:click={sendMessage}>Send</button> -->
