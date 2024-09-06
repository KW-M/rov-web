<script lang="ts">
  import { ConnectionState, LOADING_MESSAGE } from "../js/frontendConsts";
  import videoPlaceholderUrl from "../assets/ui-elements/video-placeholder.jpg";
  import { currentVideoSource, fullscreenOpen, VideoSource } from "../js/globalContext";
  import { onDestroy, onMount } from "svelte";
  import { changesSubscribe } from "../js/shared/util";
  import { frontendConnMngr } from "../js/frontendConnManager";
  import { showToastMessage, ToastSeverity } from "../js/toastMessageManager";
  import { Track, type RemoteTrack } from "livekit-client";
  import { resizeToFit } from "./Actions/resizeToFit.action";

  import HdIcon from "svelte-google-materialdesign-icons/Hd.svelte";
  import PlayArrowIcon from "svelte-google-materialdesign-icons/Play_arrow.svelte";
  import HdrOffIcon from "svelte-google-materialdesign-icons/Hdr_off.svelte";
  import { blurOnClick } from "./Actions/blurOnClick.action";
  import { log, logDebug, logInfo, logWarn, logError } from "../js/shared/logging";
  import CompassDial from "./CompassDial.svelte";
  import RovViz from "./3dScene/rovViz.svelte";
  import { Add_circle_outline, Circle, Hide_source, Remove_circle_outline, Source } from "svelte-google-materialdesign-icons";

  interface VideoStreamData {
    stream?: MediaStream | RemoteTrack;
    streamId?: string;
    videoElem?: HTMLMediaElement;
    playable: boolean;
    cleanupFunc?: () => void;
  }

  let livekitVideoStream: VideoStreamData = { playable: false, videoElem: null };
  let simplePeerVideoStream: VideoStreamData = { playable: false, videoElem: null };
  let videoContainerElem: HTMLDivElement | null = null;
  let videoHovered = false;
  let videoSwitchInProgress = false;
  let videoAspectRatio = 4 / 3;
  let rovVizVisible = false;

  const videoIsReady = (videoData: VideoStreamData) => !!(videoData.playable && videoData.stream != null);

  const updateVideoVisibility = () => {
    log("updateVideoVisibility", videoIsReady(livekitVideoStream), videoIsReady(simplePeerVideoStream));
    if (!videoContainerElem) return;
    videoSwitchInProgress = false;
    if (videoIsReady(simplePeerVideoStream)) {
      logInfo("VideoPlayer: Stopping livekit video stream", livekitVideoStream.stream);
      if (livekitVideoStream.stream) (livekitVideoStream.stream as RemoteTrack).stop();
    } else {
      logInfo("VideoPlayer: Starting livekit video stream", livekitVideoStream.stream);
      if (livekitVideoStream.stream) (livekitVideoStream.stream as RemoteTrack).start();
      if (livekitVideoStream.stream == null) {
        showToastMessage("Waiting for livekit video stream...", 1000, false, ToastSeverity.info);
      }
    }
    if (videoIsReady(simplePeerVideoStream)) {
      currentVideoSource.set(VideoSource.Simplepeer);
    } else if (videoIsReady(livekitVideoStream)) {
      currentVideoSource.set(VideoSource.Livekit);
    } else {
      currentVideoSource.set(VideoSource.None);
    }
  };

  const canPlay = (debugLabel: VideoSource) => {
    return (e: Event) => {
      log("Video CanPlay", debugLabel, e && e.type ? e.type : null);
      if (debugLabel == VideoSource.Livekit) {
        livekitVideoStream.playable = true;
        livekitVideoStream = livekitVideoStream;
      } else if (debugLabel == VideoSource.Simplepeer) {
        simplePeerVideoStream.playable = true;
        simplePeerVideoStream = simplePeerVideoStream;
        simplePeerVideoStream.videoElem.play().catch((err) => {
          log("Video cannot play", err);
          showToastMessage("Click this message to play or try reloading the page", 5000, false, ToastSeverity.warning, () => simplePeerVideoStream.videoElem.play());
          cantPlay(debugLabel)(null);
        });
      }
      updateVideoVisibility();
    };
  };

  const cantPlay = (debugLabel: VideoSource) => {
    return (e: Event) => {
      log("Video CantPlay", debugLabel, e && e.type ? e.type : null, e);
      if (debugLabel == VideoSource.Livekit) {
        livekitVideoStream.playable = false;
        livekitVideoStream = livekitVideoStream;
      } else if (debugLabel == VideoSource.Simplepeer) {
        simplePeerVideoStream.playable = false;
        simplePeerVideoStream = simplePeerVideoStream;
      }
      updateVideoVisibility();
    };
  };

  let lkUnsub, spUnsub, statsUnsub, videoStats;
  onMount(() => {
    statsUnsub = frontendConnMngr.subscribeToVideoStats((stats) => {
      if (!stats) return;
      videoStats = Array.from(stats.values()); //.filter((stat) => stat.type == "inbound-rtp");
    });
    lkUnsub = frontendConnMngr.livekitConnection.remoteVideoTracks.subscribe((streams) => {
      const stream = streams.values().next().value as RemoteTrack;
      if (livekitVideoStream.stream && (livekitVideoStream.stream as RemoteTrack).detach != undefined) {
        log("Video detach stream lk", Object.assign({}, livekitVideoStream.stream), Object.assign({}, stream));
        (livekitVideoStream.stream as RemoteTrack).detach(livekitVideoStream.videoElem);
      }
      if (stream) {
        if (livekitVideoStream.streamId == stream.mediaStreamID) logWarn("VideoPlayer: LK: repeat stream ID!", stream.mediaStreamID);
        stream.attach(livekitVideoStream.videoElem);
        livekitVideoStream.streamId = stream.mediaStreamID;
        livekitVideoStream.stream = stream;
        if (stream.streamState == Track.StreamState.Active) livekitVideoStream.playable = true;
      } else {
        livekitVideoStream.playable = false;
        livekitVideoStream.streamId = null;
        livekitVideoStream.stream = null;
      }

      updateVideoVisibility();
    });
    spUnsub = frontendConnMngr.simplepeerConnection.remoteVideoStreams.subscribe((streams) => {
      console.log("spstreams", streams);
      const stream = streams.values().next().value as MediaStream | null;
      if (stream) {
        if (simplePeerVideoStream.streamId == stream.id) logWarn("VideoPlayer: SP: repeat stream ID!", stream.id);
        simplePeerVideoStream.videoElem.srcObject = stream;
        simplePeerVideoStream.streamId = stream.id;
        simplePeerVideoStream.stream = stream;
        if (stream.active) simplePeerVideoStream.playable = true;
      } else {
        simplePeerVideoStream.playable = false;
        simplePeerVideoStream.streamId = null;
        simplePeerVideoStream.stream = null;
      }
      updateVideoVisibility();
    });
  });

  onDestroy(() => {
    lkUnsub();
    spUnsub();
  });

  export function resizeToFitVideo(node: HTMLDivElement, videoElement: HTMLMediaElement) {
    let videoElem: HTMLVideoElement | null = videoElement as HTMLVideoElement;
    function resize() {
      const parent = node.parentElement;
      if (parent && videoElem) {
        const parentWidth = parent.offsetWidth;
        const parentHeight = parent.offsetHeight;
        const videoWidth = videoElem.videoWidth;
        const videoHeight = videoElem.videoHeight;

        const parentAspectRatio = parentWidth / parentHeight;
        if (videoWidth !== 0 && videoHeight !== 0) {
          videoAspectRatio = videoWidth / videoHeight;
        }

        if (parentAspectRatio > videoAspectRatio) {
          node.style.width = parentHeight * videoAspectRatio + "px";
          node.style.height = "100%";
        } else {
          node.style.width = "100%";
          node.style.height = parentWidth / videoAspectRatio + "px";
        }
      }
    }

    resize();
    window.addEventListener("resize", resize);

    return {
      update(videoElement: HTMLVideoElement) {
        videoElem = videoElement;
        resize();
      },
      destroy() {
        window.removeEventListener("resize", resize);
      },
    };
  }
</script>

<!-- {#if currentVideoStream} -->
<div class="absolute top-0 left-0 max-h-full max-w-full overflow-x-scroll overflow-y-scroll py-80">
  VideoStats
  <p>
    {(videoIsReady(simplePeerVideoStream) ? "SP Live" : "SP Stall") + " | " + (videoIsReady(livekitVideoStream) ? "LK Live" : "LK Stall") + " "}
  </p>
  {#if videoStats}
    {#each videoStats as stat}
      <pre class="block p-2 text-white">{JSON.stringify(stat, null, 2)}</pre>
    {/each}
  {/if}
</div>
<div id="livestream_container" class="px-2 pointer-events-none" class:full={$fullscreenOpen} bind:this={videoContainerElem}>
  <!-- svelte-ignore a11y-media-has-caption -->
  <!-- max-lg:btn-icon lg: -->
  <CompassDial class="absolute top-0 w-full z-10 -translate-y-1/2" />

  <div class="relative top-0 ml-auto pointer-events-auto" use:resizeToFitVideo={livekitVideoStream.videoElem}>
    <!-- <span class="chip variant-filled bg-black absolute top-2 left-2 z-10">{(videoIsReady(simplePeerVideoStream) ? "SP Live" : "SP Stall") + " | " + (videoIsReady(livekitVideoStream) ? "LK Live" : "LK Stall") + " "}</span> -->

    <button
      class="hd-video-btn btn variant-filled-warning text-white btn-base shadow-md absolute top-3 right-2"
      use:blurOnClick
      on:click={() => {
        videoSwitchInProgress = true;
        frontendConnMngr.toggleSimplePeerConnection();
      }}
    >
      {#if videoIsReady(simplePeerVideoStream)}
        <HdrOffIcon class="block text-2xl pointer-events-none" tabindex="-1" variation="round" />
        <span class="inline">Use Basic Video</span>
      {:else if videoSwitchInProgress}
        <span class="inline">Switching...</span>
      {:else}
        <HdIcon class="block text-2xl pointer-events-none" tabindex="-1" variation="round" />
        <span class="inline">Use HD Video</span>
      {/if}
    </button>

    <!-- <button
    class="btn-icon-xl align-middle text-center variant-outline-primary rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    use:blurOnClick
    on:click={() => {
      videoSwitchInProgress = true;
      livekitVideoStream.videoElem.play();
      simplePeerVideoStream.videoElem.play();
    }}
  >
    {#if videoSwitchInProgress}
      <ProgressRadial value={undefined} />
    {:else}
      <PlayArrowIcon class="block pointer-events-none" tabindex="-1" variation="round" />
    {/if}
  </button> -->
    <!-- use:resizeToFit={videoIsReady(livekitVideoStream)} -->

    <video
      class="video-livestream lk-video w-full h-full"
      class:!visible={videoIsReady(livekitVideoStream) && !videoIsReady(simplePeerVideoStream)}
      muted
      playsinline
      autoplay
      controls={true}
      tabindex="-1"
      on:pointerenter={() => (videoHovered = true)}
      on:pointerleave={() => (videoHovered = false)}
      bind:this={livekitVideoStream.videoElem}
      on:canplay={canPlay(VideoSource.Livekit)}
      on:playing={canPlay(VideoSource.Livekit)}
      on:play={canPlay(VideoSource.Livekit)}
      on:stalled={cantPlay(VideoSource.Livekit)}
      on:pause={() => {
        cantPlay(VideoSource.Livekit);
        livekitVideoStream.videoElem.play();
      }}
      on:ended={cantPlay(VideoSource.Livekit)}
      on:suspend={cantPlay(VideoSource.Livekit)}
      on:error={cantPlay(VideoSource.Livekit)}
      on:waiting={cantPlay(VideoSource.Livekit)}
    ></video>

    <video
      class="video-livestream sp-video w-full h-full"
      class:!visible={videoIsReady(simplePeerVideoStream)}
      muted
      playsinline
      autoplay
      controls={true}
      tabindex="-1"
      on:pointerenter={() => (videoHovered = true)}
      on:pointerleave={() => (videoHovered = false)}
      bind:this={simplePeerVideoStream.videoElem}
      on:canplay={canPlay(VideoSource.Simplepeer)}
      on:playing={canPlay(VideoSource.Simplepeer)}
      on:play={canPlay(VideoSource.Simplepeer)}
      on:stalled={cantPlay(VideoSource.Simplepeer)}
      on:pause={() => {
        cantPlay(VideoSource.Simplepeer);
        simplePeerVideoStream.videoElem.play();
      }}
      on:ended={cantPlay(VideoSource.Simplepeer)}
      on:suspend={cantPlay(VideoSource.Simplepeer)}
      on:error={cantPlay(VideoSource.Simplepeer)}
      on:waiting={cantPlay(VideoSource.Simplepeer)}
    />
  </div>
  <button class="btn btn-icon variant-filled-secondary shadow-md absolute top-12 left-4 z-10" use:blurOnClick on:click={() => (rovVizVisible = !rovVizVisible)}>
    {#if rovVizVisible}
      <Hide_source class="block text-2xl pointer-events-none" tabindex="-1" variation="round" />
    {:else}
      <Add_circle_outline class="block text-2xl pointer-events-none" tabindex="-1" variation="round" />
    {/if}
  </button>
  {#if rovVizVisible}
    <RovViz />
  {/if}
</div>

<!-- <button class="btn btn-md variant-filled-success" on:click={() => showToastMessage("hello world! Thanks World you rock." + Math.random(), 1000,false,ToastSeverity.success)}>Hi</button>
<button class="btn btn-md variant-filled-warning" on:click={() => showToastMessage("hello world! Thanks World you rock." + Math.random(), 1000,false,ToastSeverity.warning)}>Hi</button>
<button class="btn btn-md variant-filled-error" on:click={() => showToastMessage("hello world! Thanks World you rock." + Math.random(), 1000,false,ToastSeverity.error)}>Hi</button>
<button class="btn btn-md variant-filled-tertiary" on:click={() => showToastMessage("hello world! Thanks World you rock." + Math.random(), 1000,false,ToastSeverity.info)}>Hi</button> -->
<!-- {/if} -->
<style>
  #livestream_container {
    position: absolute;
    box-sizing: border-box;
    overflow: visible;
    inset: 0 0.25rem;
    bottom: 28px;

    transform: translateZ(0);
  }

  #livestream_container.full {
    inset: 0;
    bottom: 0;
  }

  .hd-video-btn {
    z-index: 2;
  }

  .hd-video-btn:hover,
  .hd-video-btn:focus,
  .hd-video-btn:active {
    opacity: 1;
  }

  .video-livestream {
    position: absolute;
    box-sizing: border-box;
    transform: translateX(-50%);
    left: 50%;
    top: 0;

    border: 3px solid black;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.55);
    padding: 0;
    visibility: hidden;
    max-width: 100%;
    max-height: 100%;
  }

  .video-livestream.lk-video {
    border-color: orangered;
  }

  .video-livestream.sp-video {
    border-color: limegreen;
  }
</style>
