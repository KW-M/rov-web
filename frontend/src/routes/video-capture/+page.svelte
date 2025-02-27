<script lang="ts">
  import { onDestroy } from "svelte";
  import { Camera_alt, Video_camera_back } from "svelte-google-materialdesign-icons";
  import Topbar from "../../components/Topbar.svelte";
  import { AppShell } from "@skeletonlabs/skeleton";

  let player = null;
  let offsetSeconds = 0;
  let interval: NodeJS.Timeout;

  const setupTwitchEmbed = () => {
    console.log("Setting up Twitch Embed", window.Twitch);
    player = new window.Twitch.Player("twitch-clips-embed", {
      width: "100%",
      height: "100%",
      channel: "irovweb",
      muted: true,
    });
    console.log(player, player.getVideo());
    interval = setInterval(() => {
      offsetSeconds = player.getCurrentTime();
    }, 100);
  };

  onDestroy(() => {
    if (player) player.destroy();
    if (interval) clearInterval(interval);
  });
</script>

<svelte:head>
  <script src="https://player.twitch.tv/js/embed/v1.js" on:load={setupTwitchEmbed}></script>
</svelte:head>

<AppShell slotPageContent="flex flex-col justify-center items-center" slotFooter="flex items-center justify-center space-x-3 p-4">
  <svelte:fragment slot="header">
    <Topbar />
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft"></svelte:fragment>

  <div id="twitch-clips-embed" class="w-full flex-1"></div>

  <svelte:fragment slot="footer">
    <!-- <b>Timestamp: {offsetSeconds}</b> -->
    <button
      on:click={() => {
        alert("Not Implemented");
        window.open(`https://clips.twitch.tv/create?broadcasterLogin=irovweb&offsetSeconds=${Math.round(offsetSeconds)}`, "Clip Video", "popup,width=800,height=600");
      }}
      class="btn variant-filled-primary btn-lg"><Video_camera_back class="text-2xl"></Video_camera_back><span class="hidden md:inline">Clip Video</span></button
    >
    <div class="w-96 h-4"></div>
    <button class="btn variant-filled-secondary btn-lg" on:click={() => alert("Not Implemented")}><Camera_alt class="text-2xl pointer-events-none" /><span class="hidden md:inline">Take Photo</span></button>
  </svelte:fragment>
</AppShell>
