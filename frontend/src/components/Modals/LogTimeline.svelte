<script lang="ts">
  import { onMount } from "svelte";
  import { log, logDebug, logError, logInfo, LogLevel, LogOrigin, logWarn, mainLogr } from "../../js/shared/logging";
  import { getModalStore } from "@skeletonlabs/skeleton";
  import { Close as CloseIcon, Save_alt as DownloadIcon, Restore as RefreshIcon } from "svelte-google-materialdesign-icons";
  import { fade } from "svelte/transition";
  import { frontendConnMngr } from "../../js/frontendConnManager";
  import { type RovAction } from "../../js/shared/protobufs/rov_actions";

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

  onMount(() => {
    mainLogr.subscribe(() => {
      logs = mainLogr.getLogs();
    });
  });
</script>

<div class="bg-slate-800/50 w-full box-border rounded-xl h-full flex-col-reverse overflow-scroll py-20">
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
  <div class="flex flex-col justify-center align-middle right-2 top-2 fixed">
    <button on:click={() => modalStore.close()} class="btn btn-icon-lg btn-icon variant-filled-primary shadow-xl">
      <CloseIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
    </button>

    <button on:click={() => fetchRovLogs()} class="btn btn-icon-md btn-icon variant-filled-secondary shadow-xl mx-auto mt-2">
      <RefreshIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
    </button>
    <button on:click={() => downloadLogs()} class="btn btn-icon-md btn-icon variant-filled-tertiary shadow-xl mx-auto mt-2">
      <DownloadIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
    </button>
  </div>
</div>

<style>
</style>
