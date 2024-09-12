<script context="module" lang="ts">
  import nStore from "../../js/shared/libraries/nStore";

  export const onLivekitVideoOptionsChange = (options: rov_actions_proto.ILivekitVideoStatsResponse) => {
    if (lastChangeTimestamp + 1000 > Date.now()) return;
    useLivekit.set(options.Enabled);
    if (options.Enabled) {
      allowBkupCodec.set(options.AllowBackupCodec);
      maxBitrate.set(options.BaseStream.MaxBitrate);
      keepFullResLayer.set(options.SimulcastLayers?.length > 0);
      if (!useSimplePeer.get()) {
        size.set(options.BaseStream.Height);
        codec.set(rov_actions_proto.VideoCodec[options.Codec].toLowerCase());
      }
    }
    lkSenderVideoStats.set(JSON.parse(options.RtcSenderStatsJson));
  };

  export const onSimplePeerVideoOptionsChange = (options: rov_actions_proto.ISimplePeerVideoStatsResponse) => {
    if (lastChangeTimestamp + 1000 > Date.now()) return;
    const videoStream = frontendConnMngr.simplePeerConnection.remoteVideoStreams.get().values().next().value;
    const enabled = videoStream && videoStream.getTracks().length > 0 && videoStream.getTracks()[0].enabled && frontendConnMngr.simplePeerConnection.connectionState.get() === ConnectionStates.connected;
    const preferedMimetypes = frontendConnMngr.simplePeerConnection.getCodecPreferences();
    const preferedCodecs = preferedMimetypes ? preferedMimetypes.map((mimeType) => mimeType.split("/")[1].toUpperCase()) : [];
    console.log(rov_actions_proto.VideoCodec[preferedCodecs[0]]);
    useSimplePeer.set(enabled);
    if (enabled) {
      size.set(options.BaseStream.Height);
      codec.set(preferedCodecs && preferedCodecs.length > 0 ? rov_actions_proto.VideoCodec[preferedCodecs[0]] : "unknown");
    }
    spSenderVideoStats.set(JSON.parse(options.RtcSenderStatsJson));
  };

  const allowBkupCodec = nStore(false);
  const size = nStore(1080);
  const maxBitrate = nStore(700_000);
  const updateBitrateWithResolution = nStore(true);
  const playoutDelay = nStore(0);
  const codec = nStore("vp9");
  const keepFullResLayer = nStore(false);
  const useSimplePeer = nStore(false);
  const useLivekit = nStore(true);
  const useTwitch = nStore(false);
  const spSenderVideoStats = nStore([]);
  const lkSenderVideoStats = nStore([]);
  let lastChangeTimestamp = 0;
</script>

<script lang="ts">
  import { getDrawerStore, RadioGroup, RadioItem, RangeSlider, SlideToggle } from "@skeletonlabs/skeleton";
  import { onDestroy, onMount } from "svelte";
  import { Close } from "svelte-google-materialdesign-icons";
  import { frontendConnMngr } from "../../js/frontendConnManager";
  import { rov_actions_proto } from "../../js/shared/protobufs/rovActionsProto";
  import { waitfor } from "../../js/shared/util";
  import { ConnectionStates } from "../../js/shared/consts";

  const drawerStore = getDrawerStore();
  const codecs = ["h264", "vp8", "vp9", "av1"];
  const sizes = {
    120: {
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

  const sendTwitchLivestreamChange = () => {
    frontendConnMngr.sendMessageToRov(
      rov_actions_proto.RovAction.create({
        SetLivestreamingEnabled: {
          Enabled: useTwitch.get(),
        },
      }),
      false
    );
  };

  const sendLivekitChange = (force?: boolean) => {
    if (!useLivekit.get() && force === false) return;
    lastChangeTimestamp = Date.now();

    const baseStream: rov_actions_proto.IVideoStreamOptions = {
      MaxBitrate: maxBitrate.get(),
      Height: size.get(),
      Fps: 60,
      Width: 0,
    };
    console.warn("Sending livekit video change", baseStream);
    frontendConnMngr.sendMessageToRov(
      rov_actions_proto.RovAction.create({
        SetLivekitVideoOptions: {
          Enabled: useLivekit.get(),
          AllowBackupCodec: allowBkupCodec.get(),
          Codec: rov_actions_proto.VideoCodec[codec.get().toUpperCase()],
          BaseStream: keepFullResLayer.get() ? undefined : baseStream,
          SimulcastLayers: keepFullResLayer.get() ? [baseStream] : undefined,
        },
      }),
      false
    );
  };

  const sendSimplePeerChange = (force?: boolean) => {
    if (!useLivekit.get() && force === false) return;
    lastChangeTimestamp = Date.now();

    const mimeType = `video/${codec.get().toLowerCase()}`;
    frontendConnMngr.setSimplePeerCodec(mimeType);
    frontendConnMngr.sendMessageToRov(
      rov_actions_proto.RovAction.create({
        SetSimplePeerVideoOptions: {
          Enabled: useSimplePeer.get(),
          Codec: rov_actions_proto.VideoCodec[codec.get().toUpperCase()],
          BaseStream: {
            Height: size.get(),
            Width: size.get() * (16 / 9),
            Fps: 60,
          },
        },
      }),
      false
    );
  };

  const sendVideoUpdate = () => {
    sendLivekitChange();
    sendSimplePeerChange();
  };

  const onSizeChange = () => {
    if (updateBitrateWithResolution.get()) maxBitrate.set(sizes[size.get()].bitrate[codec.get()]);
    sendVideoUpdate();
  };

  const onUseSimplePeerChange = (value?: boolean) => {
    if (value !== undefined) useSimplePeer.set(value);
    if (useSimplePeer.get()) {
      onUseLivekitChange(false);
      onUseTwitchChange(false);
      onPlayoutDelayChange();
    } else {
      onUseLivekitChange(true);
    }
    sendSimplePeerChange(true);
    if (useSimplePeer.get()) frontendConnMngr.startSimplePeerConnection();
    else if (frontendConnMngr.simplePeerConnection) frontendConnMngr.simplePeerConnection.stop();
  };

  const onUseLivekitChange = (value?: boolean) => {
    if (value !== undefined) useLivekit.set(value);
    if (!useLivekit.get()) onUseTwitchChange(false);
    else onPlayoutDelayChange();
    sendLivekitChange();
  };

  const onUseTwitchChange = (value?: boolean) => {
    if (value !== undefined) useTwitch.set(value);
    sendTwitchLivestreamChange();
  };

  const onPlayoutDelayChange = async () => {
    if (useLivekit.get()) {
      frontendConnMngr.livekitConnection.remoteVideoTracks.get().forEach(async (track) => {
        const lkDelay = track.getPlayoutDelay() || 0;
        track.setMuted(true);
        track.setPlayoutDelay(playoutDelay.get());
        await waitfor(Math.max(playoutDelay.get() * 1000 - lkDelay * 1000, 0));
        track.setMuted(false);
      });
    }

    if (useSimplePeer.get()) {
      const spDelay = frontendConnMngr.simplePeerConnection.getPlayoutDelay();
      const streams = frontendConnMngr.simplePeerConnection.remoteVideoStreams.get();
      for (const [_, stream] of streams) {
        for (const track of stream.getTracks()) track.enabled = false;
      }

      frontendConnMngr.simplePeerConnection.setPlayoutDelay(playoutDelay.get());
      await waitfor(Math.max(playoutDelay.get() * 1000 - spDelay * 1000, 0));
      for (const [_, stream] of streams) {
        for (const track of stream.getTracks()) {
          track.enabled = true;
          console.log(track);
        }
      }
      console.log("Playout Delay Set", playoutDelay.get(), spDelay, streams, Math.max(playoutDelay.get() * 1000 - spDelay * 1000, 0));
    }
  };

  let reciverVideoStats = [];
  onMount(() => {
    const statsUnsub = frontendConnMngr.subscribeToVideoStats((stats) => {
      if (!stats) return;
      reciverVideoStats = Array.from(stats.values()); //.filter((stat) => stat.type == "inbound-rtp");
    });
    useTwitch.set(frontendConnMngr.livekitConnection.checkIfLivestreamRecording());
    const livestreamRecordingUnsub = frontendConnMngr.livekitConnection.isLivestreamRecording.subscribe((isLivestreamRecording) => {
      useTwitch.set(isLivestreamRecording);
    });
    const spStreamsUnsub = frontendConnMngr.simplePeerConnection.remoteVideoStreams.subscribe((streams) => {
      if (streams.size > 0) onPlayoutDelayChange();
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
      if (tracks.size > 0) onPlayoutDelayChange();
      // const track = tracks.values().next().value;
      // if (track) {
      //   size.set(track.getSettings().height);
      //   codec.set(track.getSettings().codec);
      // }
    });
    return () => {
      statsUnsub();
      livestreamRecordingUnsub();
    };
  });
</script>

<div class="w-full h-full px-6 py-4 relative">
  <button on:click={() => drawerStore.close()} class="btn btn-icon-lg btn-icon absolute top-2.5 right-3">
    <Close class="text-3xl pointer-events-none" tabindex="-1" variation="round" />
  </button>
  <h3 class="h3 mt-1 mb-6 text-left">Video Settings</h3>

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
  <SlideToggle bind:checked={$keepFullResLayer} disabled={!$useLivekit} name="Keep Full Resolution Layer" active="bg-primary-700" class="my-2" on:change={() => sendLivekitChange()}>Keep A Full Resolution Layer</SlideToggle>

  <label class="h4 font-bold mt-8 mb-2" for="codec_radio_group">Codec</label>
  <RadioGroup id="codec_radio_group" display="flex flex-wrap max-w-full items-center  justify-center" rounded="rounded-3xl">
    {#each codecs as c}
      <RadioItem bind:group={$codec} name="video codec" value={c} label={c} on:change={onSizeChange} regionLabel="flex-grow-0">{c}</RadioItem>
    {/each}
  </RadioGroup>
  <SlideToggle bind:checked={$allowBkupCodec} disabled={!$useLivekit} name="Allow Backup Codec" active="bg-primary-700" class="my-2" on:change={() => sendLivekitChange()}>Allow Fallback Codec</SlideToggle>

  {#if $useLivekit}
    <RangeSlider id="bitrate_slider" class="mt-8" name="Max Bitrate slider" min={100_000} max={9_000_000} step={100_000} bind:value={$maxBitrate} on:change={() => sendVideoUpdate()}>
      <div class="flex justify-between items-center">
        <h4 class="h4">Max Bitrate</h4>
        <div class="text-sm">{$maxBitrate / 1000}k bits/sec</div>
      </div>
    </RangeSlider>
    <SlideToggle bind:checked={$updateBitrateWithResolution} name="Update" size="sm" active="bg-primary-700" class="mt-2 mx-auto">Update With Resolution + Codec</SlideToggle>
  {/if}
  <RangeSlider id="playout_delay_slider" class="mt-8" name="Playout Delay slider" min={0} max={4} step={0.01} bind:value={$playoutDelay} on:change={() => onPlayoutDelayChange()}>
    <div class="flex justify-between items-center">
      <h4 class="h4">Playout Delay</h4>
      <div class="text-sm">{$playoutDelay} seconds</div>
    </div>
  </RangeSlider>

  <hr class="my-8" />
  {#if reciverVideoStats}
    <h4 class="h5 mt-8 mb-2 font-bold flex justify-between"><span>Video Stats</span><span class="chip variant-filled">Recieve</span></h4>
    <details>
      <summary>Livekit Stats</summary>
      <pre class="max-h-full max-w-full overflow-x-scroll overflow-y-scroll">
        {#each reciverVideoStats as stat}
          <pre class="block p-2 text-white">{JSON.stringify(stat, null, 2)}</pre>
        {/each}
    </pre>
    </details>
  {/if}
  <h4 class="h5 mt-8 mb-2 font-bold flex justify-between"><span>Video Stats</span><span class="chip variant-filled">ROV Send</span></h4>
  {#if $spSenderVideoStats && $spSenderVideoStats.length}
    <h4 class="h5 mt-8 mb-2 font-bold flex justify-between"><span>Video Stats</span><span class="chip variant-filled">Recieve</span></h4>
    <details>
      <summary>Direct Stats</summary>
      <pre class="max-h-full max-w-full overflow-x-scroll overflow-y-scroll">
        {#each $spSenderVideoStats as stat}
          <pre class="block p-2 text-white">{JSON.stringify(stat, null, 2)}</pre>
        {/each}
    </pre>
    </details>
  {/if}
  {#if $lkSenderVideoStats && $lkSenderVideoStats.length}
    <h4 class="h5 mt-8 mb-2 font-bold flex justify-between"><span>Video Stats</span><span class="chip variant-filled">Recieve</span></h4>
    <details>
      <summary>Livekit Stats</summary>
      <pre class="max-h-full max-w-full overflow-x-scroll overflow-y-scroll">
        {#each $lkSenderVideoStats as stat}
          <pre class="block p-2 text-white">{JSON.stringify(stat, null, 2)}</pre>
        {/each}
    </pre>
    </details>
  {/if}
</div>
