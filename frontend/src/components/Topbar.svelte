<script lang="ts">
  import { getModalStore, RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
  import { fullscreenOpen } from "../js/globalContext";
  import { Person, Flight_takeoff, Navigation, Video_camera_front, Data_exploration, Logo_dev, Help, Info, Fullscreen, Fullscreen_exit } from "svelte-google-materialdesign-icons";
  import { toggleFullscreen } from "../js/util";
  import LogTimeline from "./Modals/LogTimeline.svelte";
  import DropdownMenuPopup from "./DropdownMenuPopup.svelte";
  import { goto, onNavigate } from "$app/navigation";
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { openControlTutModal, openLogsTimelineModal } from "./Modals/modals";
  $: role = Array.from($page.url.pathname.split("/")).pop();
</script>

<nav class="flex app-bar p-4 w-full relative">
  <div class="flex pr-32 justify-start gap-x-1 xl:gap-x-4 sm:gap-x-2 gap-y-1 w-1/2 max-w-1/2 min-w-1/2 items-center">
    <slot name="left" />
  </div>

  <!-- CENTER AREA  -->
  <div class="absolute w-64 left-1/2 -translate-x-1/2 flex justify-center top-0 pointer-events-none">
    <DropdownMenuPopup
      value={role}
      defaultLabel="Role"
      defaultIcon={Person}
      btnClass="btn btn-lg rounded-3xl variant-filled-surface rounded-t-none pointer-events-auto"
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

  <div class="flex justify-end pl-32 gap-x-1 xl:gap-x-4 sm:gap-x-2 w-1/2 max-w-1/2 min-w-1/2 items-center">
    <slot name="right" />
    <DropdownMenuPopup
      defaultLabel="Help"
      btnClass="btn rounded-3xl variant-filled-secondary"
      defaultIcon={Help}
      variant="-secondary"
      autoReset={true}
      options={[
        { value: "tutorial", label: "Tutorial", icon: Info, action: openControlTutModal },
        { value: "logs", label: "Debug Logs", icon: Logo_dev, action: openLogsTimelineModal },
      ]}
    ></DropdownMenuPopup>
    <!-- <div class="radio-group p-1 inline-flex flex-row items-center gap-1 bg-surface-200-700-token border-token border-surface-400-500-token rounded-token">
      <b class="whitespace-nowrap pl-3 pr-2">Monterey-0</b>
      <button class="btn btn-sm variant-filled-error bg-orange-500">Disconnect</button>
    </div> -->
    <button
      class="btn btn-lg btn-icon bg-initial"
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
  </div>
</nav>
