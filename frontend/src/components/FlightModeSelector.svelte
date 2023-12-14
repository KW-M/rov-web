<script lang="ts">
  import { FlightMode, FlightmodeNameMap } from "../js/shared/mavlink2RestMessages";
  import ChevronDownIcon from "svelte-google-materialdesign-icons/Expand_more.svelte";
  import { autopilotMode } from "../js/vehicleStats";
  import { RovActions } from "../js/rovActions";

  export let disabled = false;
  export let selectedMode: FlightMode = FlightMode.unknown;
  $: selectedMode = $autopilotMode;
  let onModeChange = (mode: string) => {
    const modeNum = parseInt(mode) as FlightMode;
    console.log("Flightmode change: ", modeNum);
    autopilotMode.set(FlightMode.unknown);
    RovActions.setFlightMode(modeNum);
  };

  let modes = Object.values(FlightMode).filter((v) => typeof v == "number") as FlightMode[];
</script>

<div class="rounded-full bg-slate-50 relative mx-2 mr-4">
  <select {disabled} class="select variant-outline-primary appearance-none md:pl-4" value={selectedMode} on:change={(e) => onModeChange(e.currentTarget.value)}>
    {#each modes as mode}
      {#if mode == FlightMode.unknown}
        <option value={mode} disabled>Flight Mode</option>
      {:else}
        <option value={mode}>{FlightmodeNameMap[mode]}</option>
      {/if}
    {/each}
  </select>
  <ChevronDownIcon class="absolute right-2 top-1/2 -translate-y-1/2 text-2xl pointer-events-none" tabindex="-1" />
</div>
