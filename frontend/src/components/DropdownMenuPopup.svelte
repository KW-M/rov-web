<!-- <div class="radio-group flex-col p-1 inline-flex bg-surface-200-700-token border-token border-surface-400-500-token space-x-1 rounded-container-token " data-testid="radio-group" role="radiogroup" aria-labelledby=""><label class="radio-label flex-auto "><div class="radio-item text-base text-center cursor-pointer px-4 py-1 rounded-container-token variant-filled    " data-testid="radio-item" role="radio" aria-checked="true" aria-label="" tabindex="0" title=""><div class="h-0 w-0 overflow-hidden"><input type="radio" name="justify" value="0" tabindex="-1"> -->

<script lang="ts">
  import { focusTrap, ListBox, type PopupSettings } from "@skeletonlabs/skeleton";
  import ListBoxItem from "./SkeletonRemakes/ListBoxItem.svelte";
  import { popup } from "./Popup/popup";
  import { Flight_class, Flight_takeoff, Drag_handle, Expand_more as ExpandMoreIcon, Help as HelpIcon, Flight, Flight_land, Download_done, Upload } from "svelte-google-materialdesign-icons";
  import { onDestroy, onMount } from "svelte";
  import RadioSelectGrid from "./RadioSelectGrid.svelte";

  export let options = [];
  export let disabled = false;
  export let autoReset = false;
  export let defaultIcon = Flight_class;
  export let defaultLabel = "";
  export let value: string = "";
  export let variant = "";
  export let btnClass = "btn variant-filled rounded-3xl lg:w-48 ";
  let openButton: HTMLButtonElement;
  let popupElement: HTMLDivElement;
  let open = false;

  let changeSelectTimeout: NodeJS.Timeout;
  export let onChange = (value: string) => {};
  export const changeSelected = (delta: number) => {
    console.log("changeSelected", delta, open);
    if (!open) {
      popupCombobox.forceOpen = true;
      console.log("changeSelectedOpening", delta, open);
      openButton.click();
    }
    document.activeElement.blur();
    let index = options.findIndex((option) => option.value === value);
    index = (index + delta + options.length) % options.length;
    value = options[index].value;
    clearTimeout(changeSelectTimeout);
    changeSelectTimeout = setTimeout(() => {
      popupCombobox.forceOpen = false;
      if (open) openButton.click();
      onChange(value);
    }, 1500);
  };

  let popupCombobox: PopupSettings = {
    event: "click",
    target: "popup_" + defaultLabel,
    placement: "bottom",
    closeQuery: ".radio-item",
    state: ({ state }) => {
      open = state;
      if (open && !value) popupElement.blur();
    },
    middleware: {
      offset: -5,
      arrow: { element: null },
    },
  };

  let onChangeInternal = (value: string) => {
    if (!popupCombobox.forceOpen) onChange(value);
  };

  let optionsMap = new Map<string, { label: string; icon: any; action: () => void }>();
  options.forEach(({ value, label, icon, action }) => {
    optionsMap.set(value, { label, icon, action });
  });
  onMount(() => {
    document.body.appendChild(popupElement);
  });
  onDestroy(() => {
    document.body.removeChild(popupElement);
  });
</script>

<button class={btnClass} {disabled} class:rounded-b-none={open} class:translate-y-2.5={open} class:!rounded-t-3xl={open} use:popup={popupCombobox} bind:this={openButton}>
  <svelte:component this={(optionsMap.get(value) ?? { icon: defaultIcon }).icon} class="text-2xl pointer-events-none hidden lg:block !m-0" tabindex="-1" variation="round" />
  <svelte:component this={defaultIcon} class="text-2xl pointer-events-none md:hidden !m-0" tabindex="-1" variation="round" />
  <span class="capitalize mr-auto hidden pointer-events-none select-none md:block">{(optionsMap.get(value) ?? { label: defaultLabel }).label}</span>
  <ExpandMoreIcon class="text-2xl flex-shrink-0 pointer-events-none relative !ml-auto !my-0 !-mr-3" tabindex="-1" variation="round" />
</button>

<div class={"card shadow-xl z-50 variant-glass" + variant} data-popup={"popup_" + defaultLabel} use:focusTrap={open} bind:this={popupElement}>
  <RadioSelectGrid bind:value {options} onChange={onChangeInternal} {disabled} {autoReset} {variant} class={"variant-glass" + variant} />
</div>

<style>
  :global(.grid-listbox-item .listbox-label) {
    margin: 0 !important;
    user-select: none;
    pointer-events: none;
    @apply justify-center h-full w-full;
  }
  :global(.ring-outset) {
    --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  }
</style>
