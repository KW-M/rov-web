<script>
    import {
      Listbox,
      ListboxButton,
      ListboxOptions,
      ListboxOption,
      Transition
    } from "@rgossiaux/svelte-headlessui";
    import { CheckIcon } from "@rgossiaux/svelte-heroicons/solid";
    import { ChevronRightIcon } from "@rgossiaux/svelte-heroicons/solid";


    const MAX_ROVS = 5;
    const rovNames = [];
    for (let i = 0; i < MAX_ROVS; i++) {
        rovNames.push({number:i+1,name:"rov-" + (i+1)})
    }

    export let selectedRov = rovNames[0];
    export let rovConnected = false;
  </script>
<!--
<select bind:value={selectedRov} class="select select-bordered select-lg w-full max-w-xs">
	{#each rovNames as rovName}
		<option value={rovName}>
			{rovName.name}
		</option>
	{/each}
</select> -->

 <Listbox value={selectedRov} on:change={(e) => (selectedRov = e.detail)} class={"dropdown w-52 m-2 align-top"}>
    <ListboxButton class="btn btn-primary btn-lg btn-block self-end">{selectedRov.name}
      <div class="flex-1 h-1" ></div>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
    </svg>
    </ListboxButton>
    <ListboxOptions class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full">
      {#each rovNames as rovName (rovName.number)}
        <!-- Use the `active` state to conditionally style the active (focused) option -->
        <!-- Use the `selected` state to conditionally style the selected option -->

        <ListboxOption
          value={rovName}
          disabled={false}
          let:selected
        >
        <a class:bg-primary={selected}>
          {rovName.name}
          <div class="flex-1 h-1 " ></div>
          <!-- {#if !selected} -->
            <ChevronRightIcon class="w-6 h-6"  />
          <!-- {/if} -->
          </a>
        </ListboxOption>
      {/each}
    </ListboxOptions>
  </Listbox>
{#if !rovConnected}
  <button class="btn btn-square btn-primary btn-lg mt-2 align-top"><ChevronRightIcon class="w-6 h-6" on:click={()=>{rovConnected = true}} /></button>
{/if}
