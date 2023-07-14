<script context="module" lang="ts">
  import { SvelteToast, toast } from "@zerodevx/svelte-toast";

  // -----  Toast Notifications -----
  let toastDeduplicationCache = {};
  export const showToastMessage = (msg: string, duration: number = 2000, callback: () => void = null) => {
    let existingToast = toastDeduplicationCache[msg];
    if (existingToast) return;
    let toastId = toast.push({ msg, duration });
    toastDeduplicationCache[msg] = toastId;
    toast.subscribe((toastArray) => {
      if (!toastArray.find((toast) => toast.msg === msg)) {
        delete toastDeduplicationCache[msg];
        callback && callback();
      }
    });
    return toastId;
  };
</script>

<SvelteToast options={{ reversed: true, intro: { y: 192 }, pausable: true, classes: ["toast-msg"] }} />

<style>
  :global(.toast-msg > div) {
    border-radius: 6px;
  }
</style>
