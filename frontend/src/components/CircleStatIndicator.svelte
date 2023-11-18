<script lang="ts">
  import { getColors } from "../js/colorsVariety";
  import { ProgressRadial } from "@skeletonlabs/skeleton";

  export let value = 2.02302;
  export let min = 0;
  export let max = 100;
  export let unit = "%";
  export let name = "";
  const varietyColor = getColors();

  $: nameParts = name.split(" ");
  $: percent = Math.round(((value - min) / (max - min)) * 100);

  const renderNumber = (value: number) => {
    if (value < 9999) return String(value).substring(0, 4);
    else return value.toExponential(0);
  };
</script>

<div class={"border-2 shadow-md rounded-md p-4 " + varietyColor.bg + " " + varietyColor.border}>
  <ProgressRadial value={percent} strokeLinecap="round" font={126} width="w-full" class="mb-4">
    <tspan x="50%" dy="-0.5em">{renderNumber(value)}</tspan>
    <tspan x="50%" dy="1em" font-weight="normal">{unit}</tspan>
  </ProgressRadial>
  {#each nameParts as namePart}
    <svg class="w-full max-h-10 mt-2" viewBox="0 0 175 30">
      <text x="50%" y="50%" text-anchor="middle" font-weight="bold" dominant-baseline="middle" font-size="32" class="fill-token">{namePart}</text>
    </svg>
  {/each}

  <!-- <p class="text-center" style="font-size: 100%;">Type Of D</p> -->
</div>
