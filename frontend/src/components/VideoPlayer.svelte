<script lang="ts">
  import { ConnectionState, LOADING_MESSAGE } from "../js/consts";
  import videoPlaceholderUrl from "../assets/ui-elements/video-placeholder.jpg";
  import { appReady, fullscreenOpen } from "../js/globalContext";
  import { showLoadingUi, hideLoadingUi } from "./LoadingIndicator.svelte";
  import { onDestroy } from "svelte";
  import { changesSubscribe } from "../js/shared/util";
  import { frontendConnMngr } from "../js/frontendConnManager";
  import { showToastMessage } from "../js/toastMessageManager";

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
          showToastMessage("Click video to play.", 5000, () => {
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
<button class="btn btn-md variant-filled-primary" on:click={() => showToastMessage("hello world! Thanks World you rock." + Math.random())}>Hi</button>

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

  :global(#video_livestream) {
    display: block;
    position: absolute;
    box-sizing: border-box;
    margin: 0;
    /* border: 3px solid black; */
    align-self: center;
    /* border-radius: 12px; */
    /* background: rgba(0, 0, 0, 0.55); */
    height: min-content;
    padding: 0;
    max-height: 100%;
    width: 100%;
    padding-bottom: 4em;
    /* padding-top: 36px; */
    /* padding: 40px 36px 28px; */
    /* aspect-ratio: 16 / 9; */
    /* object-fit: contain; */
  }

  #livestream_container.full {
    width: 100%;
    height: 100%;
    padding-right: 4px;
    padding-left: 4px;
  }

  :global(#livestream_container.full #video_livestream) {
    width: 100%;
    height: 100%;
  }
</style>
