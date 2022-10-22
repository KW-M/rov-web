<script>
  import { ConnectionState, LOADING_MESSAGE } from "../lib/consts";
  import { appReady, ClassInstances, fullscreenOpen, rovDataChannelConnState, rovMainVideoTrack, rovVideoStream, rovVideoStreamConnState } from "../lib/globalContext";
  let videoElement = null;
  let trackId = null;

  $: if ($appReady === true) {
    if ($rovVideoStreamConnState == ConnectionState.connecting) {
      ClassInstances.showLoadingUi(LOADING_MESSAGE.awaitingVideoCall);
    } else if ($rovVideoStreamConnState == ConnectionState.reconnecting) {
      ClassInstances.showLoadingUi(LOADING_MESSAGE.awaitingVideoCall);
    } else if ($rovVideoStreamConnState == ConnectionState.disconnected) {
      ClassInstances.hideLoadingUi(LOADING_MESSAGE.awaitingVideoCall);
    } else if ($rovVideoStreamConnState == ConnectionState.connected) {
      ClassInstances.hideLoadingUi(LOADING_MESSAGE.awaitingVideoCall);
    }

    // $: if ($rovVideoStreamConnState == ConnectionState.connecting) {
    //   ClassInstances.showLoadingUi(LOADING_MESSAGE.videoConnecting);
    // } else if ($rovVideoStreamConnState == ConnectionState.reconnecting) {
    //   ClassInstances.showLoadingUi(LOADING_MESSAGE.videoReconnecting);
    // } else if ($rovVideoStreamConnState == ConnectionState.disconnected) {
    //   ClassInstances.hideLoadingUi(LOADING_MESSAGE.videoConnecting);
    //   ClassInstances.hideLoadingUi(LOADING_MESSAGE.videoReconnecting);
    // } else if ($rovVideoStreamConnState == ConnectionState.connected) {
    //   ClassInstances.hideLoadingUi(LOADING_MESSAGE.videoConnecting);
    //   ClassInstances.hideLoadingUi(LOADING_MESSAGE.videoReconnecting);
    // }

    if ($rovMainVideoTrack && $rovMainVideoTrack.id != trackId) {
      setTimeout(() => {
        console.debug("Setting video track");
        trackId = $rovMainVideoTrack.id;
        if (videoElement) {
          // @ts-ignore
          videoElement.srcObject = $rovVideoStream; // video.src = URL.createObjectURL(rovVideoStream);
          // @ts-ignore
          videoElement.muted = true;
          // @ts-ignore
          videoElement.autoplay = true;
          // @ts-ignore
          videoElement.controls = false;
          // @ts-ignore
          videoElement.play();
        }
      }, 0);
    }
  }
</script>

{#if true}
  <!-- $rovVideoStreamConnState === ConnectionState.connected} -->
  <div id="livestream_container" class={$fullscreenOpen ? "full" : ""}>
    <!-- {#if $rovMainVideoTrack} -->
    <!-- svelte-ignore a11y-media-has-caption -->
    <video id="video_livestream" tabindex="-1" poster="https://i.ytimg.com/vi/r5EJCJbZ3qQ/maxresdefault.jpg" bind:this={videoElement} />
    <!-- {/if} -->
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
