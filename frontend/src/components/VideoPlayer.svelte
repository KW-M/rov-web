<script lang="ts">
  import { currentVideoSource, fullscreenOpen, VideoSource } from "../js/globalContext";
  import { onDestroy, onMount } from "svelte";
  import { frontendConnMngr } from "../js/frontendConnManager";
  import { showToastMessage, ToastSeverity } from "../js/toastMessageManager";
  import { Track, type RemoteTrack } from "livekit-client";
  import { blurOnClick } from "./Actions/blurOnClick.action";
  import { log, logDebug, logInfo, logWarn, logError } from "../js/shared/logging";
  import CompassDial from "./CompassDial.svelte";
  import RovViz from "./3dScene/rovViz.svelte";
  import { Hide_source, Navigation, Video_settings } from "svelte-google-materialdesign-icons";
  import { getDrawerStore } from "@skeletonlabs/skeleton";
  import { pulseVizMode } from "./Modals/VideoSettings.svelte";
  import { browser } from "$app/environment";

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
  let videoAspectRatio = 4 / 3;
  let rovVizVisible = false;

  const drawerStore = getDrawerStore();
  const videoIsReady = (videoData: VideoStreamData) => !!(videoData.playable && videoData.stream != null);
  $: if ($pulseVizMode) {
    if (livekitVideoStream.stream) (livekitVideoStream.stream as RemoteTrack).start();
  } else if (videoIsReady(simplePeerVideoStream)) {
    if (livekitVideoStream.stream) (livekitVideoStream.stream as RemoteTrack).stop();
  }

  const updateVideoVisibility = () => {
    if (!videoContainerElem) return;
    const lkStream = livekitVideoStream.stream as RemoteTrack;
    const lkStreamEnabled = lkStream && lkStream.mediaStreamTrack.enabled;
    if (videoIsReady(simplePeerVideoStream)) {
      currentVideoSource.set(VideoSource.SimplePeer);
      if (lkStreamEnabled) {
        logInfo("VideoPlayer: Stopping livekit video stream", livekitVideoStream.stream);
        lkStream.stop();
      }
    } else if (videoIsReady(livekitVideoStream)) {
      currentVideoSource.set(VideoSource.Livekit);
      if (lkStream && !lkStreamEnabled) {
        logInfo("VideoPlayer: Starting livekit video stream", livekitVideoStream.stream);
        lkStream.start();
      }
    } else {
      currentVideoSource.set(VideoSource.None);
      if (lkStream && !lkStreamEnabled) {
        logInfo("VideoPlayer: Starting livekit video stream", livekitVideoStream.stream);
        lkStream.start();
      }
    }
  };

  const canPlay = (debugLabel: VideoSource) => {
    return (e: Event) => {
      if (debugLabel == VideoSource.Livekit) {
        livekitVideoStream.playable = true;
        livekitVideoStream = livekitVideoStream;
        logInfo("LK: Can Play Video", e && e.type ? e.type : null, videoIsReady(livekitVideoStream));
      } else if (debugLabel == VideoSource.SimplePeer) {
        simplePeerVideoStream.playable = true;
        simplePeerVideoStream = simplePeerVideoStream;
        simplePeerVideoStream.videoElem.play().catch((err) => {
          logWarn("SP: CANNOT Play Video - User Interaction Needed", err);
          showToastMessage("Click here to start video (or try reloading the page)", 5000, false, ToastSeverity.info, () => simplePeerVideoStream.videoElem.play());
          cantPlay(debugLabel)(null);
        });
        logInfo("SP: Can Play Video", e && e.type ? e.type : null, videoIsReady(simplePeerVideoStream));
      }
      updateVideoVisibility();
    };
  };

  const cantPlay = (debugLabel: VideoSource) => {
    return (e: Event) => {
      if (debugLabel == VideoSource.Livekit) {
        livekitVideoStream.playable = false;
        livekitVideoStream = livekitVideoStream;
        logWarn("LK: CANNOT Play Video", e && e.type ? e.type : null, videoIsReady(livekitVideoStream));
      } else if (debugLabel == VideoSource.SimplePeer) {
        simplePeerVideoStream.playable = false;
        simplePeerVideoStream = simplePeerVideoStream;
        logWarn("SP: CANNOT Play Video", e && e.type ? e.type : null, videoIsReady(simplePeerVideoStream));
      }
      updateVideoVisibility();
    };
  };

  let lkUnsub, spUnsub;
  onMount(() => {
    lkUnsub = frontendConnMngr.livekitConnection.remoteVideoTracks.subscribe((streams) => {
      const stream = streams.values().next().value as RemoteTrack;
      if (livekitVideoStream.stream && (livekitVideoStream.stream as RemoteTrack).detach !== undefined && livekitVideoStream.videoElem && (livekitVideoStream.stream as RemoteTrack).attachedElements.includes(livekitVideoStream.videoElem)) {
        log("LK: Video replace - Detaching existing video element", Object.assign({}, livekitVideoStream.stream), Object.assign({}, stream));
        (livekitVideoStream.stream as RemoteTrack).detach(livekitVideoStream.videoElem);
      }
      if (stream) {
        if (livekitVideoStream.streamId === stream.mediaStreamID) logWarn("LK: repeat stream ID!", stream.mediaStreamID);
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
    spUnsub = frontendConnMngr.simplePeerConnection.remoteVideoStreams.subscribe((streams) => {
      logWarn("SP: new streams", streams);
      const stream = streams.values().next().value as MediaStream | null;
      if (stream) {
        if (simplePeerVideoStream.streamId === stream.id) logWarn("SP: repeat stream ID!", stream.id);
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

    // if (browser) {
    resize();
    window.addEventListener("resize", resize);
    // }

    return {
      update(videoElement: HTMLVideoElement) {
        videoElem = videoElement;
        resize();
      },
      destroy() {
        if (browser) window.removeEventListener("resize", resize);
      },
    };
  }
</script>

<div id="livestream_container" class="px-2 pointer-events-none" class:full={$fullscreenOpen} bind:this={videoContainerElem}>
  <!-- svelte-ignore a11y-media-has-caption -->
  <CompassDial class={`absolute top-2  w-20 z-10 ${!$fullscreenOpen ? "lg:top-0 lg:-translate-y-1/2" : ""}`} />

  <div
    class="relative top-0 mx-auto pointer-events-auto bg-black/70 rounded-2xl"
    use:resizeToFitVideo={(() => {
      if (videoIsReady(livekitVideoStream)) return livekitVideoStream.videoElem;
      else if (videoIsReady(simplePeerVideoStream)) return simplePeerVideoStream.videoElem;
      else return livekitVideoStream.videoElem;
    })()}
  >
    <span class="chip variant-filled absolute top-2 -translate-x-1/2 left-1/2 z-10">{(videoIsReady(simplePeerVideoStream) ? "SP Live" : "SP Stall") + " | " + (videoIsReady(livekitVideoStream) ? "LK Live" : "LK Stall") + " "}</span>

    <button
      class="btn btn-icon variant-glass-surface shadow-md absolute top-4 right-4 z-10 lg:btn-icon-lg"
      class:!right-20={$fullscreenOpen}
      use:blurOnClick
      on:click={() => {
        drawerStore.open({
          id: "video-settings",
          position: "right",
          width: "w-96",
        });
      }}
      on:mouseenter={() => pulseVizMode.set(true)}
      on:mouseleave={() => pulseVizMode.set(false)}
    >
      <Video_settings class="block text-2xl pointer-events-none" tabindex="-1" variation="round" />
    </button>

    <button class="btn btn-icon lg:btn-icon-lg variant-glass-secondary shadow-md absolute top-4 left-4 z-20 pointer-events-auto" class:!left-20={$fullscreenOpen} use:blurOnClick on:click={() => (rovVizVisible = !rovVizVisible)}>
      {#if rovVizVisible}
        <Hide_source class="block text-2xl pointer-events-none" tabindex="-1" variation="round" />
      {:else}
        <Navigation class="block text-2xl pointer-events-none " tabindex="-1" variation="round" />
      {/if}
    </button>
    {#if rovVizVisible}
      <RovViz canvasClass="block absolute top-2 left-2 z-10 " useRovOrientationData={true} />
    {/if}

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
      class="video-livestream lk-video w-full h-full rounded-2xl border-pink-500 border-4"
      class:!visible={!videoIsReady(simplePeerVideoStream) || $pulseVizMode}
      muted
      playsinline
      autoplay
      controls={false}
      tabindex="-1"
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
      class="video-livestream sp-video w-full h-full rounded-2xl border-teal-500 border-4"
      class:!visible={videoIsReady(simplePeerVideoStream)}
      class:opacity-50={$pulseVizMode}
      muted
      playsinline
      autoplay
      controls={false}
      tabindex="-1"
      bind:this={simplePeerVideoStream.videoElem}
      on:canplay={canPlay(VideoSource.SimplePeer)}
      on:playing={canPlay(VideoSource.SimplePeer)}
      on:play={canPlay(VideoSource.SimplePeer)}
      on:stalled={cantPlay(VideoSource.SimplePeer)}
      on:pause={() => {
        cantPlay(VideoSource.SimplePeer);
        simplePeerVideoStream.videoElem.play();
      }}
      on:ended={cantPlay(VideoSource.SimplePeer)}
      on:suspend={cantPlay(VideoSource.SimplePeer)}
      on:error={cantPlay(VideoSource.SimplePeer)}
      on:waiting={cantPlay(VideoSource.SimplePeer)}
    />
  </div>
</div>

<style lang="postcss">
  #livestream_container {
    position: absolute;
    box-sizing: border-box;
    overflow: visible;
    inset: 0 0.25rem;
    bottom: 28px;

    transform: translateZ(0);
  }

  #livestream_container.full {
    left: 0;
    right: 0;
    top: 1rem;
    bottom: 0;
  }

  /* .hd-video-btn {
    z-index: 2;
  }

  .hd-video-btn:hover,
  .hd-video-btn:focus,
  .hd-video-btn:active {
    opacity: 1;
  } */

  .video-livestream {
    position: absolute;
    box-sizing: border-box;
    transform: translateX(-50%);
    left: 50%;
    top: 0;
    background: rgba(0, 0, 0, 0.55);
    padding: 0;
    visibility: hidden;
    max-width: 100%;
    max-height: 100%;
  }
</style>
