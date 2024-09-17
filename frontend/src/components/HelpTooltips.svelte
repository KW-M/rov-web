<script context="module" lang="ts">
  import { popup } from "./Popup/popup";
  import type { PopupSettings } from "./Popup/types";
  import { default as nStore, type nStoreT } from "../js/shared/libraries/nStore";
  import { fade } from "svelte/transition";
  import { onDestroy } from "svelte";

  interface TooltipData {
    id: string;
    label: string;
    config: PopupSettings;
    update: (newArgs: PopupSettings) => void;
    toggle: () => void;
    open: () => void;
    close: (callback?: () => void) => void;
    destroy: () => void;
  }
  let tooltips: nStoreT<Map<string, TooltipData>> = nStore(new Map());
  let tooltipIndex = 0;

  /** create a new tooltip with */
  export const addTooltip = (node: HTMLElement | SVGElement, opts: { label: string; config?: PopupSettings }) => {
    let { label, config } = opts;
    let tooltipId;
    tooltips.update((allTooltips) => {
      tooltipId = "TT-" + String(tooltipIndex++);
      config = Object.assign(
        {
          event: "hover",
          target: tooltipId,
          delay: 800,
          placement: "top",
          middleware: {
            offset: -5,
            arrowOffset: -8,
          },
        } as PopupSettings,
        config || {}
      );
      const tooltipData = {
        id: tooltipId,
        label,
        config,
        update: () => {},
        toggle: () => {},
        open: () => {},
        close: () => {},
        destroy: () => {},
      };
      allTooltips.set(tooltipId, tooltipData);
      return allTooltips;
    });
    setTimeout(() => {
      const actions = popup(node, config);
      tooltips.update((allTooltips) => {
        allTooltips.set(tooltipId, { ...allTooltips.get(tooltipId), ...actions });
        return allTooltips;
      });
    }, 0);
    return {
      update: (newArgs) => tooltips.get().get(tooltipId)?.update(newArgs),
      toggle: () => tooltips.get().get(tooltipId)?.toggle(),
      open: () => tooltips.get().get(tooltipId)?.open(),
      close: () => tooltips.get().get(tooltipId)?.close(),
      destroy: () => {
        tooltips.update((allTooltips) => {
          allTooltips.get(tooltipId)?.destroy();
          allTooltips.delete(tooltipId);
          return allTooltips;
        });
      },
    };
  };
</script>

<script lang="ts">
  onDestroy(() => {
    tooltips.get().forEach((tooltip) => {
      tooltip.destroy();
    });
  });
</script>

{#each $tooltips.values() as tooltip (tooltip.id)}
  <div class="card px-4 py-2 opacity-95 font-bold max-w[40px] variant-glass-secondary border-token border-secondary-500 box-border z-50 pointer-events-none select-none" data-popup={tooltip.id}>
    {tooltip.label}
    <div class="arrow triangle bg-transparent border-secondary-500 pointer-events-none" />
  </div>
{/each}

<style>
  /* ***** Popper Tooltip Customizations ***** */

  .arrow.triangle {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 8px;
    border-bottom-color: transparent;
    border-right-color: transparent;
    width: 0;
    height: 0;
    box-sizing: content-box;
  }

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
