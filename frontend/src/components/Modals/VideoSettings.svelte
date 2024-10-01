<script context="module" lang="ts">
  import nStore from "../../js/shared/libraries/nStore";

  export const onLivekitVideoOptionsChange = (options: LivekitVideoStatsResponse) => {
    // if (lastChangeTimestamp + 1000 > unixTimeNow()) return;
    // useLivekit.set(options.Enabled);
    // if (options.Enabled) {
    //   allowBkupCodec.set(options.AllowBackupCodec);
    //   maxBitrate.set(options.BaseStream.MaxBitrate);
    //   keepFullResLayer.set(options.SimulcastLayers?.length > 0);
    //   if (!useSimplePeer.get()) {
    //     size.set(options.BaseStream.Height);
    //     codec.set(options.Codec);
    //   }
    // }
    lkSenderVideoStats.set(options.stats);
  };

  export const onSimplePeerVideoOptionsChange = (options: SimplePeerVideoStatsResponse) => {
    // if (lastChangeTimestamp + 1000 > unixTimeNow()) return;
    // const videoStream = frontendConnMngr.simplePeerConnection.remoteVideoStreams.get().values().next().value;
    // const enabled = videoStream && videoStream.getTracks().length > 0 && videoStream.getTracks()[0].enabled;
    // const preferedMimetypes = frontendConnMngr.simplePeerConnection.getCodecPreferences();
    // const preferedCodecs = preferedMimetypes ? preferedMimetypes.map((mimeType) => mimeType.split("/")[1].toUpperCase()) : [];
    // useSimplePeer.set(enabled);
    // if (enabled) {
    //   size.set(options.BaseStream.Height);
    //   codec.set(preferedCodecs && preferedCodecs.length > 0 ? preferedCodecs[0] : "unknown");
    // }
    spSenderVideoStats.set(options.stats);
  };

  const allowBkupCodec = nStore(false);
  const size = nStore(1080);
  const maxBitrate = nStore(700_000);
  const updateBitrateWithResolution = nStore(true);
  const spPlayoutDelay = nStore(0);
  const lkPlayoutDelay = nStore(0);
  const codec = nStore("vp9");
  const keepFullResLayer = nStore(false);
  const useSimplePeer = nStore(false);
  const useLivekit = nStore(true);
  const useTwitch = nStore(false);
  const spSenderVideoStats = nStore<ComputedRtpStats | null>(null);
  const lkSenderVideoStats = nStore<ComputedRtpStats | null>(null);
  export const pulseVizMode = nStore(false);
  let lastChangeTimestamp = 0;
</script>

<script lang="ts">
  import { getDrawerStore, RadioGroup, RadioItem, RangeSlider, SlideToggle, TabGroup, Tab, Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import { onDestroy, onMount } from "svelte";
  import { Close } from "svelte-google-materialdesign-icons";
  import { frontendConnMngr } from "../../js/frontendConnManager";
  import { waitfor } from "../../js/shared/util";
  import { ConnectionStates } from "../../js/shared/consts";
  import { displayHumanBits, displayNum } from "../../js/util";
  import VideoStatsCard from "../VideoStatsCard.svelte";
  import { type ComputedRtpStats } from "../../js/shared/videoStatsParser";
  import { writable } from "svelte/store";
  import { logDebug } from "../../js/shared/logging";
  import { unixTimeNow } from "../../js/shared/time";
  import { browser } from "$app/environment";
  import type { LivekitVideoStatsResponse, RovAction, SimplePeerVideoStatsResponse, VideoStreamOptions } from "../../js/shared/protobufs/rov_actions";

  const LK_STATS_ACCORDION_ID = "lk_stats_accordion";
  const SP_STATS_ACCORDION_ID = "sp_stats_accordion";

  let statsTab = 0;
  let statsActivePanel = writable("");
  let lkStatsOpen = false;
  const drawerStore = getDrawerStore();
  const lkRecieverVideoStats = frontendConnMngr.livekitVideoStats;
  const spRecieverVideoStats = frontendConnMngr.simplePeerVideoStats;
  const codecs = ["h264", "vp8", "vp9", "av1"];
  const sizes = {
    180: {
      bitrate: {
        h264: 950_000,
        vp8: 750_000,
        vp9: 550_000,
        av1: 550_000,
      },
    },
    360: {
      bitrate: {
        h264: 950_000,
        vp8: 750_000,
        vp9: 550_000,
        av1: 550_000,
      },
    },
    540: {
      bitrate: {
        h264: 1_800_000,
        vp8: 1_500_000,
        vp9: 1_100_000,
        av1: 1_100_000,
      },
    },
    720: {
      bitrate: {
        h264: 3_500_000,
        vp8: 3_000_000,
        vp9: 1_800_000,
        av1: 1_700_000,
      },
    },
    1080: {
      bitrate: {
        h264: 8_500_000,
        vp8: 5_500_000,
        vp9: 4_000_000,
        av1: 3_500_000,
      },
    },
  };

  const logCurrentState = (msg) => {
    logDebug(msg, {
      useSimplePeer: useSimplePeer.get(),
      useLivekit: useLivekit.get(),
      useTwitch: useTwitch.get(),
      size: size.get(),
      maxBitrate: maxBitrate.get(),
      updateBitrateWithResolution: updateBitrateWithResolution.get(),
      spPlayoutDelay: spPlayoutDelay.get(),
      lkPlayoutDelay: lkPlayoutDelay.get(),
      codec: codec.get(),
      keepFullResLayer: keepFullResLayer.get(),
      allowBkupCodec: allowBkupCodec.get(),
      lkRecieverVideoStats: lkRecieverVideoStats.get(),
      spRecieverVideoStats: spRecieverVideoStats.get(),
      lkSenderVideoStats: lkSenderVideoStats.get(),
      spSenderVideoStats: spSenderVideoStats.get(),
    });
  };

  const sendTwitchLivestreamChange = () => {
    logCurrentState("Sending twitch video change. current state:");
    frontendConnMngr.sendMessageToRov(
      {
        body: {
          oneofKind: "setLivestreamingEnabled",
          setLivestreamingEnabled: {
            enabled: useTwitch.get(),
          },
        },
      },
      true
    );
  };

  const sendLivekitChange = (force?: boolean) => {
    if (!useLivekit.get() && force === false) return;
    lastChangeTimestamp = unixTimeNow();
    logCurrentState("Sending lk video change. current state:");

    const baseStream: VideoStreamOptions = {
      maxBitrate: maxBitrate.get(),
      height: size.get(),
      width: 0,
      fps: 60,
    };

    frontendConnMngr.sendMessageToRov(
      {
        body: {
          oneofKind: "setLivekitVideoOptions",
          setLivekitVideoOptions: {
            enabled: useLivekit.get(),
            allowBackupCodec: allowBkupCodec.get(),
            codec: codec.get(),
            baseStream: keepFullResLayer.get() ? undefined : baseStream,
            simulcastLayers: keepFullResLayer.get() ? [baseStream] : [],
          },
        },
      },
      true
    );
  };

  const sendSimplePeerChange = (force?: boolean) => {
    if (!useLivekit.get() && force === false) return;
    lastChangeTimestamp = unixTimeNow();
    logCurrentState("Sending sp video change. current state:");

    const mimeType = `video/${codec.get().toLowerCase()}`;
    frontendConnMngr.setSimplePeerCodec(mimeType);
    frontendConnMngr.sendMessageToRov(
      {
        body: {
          oneofKind: "setSimplePeerVideoOptions",
          setSimplePeerVideoOptions: {
            enabled: useSimplePeer.get(),
            codec: codec.get().toUpperCase(),
            bitrate: maxBitrate.get(),
            baseStream: {
              maxBitrate: maxBitrate.get(),
              height: size.get(),
              width: size.get() * (16 / 9),
              fps: 60,
            },
          },
        },
      },
      true
    );
  };

  const sendVideoUpdate = () => {
    sendLivekitChange();
    sendSimplePeerChange();
  };

  const onSizeChange = () => {
    if (!browser) return;
    if (updateBitrateWithResolution.get()) maxBitrate.set(sizes[size.get()].bitrate[codec.get()]);
    sendVideoUpdate();
  };

  const onUseSimplePeerChange = (value?: boolean) => {
    if (!browser) return;
    if (value !== undefined) useSimplePeer.set(value);
    // if (useSimplePeer.get()) {
    //   onUseLivekitChange(false);
    //   onUseTwitchChange(false);
    //   onPlayoutDelayChange();
    // } else {
    //   onUseLivekitChange(true);
    // }
    // sendSimplePeerChange(true);
    if (useSimplePeer.get()) frontendConnMngr.startSimplePeerConnection();
    else if (frontendConnMngr.simplePeerConnection) frontendConnMngr.simplePeerConnection.stop();
  };

  const onUseLivekitChange = (value?: boolean) => {
    if (value !== undefined) useLivekit.set(value);
    if (!useLivekit.get()) onUseTwitchChange(false);
    else onLkPlayoutDelayChange();
    sendLivekitChange();
  };

  const onUseTwitchChange = (value?: boolean) => {
    if (value !== undefined) useTwitch.set(value);
    sendTwitchLivestreamChange();
  };

  const onLkPlayoutDelayChange = async () => {
    if (useLivekit.get()) {
      frontendConnMngr.livekitConnection.remoteVideoTracks.get().forEach(async (track) => {
        const lkDelay = track.getPlayoutDelay() || 0;
        track.setMuted(true);
        track.setPlayoutDelay(lkPlayoutDelay.get());
        await waitfor(Math.max(lkPlayoutDelay.get() * 1000 - lkDelay * 1000, 0));
        track.setMuted(false);
      });
    }
  };

  const onSpPlayoutDelayChange = async () => {
    if (!browser) return;
    if (useSimplePeer.get()) {
      const spDelay = frontendConnMngr.simplePeerConnection.getPlayoutDelay();
      const streams = frontendConnMngr.simplePeerConnection.remoteVideoStreams.get();
      for (const [_, stream] of streams) {
        for (const track of stream.getTracks()) track.enabled = false;
      }

      frontendConnMngr.simplePeerConnection.setPlayoutDelay(spPlayoutDelay.get());
      await waitfor(Math.max(spPlayoutDelay.get() * 1000 - spDelay * 1000, 0));
      for (const [_, stream] of streams) {
        for (const track of stream.getTracks()) {
          track.enabled = true;
        }
      }
    }
  };

  onMount(() => {
    useTwitch.set(frontendConnMngr.livekitConnection.checkIfLivestreamRecording());
    const livestreamRecordingUnsub = frontendConnMngr.livekitConnection.isLivestreamRecording.subscribe((isLivestreamRecording) => {
      useTwitch.set(isLivestreamRecording);
    });
    const spStreamsUnsub = frontendConnMngr.simplePeerConnection.remoteVideoStreams.subscribe((streams) => {
      if (streams.size > 0) onSpPlayoutDelayChange();
      // const stream = streams.values().next().value;
      // if (stream.getTracks().length > 0) {
      //   const track = stream.getTracks()[0];
      //   if (track.enabled) {
      //     size.set(track.getSettings().height);
      //     codec.set(track.getSettings().codec);
      //   }
      // }
    });
    const lkStreamUnsub = frontendConnMngr.livekitConnection.remoteVideoTracks.subscribe((tracks) => {
      if (tracks.size > 0) onLkPlayoutDelayChange();
      // const track = tracks.values().next().value;
      // if (track) {
      //   size.set(track.getSettings().height);
      //   codec.set(track.getSettings().codec);
      // }
    });
    return () => {
      livestreamRecordingUnsub();
      spStreamsUnsub();
      lkStreamUnsub();
    };
  });
</script>

<div class="w-full px-6 py-4 relative">
  <button on:click={() => drawerStore.close()} class="btn btn-icon-lg btn-icon fixed bg-surface-800 top-2.5 right-2.5">
    <Close class="text-3xl pointer-events-none" tabindex="-1" variation="round" />
  </button>
  <h3 class="h3 my-0.5 mb-6 text-left">Video Settings</h3>

  <SlideToggle bind:checked={$useSimplePeer} name="Enable Direct Connection" active="bg-success-700" class="mb-6 mx-auto" on:change={() => onUseSimplePeerChange()}>Enable Direct Connection</SlideToggle>
  <SlideToggle bind:checked={$useLivekit} name="Enable Direct Connection" active="bg-orange-600" class="mb-6 mx-auto" on:change={() => onUseLivekitChange()}>Enable Livekit Connection</SlideToggle>
  {#if $useLivekit}
    <SlideToggle bind:checked={$useTwitch} disabled={!$useLivekit} name="Use Direct Connection" active="bg-red-700" class="mb-6 mx-auto" on:change={() => onUseTwitchChange()}>Record To Twitch</SlideToggle>
  {/if}
  <hr />

  <label class="h4 mt-8 mb-2 font-bold" for="resolution_radio_group">Resolution</label>
  <RadioGroup id="resolution_radio_group" display="flex flex-wrap max-w-full items-center justify-center" rounded="rounded-3xl">
    {#each Object.keys(sizes) as s}
      <RadioItem bind:group={$size} name="video size" value={parseInt(s)} label={s + "p"} on:change={onSizeChange} regionLabel="flex-grow-0">{s + "p"}</RadioItem>
    {/each}
  </RadioGroup>
  {#if $useLivekit}
    <SlideToggle bind:checked={$keepFullResLayer} disabled={!$useLivekit} name="Keep Full Resolution Layer" active="bg-primary-700" class="my-2" on:change={() => sendLivekitChange()}>Keep A Full Resolution Layer</SlideToggle>
  {/if}

  <label class="h4 font-bold mt-8 mb-2" for="codec_radio_group">Codec</label>
  <RadioGroup id="codec_radio_group" display="flex flex-wrap max-w-full items-center  justify-center" rounded="rounded-3xl">
    {#each codecs as c}
      <RadioItem bind:group={$codec} name="video codec" value={c} label={c} on:change={onSizeChange} regionLabel="flex-grow-0">{c}</RadioItem>
    {/each}
  </RadioGroup>
  {#if $useLivekit}
    <SlideToggle bind:checked={$allowBkupCodec} disabled={!$useLivekit} name="Allow Backup Codec" active="bg-primary-700" class="my-2" on:change={() => sendLivekitChange()}>Allow Fallback Codec</SlideToggle>
  {/if}

  {#if $useLivekit}
    <RangeSlider id="bitrate_slider" class="mt-8" name="Max Bitrate slider" min={100_000} max={9_000_000} step={100_000} bind:value={$maxBitrate} on:change={() => sendVideoUpdate()}>
      <div class="flex justify-between items-center">
        <h4 class="h4">Max Bitrate</h4>
        <div class="text-sm">{$maxBitrate / 1000}k bits/sec</div>
      </div>
    </RangeSlider>
    <SlideToggle bind:checked={$updateBitrateWithResolution} name="Update" size="sm" active="bg-primary-700" class="mt-2 mx-auto">Update With Resolution + Codec</SlideToggle>
  {/if}
  <div on:mouseenter={() => pulseVizMode.set(true)} on:mouseleave={() => pulseVizMode.set(false)} role="cell" tabindex="-1">
    {#if $useSimplePeer}
      <RangeSlider id="playout_delay_slider" class="mt-8" name="Playout Delay slider" min={0} max={4} step={0.01} bind:value={$spPlayoutDelay} on:change={() => onSpPlayoutDelayChange()}>
        <div class="flex justify-between items-center">
          <h4 class="h4">Direct Playout Delay</h4>
          <div class="text-sm">{$spPlayoutDelay} seconds</div>
        </div>
      </RangeSlider>
    {:else if $useLivekit}
      <RangeSlider id="playout_delay_slider" class="mt-8" name="Playout Delay slider" min={0} max={4} step={0.01} bind:value={$lkPlayoutDelay} on:change={() => onLkPlayoutDelayChange()}>
        <div class="flex justify-between items-center">
          <h4 class="h4">Livekit Playout Delay</h4>
          <div class="text-sm">{$lkPlayoutDelay} seconds</div>
        </div>
      </RangeSlider>
    {/if}
  </div>

  <TabGroup justify="justify-center" class="mt-8 mb-2" active="border-token !border-t-0 !border-r-0 !border-l-0 border-surface-900-50-token">
    <h4 class="h4 self-center flex-1 font-bold">Video Stats</h4>
    <Tab bind:group={statsTab} name="your side" value={0}>YOU</Tab>
    <Tab bind:group={statsTab} name="ROVs side" value={1}>ROV</Tab>
    <!-- <Tab bind:group={statsTab} name="your side" value={0} active="[&>*]:bg-surface-50-900-token"><span class="radio-item text-base text-center cursor-pointer px-4 py-1 rounded-3xl bg-surface-900">YOU</span></Tab>
    <Tab bind:group={statsTab} name="ROVs side" value={1} active="[&>*]:bg-surface-50-900-token"><span class="radio-item text-base text-center cursor-pointer px-4 py-1 rounded-3xl bg-surface-900">ROV</span></Tab> -->
    <!-- Tab Panels --->
    <svelte:fragment slot="panel">
      {#if statsTab == 0}
        <Accordion>
          {#if $spRecieverVideoStats}
            {@const stats = $spRecieverVideoStats}
            <VideoStatsCard {stats} activeStore={statsActivePanel} activeId={SP_STATS_ACCORDION_ID} direction="reciever" name="Direct" class="border-token border-green-500 !bg-green-100" />
          {/if}
          {#if $lkRecieverVideoStats}
            {@const stats = $lkRecieverVideoStats}
            <VideoStatsCard {stats} activeStore={statsActivePanel} activeId={LK_STATS_ACCORDION_ID} direction="reciever" name="Livekit" class="border-token border-orange-500 !bg-orange-100" />
          {/if}
        </Accordion>
      {:else}
        <Accordion>
          {#if $spSenderVideoStats}
            {@const stats = $spSenderVideoStats}
            <VideoStatsCard {stats} activeStore={statsActivePanel} activeId={SP_STATS_ACCORDION_ID} direction="sender" name="Direct" class="border-token border-green-500 !bg-green-100" />
          {/if}
          {#if $lkSenderVideoStats}
            {@const stats = $lkSenderVideoStats}
            <VideoStatsCard {stats} activeStore={statsActivePanel} activeId={LK_STATS_ACCORDION_ID} direction="sender" name="Livekit" class="border-token border-orange-500 !bg-orange-100" />
          {/if}
        </Accordion>
      {/if}
    </svelte:fragment>
  </TabGroup>

  <!-- <h4 class="h5 mt-8 mb-2 font-bold flex justify-between"><span>Video Stats</span><span class="chip variant-filled">ROV Send</span></h4> -->
</div>
