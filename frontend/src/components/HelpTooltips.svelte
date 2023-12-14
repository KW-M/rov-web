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
          placement: "left",
          middleware: {
            autoPlacement: {
              autoAlignment: false,
              crossAxis: true,
              allowedPlacements: ["left", "right"],
            },
          },
        } as PopupSettings,
        config,
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
    savedTooltips.get()[tooltipIndex].actions = actions;
    return actions;
  };
</script>

{#each $savedTooltips as tooltip}
  <div class="card px-4 py-2 opacity-95 font-bold max-w[40px] variant-filled-primary z-40 pointer-events-none select-none" data-popup={tooltip.id} transition:fade={{ duration: 1000 }}>
    {tooltip.label}
    <div class="arrow variant-filled-primary popper-tooltip-arrow" />
  </div>
{/each}

<style>
  /* ***** Popper Tooltip Customizations ***** */

  /*
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

  .popper-tooltip-arrow{
    z-index: -1;
  width: 20px;
  height: 20px;
  } */
  /* .popper-tooltip-arrow::after {
    position: absolute;

    display: block;

    width: 0;
    height: 0;

    border-top: 16px solid rgb(255, 255, 255);
    border-right: 16px solid transparent;
    border-left: 16px solid transparent;
  }

  .popper-tooltip-arrow::before {
    position: absolute;

    display: block;

    width: 0;
    height: 0;

    content: "";

    border-top: 17px solid rgb(0, 0, 0);
    border-right: 17px solid transparent;
    border-left: 17px solid transparent;
  } */
</style>
