<script lang="ts">
  import { FlightMode, FlightmodeNameMap } from "../../../shared/js/mavlink2RestMessages";
  import { RovActions } from "../js/rovActions";

  export let selectedMode: FlightMode = FlightMode.unknown;
  let onModeChange: (mode) => void = () => {
    console.log("No flight mode set handler set");
  };

  let modes = Object.values(FlightMode).filter((v) => typeof v == "number") as FlightMode[];
  console.log(modes, FlightMode);
</script>

<select class="select select-bordered w-fit" value={selectedMode} on:change={(e) => onModeChange(e.currentTarget.value)}>
  <option disabled>Flight Mode</option>
  {#each modes as mode}
    {#if mode == FlightMode.unknown}
      <option value={mode} style="display: none;">Unknown Flight Mode</option>
    {:else}
      <option value={mode}>{FlightmodeNameMap[mode]}</option>
    {/if}
  {/each}
</select>

<style>
  .select {
    margin: 4px;
    z-index: 100;
  }
</style>
