<script lang="ts">
  import { ConnectionState, LOADING_MESSAGE } from "../lib/consts";
  import videoPlaceholderUrl from "../assets/video-placeholder.jpg";
  import { appReady, fullscreenOpen, rovDataChannelConnState, rovMainVideoTrack, rovVideoStream, rovVideoStreamConnState } from "../lib/globalContext";
  let videoElement = null;
  let trackId = null;
  import { showLoadingUi, hideLoadingUi } from "./LoadingIndicator.svelte";

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

  $: if ($rovVideoStream) {
    // trackId = $rovMainVideoTrack.id;
    console.log("VideoPlayer: trackId", trackId, videoElement);
    if (videoElement) {
      videoElement.srcObject = $rovVideoStream; // video.src = URL.createObjectURL(rovVideoStream);
      setTimeout(() => {
        videoElement.play().catch((err) => {
          let ok = confirm("Start Livestream?");
          videoElement.play();
        });
      }, 150); // for some reason firefox complains if you play too soon.
    }
  }
</script>

{#if $rovVideoStream}
  <div id="livestream_container" class={$fullscreenOpen ? "full" : ""}>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video id="video_livestream" muted controls={false} tabindex="-1" poster={videoPlaceholderUrl} bind:this={videoElement} />
  </div>
{/if}

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

  #video_livestream {
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

  #livestream_container.full #video_livestream {
    width: 100%;
    height: 100%;
  }
</style>
