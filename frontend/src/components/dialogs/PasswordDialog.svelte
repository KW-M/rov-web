<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { DialogTitle } from "@rgossiaux/svelte-headlessui";
  import BaseDialog from "./BaseDialog.svelte";

  let password = "";
  let inputElem = null; // used to focus the input field
  const dispatch = createEventDispatcher();

  function closeWithPassword(e: Event) {
    if (password.length == 0) return;
    dispatch("close", password);
  }

  function closeWithoutPassword(e: Event) {
    dispatch("close", null);
  }
</script>

<br />

<BaseDialog on:close={closeWithoutPassword} modalStyle={"max-width:16rem; text-align:center"} modalClass="modal-bottom" initialFocus={inputElem}>
  <DialogTitle as="h3" class="font-bold text-lg">Please enter the driver password</DialogTitle>
  <form on:submit|preventDefault={closeWithPassword}>
    <input bind:this={inputElem} bind:value={password} type="password" autocomplete="current-password" placeholder="Password" class="input input-bordered block w-full my-5" />
    <button type="submit" class="btn btn-primary btn-block btn-shadow flex-1 mb-2">Ok</button>
    <button type="button" on:click={closeWithoutPassword} class="btn btn-outline btn-block flex-1">Cancel</button>
  </form>
</BaseDialog>
