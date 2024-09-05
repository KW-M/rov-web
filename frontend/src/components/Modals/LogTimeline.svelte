<script lang="ts">
  import { onMount } from "svelte";
  import { log, logDebug, logError, logInfo, LogLevelConsole, logWarn, mainLogr } from "../../js/shared/logging";
  import { getModalStore } from "@skeletonlabs/skeleton";
  import { Close as CloseIcon, Save_alt as DownloadIcon, Download as ScrollToBottomIcon, Refresh as RefreshIcon } from "svelte-google-materialdesign-icons";
  import { fade } from "svelte/transition";
  import { title } from "process";
  import type { LogEntry } from "../../js/shared/logging";

  export let parent;
  const modalStore = getModalStore();
  let logs = mainLogr.getLogs();

  onMount(() => {
    console.log("Log Timeline Open");
    mainLogr.subscribe(() => {
      logs = mainLogr.getLogs();
    });
    // setInterval(() => {
    //   logInfo("Log Timeline Open", logs.length);
    // }, 2600);
    // setInterval(() => {
    //   logWarn("Log Timeline Open", logs.length);
    // }, 3030);
    // setInterval(() => {
    //   logError("Log Timeline Open", logs.length);
    // }, 5002);
    // setInterval(() => {
    //   logDebug("Log Timeline Open", logs.length);
    // }, 900);
  });

  const getLogText = (log: LogEntry) => {
    let header = "";
    let body = "";
    let i = 0;

    for (; i < log.args.length; i++) {
      const arg = log.args[i];
      if (arg instanceof Error) {
        header += arg.name + " " + arg.message + " " + arg.cause;
        body += arg.stack;
      } else if (arg instanceof Object) {
        body += "\n" + JSON.stringify(arg, null, 2) + "\n";
        break;
      } else {
        header += " " + arg ? arg.toString() : "";
      }
    }
    for (; i < log.args.length; i++) {
      const arg = log.args[i];
      if (arg instanceof Error) {
        body += arg.name + " " + arg.message + " " + arg.cause + "\n" + arg.stack;
      } else if (arg instanceof Object) {
        body += "\n" + JSON.stringify(arg, null, 2) + "\n";
      } else {
        body += " " + arg ? arg.toString() : "";
      }
    }
    if (log.trace && log.trace.length > 0) {
      body += "\n" + log.trace.join("\n");
    }
    return [header, body];
  };
</script>

<div class="bg-slate-800/50 w-full box-border rounded-xl h-full flex-col-reverse overflow-scroll">
  <!-- <div class=""> -->
  {#each logs as log, i (i)}
    {@const [header, body] = getLogText(log)}
    <div class="px-2 mt-px bg-opacity-50 border-l-8 border-b-2 border-b-white/20 -order-1" in:fade class:bg-sky-700={log.level === LogLevelConsole.Info} class:bg-yellow-600={log.level === LogLevelConsole.Warn} class:bg-red-700={log.level === LogLevelConsole.Error} class:bg-green-700={log.level === LogLevelConsole.Debug} class:bg-slate-800={log.level === LogLevelConsole.Console} class:border-l-sky-600={log.level === LogLevelConsole.Info} class:border-l-yellow-500={log.level === LogLevelConsole.Warn} class:border-l-red-600={log.level === LogLevelConsole.Error} class:border-l-green-600={log.level === LogLevelConsole.Debug} class:border-l-purple-800={log.level === LogLevelConsole.Console}>
      {#if body && body.length > 0}
        <details>
          <summary class="overflow-hidden text-ellipsis max-w-full">
            <small>{log.timestamp}</small>
            <span>{header}</span>
          </summary>

          <pre class="overflow-auto max-h-96 max-w-full">{body}</pre>
        </details>
      {:else}
        <summary class="overflow-hidden text-ellipsis max-w-full pl-3">
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

    <button on:click={() => modalStore.close()} class="btn btn-icon-md btn-icon variant-filled-secondary shadow-xl mx-auto mt-2">
      <DownloadIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
    </button>
    <button on:click={() => modalStore.close()} class="btn btn-icon-md btn-icon variant-filled-tertiary shadow-xl mx-auto mt-2">
      <RefreshIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
    </button>
  </div>
  <!-- <button on:click={() => modalStore.close()} class="right-2 bottom-2 fixed btn btn-icon-md btn-icon variant-filled-secondary shadow-xl mx-auto mt-2">
    <ScrollToBottomIcon class="text-2xl pointer-events-none" tabindex="-1" variation="round" />
  </button> -->
</div>

<style>
</style>
