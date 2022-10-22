<script>
  import { Dialog, DialogOverlay, DialogTitle, DialogDescription } from "@rgossiaux/svelte-headlessui";
  import { fade, scale, slide } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  export let isOpen = true;
  export let modalClass = "mx-10";
  export let modalStyle = "";
  let isFullyOpen = true;
  const dispatch = createEventDispatcher();

  function onClose() {
    isOpen = false;
    dispatch("close");
  }
</script>

<!--  sm:modal-middle -->
<Dialog class="inset-0 absolute modal modal-bottom modal-open" open={isFullyOpen} on:close={onClose} static>
  <div
    transition:fade={{
      duration: 300,
    }}
    class="inset-0 absolute"
  >
    <DialogOverlay class="absolute inset-0 bg-black opacity-70" />
  </div>
  <!--     transition:scale={{
      delay: 0,
      duration: 200,
      start: 0.7,
    }} -->
  <div
    class={"modal-box max-w-2xl " + modalClass}
    style={modalStyle}
    transition:slide={{
      duration: 300,
    }}
    on:introstart={() => (isFullyOpen = true)}
    on:outroend={() => (isFullyOpen = false)}
  >
    <slot>
      <DialogTitle as="h3" class="font-bold text-lg">Dialog w/o content</DialogTitle>
      <DialogDescription class="py-">Please add some content</DialogDescription>
      <button for="" class="btn btn-sm btn-circle absolute right-2 top-2" on:click={onClose}>✕</button>
      <div class="modal-action">
        <button type="button" on:click={onClose} class="btn">Got it, thanks!</button>
      </div>
    </slot>
  </div>
</Dialog>

<!-- <Transition show={isOpen}>
  <Dialog open={isOpen} on:close={() => (isOpen = false)} class="relative z-10">
    <TransitionChild enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
      <DialogOverlay />
    </TransitionChild>

    <div class="absolute inset-0 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 text-center">
        <TransitionChild enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
          <div class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Payment successful</DialogTitle>

            <DialogDescription class="mt-2 text-sm text-gray-500">This will permanently deactivate your account</DialogDescription>

            <div class="mt-4">
              <button type="button" on:click={() => (isOpen = false)} class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">Got it, thanks!</button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </div>
  </Dialog>
</Transition> -->
