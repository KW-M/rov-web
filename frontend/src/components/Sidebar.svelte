<script lang="ts">
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import CircleStatIndicator from "./CircleStatIndicator.svelte";

  import CloseIcon from "svelte-google-materialdesign-icons/Close.svelte";
  import ChevronLeftIcon from "svelte-google-materialdesign-icons/Chevron_left.svelte";
  import ChevronRightIcon from "svelte-google-materialdesign-icons/Chevron_right.svelte";
  import ChevronUpIcon from "svelte-google-materialdesign-icons/Expand_less.svelte";
  import ChevronDownIcon from "svelte-google-materialdesign-icons/Expand_more.svelte";
  import { get } from "svelte/store";
  import YawRollViz from "./YawRollViz.svelte";
  import { toastHistoryStore } from "../js/toastMessageManager";
  import { autopilotLoad, batteryPercent, batteryCurrent, batteryVoltage, cpuTempC, cpuUsagePercent, diskUsagePercent, memUsagePercent } from "../js/vehicleStats";
  import { depthM, networkLatencyMs, waterTempC } from "../js/sensors";
  import { sidebarExpanded } from "../js/globalContext";
  import { scale } from "svelte/transition";

  let expandedMessage = -1;
  let messageListExpanded = false;
  const getFadeBackoff = (index: number): number => {
    if (index == 0) return 0;
    return (3.5 + (Math.min(index, 6) / 60) * 5) * index;
  };

  const drawerStore = getDrawerStore();
  drawerStore.subscribe((val) => {
    sidebarExpanded.set(val.open);
  });
  const closeSideDrawer = (): void => drawerStore.close();

  const toggleSidebarExpanded = (): void => {
    if (get(drawerStore).open) closeSideDrawer();
    else sidebarExpanded.set(!sidebarExpanded.get());
  };
</script>

<!-- {#if $drawerStore.open}
  <button on:click={closeSideDrawer} class="btn btn-lg btn-icon absolute -right-10 top-0">
    <CloseIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
  </button>
{/if} -->
<div class="flex flex-col h-full overflow-hidden relative" class:w-72={$sidebarExpanded} class:w-28={!$sidebarExpanded}>
  {#if $toastHistoryStore.length > 0 && $sidebarExpanded}
    <section class="overflow-clip rounded-b-xl bg-black relative shadow-md pt-2">
      <div class="p-2 max-h-80 relative z-0 pb-4" class:h-24={!messageListExpanded} class:overflow-y-clip={!messageListExpanded} class:overflow-y-auto={messageListExpanded}>
        {#each $toastHistoryStore as toastMsg, index (toastMsg.toastId)}
          {#if toastMsg.closed}
            <!-- svelte-ignore a11y-no-interactive-element-to-noninteractive-role -->
            <button
              class={`btn relative shadow-2xl variant-filled-${toastMsg.severity} btn-md toast flex justify-between items-center pointer-events-auto  p-4 space-x-4 rounded-container-token shadow-lg w-full cursor-pointer`}
              role="banner"
              class:mb-2={messageListExpanded}
              style:top={(messageListExpanded ? 0 : -getFadeBackoff(index)) + "em"}
              style:z-index={10 - index}
              class:h-16={index != expandedMessage}
              class:border-2={index == expandedMessage}
              transition:scale|global={{ duration: 200, delay: 0 }}
              on:click={() => {
                if (!messageListExpanded) {
                  sidebarExpanded.set(true);
                  expandedMessage = index;
                  messageListExpanded = true;
                } else if (expandedMessage == index) {
                  expandedMessage = -1;
                } else {
                  expandedMessage = index;
                }
              }}
            >
              <!-- Icon -->
              <!-- <ChevronDownIcon class="text-2xl pointer-events-none pr-12 shrink-0 text-white fill-white" tabindex="-1" height="24px" width="24px" variation="round" /> -->
              <!-- Message -->
              {#if $sidebarExpanded}
                <div class="alert-message overflow-hidden text-left text-ellipsis whitespace-normal" style={expandedMessage == index ? "" : "max-height:3em"}>
                  <p>{toastMsg.messageRepeatCount > 1 ? `[x${toastMsg.messageRepeatCount}] ` : ""}{toastMsg.msg}</p>
                </div>
              {/if}
            </button>
          {/if}
        {/each}
      </div>
    </section>
    {#if messageListExpanded}
      <button
        on:click={() => {
          expandedMessage = -1;
          messageListExpanded = false;
        }}
        class="btn variant-filled-primary relative max-w-28 mx-auto mr-4 z-10 shadow-xl -mt-5 -mb-5 z-1"
      >
        <ChevronUpIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
      </button>
    {/if}
  {/if}

  <section class="flex-auto basis-0 overflow-auto">
    <YawRollViz class="m-2 mb-0" />
    <div class="grid gap-2 p-2" class:grid-cols-1={!$sidebarExpanded} class:grid-cols-2={$sidebarExpanded}>
      <CircleStatIndicator value={$depthM} min={0} max={50} unit="M" name="Depth" />
      <CircleStatIndicator value={$waterTempC} min={6} max={27} unit="*C" name="Water Temp" />
      <CircleStatIndicator value={$batteryPercent} min={0} max={100} unit="%" name="Battery" />
      <CircleStatIndicator value={$batteryVoltage} min={11.0} max={17.6} unit="Volts" name="Batt Volts" />
      <CircleStatIndicator value={$batteryCurrent} min={0} max={60} unit="Amps" name="Batt Amps" />
      <CircleStatIndicator value={$networkLatencyMs} min={20} max={600} unit="ms" name="Net Latency" />
      <CircleStatIndicator value={$autopilotLoad} min={0} max={120} unit="%" name="Autopilot Load" />
      <CircleStatIndicator value={$memUsagePercent} min={0} max={100} unit="%" name="Memory Usage" />
      <CircleStatIndicator value={$diskUsagePercent} min={0} max={100} unit="%" name="Disk Usage" />
      <CircleStatIndicator value={$cpuTempC} min={20} max={120} unit="*C" name="CPU Temp" />
      <CircleStatIndicator value={$cpuUsagePercent} min={0} max={100} unit="%" name="CPU Usage" />
    </div>
  </section>
  <button class="btn w-full variant-filled-surface relative rounded-b-none rounded-t-xl z-10" on:click={toggleSidebarExpanded}>
    {#if $sidebarExpanded}
      <ChevronLeftIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
    {:else}
      <ChevronRightIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
    {/if}
  </button>
</div>
