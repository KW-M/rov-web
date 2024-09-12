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
  import { Add_circle_outline, Circle, Compare, Directions, Hide_source, Navigation, Remove_circle_outline, Source, Video_settings } from "svelte-google-materialdesign-icons";
  import { getDrawerStore } from "@skeletonlabs/skeleton";

  interface VideoStreamData {
    stream?: MediaStream | RemoteTrack;
    streamId?: string;
    videoElem?: HTMLMediaElement;
    playable: boolean;
    cleanupFunc?: () => void;
  }

  let livekitVideoStream: VideoStreamData = { playable: false, videoElem: null };
  let simplepeerVideoStream: VideoStreamData = { playable: false, videoElem: null };
  let videoContainerElem: HTMLDivElement | null = null;
  let videoHovered = false;
  let videoSwitchInProgress = false;
  let videoAspectRatio = 4 / 3;
  let rovVizVisible = false;

  const drawerStore = getDrawerStore();
  const videoIsReady = (videoData: VideoStreamData) => !!(videoData.playable && videoData.stream != null);

  const updateVideoVisibility = () => {
    log("updateVideoVisibility", videoIsReady(livekitVideoStream), videoIsReady(simplepeerVideoStream));
    if (!videoContainerElem) return;
    videoSwitchInProgress = false;
    if (videoIsReady(simplepeerVideoStream)) {
      logInfo("VideoPlayer: Stopping livekit video stream", livekitVideoStream.stream);
      if (livekitVideoStream.stream) (livekitVideoStream.stream as RemoteTrack).stop();
    } else {
      logInfo("VideoPlayer: Starting livekit video stream", livekitVideoStream.stream);
      if (livekitVideoStream.stream) (livekitVideoStream.stream as RemoteTrack).start();
      if (livekitVideoStream.stream == null) {
        showToastMessage("Waiting for livekit video stream...", 1000, false, ToastSeverity.info);
      }
    }
    if (videoIsReady(simplepeerVideoStream)) {
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
        simplepeerVideoStream.playable = true;
        simplepeerVideoStream = simplepeerVideoStream;
        simplepeerVideoStream.videoElem.play().catch((err) => {
          log("Video cannot play", err);
          showToastMessage("Click this message to play or try reloading the page", 5000, false, ToastSeverity.warning, () => simplepeerVideoStream.videoElem.play());
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
        simplepeerVideoStream.playable = false;
        simplepeerVideoStream = simplepeerVideoStream;
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
        if (simplepeerVideoStream.streamId == stream.id) logWarn("VideoPlayer: SP: repeat stream ID!", stream.id);
        simplepeerVideoStream.videoElem.srcObject = stream;
        simplepeerVideoStream.streamId = stream.id;
        simplepeerVideoStream.stream = stream;
        if (stream.active) simplepeerVideoStream.playable = true;
      } else {
        simplepeerVideoStream.playable = false;
        simplepeerVideoStream.streamId = null;
        simplepeerVideoStream.stream = null;
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

<div id="livestream_container" class="px-2 pointer-events-none" class:full={$fullscreenOpen} bind:this={videoContainerElem}>
  <!-- svelte-ignore a11y-media-has-caption -->
  <CompassDial class="absolute top-2 lg:top-0 w-20 z-10 lg:-translate-y-1/2" />

  <div class="relative top-0 mx-auto pointer-events-auto bg-black/70 rounded-2xl" use:resizeToFitVideo={livekitVideoStream.videoElem}>
    <span class="chip variant-filled absolute bottom-2 -translate-x-1/2 left-1/2 z-10">{(videoIsReady(simplepeerVideoStream) ? "SP Live" : "SP Stall") + " | " + (videoIsReady(livekitVideoStream) ? "LK Live" : "LK Stall") + " "}</span>

    <button
      class="btn btn-icon variant-glass-surface shadow-md absolute top-4 right-4 z-10 lg:btn-icon-lg"
      use:blurOnClick
      on:click={() => {
        drawerStore.open({
          id: "video-settings",
          position: "right",
          width: "w-96",
        });
      }}
    >
      <Video_settings class="block text-2xl pointer-events-none" tabindex="-1" variation="round" />
    </button>

    <button class="btn btn-icon lg:btn-icon-lg variant-glass-secondary shadow-md absolute top-4 left-4 z-20 pointer-events-auto" use:blurOnClick on:click={() => (rovVizVisible = !rovVizVisible)}>
      {#if rovVizVisible}
        <Hide_source class="block text-2xl pointer-events-none" tabindex="-1" variation="round" />
      {:else}
        <Navigation class="block text-2xl pointer-events-none " tabindex="-1" variation="round" />
      {/if}
    </button>
    {#if rovVizVisible}
      <RovViz canvasClass="block absolute top-2 left-2 z-10 " />
    {/if}

    <!-- <button
    class="btn-icon-xl align-middle text-center variant-outline-primary rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    use:blurOnClick
    on:click={() => {
      videoSwitchInProgress = true;
      livekitVideoStream.videoElem.play();
      simplepeerVideoStream.videoElem.play();
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
      class="video-livestream lk-video w-full h-full rounded-2xl"
      class:!visible={videoIsReady(livekitVideoStream) && !videoIsReady(simplepeerVideoStream)}
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
      class="video-livestream sp-video w-full h-full rounded-2xl"
      class:!visible={videoIsReady(simplepeerVideoStream)}
      muted
      playsinline
      autoplay
      controls={true}
      tabindex="-1"
      on:pointerenter={() => (videoHovered = true)}
      on:pointerleave={() => (videoHovered = false)}
      bind:this={simplepeerVideoStream.videoElem}
      on:canplay={canPlay(VideoSource.Simplepeer)}
      on:playing={canPlay(VideoSource.Simplepeer)}
      on:play={canPlay(VideoSource.Simplepeer)}
      on:stalled={cantPlay(VideoSource.Simplepeer)}
      on:pause={() => {
        cantPlay(VideoSource.Simplepeer);
        simplepeerVideoStream.videoElem.play();
      }}
      on:ended={cantPlay(VideoSource.Simplepeer)}
      on:suspend={cantPlay(VideoSource.Simplepeer)}
      on:error={cantPlay(VideoSource.Simplepeer)}
      on:waiting={cantPlay(VideoSource.Simplepeer)}
    />
  </div>
</div>

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
