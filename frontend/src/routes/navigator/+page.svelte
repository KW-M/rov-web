<script lang="ts">
  import { base } from "$app/paths";
  import CircleStatIndicator from "../../components/CircleStatIndicator.svelte";
  import CompassDial from "../../components/CompassDial.svelte";
  import YawRollViz from "../../components/YawRollViz.svelte";
  import { autopilotLoad, batteryCurrent, batteryVoltage, cpuTempC, cpuUsagePercent, diskUsagePercent, memUsagePercent } from "../../js/vehicleStats";
  import { depthM, networkLatencyMs, waterTempC } from "../../js/sensors";
  import Topbar from "../../components/Topbar.svelte";
  import { AppShell } from "@skeletonlabs/skeleton";
</script>

<!-- App Shell -->
<!-- <Drawer width="w-72">
  <Sidebar />
</Drawer> -->
<AppShell slotSidebarLeft="p-10">
  <svelte:fragment slot="header">
    <Topbar />
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <h3 class="h3">Navigation</h3>
    <div class="flex flex-row flex-wrap gap-2 w-full">
      <div>
        <CompassDial class="mx-auto relative"></CompassDial>
        <YawRollViz class="m-2 mb-0 w-40 mx-auto relative" />
      </div>
      <CircleStatIndicator value={$depthM} min={0} max={50} unit="M" name="Depth" />
    </div>

    <h3 class="h3 mt-8 mb-2">Rov</h3>
    <div class="flex flex-row lex-wrap gap-2 w-full">
      <CircleStatIndicator value={$batteryVoltage} min={11.0} max={17.6} unit="Volts" name="Batt Volts" />
      <CircleStatIndicator value={$batteryCurrent} min={0} max={60} unit="Amps" name="Batt Amps" />
      <CircleStatIndicator value={$networkLatencyMs} min={20} max={600} unit="ms" name="Net Latency" />
    </div>
  </svelte:fragment>

  <video class="w-full" muted loop controls playsinline>
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
    This browser does not support the video tag.
  </video>

  <svelte:fragment slot="pageFooter"><h4 class="h4 p-6">Pretend this is video from ROV...</h4></svelte:fragment>
</AppShell>
