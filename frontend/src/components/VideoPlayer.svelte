<script lang="ts">
  import { ConnectionState, LOADING_MESSAGE } from "../js/frontendConsts";
  import videoPlaceholderUrl from "../assets/ui-elements/video-placeholder.jpg";
  import { appReady, fullscreenOpen } from "../js/globalContext";
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
  import { ProgressRadial } from "@skeletonlabs/skeleton";

  enum VideoSource {
    livekit = "LK",
    simplepeer = "SP",
  }

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

  const videoIsReady = (videoData: VideoStreamData) => !!(videoData.playable && videoData.stream != null);

  const updateVideoVisibility = () => {
    console.log("updateVideoVisibility", videoIsReady(livekitVideoStream), videoIsReady(simplePeerVideoStream));
    if (!videoContainerElem) return;
    videoSwitchInProgress = false;
    if (videoIsReady(simplePeerVideoStream)) {
      if (livekitVideoStream.stream) (livekitVideoStream.stream as RemoteTrack).stop();
      // simplePeerVideoStream.videoElem.classList.add("!opacity-100");
      // if (livekitVideoStream.videoElem) livekitVideoStream.videoElem.classList.remove("!opacity-100");
    } else {
      if (livekitVideoStream.stream) (livekitVideoStream.stream as RemoteTrack).start();
      // if (simplePeerVideoStream.videoElem) simplePeerVideoStream.videoElem.classList.remove("!opacity-100");
      // if (livekitVideoStream.videoElem) livekitVideoStream.videoElem.classList.remove("!opacity-100");
      if (livekitVideoStream.stream == null) {
        showToastMessage("Waiting for livekit video stream...", 1000, false, ToastSeverity.info);
      }
    }
  };

  const canPlay = (debugLabel: VideoSource) => {
    return (e: Event) => {
      console.log("Video CanPlay", debugLabel, e && e.type ? e.type : null);
      if (debugLabel == VideoSource.livekit) {
        livekitVideoStream.playable = true;
        livekitVideoStream = livekitVideoStream;
      } else if (debugLabel == VideoSource.simplepeer) {
        simplePeerVideoStream.playable = true;
        simplePeerVideoStream = simplePeerVideoStream;
        simplePeerVideoStream.videoElem.play().catch((err) => {
          console.log("Video cannot play", err);
          showToastMessage("Click this message to play or try reloading the page", 5000, false, ToastSeverity.warning, () => simplePeerVideoStream.videoElem.play());
          cantPlay(debugLabel)(null);
        });
      }
      updateVideoVisibility();
    };
  };

  const cantPlay = (debugLabel: VideoSource) => {
    return (e: Event) => {
      console.log("Video CantPlay", debugLabel, e && e.type ? e.type : null, e);
      if (debugLabel == VideoSource.livekit) {
        livekitVideoStream.playable = false;
        livekitVideoStream = livekitVideoStream;
      } else if (debugLabel == VideoSource.simplepeer) {
        simplePeerVideoStream.playable = false;
        simplePeerVideoStream = simplePeerVideoStream;
      }
      updateVideoVisibility();
    };
  };

  let lkUnsub, spUnsub;
  onMount(() => {
    lkUnsub = frontendConnMngr.livekitConnection.remoteVideoTracks.subscribe((streams) => {
      const stream = streams.values().next().value as RemoteTrack;
      if (livekitVideoStream.stream && (livekitVideoStream.stream as RemoteTrack).detach) {
        console.log("Video detach stream lk", Object.assign({}, livekitVideoStream.stream), Object.assign({}, stream));
        stream.detach(livekitVideoStream.videoElem);
      }
      if (stream) {
        if (livekitVideoStream.streamId == stream.mediaStreamID) console.warn("VideoPlayer: LK: repeat stream ID!", stream.mediaStreamID);
        stream.attach(livekitVideoStream.videoElem);
        livekitVideoStream.streamId = stream.mediaStreamID;
        livekitVideoStream.stream = stream;
        if (stream.streamState == Track.StreamState.Active) livekitVideoStream.playable = true;
      } else {
        livekitVideoStream.playable = false;
        livekitVideoStream.streamId = null;
        livekitVideoStream.stream = null;
        updateVideoVisibility();
      }
    });
    spUnsub = frontendConnMngr.simplepeerConnection.remoteVideoStreams.subscribe((streams) => {
      const stream = streams.values().next().value as MediaStream | null;
      if (stream) {
        if (simplePeerVideoStream.streamId == stream.id) console.warn("VideoPlayer: SP: repeat stream ID!", stream.id);
        simplePeerVideoStream.videoElem.srcObject = stream;
        simplePeerVideoStream.streamId = stream.id;
        simplePeerVideoStream.stream = stream;
        if (stream.active) simplePeerVideoStream.playable = true;
      } else {
        simplePeerVideoStream.playable = false;
        simplePeerVideoStream.streamId = null;
        simplePeerVideoStream.stream = null;
        updateVideoVisibility();
      }
    });
  });

  onDestroy(() => {
    lkUnsub();
    spUnsub();
  });
</script>

<!-- {#if currentVideoStream} -->
<div id="livestream_container" class:full={$fullscreenOpen} bind:this={videoContainerElem}>
  <!-- svelte-ignore a11y-media-has-caption -->
  <!-- max-lg:btn-icon lg: -->
  <button
    class:!opacity-100={videoHovered}
    class="opacity-100 hd-video-btn btn variant-filled-warning text-white btn-base shadow-md absolute top-3 left-1/2 -translate-x-1/2"
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
  <video class="video-livestream lk-video" class:!visible={videoIsReady(livekitVideoStream) && !videoIsReady(simplePeerVideoStream)} muted playsinline autoplay controls={false} tabindex="-1" use:resizeToFit={videoIsReady(livekitVideoStream)} on:pointerenter={() => (videoHovered = true)} on:pointerleave={() => (videoHovered = false)} bind:this={livekitVideoStream.videoElem} on:canplay={canPlay(VideoSource.livekit)} on:playing={canPlay(VideoSource.livekit)} on:play={canPlay(VideoSource.livekit)} on:stalled={cantPlay(VideoSource.livekit)} on:pause={cantPlay(VideoSource.livekit)} on:ended={cantPlay(VideoSource.livekit)} on:suspend={cantPlay(VideoSource.livekit)} on:error={cantPlay(VideoSource.livekit)} on:waiting={cantPlay(VideoSource.livekit)}> </video>
  <video class="video-livestream sp-video" class:!visible={videoIsReady(simplePeerVideoStream)} muted playsinline autoplay controls={false} tabindex="-1" use:resizeToFit={videoIsReady(simplePeerVideoStream)} on:pointerenter={() => (videoHovered = true)} on:pointerleave={() => (videoHovered = false)} bind:this={simplePeerVideoStream.videoElem} on:canplay={canPlay(VideoSource.simplepeer)} on:playing={canPlay(VideoSource.simplepeer)} on:play={canPlay(VideoSource.simplepeer)} on:stalled={cantPlay(VideoSource.simplepeer)} on:pause={cantPlay(VideoSource.simplepeer)} on:ended={cantPlay(VideoSource.simplepeer)} on:suspend={cantPlay(VideoSource.simplepeer)} on:error={cantPlay(VideoSource.simplepeer)} on:waiting={cantPlay(VideoSource.simplepeer)} />
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
    overflow: hidden;

    pointer-events: all;
    inset: 4px;
    bottom: 64px;

    transform: translateZ(0);
  }

  #livestream_container.full {
    inset: 0;
    bottom: 0;
  }

  .hd-video-btn {
    z-index: 2;
    opacity: 0;
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
