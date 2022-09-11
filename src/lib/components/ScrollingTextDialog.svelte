<script>
  import { createEventDispatcher } from "svelte";
  import { DialogTitle } from "@rgossiaux/svelte-headlessui";
  import Dialog from "./Dialog.svelte";
  const dispatch = createEventDispatcher();

  export let isOpen = true;
  export let extraData = {
    title: "Title",
    messageLines: [],
  };
  let scrollArea = null;

  $: title = extraData.title || "";
  $: lines = extraData.messageLines || [];
  $: if (extraData && scrollArea != null && scrollArea.scrollTop && scrollArea.scrollTop + scrollArea.clientHeight + 100 > scrollArea.scrollHeight) {
    // keep scrolling down as new content is added (unless the user has scrolled up / is no longer at the bottom)
    scrollArea.scrollTop = scrollArea.scrollHeight;
  }

  function onClose() {
    dispatch("close", null);
    isOpen = false;
  }
</script>

<br />

<Dialog bind:isOpen on:close={() => onClose()} modalClass="flex-col flex">
  <button class="btn btn-sm btn-circle absolute right-2 top-2" on:click={onClose}>✕</button>
  <DialogTitle as="h3" class="font-bold text-lg mb-5">{title}</DialogTitle>
  <pre class="overflow-auto flex-1 -mx-5  px-6 -mb-2 pb-2" bind:this={scrollArea}>
    {#each lines as line}
      {line}
    {/each}
  </pre>
  <!-- <button type="button" on:click={() => onClose()} class="btn btn-primary btn-block btn-shadow flex-1 mt-2">Ok</button> -->
</Dialog>
