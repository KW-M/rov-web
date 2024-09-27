<script lang="ts">
  import { Compare_arrows, Data_exploration, Download_done, Drag_handle, Flight_land, Flight_takeoff, Logo_dev, Navigation, Upload, Video_camera_front, Video_chat, Video_library, Video_camera_back } from "svelte-google-materialdesign-icons";
  import RadioSelectGrid from "../components/RadioSelectGrid.svelte";
  import { mainLogr } from "../js/shared/logging";
  import { openLogsTimelineModal, openTestDriveTutModal } from "../components/Modals/modals";
  import InfoNoticeBlock from "../components/NoticeBlocks/InfoNoticeBlock.svelte";
  import PlayArrow from "svelte-google-materialdesign-icons/Play_arrow.svelte";
  import WifiFind from "svelte-google-materialdesign-icons/Wifi_find.svelte";

  let role = "pilot";
  let fileInput;

  const handleLogsFileChosen = (e) => {
    // parse the file as json
    console.log(e.target.files);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result as string;
      const data = JSON.parse(text);
      if (data && data instanceof Array && data.length > 0) {
        for (const log of data) {
          const { level, args, timestamp, origin, kind, trace } = log;
          mainLogr.addLog(level, args, trace, kind, origin, timestamp);
        }
        openLogsTimelineModal();
      }
    };
    reader.readAsText(file);
  };
</script>

<div class="fixed right-4 bottom-4 z-10 max-w-sm hidden md:block">
  <InfoNoticeBlock heading="Here ahead of time?">
    <button
      class="btn btn-sm variant-filled-surface my-1 w-full text-left px-0"
      on:click={() => {
        openTestDriveTutModal();
      }}><PlayArrow tabindex="-1" variation="round" class="mr-3" />Play the Tutorial</button
    >
    <br />
    <a class="btn btn-sm variant-ghost-surface my-1 w-full" href="https://livekit.io/webrtc/browser-test"><WifiFind tabindex="-1" variation="round" class="mr-3" />Check Connection</a>
  </InfoNoticeBlock>
</div>
<div class="container min-h-full mx-auto max-w-full text-center px-10 flex flex-col justify-around items-center">
  <div class="flex-1 my-8 flex flex-col justify-center items-center">
    <h1 class="h1">Welcome to ROV-Web!</h1>
  </div>
  <div class="flex-1 flex-grow-[2] flex flex-col items-center">
    <h4 class="h4 mb-3">Pick your role</h4>
    <RadioSelectGrid
      variant="-surface"
      bind:value={role}
      options={[
        { value: "pilot", label: "Pilot", icon: Flight_takeoff },
        { value: "navigator", label: "Navigator", icon: Navigation },
        { value: "video-capture", label: "Camera Operator", icon: Video_camera_back },
        { value: "data-monitor", label: "Data Scientist", icon: Data_exploration },
      ]}
    />
    <a class="btn variant-filled mt-12 btn-lg mb-12" href={"./" + role}>GO</a>
  </div>
  <div class="py-10 space-y-3">
    <p>Funding From:</p>
    <p><code class="code m-1">AGENCY A</code><code class="code m-1">AGENCY B</code></p>
  </div>

  <!-- file picker for logs review -->
  <button class="btn btn-icon absolute bottom-2 left-2 opacity-50" on:click={() => fileInput.click()}><Logo_dev class="text-2xl pointer-events-none"></Logo_dev></button>
  <input type="file" bind:this={fileInput} class="hidden" accept=".json" on:change={handleLogsFileChosen} />
</div>
