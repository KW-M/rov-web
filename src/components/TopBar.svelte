<script>
  import { RovActions } from "../lib/rovActions";

  import { Icon } from "@steeze-ui/svelte-icon";
  import { AdjustmentsHorizontal, Wrench, Power, ArrowDownOnSquareStack, ArrowsPointingOut, ArrowsPointingIn } from "@steeze-ui/heroicons";
  import { fade, slide } from "svelte/transition";
  import CompassDial from "./CompassDial.svelte";
  import { fullscreenOpen } from "../lib/globalContext";
  import { selectKeypressFactory, toggleFullscreen } from "../lib/util";
  let menuOpen = false;
</script>

<div class="px-1 fixed w-full block z-50">
  <div class="navbar rounded-t-none shadow-xl rounded-box h-9 p-0 min-h-0 lg:rounded-t-none bg-base-100  m-auto max-w-xl">
    <div class="pr-3 justify-start flex-shrink">
      <!-- <div class="dropdown"> -->
      <button tabindex="0" class="btn btn-ghost btn-square" on:click={() => (menuOpen = !menuOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </button>
      <!-- <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li><a>Homepage</a></li>
          <li><a>Portfolio</a></li>
          <li><a>About</a></li>
        </ul> -->
      <!-- </div> -->
    </div>
    <div class="navbar-center  flex-1 self-stretch"><CompassDial /></div>
    <div class="pl-3 justify-end flex-shrink">
      <button class="btn btn-square btn-ghost" on:click={(e) => toggleFullscreen(e.target, null)}>
        <Icon theme="solid" src={$fullscreenOpen ? ArrowsPointingIn : ArrowsPointingOut} class="w-6 h-6" />
      </button>
    </div>
  </div>
  {#if menuOpen}
    <div transition:slide class="mt-1 m-auto z-50 w-full max-w-max card card-compact dropdown-content bg-base-100 shadow p-1">
      <div class="multi-menu card-body md:flex-row rounded-box ">
        <ul class="menu inline-block menu-normal flex-1">
          <li class="pointer-events-none" aria-hidden="true"><Icon theme="mini" src={Power} class="h-12" /></li>
          <li on:click={RovActions.shutdownRov} on:keypress={selectKeypressFactory(RovActions.shutdownRov)} role="menuitem"><span class="btn btn-ghost">Shutdown ROV</span></li>
          <li on:click={RovActions.rebootRov} on:keypress={selectKeypressFactory(RovActions.rebootRov)} role="menuitem"><span class="btn btn-ghost">Reboot ROV</span></li>
          <li on:click={RovActions.restartRovServices} on:keypress={selectKeypressFactory(RovActions.rebootRov)} role="menuitem"><span class="btn btn-ghost">Restart ROV Services</span></li>
        </ul>
        <div class="divider md:divider-horizontal md:m-0" />
        <ul class="menu inline-block menu-normal flex-1">
          <li class="pointer-events-none" aria-hidden="true"><Icon theme="solid" src={Wrench} class="h-12" /></li>
          <li on:click={RovActions.getRovStatusReport} on:keypress={selectKeypressFactory(RovActions.rebootRov)} role="menuitem"><span class="btn btn-ghost">System Status</span></li>
          <li on:click={RovActions.getRovLogs} on:keypress={selectKeypressFactory(RovActions.rebootRov)} role="menuitem"><span class="btn btn-ghost">ROV Logs</span></li>
          <li on:click={() => window.open("./404.html")} on:keypress={selectKeypressFactory(() => window.open("./404.html"))} role="menuitem"><span class="btn btn-ghost">Local Debug Links</span></li>
        </ul>
        <div class="divider md:divider-horizontal md:m-0" />
        <ul class="menu inline-block menu-normal flex-1">
          <li class="pointer-events-none" aria-hidden="true"><Icon theme="solid" src={AdjustmentsHorizontal} class="h-12" /></li>
          <li on:click={RovActions.enableRovWifi} on:keypress={selectKeypressFactory(RovActions.rebootRov)} role="menuitem"><span class="btn btn-ghost">Enable ROV Wifi</span></li>
          <li on:click={RovActions.disableRovWifi} on:keypress={selectKeypressFactory(RovActions.rebootRov)} role="menuitem"><span class="btn btn-ghost">Disable ROV Wifi</span></li>
        </ul>
      </div>
    </div>
  {/if}
</div>

<style>
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
