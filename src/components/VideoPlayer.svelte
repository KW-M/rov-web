<script>
  import { ConnectionState } from "../lib/consts";
  import { fullscreenOpen, rovVideoStream, rovVideoStreamConnState } from "../lib/globalContext";
  import { hideLoadingUi, showLoadingUi } from "../lib/ui";
  $: ($rovVideoStreamConnState) => {
    const videoState = $rovVideoStreamConnState;
    if (videoState == ConnectionState.connecting) {
      showLoadingUi("awaiting-video-call");
    } else if (videoState == ConnectionState.reconnecting) {
      showLoadingUi("awaiting-video-call");
    } else if (videoState == ConnectionState.disconnected) {
      hideLoadingUi("awaiting-video-call");
    } else if (videoState == ConnectionState.connected) {
      hideLoadingUi("awaiting-video-call");
    }
  };
</script>

{#if $rovVideoStreamConnState === ConnectionState.connected}
  <div id="livestream_container" class={$fullscreenOpen ? "full" : ""}>
    {#if $rovVideoStream}
      <!-- svelte-ignore a11y-media-has-caption -->
      <video id="video_livestream" poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg" />
    {/if}
  </div>
{/if}

<style>
  #livestream_container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    margin: auto;
    padding: 40px 36px 28px;
  }

  #video_livestream {
    display: block;

    box-sizing: border-box;
    width: 100%;
    max-height: 100%;
    margin: auto;

    border: 3px solid black;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.55);
    /* max-width: min-content; */

    aspect-ratio: 16 / 9;
    object-fit: contain;
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
