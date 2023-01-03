<script lang="ts">
  import { RovActions } from "../lib/rovActions";

  import { Icon } from "@steeze-ui/svelte-icon";
  import { AdjustmentsHorizontal, Wrench, Power, ArrowDownOnSquareStack, ArrowsPointingOut, ArrowsPointingIn, Cog6Tooth, QuestionMarkCircle } from "@steeze-ui/heroicons";
  import { fade, slide } from "svelte/transition";
  import CompassDial from "./sensors/CompassDial.svelte";
  import { fullscreenOpen, rovDataChannelConnState } from "../lib/globalContext";
  import { selectKeypressFactory, toggleFullscreen } from "../lib/util";
  import { ConnectionState } from "../lib/consts";
  import { addTooltip } from "./HelpTooltips.svelte";
  let menuOpen = false;
  // $: if ($rovDataChannelConnState != ConnectionState.connected) menuOpen = false;
  // disabled={$rovDataChannelConnState != ConnectionState.connected}
</script>

<div class="px-1 absolute flex w-full flex-col max-h-screen pointer-events-none">
  <div class="navbar rounded-t-none shadow-xl rounded-box h-9 p-0 min-h-0 lg:rounded-t-none bg-base-100  m-auto max-w-sm  top-bar flex-none pointer-events-auto overflow-hidden">
    <div class="pr-3 justify-start flex-shrink">
      <!-- <div class="dropdown"> -->
      <button class="btn btn-ghost btn-square rounded-tl-none" on:click={() => (menuOpen = !menuOpen)} use:addTooltip={{ label: "Menu", placement: "left" }}>
        <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg> -->
        <Icon theme="solid" src={Cog6Tooth} class="w-6 h-6 pointer-events-none" />
      </button>
      <!-- <ul  class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Homepage</a></li>
          <li><a>Portfolio</a></li>
          <li><a>About</a></li>
        </ul> -->
      <!-- </div> -->
    </div>
    <div class="navbar-center  flex-1 self-stretch"><CompassDial /></div>
    <div class="pl-3 justify-end flex-shrink">
      <!-- <button class="btn btn-square btn-ghost" on:click={(e) => toggleFullscreen(e.target, null)} use:addTooltip={{ label: "Toggle Fullscreen", placement: "right" }}>
        <Icon theme="solid" src={$fullscreenOpen ? ArrowsPointingIn : ArrowsPointingOut} class="w-6 h-6 pointer-events-none" />
      </button> -->
      <button class="btn btn-square btn-ghost !rounded-tr-none" use:addTooltip={{ label: "Hover or long-press buttons to show help", placement: "bottom", timeout: 0 }}>
        <Icon theme="solid" src={QuestionMarkCircle} class="w-6 h-6 pointer-events-none" />
      </button>
    </div>
  </div>
  {#if menuOpen}
    <div transition:slide class="mt-1 mb-24 m-auto w-full max-w-max card card-compact dropdown-content bg-base-100 shadow p-1 overflow-auto pointer-events-auto">
      <div class="multi-menu card-body md:flex-row rounded-box ">
        <ul class="menu inline-block menu-normal flex-1">
          <li aria-hidden="true"><Icon theme="mini" src={Power} class="h-12 pointer-events-none" /></li>
          <li on:click={RovActions.shutdownRov} on:keypress={selectKeypressFactory(RovActions.shutdownRov)} role="menuitem"><span class="btn btn-ghost">Shutdown ROV</span></li>
          <li on:click={RovActions.rebootRov} on:keypress={selectKeypressFactory(RovActions.rebootRov)} role="menuitem"><span class="btn btn-ghost">Reboot ROV</span></li>
          <li on:click={RovActions.restartRovServices} on:keypress={selectKeypressFactory(RovActions.rebootRov)} role="menuitem"><span class="btn btn-ghost">Restart ROV Services</span></li>
        </ul>
        <div class="divider md:divider-horizontal md:m-0" />
        <ul class="menu inline-block menu-normal flex-1">
          <li aria-hidden="true"><Icon theme="solid" src={Wrench} class="h-12 pointer-events-none" /></li>
          <li on:click={RovActions.getRovStatusReport} on:keypress={selectKeypressFactory(RovActions.rebootRov)} role="menuitem"><span class="btn btn-ghost">System Status</span></li>
          <li on:click={RovActions.getRovLogs} on:keypress={selectKeypressFactory(RovActions.rebootRov)} role="menuitem"><span class="btn btn-ghost">ROV Logs</span></li>
          <li on:click={() => window.open("./404.html")} on:keypress={selectKeypressFactory(() => window.open("./404.html"))} role="menuitem"><span class="btn btn-ghost">Local Debug Links</span></li>
        </ul>
        <div class="divider md:divider-horizontal md:m-0" />
        <ul class="menu inline-block menu-normal flex-1">
          <li aria-hidden="true"><Icon theme="solid" src={AdjustmentsHorizontal} class="h-12 pointer-events-none" /></li>
          <li on:click={RovActions.enableRovWifi} on:keypress={selectKeypressFactory(RovActions.rebootRov)} role="menuitem"><span class="btn btn-ghost">Enable ROV Wifi</span></li>
          <li on:click={RovActions.disableRovWifi} on:keypress={selectKeypressFactory(RovActions.rebootRov)} role="menuitem"><span class="btn btn-ghost">Disable ROV Wifi</span></li>
        </ul>
      </div>
    </div>
  {/if}
</div>
<button class="btn btn-square bg-base-100 pointer-events-auto absolute -right-1 -top-1 rounded-none rounded-bl-2xl" on:click={(e) => toggleFullscreen(e, null)} use:addTooltip={{ label: "Toggle Fullscreen", placement: "right" }}>
  <Icon theme="solid" src={$fullscreenOpen ? ArrowsPointingIn : ArrowsPointingOut} class="w-6 h-6 pointer-events-none" />
</button>

<style>
  .top-bar {
    width: calc(100% - 12.5rem);
  }

  .multi-menu.card-body {
    @apply p-3 gap-1;
  }

  .multi-menu.card-body ul {
    @apply m-0 inline-block;
  }

  .multi-menu li span {
    @apply whitespace-nowrap my-1 align-text-bottom  inline-block w-60;

    text-align: center;
    border-radius: var(--rounded-box, 1rem);
  }
</style>
