<script lang="ts">
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";

  interface Option {
    value: string | number;
    label: string;
    icon: any;
    action?: () => void;
  }

  export let disabled = false;
  export let autoReset: boolean = false;
  export let value: string | number | any = "";
  export let options: Option[] = [];
  export let variant: string = "";
  export let onChange: (value: string | number | any) => void = () => {};
  let radioGroupElem = null;

  const focusSelected = () => {
    if (value && radioGroupElem && radioGroupElem.$$.root) {
      const focusables = radioGroupElem.$$.root.querySelectorAll(`[tabindex]`);
      for (const focusable of focusables) {
        if (focusable.getAttribute("value") === value) {
          focusable.focus();
          focusable.setAttribute("data-focusindex", "0");
        } else {
          focusable.removeAttribute("data-focusindex");
        }
      }
    }
  };

  let optionsMap = new Map<string | number, { label: string; icon: any; action: () => void }>();
  options.forEach(({ value, label, icon, action }) => {
    optionsMap.set(value, { label, icon, action });
  });

  $: if (value) focusSelected();
  onMount(() => {
    focusSelected();
  });
</script>

<!--<span class="hidden variant-glass-primary focus:variant-ghost-primary hover:variant-outline-primary bg-primary-800/70  variant-glass-error focus:variant-ghost-error hover:variant-outline-error bg-error-800/70 variant-glass-warning variant-glass-secondary variant-glass-surface focus:variant-ghost-warning hover:variant-outline-warning bg-warning-800/70 bg-secondary-800/70 hover:variant-outline-secondary focus:variant-ghost-secondary  bg-surface-800/70 hover:variant-outline-surface focus:variant-ghost-surface"></span>-->

<RadioGroup display="flex p-2 gap-2 max-w-full flex-wrap justify-center items-center variant-glass-error" background={variant ? `` : null} border={variant ? `border-token border${variant}-400-500-token` : null} rounded={"rounded-3xl " + (variant ? "!border" + variant + "-500 " : " ") + $$props.class} bind:this={radioGroupElem}>
  {#each options as option}
    <RadioItem
      on:change={() => {
        if (option.action) {
          option.action();
        }
        onChange(option.value);
        if (autoReset) value = "";
      }}
      title={option.label}
      label={option.label}
      regionLabel="flex-none"
      rounded={`rounded-2xl w-32 h-32  flex flex-col items-center justify-center btn select-none bg${variant}-800/70`}
      hover={`hover:variant-outline${variant} `}
      active={`variant-filled focus:brightness-125`}
      bind:group={value}
      name="justify"
      value={option.value}
      {disabled}
    >
      <svelte:component this={option.icon} class="text-4xl pointer-events-none h-10 w-10 m-1" tabindex="-1" variation="round" />
      <b class="text-lg text-center whitespace-break-spaces pointer-events-none leading-8">{option.label}</b>
    </RadioItem>
  {/each}
</RadioGroup>
