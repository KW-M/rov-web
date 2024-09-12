<script lang="ts">
  import { base } from "$app/paths";
  import CircleStatIndicator from "../../components/CircleStatIndicator.svelte";
  import CompassDial from "../../components/CompassDial.svelte";
  import YawRollViz from "../../components/YawRollViz.svelte";
  import { autopilotLoad, batteryPercent, batteryCurrent, batteryVoltage, cpuTempC, cpuUsagePercent, diskUsagePercent, memUsagePercent } from "../../js/vehicleStats";
  import { depthM, networkLatencyMs, waterTempC } from "../../js/sensors";
  import Topbar from "../../components/Topbar.svelte";
  import { AppShell } from "@skeletonlabs/skeleton";
</script>

<AppShell slotPageContent="mx-20">
  <svelte:fragment slot="header">
    <Topbar />
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft"></svelte:fragment>

  <h3 class="h3">Science</h3>
  <div class="flex flex-row flex-wrap gap-2 w-full">
    <CircleStatIndicator value={$waterTempC} min={6} max={27} unit="*C" name="Water Temp" />
    <CircleStatIndicator value={$depthM} min={0} max={50} unit="M" name="Depth" />
  </div>

  <h3 class="h3 mt-8 mb-2">Rov</h3>
  <div class="flex flex-row lex-wrap gap-2 w-full">
    <CircleStatIndicator value={$batteryPercent} min={0} max={100} unit="%" name="Battery" />
    <CircleStatIndicator value={$batteryVoltage} min={11.0} max={17.6} unit="Volts" name="Batt Volts" />
    <CircleStatIndicator value={$batteryCurrent} min={0} max={60} unit="Amps" name="Batt Amps" />
    <CircleStatIndicator value={$networkLatencyMs} min={20} max={600} unit="ms" name="Net Latency" />
  </div>

  <h3 class="h3 mt-8 mb-2">System</h3>
  <div class="flex flex-row flex-wrap gap-2 w-full">
    <CircleStatIndicator value={$memUsagePercent} min={0} max={100} unit="%" name="Memory Usage" />
    <CircleStatIndicator value={$diskUsagePercent} min={0} max={100} unit="%" name="Disk Usage" />
    <CircleStatIndicator value={$cpuTempC} min={20} max={120} unit="*C" name="CPU Temp" />
    <CircleStatIndicator value={$cpuUsagePercent} min={0} max={100} unit="%" name="CPU Usage" />
    <CircleStatIndicator value={$autopilotLoad} min={0} max={120} unit="%" name="Autopilot Load" />
  </div>

  <svelte:fragment slot="footer"></svelte:fragment>
</AppShell>

<!-- <div class="flex flex-col justify-center items-center h-full w-full px-20">
  <section class="flex-auto basis-0 overflow-auto">

  </section>
</div> -->
