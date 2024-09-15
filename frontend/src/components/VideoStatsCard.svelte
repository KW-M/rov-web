<script lang="ts">
  import { AccordionItem } from "@skeletonlabs/skeleton";
  import { displayNum, displayHumanBits } from "../js/util";
  import { type ComputedRtpStats } from "../js/shared/videoStatsParser";
  export let stats: ComputedRtpStats;
  export let name: string;
  export let direction: "reciever" | "sender" = "reciever";
  $: senderBaseStats = stats.senderLayerStats ? stats.senderLayerStats[0] : {};
  $: recieverBaseStats = stats.recieverStats ?? {};
  $: baseStats = direction === "reciever" ? recieverBaseStats : senderBaseStats;
</script>

<AccordionItem class="card  variant-filled" regionPanel="space-y-3">
  <svelte:fragment slot="summary">
    <b class="flex-1">{name}</b>
    {#if direction === "reciever"}
      <span class="font-normal">{displayNum(baseStats.frameHeight)}p | {displayNum(baseStats.framesPerSecond)}fps | {baseStats.videoCodec || "?"} | {recieverBaseStats.hung ? "hung" : "live"} </span>
    {:else}
      <span class="font-normal">{displayNum(baseStats.frameHeight)}p | {displayNum(baseStats.framesPerSecond)}fps | {baseStats.videoCodec || "?"} </span>
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="flex justify-between text-right">
      <b>Resolution</b>
      <span>{displayNum(baseStats.frameWidth)}x{displayNum(baseStats.frameHeight)} at {displayNum(baseStats.framesPerSecond)}fps</span>
    </div>
    <hr />
    <div class="flex justify-between text-right">
      <b>Codec</b>
      <span>{baseStats.videoCodec || "?"} ({baseStats.videoSdpFmtpLine || "?"})</span>
    </div>
    <hr />
    {#if direction === "reciever"}
      <div class="flex justify-between text-right">
        <b>Latency</b>
        <span>{displayNum(recieverBaseStats.currentRoundTripTime * 1000)}ms | playoutDelay {displayNum(recieverBaseStats.estimatedPlayoutDelay)}ms</span>
      </div>
      <hr />

      <div class="flex justify-between text-right">
        <b>Freezes</b>
        <span>{displayNum(recieverBaseStats.freezeCount)} Freezes | {displayNum(recieverBaseStats.nackCount)} NACKs | {displayNum(recieverBaseStats.pliCount)} PLIs</span>
      </div>
      <hr />
    {/if}
    <div class="flex justify-between text-right">
      <b>Bitrate In</b>
      <span>{displayHumanBits(stats.bitrateReceive)}ps | {displayHumanBits(stats.availableIncomingBitrate)}ps avail</span>
    </div>
    <hr />
    <div class="flex justify-between text-right">
      <b>Bitrate Out</b>
      <span>{displayHumanBits(stats.bitrateSend)}ps | {displayHumanBits(stats.availableOutgoingBitrate)}ps avail</span>
    </div>
    <hr />

    <details>
      <summary>All Stats</summary>
      <div class="text-sm">
        {#each Object.entries(stats) as [key, value]}
          {#if key !== "allStats" && key !== "recieverStats" && key !== "senderLayerStats"}
            <b>{key}: </b><span>{value}</span><br />
          {/if}
        {/each}
      </div>
      <div class="text-sm mt-4">
        <em>Reciever Stats</em><br />
        {#each Object.entries(stats.recieverStats) as [key, value]}
          {#if key !== "allStats" && key !== "recieverStats" && key !== "senderLayerStats"}
            <b>{key}: </b><span>{value}</span><br />
          {/if}
        {/each}
      </div>
      {#each stats.senderLayerStats as senderStats}
        <div class="text-sm mt-4">
          {#each Object.entries(senderStats) as [key, value]}
            {#if key !== "allStats" && key !== "recieverStats" && key !== "senderLayerStats"}
              <b>{key}: </b><span>{value}</span><br />
            {/if}
          {/each}
        </div>
      {/each}

      <div class="max-h-full max-w-full overflow-x-scroll overflow-y-scroll mt-4">
        {#each stats.allStats as stat}
          <pre class="block p-2">{JSON.stringify(stat, null, 2)}</pre>
        {/each}
      </div>
    </details>
  </svelte:fragment>
</AccordionItem>
