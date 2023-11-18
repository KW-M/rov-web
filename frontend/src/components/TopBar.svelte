<script lang="ts">
  import { AppBar, SlideToggle, getDrawerStore } from "@skeletonlabs/skeleton";
  import CompassDial from "./CompassDial.svelte";

  import { fullscreenOpen } from "../js/globalContext";

  import GearIcon from "svelte-google-materialdesign-icons/Settings_power.svelte";
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
  import FlightModeSelector from "./FlightModeSelector.svelte";
  import { toggleFullscreen } from "../js/util";
  import { RovActions } from "../js/rovActions";
  import { autopilotArmed, autopilotMavState } from "../js/vehicleStats";
  import { MavStateNameMap } from "../js/shared/mavlink2RestMessages";

  const drawerStore = getDrawerStore();
  const openSideDrawer = (): void => drawerStore.open();

  let powerMenuExpanded = false;

  const motorArmSwitchChange = (e) => {
    const arm = e.target.checked;
    // autopilotArmed.set(arm);
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

<AppBar padding="p-2" background="bg-transparent" slotDefault="flex justify-around overflow-visible min-w-0">
  <svelte:fragment slot="lead">
    <button on:click={openSideDrawer} class="btn btn-lg btn-icon bg-initial lg:hidden"> <MenuIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" /></button>
    <FlightModeSelector />
    <button class="btn btn-md variant-outline-primary" on:click={disarmVehicle}>Disarm</button>
    <button class="btn btn-md variant-outline-primary" on:click={armVehicle}>Arm</button>
    <div class="overflow-visible" style="max-width: 4em;">
      {#if powerMenuExpanded}
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
        <button class="btn variant-filled-primary" on:click={() => (powerMenuExpanded = true)}>
          <ShutdownIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
          <MoreHorizIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
        </button>
      {/if}
    </div>
  </svelte:fragment>
  <svelte:fragment slot="default">
    <CompassDial class="w-full flex-auto -z-10" />
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <span class="px-2">MavState: {MavStateNameMap[$autopilotMavState]}</span>

    <SlideToggle name="Arm Vehicle" background="bg-success-400" active="bg-error-500" checked={$autopilotArmed} on:change={motorArmSwitchChange}>
      <span class="whitespace-normal w-min inline-block">{$autopilotArmed ? "Motors ON" : "Motors OFF"}</span>
    </SlideToggle>
    <button class="btn variant-filled-secondary text-white md:btn-base"><span class="hidden lg:inline">Help</span> <HelpIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" /></button>
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
