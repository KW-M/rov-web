<script lang="ts">
  import { getModalStore, RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
  import { popup } from "./Popup/popup";
  import { fullscreenOpen } from "../js/globalContext";
  import { Person, Flight_takeoff, Navigation, Video_camera_front, Data_exploration, Logo_dev, Help, Info, Fullscreen, Fullscreen_exit, Network_check, Network_ping, Network_cell, Wifi_channel, Wifi_find, Battery_1_bar, Battery_unknown, Battery_2_bar, Battery_3_bar, Battery_4_bar, Battery_5_bar, Battery_6_bar, Battery_full, Battery_0_bar, Currency_bitcoin, Electric_bolt, Electric_meter } from "svelte-google-materialdesign-icons";
  import { renderNumber, toggleFullscreen } from "../js/util";
  import LogTimeline from "./Modals/LogTimeline.svelte";
  import DropdownMenuPopup from "./DropdownMenuPopup.svelte";
  import { goto, onNavigate } from "$app/navigation";
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { openControlTutModal, openLogsTimelineModal } from "./Modals/modals";
  import { batteryPercent, batteryCurrent, batteryVoltage } from "../js/vehicleStats";
  import { frontendConnMngr } from "../js/frontendConnManager";
  import { ConnectionStates } from "../js/shared/consts";
  $: role = Array.from($page.url.pathname.split("/")).pop();
  const spState = frontendConnMngr.simplePeerConnection.connectionState;
  const lkState = frontendConnMngr.livekitConnection.connectionState;
</script>

<nav class="flex app-bar p-4 w-full relative z-10" class:-mt-20={$fullscreenOpen}>
  <div class="flex pb-20 sm:pt-0 sm:pb-0 pr-1 sm:pr-10 justify-start gap-x-1 xl:gap-x-4 sm:gap-x-2 gap-y-1 flex-1 sm:w-1/2 sm:max-w-1/2 min-w-1/2 items-center">
    <slot name="left" />
  </div>

  <!-- CENTER AREA  -->
  <div class="absolute w-64 left-1/2 -translate-x-1/2 flex justify-center top-20 sm:top-0 pointer-events-none">
    <DropdownMenuPopup
      value={role}
      defaultLabel="Role"
      defaultIcon={Person}
      btnClass="btn btn-lg rounded-3xl variant-filled-surface sm:rounded-t-none pointer-events-auto"
      variant="-surface"
      onChange={(value) => {
        goto(`${base}/${value}`);
      }}
      options={[
        { value: "pilot", label: "Pilot", icon: Flight_takeoff },
        { value: "navigator", label: "Navigator", icon: Navigation },
        { value: "video-capture", label: "Video Capture", icon: Video_camera_front },
        { value: "data-monitor", label: "Data Monitor", icon: Data_exploration },
      ]}
    ></DropdownMenuPopup>
  </div>

  <div class="flex justify-end pb-20 sm:pt-0 sm:pb-0 sm:pl-10 gap-x-1 xl:gap-x-4 sm:gap-x-2 flex-1 sm:w-1/2 sm:max-w-1/2 min-w-1/2 items-center">
    <div
      class="chip text-base variant-filled space-x-2 rounded-full select-none [&>*]:pointer-events-none"
      use:popup={{
        target: "battery_info_popup",
        event: "hover",
        placement: "bottom",
        middleware: {
          offset: 12,
        },
      }}
    >
      {#if $batteryPercent <= 12.5}
        <Battery_0_bar class="-rotate-90" tabindex="-1" variation="round" />
      {:else if $batteryPercent <= 25}
        <Battery_1_bar class="-rotate-90" tabindex="-1" variation="round" />
      {:else if $batteryPercent <= 37.5}
        <Battery_2_bar class="-rotate-90" tabindex="-1" variation="round" />
      {:else if $batteryPercent <= 50}
        <Battery_3_bar class="-rotate-90" tabindex="-1" variation="round" />
      {:else if $batteryPercent <= 62.5}
        <Battery_4_bar class="-rotate-90" tabindex="-1" variation="round" />
      {:else if $batteryPercent <= 75}
        <Battery_5_bar class="-rotate-90" tabindex="-1" variation="round" />
      {:else if $batteryPercent <= 87.5}
        <Battery_6_bar class="-rotate-90" tabindex="-1" variation="round" />
      {:else}
        <Battery_full class="-rotate-90" tabindex="-1" variation="round" />
      {/if}
      <span class="hidden lg:inline font-bold">
        {renderNumber($batteryPercent)}%
      </span>
    </div>

    <div data-popup="battery_info_popup">
      <div class="card variant-filled flex flex-col items-stretch gap-3 p-4 select-none relative">
        <b class="text-center">Battery</b>
        <div>
          <Battery_full class="text-2xl inline-block" tabindex="-1" variation="round" />
          <span>
            {renderNumber($batteryPercent)}% full
          </span>
        </div>
        <div>
          <Electric_bolt class="text-2xl inline-block" tabindex="-1" variation="round" />
          <span>
            {renderNumber($batteryVoltage)} volts
          </span>
        </div>
        <div>
          <Electric_meter class="text-2xl inline-block" tabindex="-1" variation="round" />
          <span>
            {renderNumber($batteryCurrent)} amps
          </span>
        </div>

        <div class="arrow variant-filled max-md:hidden" />
      </div>
    </div>
    <slot name="right" />
    <DropdownMenuPopup
      defaultLabel="Help"
      btnClass="btn rounded-3xl variant-filled-secondary"
      defaultIcon={Help}
      variant="-secondary"
      autoReset={true}
      options={[
        { value: "logs", label: "Debug Logs", icon: Logo_dev, action: openLogsTimelineModal },
        { value: "test-connection", label: "Check Connection", icon: Wifi_find, action: () => (window.location = "https://livekit.io/webrtc/browser-test") },
        { value: "tutorial", label: "Tutorial", icon: Info, action: openControlTutModal },
      ]}
    ></DropdownMenuPopup>
    <!-- <div class="radio-group p-1 inline-flex flex-row items-center gap-1 bg-surface-200-700-token border-token border-surface-400-500-token rounded-token">
      <b class="whitespace-nowrap pl-3 pr-2">Monterey-0</b>
      <button class="btn btn-sm variant-filled-error bg-orange-500">Disconnect</button>
    </div> -->
    <button
      class="btn btn-lg btn-icon bg-initial"
      class:translate-y-20={$fullscreenOpen}
      on:click={(e) => {
        toggleFullscreen(e, null);
      }}
    >
      {#if $fullscreenOpen}
        <Fullscreen_exit class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
      {:else}
        <Fullscreen class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
      {/if}
    </button>
    {$lkState}{$spState}
    <div class="rounded-full w-1.5 h-1.5 absolute top-1 right-2 bg-green-500 opacity-30" aria-hidden="true" class:!opacity-100={$spState == ConnectionStates.connected} class:animate-pulse-full={$spState == ConnectionStates.connecting || $spState == ConnectionStates.reconnecting}></div>
    <div class="rounded-full w-1.5 h-1.5 absolute top-1 right-4 bg-orange-500 opacity-30" aria-hidden="true" class:!opacity-100={$lkState == ConnectionStates.connected} class:animate-pulse-full={$lkState == ConnectionStates.connecting || $lkState == ConnectionStates.reconnecting}></div>
  </div>
</nav>

<style>
  @keyframes pulse-full {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .animate-pulse-full {
    animation: pulse-full 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>
