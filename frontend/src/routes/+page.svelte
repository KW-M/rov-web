<script>
  import { Compare_arrows, Data_exploration, Download_done, Drag_handle, Flight_land, Flight_takeoff, Navigation, Upload, Video_camera_front, Video_chat, Video_library } from "svelte-google-materialdesign-icons";
  import RadioSelectGrid from "../components/RadioSelectGrid.svelte";
  let role = "pilot";
</script>

<div class="container h-full mx-auto max-w-full text-center px-10 flex flex-col justify-around items-center">
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
        { value: "video-capture", label: "Video Capture", icon: Video_camera_front },
        { value: "data-monitor", label: "Data Monitor", icon: Data_exploration },
      ]}
    />
    <a class="btn variant-filled mt-12 btn-lg" href={"./" + role}>GO</a>
  </div>
  <div class="py-10 space-y-3">
    <p>Funding From:</p>
    <p><code class="code m-1">AGENCY A</code><code class="code m-1">AGENCY B</code></p>
  </div>
</div>
