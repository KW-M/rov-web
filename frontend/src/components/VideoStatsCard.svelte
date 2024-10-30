<script lang="ts">
  import { AccordionItem } from "@skeletonlabs/skeleton";
  import { displayNum, displayHumanBits } from "../js/util";
  import { type ComputedRtpStats } from "../js/shared/videoStatsParser";
  import { type Writable } from "svelte/store";
  import { addTooltip } from "./HelpTooltips.svelte";
  export let stats: ComputedRtpStats;
  export let name = "Video Stats";
  export let direction: "reciever" | "sender" = "reciever";
  export let activeStore: Writable<string>;
  export let activeId: string;
  $: senderBaseStats = stats.senderLayerStats && stats.senderLayerStats.length ? stats.senderLayerStats[0] : null;
  $: recieverBaseStats = stats.recieverStats ?? null;
  $: baseStats = direction === "reciever" ? recieverBaseStats : senderBaseStats;
</script>

{#if stats && baseStats}
  <AccordionItem autocollapse class={"card variant-filled " + $$props.class} regionPanel="space-y-3" active={activeStore} id={activeId}>
    <svelte:fragment slot="summary">
      <b class="flex-1">{name}</b>
      {#if direction === "reciever"}
        <span class="font-normal">{displayNum(baseStats.frameHeight)}p | {displayNum(baseStats.framesPerSecond)}fps | {baseStats.videoCodec || "?"} | {recieverBaseStats.hung ? "hung" : "live"} </span>
      {:else}
        <span class="font-normal">{displayNum(baseStats.frameHeight)}p | {displayNum(baseStats.framesPerSecond)}fps | {baseStats.videoCodec || "?"} </span>
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="content">
      {#if direction === "reciever"}
        <div class="flex justify-between">
          <b>Resolution</b>
          <span class="text-right">{displayNum(baseStats.frameWidth)}x{displayNum(baseStats.frameHeight)} at {displayNum(baseStats.framesPerSecond)}fps</span>
        </div>
        <hr />
        <div class="flex justify-between">
          <b>Codec</b>
          <span class="text-right" use:addTooltip={{ label: baseStats.videoSdpFmtpLine || "?" }}>{baseStats.videoCodec || "?"}</span>
        </div>
        <hr />
        <div class="flex justify-between">
          <b>Latency</b>
          <span class="text-right">{displayNum(recieverBaseStats.currentRoundTripTime * 1000)}ms | Playout Delay {Math.floor(recieverBaseStats.estimatedPlayoutDelay)}ms</span>
        </div>
        <hr />

        <div class="flex justify-between">
          <b>Freezes</b>
          <span class="text-right">{displayNum(recieverBaseStats.freezeCount)} Freezes | {displayNum(recieverBaseStats.nackCount)} NACKs | {displayNum(recieverBaseStats.pliCount)} PLIs</span>
        </div>
        <hr />
      {:else if direction === "sender"}
        <div class="flex justify-between">
          <b>Resolutions</b>
          <div>
            {#each stats.senderLayerStats as senderStats}
              <span class="text-right">{displayNum(senderStats.frameWidth)}x{displayNum(senderStats.frameHeight)} at {displayNum(senderStats.framesPerSecond)}fps</span><br />
            {/each}
          </div>
        </div>
        <hr />
        <div class="flex justify-between">
          <b>Codecs</b>
          <div>
            {#each stats.senderLayerStats as senderStats}
              <span class="text-right" use:addTooltip={{ label: senderStats.videoSdpFmtpLine || "?" }}>{senderStats.videoCodec || "?"} {senderStats.scalabilityMode || ""} {senderStats.encoderImplementation} {senderStats.powerEfficientEncoder ? "(low-power)" : ""}</span><br />
            {/each}
          </div>
        </div>
        <hr />
        <div class="flex justify-between">
          <b>Limited by</b>
          <div>
            {#each stats.senderLayerStats as senderStats}
              <span class="text-right">{senderStats.qualityLimitationReason} | Net {displayNum(senderStats.bandwidthLimitedQualityDurration)}s | CPU {displayNum(senderStats.cpuLimitedQualityDurration)}s{senderStats.otherLimitedQualityDurration ? " | Other " + displayNum(senderStats.otherLimitedQualityDurration) + "s" : ""}</span><br />
            {/each}
          </div>
        </div>
        <hr />

        <div class="flex justify-between">
          <b>Net</b>
          <div>
            {#each stats.senderLayerStats as senderStats}
              <span class="text-right"> Re-sent {displayHumanBits(senderStats.retransmittedBytesSent * 8)} | Delay {Math.floor(senderStats.totalPacketSendDelay)}ms</span><br />
            {/each}
          </div>
        </div>
        <hr />
      {/if}
      <div class="flex justify-between">
        <b>Bitrate ←</b>
        <span class="text-right">{displayHumanBits(stats.bitrateReceive)}ps of {displayHumanBits(stats.availableIncomingBitrate)}ps avail</span>
      </div>
      <hr />
      <div class="flex justify-between">
        <b>Bitrate →</b>
        <span class="text-right">{displayHumanBits(stats.bitrateSend)}ps of {displayHumanBits(stats.availableOutgoingBitrate)}ps avail</span>
      </div>
      <hr />

      <details>
        <summary>All Stats</summary>
        <div class="text-sm">
          {#each Object.entries(stats) as [key, value]}
            {#if key !== "allStats" && key !== "recieverStats" && key !== "senderLayerStats" && key !== "rtcStatsJson"}
              <b>{key}: </b><span>{value}</span><br />
            {/if}
          {/each}
        </div>
        <div class="text-sm mt-4">
          <em>Reciever Stats</em><br />
          {#each Object.entries(stats.recieverStats) as [key, value]}
            <b>{key}: </b><span>{value}</span><br />
          {/each}
        </div>
        {#if stats.senderLayerStats && stats.senderLayerStats.length}
          {#each stats.senderLayerStats as senderStats, i}
            <div class="text-sm mt-4">
              <em>Sender Stats - Layer {i}</em><br />
              {#each Object.entries(senderStats) as [key, value]}
                <b>{key}: </b><span>{value}</span><br />
              {/each}
            </div>
          {/each}
        {/if}
        {#if stats.allStats && stats.allStats.length}
          <div class="max-h-full max-w-full overflow-x-scroll overflow-y-scroll mt-4">
            {#each stats.allStats as stat}
              <pre class="block p-2">{JSON.stringify(stat, null, 2)}</pre>
            {/each}
          </div>
        {/if}
      </details>
    </svelte:fragment>
  </AccordionItem>
{/if}
