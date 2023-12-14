<script lang="ts">
  import { AppBar, SlideToggle, getDrawerStore } from "@skeletonlabs/skeleton";
  import CompassDial from "./CompassDial.svelte";

  import { fullscreenOpen } from "../js/globalContext";

  import GearIcon from "svelte-google-materialdesign-icons/Settings_power.svelte";
  import HdIcon from "svelte-google-materialdesign-icons/Hd.svelte";
  import HdrOffIcon from "svelte-google-materialdesign-icons/Hdr_off.svelte";
  import InfoIcon from "svelte-google-materialdesign-icons/Info.svelte";
  import ShutdownIcon from "svelte-google-materialdesign-icons/Power_settings_new.svelte";
  import RestartIcon from "svelte-google-materialdesign-icons/Restart_alt.svelte";
  import DisconnectIcon from "svelte-google-materialdesign-icons/Close.svelte";
  import UpdateSystemIcon from "svelte-google-materialdesign-icons/System_update.svelte";
  import FullscreenIcon from "svelte-google-materialdesign-icons/Fullscreen.svelte";
  import FullscreenExitIcon from "svelte-google-materialdesign-icons/Fullscreen_exit.svelte";
  import MenuIcon from "svelte-google-materialdesign-icons/Menu.svelte";
  import MoreHorizIcon from "svelte-google-materialdesign-icons/More_horiz.svelte";
  import HelpIcon from "svelte-google-materialdesign-icons/Help.svelte";
  import DangerousIcon from "svelte-google-materialdesign-icons/Dangerous.svelte";

  import FlightModeSelector from "./FlightModeSelector.svelte";
  import { toggleFullscreen } from "../js/util";
  import { RovActions } from "../js/rovActions";
  import { autopilotArmed, autopilotMavState } from "../js/vehicleStats";
  import { MavStateNameMap } from "../js/shared/mavlink2RestMessages";
  import { VideoStreamMethod, frontendConnMngr } from "../js/frontendConnManager";
  import { ConnectionStates } from "../js/shared/consts";

  const videoMethod = frontendConnMngr.currentVideoStreamMethod;
  $: usingHDVideo = $videoMethod === VideoStreamMethod.simplepeer;

  const connectionState = frontendConnMngr.connectionState;
  $: connected = $connectionState === ConnectionStates.connected;

  const drawerStore = getDrawerStore();
  const openSideDrawer = (): void => drawerStore.open();

  let powerMenuExpanded = false;

  const motorArmSwitchChange = (e) => {
    const arm = e.target.checked;
    autopilotArmed.set(!arm);
    if (arm) {
      console.log("Arming Vehicle");
      RovActions.takeControl();
    } else {
      console.log("Disarming Vehicle");
      RovActions.disarm();
    }
  };

  const disarmVehicle = () => {
    // VechicleArmed = false;
    RovActions.disarm();
  };

  const armVehicle = () => {
    // VechicleArmed = false;
    RovActions.takeControl();
  };

  const shutdownRov = () => {
    RovActions.shutdownRov();
  };
</script>

<AppBar padding="p-2" class="overflow-visible" background="bg-transparent" slotDefault="flex justify-around overflow-visible min-w-0">
  <svelte:fragment slot="lead">
    <button on:click={openSideDrawer} disabled={!connected} class="btn btn-lg btn-icon bg-initial lg:hidden"> <MenuIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" /></button>
    <FlightModeSelector disabled={!connected} />
    {#if $autopilotArmed}
      <button disabled={!connected} class="variant-filled-error mr-4 max-lg:btn-icon lg:btn btn-base" on:click={disarmVehicle}>
        <DangerousIcon class="block text-2xl pointer-events-none" tabindex="-1" variation="round" />
        <span class="hidden lg:inline">Halt Thrusters</span>
      </button>
    {:else}
      <button disabled={!connected} class="variant-filled-success mr-4 max-lg:btn-icon lg:btn btn-base" on:click={armVehicle}>
        <span class="block text-2xl -my-2 pointer-events-none font-mono font-bold">GO</span>
        <span class="hidden lg:inline">Enable Thrusters</span>
      </button>
    {/if}
    <div class="overflow-visible" style="max-width: 4em;">
      {#if powerMenuExpanded && connected}
        <div class="btn-group variant-filled-primary justify-evenly relative">
          <button on:click={() => (powerMenuExpanded = false)}><DisconnectIcon class="text-2xl  pointer-events-none" tabindex="-1" variation="round" /></button>
          <button
            on:click={() => {
              RovActions.shutdownRov();
              powerMenuExpanded = false;
            }}
            class="variant-filled-secondary"><ShutdownIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" /></button
          >
          <button
            on:click={() => {
              RovActions.rebootRov();
              powerMenuExpanded = false;
            }}
            class="variant-filled-secondary"><RestartIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" /></button
          >
          <button
            on:click={() => {
              RovActions.getRovStatusReport();
              powerMenuExpanded = false;
            }}
            class="variant-filled-secondary"><InfoIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" /></button
          >
          <button
            on:click={() => {
              RovActions.restartRovServices();
              powerMenuExpanded = false;
            }}
            class="variant-filled-secondary"><UpdateSystemIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" /></button
          >
        </div>
      {:else}
        <button disabled={!connected} class="btn variant-filled-primary" on:click={() => (powerMenuExpanded = true)}>
          <ShutdownIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
          <MoreHorizIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
        </button>
      {/if}
    </div>
  </svelte:fragment>
  <svelte:fragment slot="default">
    <span class="px-2 fixed left-1/2 -top-1">MavState: {MavStateNameMap[$autopilotMavState]}</span>
    <CompassDial class="w-full flex-auto -z-10" />
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <button disabled={!connected} class="max-lg:btn-icon lg:btn variant-filled-warning text-white btn-base" on:click={() => frontendConnMngr.toggleSimplePeerConnection()}>
      {#if usingHDVideo}
        <HdrOffIcon class="block text-2xl pointer-events-none" tabindex="-1" variation="round" />
      {:else}
        <HdIcon class="block text-2xl pointer-events-none" tabindex="-1" variation="round" />
      {/if}
      <span class="hidden lg:inline">{usingHDVideo ? "Use SD Video" : "Use HD Video"}</span>
    </button>
    <!-- <SlideToggle name="Arm Vehicle" background="bg-success-400" active="bg-error-500" disabled checked={$autopilotArmed}>
      <span class="whitespace-normal w-min inline-block">{$autopilotArmed ? "Motors ON" : "Motors OFF"}</span>
    </SlideToggle> -->
    <button class="max-lg:btn-icon lg:btn variant-filled-secondary text-white btn-base"><HelpIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" /><span class="hidden lg:inline">Help</span> </button>
    <button
      class="btn btn-lg btn-icon bg-initial"
      on:click={(e) => {
        toggleFullscreen(e, null);
      }}
    >
      {#if $fullscreenOpen}
        <FullscreenExitIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
      {:else}
        <FullscreenIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
      {/if}
    </button>
  </svelte:fragment>
</AppBar>
