<script>
  import { Dialog, DialogOverlay, DialogTitle, DialogDescription } from "@rgossiaux/svelte-headlessui";
  import { fade, scale, slide } from "svelte/transition";
  import { createEventDispatcher, onDestroy } from "svelte";

  export let modalClass = "mx-10"; // Prop
  export let modalStyle = ""; // Prop
  export let initialFocus = null; // Prop
  let isFullyOpen = true;
  const dispatch = createEventDispatcher();

  function onClose() {
    dispatch("close");
  }
</script>

<!--  sm:modal-middle -->
<Dialog class="inset-0 absolute modal modal-bottom modal-open" open={isFullyOpen} on:close={onClose} static {initialFocus}>
  <div transition:fade={{ duration: 300 }} class="inset-0 absolute">
    <DialogOverlay class="absolute inset-0 bg-black opacity-70" />
  </div>
  <div class={"modal-box mx-3 " + modalClass} style={modalStyle} transition:slide={{ duration: 300 }} on:introstart={() => (isFullyOpen = true)} on:outroend={() => (isFullyOpen = false)}>
    <slot>
      <DialogTitle as="h3" class="font-bold text-lg">Dialog w/o content</DialogTitle>
      <DialogDescription class="py-">Please add some content</DialogDescription>
      <button class="btn btn-sm btn-circle absolute right-2 top-2" on:click={onClose}>✕</button>
      <div class="modal-action">
        <button type="button" on:click={onClose} class="btn">Got it, thanks!</button>
      </div>
    </slot>
  </div>
</Dialog>
