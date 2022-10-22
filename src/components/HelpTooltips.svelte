<script>
  import { ClassInstances } from "../lib/globalContext";
  import { createPopperActions } from "svelte-popperjs";
  import { LOADING_MESSAGE } from "../lib/consts";
  import { onMount } from "svelte";
  import { placements } from "@popperjs/core";
  import { fade } from "svelte/transition";

  /** @typedef {{ label: string, visible: boolean, popperContent:import("svelte-popperjs").ContentAction<Partial<import("@popperjs/core").Modifier<any, any>>> }} savedTooltipData
   * @type {savedTooltipData[]} */
  let tooltips = [];

  const forceUpdate = () => (tooltips = tooltips); /* force svelte update by assign operator */

  /** hide the loading indicator with the given message
   * @typedef {{ label: string, placement: import("@popperjs/core").Placement, timeout: number }} tooltipConfig
   * @param { HTMLElement | SVGElement } node
   * @param { tooltipConfig } config
   * @returns {{tooltip: savedTooltipData, forceUpdateFunc: ()=>void }} */
  const newTooltip = (node, config) => {
    const [popperRef, popperContent] = createPopperActions({
      placement: config.placement || "top", // placement
      strategy: "absolute", // strategy
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ],
    });
    popperRef(node);
    const tooltip = {
      label: config.label,
      visible: false,
      popperContent,
    };
    tooltips.push(tooltip);
    let timeout = null;

    const showTooltip = () => {
      tooltip.visible = true;
      forceUpdate();
    };

    return {
      tooltip,
      showTooltip: showTooltip,
      showTooltipTimeout: () => {
        timeout = setTimeout(showTooltip, config.timeout != undefined ? config.timeout : 750);
      },
      hideTooltip: () => {
        clearTimeout(timeout);
        tooltip.visible = false;
        node.blur();
        forceUpdate();
      },
      destroyTooltip: () => {
        clearTimeout(timeout);
        tooltips = tooltips.filter((t) => t != tooltip);
        forceUpdate();
      },
    };
  };

  /** hide the loading indicator with the given message
   * @param { HTMLElement | SVGElement } node
   * @param { tooltipConfig } config
   * @param { boolean } addEvents  */
  const addTooltip = (node, config, addEvents = true) => {
    const { tooltip, showTooltip, showTooltipTimeout, hideTooltip, destroyTooltip } = newTooltip(node, config);
    if (addEvents) {
      node.addEventListener("pointerenter", showTooltipTimeout);
      node.addEventListener("pointerout", hideTooltip);
      node.addEventListener("focusin", showTooltipTimeout);
      node.addEventListener("focusout", hideTooltip);
      node.addEventListener("mousedown", hideTooltip);
    }
    return {
      tooltip,
      showTooltip,
      showTooltipTimeout,
      hideTooltip,
      destroyTooltip,
      destroy() {
        if (addEvents) {
          node.removeEventListener("pointerenter", showTooltip);
          node.removeEventListener("pointerout", hideTooltip);
          node.removeEventListener("focusin", showTooltip);
          node.removeEventListener("focusout", hideTooltip);
          node.removeEventListener("mousedown", hideTooltip);
        }
        destroyTooltip();
      },
    };
  };
  ClassInstances.addTooltip = addTooltip;
</script>

{#each tooltips as tooltip}
  {#if tooltip.visible}
    <div class="popper-tooltip help-tooltip" use:tooltip.popperContent transition:fade={{ duration: 300 }}>
      {tooltip.label}
    </div>
  {/if}
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
    display: inline-block;

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
