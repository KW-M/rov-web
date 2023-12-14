<script lang="ts">
  import { ConnectionState, LOADING_MESSAGE } from "../js/frontendConsts";
  import videoPlaceholderUrl from "../assets/ui-elements/video-placeholder.jpg";
  import { appReady, fullscreenOpen } from "../js/globalContext";
  import { onDestroy } from "svelte";
  import { changesSubscribe } from "../js/shared/util";
  import { frontendConnMngr } from "../js/frontendConnManager";
  import { showToastMessage, ToastSeverity } from "../js/toastMessageManager";

  let currentVideoStream: MediaStream | null = null;
  let videoElem: HTMLVideoElement | null = null;
  let videoContainerElem: HTMLDivElement | null = null;

  const setVideo = (stream: MediaStream | null) => {
    if (!stream || stream == currentVideoStream) return;
    if (!videoContainerElem) return;
    currentVideoStream = stream;

    // Create a new video element:
    videoElem = document.createElement("video");
    videoElem.id = "video_livestream";
    videoElem.poster = videoPlaceholderUrl;
    videoElem.muted = true;
    videoElem.autoplay = true;
    videoElem.controls = false;
    videoElem.srcObject = stream;
    videoElem.setAttribute("tabindex", "-1");

    videoContainerElem.innerHTML = "";
    videoContainerElem.appendChild(videoElem);
    videoElem.onclick = () => {
      if (videoElem) videoElem.play();
    };
    setTimeout(() => {
      if (videoElem)
        videoElem.play().catch((err) => {
          showToastMessage("Video cannot start: Click video to play or try reloading page", 5000, false, ToastSeverity.warning, () => {
            if (videoElem) videoElem.play();
          });
        });
    }, 150); // for some reason firefox complains if you play too soon.
  };

  const unsub = changesSubscribe(frontendConnMngr.mainVideoStream, (stream) => {
    if (stream) {
      setVideo(stream);
    } else {
      setVideo(null);
    }
  });

  // const unsub = changesSubscribe(rovVideoStream, (stream: MediaStream) => {
  //   if (!stream || stream == currentVideoStream) return;
  //   stream.onaddtrack = function (event) {
  //     console.log("Got remote track from relay", event.track);
  //     setVideo(new MediaStream([event.track]));
  //   };
  //   setVideo(stream);
  // });

  onDestroy(() => {
    if (videoElem) {
      videoElem.pause();
      videoElem.srcObject = null;
    }
    unsub();
  });
</script>

<!-- {#if currentVideoStream} -->
<div id="livestream_container" class="pointer-events-none" class:full={$fullscreenOpen} bind:this={videoContainerElem}>
  <!-- svelte-ignore a11y-media-has-caption -->
  <!-- <video id="video_livestream" muted tabindex="-1" poster={videoPlaceholderUrl} bind:this={videoElement} /> -->
</div>

<!-- <button class="btn btn-md variant-filled-success" on:click={() => showToastMessage("hello world! Thanks World you rock." + Math.random(), 1000,false,ToastSeverity.success)}>Hi</button>
<button class="btn btn-md variant-filled-warning" on:click={() => showToastMessage("hello world! Thanks World you rock." + Math.random(), 1000,false,ToastSeverity.warning)}>Hi</button>
<button class="btn btn-md variant-filled-error" on:click={() => showToastMessage("hello world! Thanks World you rock." + Math.random(), 1000,false,ToastSeverity.error)}>Hi</button>
<button class="btn btn-md variant-filled-tertiary" on:click={() => showToastMessage("hello world! Thanks World you rock." + Math.random(), 1000,false,ToastSeverity.info)}>Hi</button> -->
<!-- {/if} -->
<style>
  #livestream_container {
    /* position: relative; */
    /* flex: 1 1 100%; */
    position: absolute;
    box-sizing: border-box;
    overflow: hidden;

    width: 100%;
    height: 100%;

    transform: translateZ(0);
    /* padding-bottom: calc(var(--aspect-ratio, 0.5625) * 100%); 16:9 */
  }
</style>
