<script context="module" lang="ts">
  import { popup } from "./Popup/popup";
  import type { PopupSettings } from "./Popup/types";
  import { default as nStore, type nStoreT } from "../js/shared/libraries/nStore";
  import { fade } from "svelte/transition";
  import { waitfor } from "../js/shared/util";

  type savedTooltipData = {
    id: string;
    label: string;
    config: PopupSettings;
    actions?: {
      update: (config: PopupSettings) => void;
      open: () => void;
      close: () => void;
      toggle: () => void;
      destroy: () => void;
    };
  };
  let savedTooltips: nStoreT<savedTooltipData[]> = nStore([]);

  /** create a new tooltip with */
  export const addTooltip = async (node: HTMLElement | SVGElement, message: string, config: PopupSettings | null) => {
    let actions, tooltipId, savedInfo, tooltipIndex;
    savedTooltips.update((tooltips) => {
      tooltipId = "TT-" + String(tooltips.length);
      config = Object.assign(
        {
          event: "hover",
          target: tooltipId,
          delay: 1500,
          placement: "bottom",
          middleware: {
            autoPlacement: {
              alignment: "start",
              autoAlignment: true,
            },
          },
        } as PopupSettings,
        config
      );
      tooltipIndex = tooltips.length;
      tooltips.push({
        id: tooltipId,
        label: message,
        config: config,
      });
      return tooltips;
    });
    await waitfor(1);
    actions = popup(node, config);
    console.log("tooltip ddd", savedTooltips.get());
    savedTooltips.get()[tooltipIndex].actions = actions;
    console.log("tooltip created", savedTooltips.get()[tooltipIndex]);
    return actions;
  };
</script>

{#each $savedTooltips as tooltip}
  <div class="popper-tooltip help-tooltip z-40 opacity-0" data-popup={tooltip.id} transition:fade={{ duration: 1000 }}>
    {tooltip.label}
  </div>
{/each}

<style>
  /* ***** Popper Tooltip Customizations ***** */

  .help-tooltip {
    user-select: none;
    pointer-events: none;
  }

  .popper-tooltip {
    z-index: 1000;
    white-space: pre-wrap;

    padding: 5px 10px;

    color: #000000;
    border: solid 3px black;
    border-radius: 8px;
    background: #fff;

    font-size: 16px;
    font-weight: bold;
  }

  .popper-tooltip::after {
    position: absolute;

    display: block;

    width: 0;
    height: 0;

    content: "";

    border-top: 16px solid rgb(255, 255, 255);
    border-right: 16px solid transparent;
    border-left: 16px solid transparent;
  }

  .popper-tooltip::before {
    position: absolute;

    display: block;

    width: 0;
    height: 0;

    content: "";

    border-top: 17px solid rgb(0, 0, 0);
    border-right: 17px solid transparent;
    border-left: 17px solid transparent;
  }

  :global(.popper-tooltip[data-popper-placement^="top"]::after) {
    bottom: -16px;
    left: 50%;

    transform: translateX(-16px) rotate(0);
  }

  :global(.popper-tooltip[data-popper-placement^="bottom"]::after) {
    top: -15px;
    left: 50%;

    transform: translateX(-16px) rotate(180deg);
  }

  :global(.popper-tooltip[data-popper-placement^="left"]::after) {
    top: 50%;
    right: -22px;

    transform: translateY(-8px) rotate(270deg);
  }

  :global(.popper-tooltip[data-popper-placement^="right"]::after) {
    top: 50%;
    left: -22px;

    transform: translateY(-8px) rotate(90deg);
  }

  :global(.popper-tooltip[data-popper-placement^="top"]::before) {
    bottom: -20px;
    left: 50%;

    transform: translateX(-17px) rotate(0);
  }

  :global(.popper-tooltip[data-popper-placement^="bottom"]::before) {
    top: -19px;
    left: 50%;
    transform: translateX(-17px) rotate(180deg);
  }

  :global(.popper-tooltip[data-popper-placement^="left"]::before) {
    top: 50%;
    right: -26px;

    transform: translateY(-8.5px) rotate(270deg);
  }

  :global(.popper-tooltip[data-popper-placement^="right"]::before) {
    top: 50%;
    left: -26px;

    transform: translateY(-8.5px) rotate(90deg);
  }
</style>
