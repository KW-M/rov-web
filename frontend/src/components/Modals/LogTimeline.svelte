<script lang="ts">
  import { onMount } from "svelte";
  import { log, logDebug, logError, logInfo, LogLevel, LogOrigin, logWarn, mainLogr } from "../../js/shared/logging";
  import { getModalStore, SlideToggle } from "@skeletonlabs/skeleton";
  import { Close as CloseIcon, Save_alt as DownloadIcon, Cloud_sync as RefreshIcon, Leak_add as IceRestartIcon, Delete_forever as ClearIcon } from "svelte-google-materialdesign-icons";
  import { fade } from "svelte/transition";
  import { frontendConnMngr } from "../../js/frontendConnManager";
  import { type RovAction } from "../../js/shared/protobufs/rov_actions";
  import { debugModeOn } from "../../js/globalContext";

  // export let parent;
  const modalStore = getModalStore();
  let logs = mainLogr.getLogs();

  const fetchRovLogs = async () => {
    const response = await frontendConnMngr.sendMessageToRov({
      body: {
        oneofKind: "sendRovLogs",
        sendRovLogs: {},
      },
    });
    logDebug("fetchRovLogs Response=", response);
  };

  const downloadLogs = () => {
    const logs = mainLogr.getLogs();
    const blob = new Blob(["[\n" + logs.map((log) => mainLogr.logToJson(log)).join(",\n") + "\n]"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rov-web-pilot-logs-${new Date().toString()}.json`;
    a.click();
  };

  const clearLogs = () => {
    mainLogr.clearLogs();
    logs = mainLogr.getLogs();
  };

  onMount(() => {
    mainLogr.subscribe(() => {
      logs = mainLogr.getLogs();
    });
  });
</script>

<div class="modal flex-col justify-stretch items-start h-fit w-full rounded-xl overflow-hidden" role="dialog" aria-modal="true" aria-label="Log Timeline">
  <div class="flex flex-col justify-center align-middle right-6 top-6 fixed">
    <button on:click={() => modalStore.close()} class="btn btn-icon-lg btn-icon variant-filled-primary shadow-xl">
      <CloseIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
    </button>
  </div>
  <nav class="flex app-bar p-4 w-full z-10 overflow-auto bg-surface-900/80 overflow-y-auto space-x-2 pr-20 items-center">
    <h3 class="h3 mr-[0.75em] text-nowrap">Logs</h3>
    <button on:click={() => fetchRovLogs()} class="btn variant-filled-success">
      <RefreshIcon class="text-2xl pointer-events-none mr-2" tabindex="-1" variation="round" />
      Sync ROV
    </button>
    <button on:click={() => downloadLogs()} class="btn variant-filled-tertiary">
      <DownloadIcon class="text-2xl pointer-events-none mr-2" tabindex="-1" variation="round" />
      Download Logs
    </button>
    <button on:click={() => clearLogs()} class="btn bg-red-700">
      <ClearIcon class="text-2xl pointer-events-none mr-2" tabindex="-1" variation="round" />
      Clear Logs
    </button>
    <!-- <div class="flex-1 self-stretch my-2 mx-6 border-r-2 border-white md:border-0"></div> -->
    <button
      class="btn variant-soft-secondary"
      on:click={() => {
        if (frontendConnMngr.simplePeerConnection?._p) frontendConnMngr.simplePeerConnection._p.restartIce();
      }}
    >
      <IceRestartIcon class="text-2xl pointer-events-none mr-2" tabindex="-1" variation="round" />
      Restart ICE
    </button>
    <SlideToggle name="Debug Mode" size="lg" bind:checked={$debugModeOn}>Debug Mode {$debugModeOn ? "ON" : "OFF"}</SlideToggle>
  </nav>
  <div class="bg-slate-800/70 w-full flex-1 box-border flex flex-col-reverse overflow-scroll pb-20">
    <!-- <div class=""> -->
    {#each logs as log, i (i)}
      {@const [header, body] = mainLogr.logToText(log)}
      <div
        class="px-2 mt-px bg-opacity-50 border-b-2 border-t-0 border-t-slate-400 border-b-white/20 -order-1"
        in:fade
        class:brightness-150={log.origin === LogOrigin.ROV}
        class:!font-mono={log.origin === LogOrigin.ROV}
        class:border-l-8={log.origin === LogOrigin.PILOT}
        class:!border-t-4={log.origin !== logs[Math.max(i - 1, 0)].origin}
        class:border-r-8={log.origin === LogOrigin.ROV}
        class:bg-sky-700={log.level === LogLevel.Info}
        class:bg-yellow-600={log.level === LogLevel.Warning}
        class:bg-red-700={log.level === LogLevel.Error}
        class:bg-green-700={log.level === LogLevel.Debug}
        class:bg-slate-800={log.level === LogLevel.Console}
        class:border-sky-600={log.level === LogLevel.Info}
        class:border-yellow-500={log.level === LogLevel.Warning}
        class:border-red-600={log.level === LogLevel.Error}
        class:border-green-600={log.level === LogLevel.Debug}
        class:border-purple-800={log.level === LogLevel.Console}
      >
        {#if body && body.length > 0}
          <details>
            <summary class="overflow-hidden text-ellipsis max-w-full" class:text-right={log.origin === LogOrigin.ROV}>
              <small>{log.timestamp}</small>
              <span>{header}</span>
            </summary>

            <pre class="overflow-auto max-h-96 max-w-full">{body}</pre>
          </details>
        {:else}
          <summary class="overflow-hidden text-ellipsis max-w-full pl-3" class:text-right={log.origin === LogOrigin.ROV}>
            <small>{log.timestamp}</small>
            <span>{header}</span>
          </summary>
        {/if}
      </div>
    {/each}
    <!-- </div> -->
  </div>
</div>
