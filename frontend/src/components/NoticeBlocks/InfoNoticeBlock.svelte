<script lang="ts">
  import { Info } from "svelte-google-materialdesign-icons";
  export let heading: string = "Info";
</script>

<blockquote class="rounded-xl border-blue-500 font-normal bg-blue-600/30 border-l-8 py-2 px-3 w-full max-w-lg mx-auto flex flex-row items-center text-left space-x-4">
  <Info class="max-w-11 max-h-11 h-full w-full text-blue-500 pointer-events-none select-none" tabindex="-1" variation="round" />
  <p class="w-max flex-1">
    <b class="block text-white">{heading}</b>
    <slot></slot>
  </p>
</blockquote>
