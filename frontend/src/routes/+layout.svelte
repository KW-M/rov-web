<script lang="ts">
  import "../app.css";
  import { onDestroy, onMount } from "svelte";
  import { getModalStore, initializeStores } from "@skeletonlabs/skeleton";
  import { Modal, Toast } from "@skeletonlabs/skeleton";
  import { setupToasts } from "../js/toastMessageManager";
  import { setupModals } from "../js/uiDialogs";
  import { initPage } from "../initilize";
  import { RovActions } from "../js/rovActions";

  initializeStores();
  setupToasts();
  setupModals();

  // Floating UI for Popups
  import { storePopup } from "@skeletonlabs/skeleton";
  import { computePosition, autoUpdate, flip, shift, offset, arrow, autoPlacement } from "@floating-ui/dom";
  import RovSelector from "../components/RovSelector.svelte";
  import LoadingIndicator from "../components/LoadingIndicator.svelte";
  import { frontendConnMngr } from "../js/frontendConnManager";
  import { base } from "$app/paths";
  import { page } from "$app/stores";
  import LogTimeline from "../components/Modals/LogTimeline.svelte";
  import ControlSchemeTut from "../components/Modals/Tutorials/ControlSchemeTut.svelte";
  import { setModalStore } from "../components/Modals/modals";
  import FlyModesTut from "../components/Modals/Tutorials/FlyModesTut.svelte";
  import { mainLogr } from "../js/shared/logging";
  storePopup.set({ computePosition, autoUpdate, autoPlacement, flip, shift, offset, arrow });
  setModalStore(getModalStore());

  onDestroy(() => {
    RovActions.stopRequiredMsgLoop();
    frontendConnMngr.close();
  });

  onMount(() => {
    mainLogr.sendLogsAllowed = true;
    const logSaveInterval = setInterval(() => {
      mainLogr.sendQueuedLogs((_, msg, id) => {
        localStorage.setItem("log_" + id, msg);
        return Promise.resolve(true);
      });
    }, 5000);
    initPage();
    return () => clearInterval(logSaveInterval);
  });
  $: isRolePage = !$page.error && location.pathname.replaceAll("/", "") !== base.replaceAll("/", "");
</script>

<Modal
  height="max-h-full"
  zIndex="z-40"
  components={{
    LogTimeline: { ref: LogTimeline },
    ControlSchemeTut: { ref: ControlSchemeTut },
    FlyModesTut: { ref: FlyModesTut },
  }}
/>
<Toast position="b" zIndex="z-50" shadow="shadow-2xl ring-2" max={5} />
<slot />
{#if isRolePage}
  <RovSelector />
  <LoadingIndicator />
{/if}
