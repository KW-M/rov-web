<script lang="ts">
  import "../app.postcss";
  import { onDestroy, onMount } from "svelte";
  import { initializeStores } from "@skeletonlabs/skeleton";
  import { AppShell, Drawer, Modal, Toast } from "@skeletonlabs/skeleton";
  import { initPage } from "../initilize";
  import { setupToasts } from "../js/toastMessageManager";
  import { setupModals } from "../js/uiDialogs";
  import { appReady } from "../js/globalContext";
  import { RovActions } from "../js/rovActions";
  import { gpadCtrl } from "../js/gamepad";
  import { frontendConnMngr } from "../js/frontendConnManager";
  import LoadingIndicator from "../components/LoadingIndicator.svelte";
  import OnscreenGamepads from "../components/OnscreenGamepads.svelte";
  import VideoPlayer from "../components/VideoPlayer.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import Topbar from "../components/Topbar.svelte";
  import RovSelector from "../components/RovSelector.svelte";
  import HelpTooltips from "../components/HelpTooltips.svelte";
  // Floating UI for Popups
  import { storePopup } from "@skeletonlabs/skeleton";
  import { computePosition, autoUpdate, flip, shift, offset, arrow, autoPlacement } from "@floating-ui/dom";
  initializeStores();
  storePopup.set({ computePosition, autoUpdate, autoPlacement, flip, shift, offset, arrow });
  setupToasts();
  setupModals();
  initPage();

  // Setup Font Awesome Icons
  // import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
  // import { config } from "@fortawesome/fontawesome-svg-core";
  // config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

  onMount(() => {
    appReady.set(true);
  });

  onDestroy(() => {
    RovActions.stopRequiredMsgLoop();
    frontendConnMngr.disconnect();
    gpadCtrl.gpadEmulator.cleanup();
  });
</script>

<!-- App Shell -->
<HelpTooltips />
<Modal />
<Toast position="tl" />
<Drawer width="w-72">
  <Sidebar />
</Drawer>
<AppShell slotSidebarLeft={"bg-surface-500/5 hidden lg:block"} regionPage="[&>main]:relative">
  <svelte:fragment slot="pageHeader">
    <Topbar />
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <Sidebar />
  </svelte:fragment>
  <!-- ---- / page body ---- -->
  <!-- <slot /> -->
  <RovSelector />
  <LoadingIndicator />
  <VideoPlayer />
  <OnscreenGamepads />
  <!-- ---- page body / ---- -->
  <!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
</AppShell>
