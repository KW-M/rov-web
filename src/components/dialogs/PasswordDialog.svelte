<script>
  import { createEventDispatcher } from "svelte";
  import { DialogTitle } from "@rgossiaux/svelte-headlessui";
  import Dialog from "./Dialog.svelte";

  let password = "";
  let inputElem = null;
  const dispatch = createEventDispatcher();

  function onClose(submitPassword) {
    if (submitPassword && password.length == 0) {
      return;
    } else if (submitPassword) {
      dispatch("close", password);
    } else dispatch("close", null);
  }
</script>

<br />

<Dialog on:close={() => onClose(false)} modalStyle={"max-width:16rem; text-align:center"} modalClass="modal-bottom" initialFocus={inputElem}>
  <DialogTitle as="h3" class="font-bold text-lg">Please enter the driver password</DialogTitle>
  <input
    bind:this={inputElem}
    bind:value={password}
    type="password"
    on:keypress={(e) => {
      if (e.key == "Enter") onClose(true);
    }}
    placeholder="Password"
    class="input input-bordered block w-full my-5"
  />
  <button type="button" on:click={() => onClose(true)} class="btn btn-primary btn-block btn-shadow flex-1 mb-2">Ok</button>
  <button type="button" on:click={() => onClose(false)} class="btn btn-outline btn-block flex-1">Cancel</button>
</Dialog>
