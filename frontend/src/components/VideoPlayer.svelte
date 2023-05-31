<script lang="ts">
  import { ConnectionState, LOADING_MESSAGE } from "../js/consts";
  import videoPlaceholderUrl from "../assets/video-placeholder.jpg";
  import { appReady, fullscreenOpen, rovDataChannelConnState, rovMainVideoTrack, rovVideoStream, rovVideoStreamConnState } from "../js/globalContext";
  let videoContainerElement = null;
  let trackId = null;
  import { showLoadingUi, hideLoadingUi } from "./LoadingIndicator.svelte";
  import { onDestroy } from "svelte";
  import { showToastMessage } from "../js/ui";
  let currentVideoStream = null;

  $: if ($appReady === true) {
    if ($rovVideoStreamConnState == ConnectionState.connecting) {
      showLoadingUi(LOADING_MESSAGE.awaitingVideoCall, null);
    } else if ($rovVideoStreamConnState == ConnectionState.reconnecting) {
      showLoadingUi(LOADING_MESSAGE.awaitingVideoCall, null);
    } else if ($rovVideoStreamConnState == ConnectionState.disconnected) {
      hideLoadingUi(LOADING_MESSAGE.awaitingVideoCall);
    } else if ($rovVideoStreamConnState == ConnectionState.connected) {
      hideLoadingUi(LOADING_MESSAGE.awaitingVideoCall);
    }

    // $: if ($rovVideoStreamConnState == ConnectionState.connecting) {
    //   loading.showLoadingUi(LOADING_MESSAGE.videoConnecting);
    // } else if ($rovVideoStreamConnState == ConnectionState.reconnecting) {
    //   loading.showLoadingUi(LOADING_MESSAGE.videoReconnecting);
    // } else if ($rovVideoStreamConnState == ConnectionState.disconnected) {
    //   loading.hideLoadingUi(LOADING_MESSAGE.videoConnecting);
    //   loading.hideLoadingUi(LOADING_MESSAGE.videoReconnecting);
    // } else if ($rovVideoStreamConnState == ConnectionState.connected) {
    //   loading.hideLoadingUi(LOADING_MESSAGE.videoConnecting);
    //   loading.hideLoadingUi(LOADING_MESSAGE.videoReconnecting);
    // }
  }

  const setVideo = (stream) => {
    if (!stream || stream == currentVideoStream) return;
    currentVideoStream = stream;
    // const vidContainerElem = document.getElementById("livestream_container") as HTMLDivElement;
    const vidElem = document.createElement("video");
    vidElem.id = "video_livestream";
    vidElem.muted = true;
    vidElem.autoplay = true;
    vidElem.controls = false;
    vidElem.srcObject = stream;
    // vidElem.setAttribute("poster", videoPlaceholderUrl);
    vidElem.setAttribute("tabindex", "-1");
    videoContainerElement.innerHTML = "";
    videoContainerElement.appendChild(vidElem);
    vidElem.onclick = () => {
      vidElem.play();
    };
    setTimeout(() => {
      vidElem.play().catch((err) => {
        showToastMessage("Click video to play.", 5000, () => {
          vidElem.play();
        });
      });
    }, 150); // for some reason firefox complains if you play too soon.
  };

  const unsub = rovVideoStream.subscribe((stream: MediaStream) => {
    if (!stream || stream == currentVideoStream) return;
    stream.onaddtrack = function (event) {
      console.log("Got remote track from relay", event.track);
      setVideo(new MediaStream([event.track]));
    };
    setVideo(stream);
  });

  onDestroy(() => {
    if (videoElement) {
      videoElement.pause();
      videoElement.srcObject = null;
    }
    unsub();
  });
</script>

<!-- {#if currentVideoStream} -->
<div id="livestream_container" class={$fullscreenOpen ? "full" : ""} bind:this={videoContainerElement}>
  <!-- svelte-ignore a11y-media-has-caption -->
  <!-- <video id="video_livestream" muted tabindex="-1" poster={videoPlaceholderUrl} bind:this={videoElement} /> -->
</div>

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
    padding: 20px;
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
