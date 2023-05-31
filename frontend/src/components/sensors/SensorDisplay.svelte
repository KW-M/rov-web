<script context="module" lang="ts">
  import { Icon } from "@steeze-ui/svelte-icon";
  import { NetworkCheck, Waves, Thermostat } from "@steeze-ui/material-design-icons";
  import { addTooltip } from "../HelpTooltips.svelte";
  import { depthM, internalTempC, networkLatencyMs, waterTempC } from "../../js/sensors";
  import type { nStoreT } from "../../js/libraries/nStore";
  import type { IconSource } from "@steeze-ui/svelte-icon/types";
  import { subscribe } from "svelte/internal";
  import { onDestroy } from "svelte";

  type SensorDetails = {
    measurementName: string;
    unit: string;
    icon: IconSource;
    valueStore: nStoreT<number>;
  };

  const sensorDetails: SensorDetails[] = [
    { measurementName: "Depth", unit: "m", icon: Waves, valueStore: depthM },
    { measurementName: "Water Temp", unit: "℃", icon: Thermostat, valueStore: waterTempC },
    { measurementName: "Internal Temp", unit: "℃", icon: Thermostat, valueStore: internalTempC },
    { measurementName: "Latency", unit: "ms", icon: NetworkCheck, valueStore: networkLatencyMs },
  ];
</script>

<script lang="ts">
  let sensorValues = {};
  const unsubs = [];
  for (let i = 0; i < sensorDetails.length; i++) {
    const { measurementName, valueStore } = sensorDetails[i];
    unsubs.push(
      subscribe(valueStore, (value) => {
        sensorValues[measurementName] = value;
        sensorValues = sensorValues; // force update
      })
    );
  }

  onDestroy(() => {
    unsubs.forEach((unsub) => unsub());
  });
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- <progress id="depth" class="progress progress-warning vertical-indicator left-down h-8" value={sensorValues.Depth} max="100" tabindex="0" use:addTooltip={{ label: "Depth Guage", placement: "right", timeout: 500 }}> Depth: {sensorValues.Depth}ft</progress> -->
<!-- <input id="depth" type="range" min="0" max="100" value={sensorValues.Depth} class="range range-primary range-md vertical-indicator left-down" /> -->
<input id="depth2" type="range" min="0" max="100" value={$depthM} class="range range-info range-md vertical-indicator left-down" />
<!-- <progress id="depth2" class="progress progress-success" value="40" max="100" /> -->
<div class="sensor-overlay-container pointer-events-none">
  <div class="sensor-overlay sensor-overlay-left">
    <div class="w-4 h-12" />
    {#each sensorDetails as { measurementName, unit, icon, valueStore }, i}
      {#if i <= sensorDetails.length / 2}
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div class="sensor pointer-events-auto cursor-help" tabindex="0" use:addTooltip={{ label: measurementName, placement: "bottom", timeout: 0 }}>
          <Icon theme="solid" src={icon} class="sensor-icon pointer-events-none w-6 h-6 mr-2" />
          <span class="sensor-value">{sensorValues[measurementName].toFixed(2).padEnd(4)}</span>
          <span class="sensor-unit">{unit}</span>
        </div>
      {/if}
    {/each}
  </div>
  <div class="sensor-center-spacer" />
  <div class="sensor-overlay sensor-overlay-right">
    <div class="w-12 h-12" />
    {#each sensorDetails as { measurementName, unit, icon }, i}
      {#if i > sensorDetails.length / 2}
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div class="sensor pointer-events-auto cursor-help" tabindex="0" use:addTooltip={{ label: measurementName, placement: "bottom", timeout: 0 }}>
          <Icon theme="solid" src={icon} class="sensor-icon pointer-events-none w-6 h-6 mr-2" />
          <span class="sensor-value">{sensorValues[measurementName].toFixed(2).padEnd(4)}</span>
          <span class="sensor-unit">{unit}</span>
        </div>
      {/if}
    {/each}
  </div>
</div>

<!-- <div class="sensor-overlay sensor-overlay-right" /> -->
<style>
  .sensor-overlay-container {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    color: white;
    display: flex;
    align-items: flex-start;
    /* padding-bottom: 40px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%); */
  }

  .sensor-overlay-left {
    /* flex-wrap: wrap;
    display: flex;
    justify-content: space-around;
    flex: 1;
    background: white;
    min-height: 36px;
    padding-right: 1rem;
    box-sizing: content-box; */
  }

  .sensor-center-spacer {
    /* @apply max-w-xl; */
    width: calc(100% - 12.5rem);
    max-width: 24rem;
    flex-shrink: 0;
  }

  .sensor-overlay {
    min-height: 36px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1;
    box-sizing: content-box;
  }

  .sensor-overlay-right {
    justify-content: flex-end;
    flex-direction: row-reverse;
  }

  .spacer {
    width: 3rem;
    height: 3rem;
  }

  .sensor {
    border-radius: 40px;

    background-color: hsl(var(--b1) / 0.8);
    display: flex;

    padding: 0.3rem 0.8rem;

    margin: 0.25rem;
    margin-right: auto;
    /* --tw-shadow-color: #000;
    @apply shadow-lg; */
    align-items: left;
  }

  .sensor * {
    user-select: none;
    pointer-events: none;
  }

  .sensor-overlay-right .sensor {
    margin-left: auto;
    margin-right: 0.25rem;
  }

  .vertical-indicator {
    /* pointer-events: none; */
    padding: 0;
    position: absolute;
    width: calc(100vh - 1em);
  }

  .vertical-indicator.left-up {
    bottom: 0.5em;
    left: 0.75em;
    transform: rotate(-90deg);
    transform-origin: left bottom;
  }

  .vertical-indicator.left-down {
    top: -0.5em;
    left: 1.5em;
    transform: rotate(90deg);
    transform-origin: left top;
  }

  .vertical-indicator.right-up {
    top: 0;
    right: 0em;
    width: calc(100vh - 2em);
    transform: rotate(-90deg);
    transform-origin: right bottom;
  }

  .vertical-indicator.right-down {
    bottom: 0;
    right: -0.75em;
    width: calc(100vh - 2em);
    transform: rotate(90deg);
    transform-origin: right top;
  }
</style>
