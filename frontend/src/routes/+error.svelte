<script>
  import { base } from "$app/paths";
  import { page } from "$app/stores";
</script>

<main class="space-y-8 h-full w-full text-center items-center flex flex-col justify-center">
  <h3 class="h3">{$page.error.message}!</h3>
  <p>ERrr. RoBOt nO WorKe...</p>
  <a href={base} class="btn btn-lg variant-filled">Go Home</a>
</main>
