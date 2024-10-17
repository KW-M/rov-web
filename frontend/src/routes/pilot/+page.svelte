<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { AppShell, Drawer, getDrawerStore } from "@skeletonlabs/skeleton";
  import OnscreenGamepads from "../../components/OnscreenGamepads.svelte";
  import VideoPlayer from "../../components/VideoPlayer.svelte";
  import Sidebar from "../../components/Sidebar.svelte";
  import Topbar from "../../components/Topbar.svelte";
  import HelpTooltips from "../../components/HelpTooltips.svelte";
  import { RovActions } from "../../js/rovActions";
  import { FlightMode } from "../../js/shared/mavlink2RestMessages";
  import { autopilotArmed, autopilotMode } from "../../js/vehicleStats";
  import DropdownMenuPopup from "../../components/DropdownMenuPopup.svelte";
  import { ConnectionStates } from "../../js/shared/consts";
  import { frontendConnMngr, VideoStreamMethod } from "../../js/frontendConnManager";
  import { Dangerous, Download_done, Drag_handle, Flight_class, Flight_land, Mode_fan_off, Menu, Play_arrow, Power_off, Power_settings_new, Restart_alt, Rotate_left, Upload } from "svelte-google-materialdesign-icons";
  import VideoSettings from "../../components/Modals/VideoSettings.svelte";
  import { getLocalStore } from "../../js/localStorage";
  import { openTestDriveTutModal } from "../../components/Modals/modals";
  import { tutorialModeActive } from "../../js/globalContext";
  import ArmReminder from "../../components/ArmReminder.svelte";

  const videoMethod = frontendConnMngr.currentVideoStreamMethod;
  $: usingHDVideo = $videoMethod === VideoStreamMethod.simplePeer;

  const connectionState = frontendConnMngr.connectionState;
  $: connected = $connectionState === ConnectionStates.connected;

  const drawerStore = getDrawerStore();
  const openSideDrawer = (): void => drawerStore.open();

  onMount(() => {
    if (getLocalStore().getItem("tutorialComplete") == null) {
      openTestDriveTutModal();
    }
  });

  onDestroy(() => {
    RovActions.triggerNextFlightModeUi = null;
  });
</script>

<!-- App Shell -->
<HelpTooltips />
<Drawer width="w-72" bgBackdrop={$drawerStore.id === "video-settings" ? "bg-surface-backdrop-token" : "bg-surface-backdrop-token"}>
  {#if $drawerStore.id === "video-settings"}
    <VideoSettings />
  {:else}
    <Sidebar />
  {/if}
</Drawer>

<AppShell slotSidebarLeft={"bg-surface-500/5 hidden lg:block"} regionPage="[&>main]:relative">
  <svelte:fragment slot="pageHeader">
    <Topbar>
      <svelte:fragment slot="left">
        <button on:click={openSideDrawer} disabled={!connected} class="btn btn-lg btn-icon bg-initial"> <Menu class="text-2xl pointer-events-none" tabindex="-1" variation="round" /></button>

        <DropdownMenuPopup
          bind:value={$autopilotMode}
          bind:changeSelected={RovActions.triggerNextFlightModeUi}
          btnClass="btn rounded-3xl variant-filled-warning"
          variant="-warning"
          defaultLabel="Fly Mode"
          defaultIcon={Flight_class}
          disabled={!connected}
          onChange={(value) => {
            if (!tutorialModeActive.get()) RovActions.setFlightMode(parseInt(value));
          }}
          options={[
            { value: FlightMode.manual, label: "Manual", icon: Flight_land },
            { value: FlightMode.stabilize, label: "Stabilize", icon: Drag_handle },
            { value: FlightMode.depth_hold, label: "Stabilize Depth", icon: Download_done },
            // { value: FlightMode.surface, label: "Surface", icon: Upload },
            { value: FlightMode.acrobatic, label: "Acro", icon: Rotate_left },
          ]}
        ></DropdownMenuPopup>

        <div role="button" class="chip variant-filled-success rounded-full select-none" class:!bg-orange-500={!$autopilotArmed} on:pointerdown={() => (autopilotArmed.get() ? RovActions.disarm() : RovActions.takeControl())}>
          {#if $autopilotArmed}
            <Play_arrow class="block text-2xl pointer-events-none" tabindex="-1" variation="round" />
            <b>ON</b>
          {:else}
            <Mode_fan_off class="block text-2xl pointer-events-none" tabindex="-1" variation="round" />
            <b>OFF</b>
          {/if}
        </div>
      </svelte:fragment>
      <svelte:fragment slot="right">
        <!-- <span class="px-2">MavState: {MavStateNameMap[$autopilotMavState]}</span> -->
        <!-- <SlideToggle name="Arm Vehicle" background="bg-success-400" active="bg-error-500" disabled checked={$autopilotArmed}>
          <span class="whitespace-normal w-min inline-block">{$autopilotArmed ? "Motors ON" : "Motors OFF"}</span>
        </SlideToggle> -->
        <DropdownMenuPopup
          defaultLabel="Power"
          btnClass="btn rounded-3xl variant-filled-primary"
          variant="-primary"
          defaultIcon={Power_settings_new}
          disabled={!connected}
          autoReset={true}
          options={[
            { value: "shutdown", label: "Shutdown ROV", icon: Power_off, action: RovActions.shutdownRov },
            { value: "restart", label: "Reboot ROV", icon: Restart_alt, action: RovActions.rebootRov },
          ]}
        ></DropdownMenuPopup>
      </svelte:fragment>
    </Topbar>
  </svelte:fragment>
  <!-- <svelte:fragment slot="sidebarLeft">
    <Sidebar />
  </svelte:fragment> -->

  {#if connected}
    <VideoPlayer />
  {/if}
  {#if !$tutorialModeActive}
    <OnscreenGamepads tooltipDelay={1000} />
    {#if connected}
      <ArmReminder />
    {/if}
  {/if}
</AppShell>
