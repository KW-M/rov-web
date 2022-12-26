<script context="module" lang="ts">
  import { LOADING_MESSAGE } from "../lib/consts";
  import nStore from "../lib/libraries/nStore";
  import type { nStoreT } from "../lib/libraries/nStore";

  let currentMsg: nStoreT<string> = nStore(null);
  let loadingStack = {};

  /** show the loading indicator with the given message
   * @param msgId {LOADING_MESSAGE}
   * @param customLoadingMessage  {string?} */
  export const showLoadingUi = (msgId, customLoadingMessage) => {
    const message = customLoadingMessage || msgId || LOADING_MESSAGE.default;
    currentMsg.set(message);
    console.debug("showLoadingUi", message);
    loadingStack[msgId] = message;
  };

  /** hide the loading indicator with the given message
   * @param msgId {LOADING_MESSAGE} */
  export const hideLoadingUi = (msgId) => {
    if (msgId === LOADING_MESSAGE.clearAll) {
      loadingStack = {};
    } else {
      delete loadingStack[msgId];
    }

    // Update the ui with the top loading message
    const loadingStackMsgIds = Object.keys(loadingStack);
    if (loadingStackMsgIds.length === 0) {
      currentMsg.set(null);
    } else {
      currentMsg.set(loadingStack[loadingStackMsgIds[loadingStackMsgIds.length - 1]]);
      console.debug("hideLoadingUi Nonempty stack", msgId);
    }
  };
</script>

{#if $currentMsg != null}
  <div id="site_loading_indicator" class="lds-circle">
    <div />
    <span id="site_loading_text">{$currentMsg}</span>
  </div>
{/if}

<style>
  #site_loading_indicator {
    padding: 1rem 2rem;
    transform: translate(-50%, 20vh);

    display: flex;
    flex-wrap: nowrap;
    align-items: center;

    border-radius: 11px;
    width: max-content;
    max-width: calc(100% - 6rem);
    pointer-events: none;
    user-select: none;
    background-color: hsl(var(--b1) / 0.9);
    position: absolute;
    z-index: 4;
    top: 6px;
    left: 50%;
  }

  #site_loading_indicator #site_loading_text {
    display: inline-block;

    vertical-align: top;

    color: white;

    font-size: larger;
    font-weight: bold;
    line-height: 2em;
  }

  /* ***** Loading "spinning circle" indicator *** */

  .lds-circle {
    display: inline-block;

    transform: translateZ(1px);
  }

  .lds-circle > div {
    display: block;

    width: 64px;
    height: 64px;
    flex: 0 0 auto;
    margin-right: 2rem;

    animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    border-radius: 50%;
    background: #fff;
  }

  @keyframes lds-circle {
    0%,
    100% {
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }

    0% {
      transform: rotateY(0deg);
    }

    50% {
      transform: rotateY(1800deg);
      animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
    }

    100% {
      transform: rotateY(3600deg);
    }
  }
</style>
