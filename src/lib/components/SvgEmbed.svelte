<script>
  import { onMount } from "svelte";

  export let svgText = "";
  let svgElement;
  let svgProps = $$props;
  onMount(() => {
    svgElement.innerHTML = svgText; // inefficient but works.
    svgElement.innerHTML = svgElement.children[0].innerHTML; // remove the inner svg tag
  });
  $: delete svgProps["svgText"]; // remove htmlText prop form svgProps
</script>

<svg {...svgProps} bind:this={svgElement} />
