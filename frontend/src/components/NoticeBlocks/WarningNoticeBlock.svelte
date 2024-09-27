<script lang="ts">
  import { Warning } from "svelte-google-materialdesign-icons";
  export let heading: string = "Warning";
</script>

<blockquote class="rounded-xl border-warning-400-500-token font-normal bg-warning-600/30 border-l-8 py-2 px-3 w-full max-w-lg mx-auto flex flex-row items-center text-left space-x-4">
  <Warning class="max-w-11 max-h-11 h-full w-full text-warning-400-500-token pointer-events-none select-none" tabindex="-1" variation="round" />
  <p>
    <b class="block text-white">{heading}</b>
    <slot></slot>
  </p>
</blockquote>
