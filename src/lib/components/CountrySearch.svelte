<script lang="ts">
  import { page } from '$app/stores';
  import { PUBLIC_DATA } from '$env/static/public';
  import { map, search, settlements } from '$lib/stores/country';
  import { csvParse } from 'd3-dsv';
  import { onMount } from 'svelte';

  function onClick(settlement: string) {
    $map.flyTo({ center: [settlement.x, settlement.y], zoom: 12 });
  }

  onMount(async () => {
    const response = await fetch(`${PUBLIC_DATA}/atlas-v1/search/${$page.params.slug}/default.csv`);
    const text = await response.text();
    $settlements = csvParse(text);
  });
</script>

<section>
  <input bind:value={$search} class="input" type="text" placeholder="&#x1f50d;" />
  {#if $search.length >= 3}
    <div class="list">
      {#each $settlements.filter((item) => item.name
          .toLowerCase()
          .includes($search.toLowerCase())) as settlement}
        <button
          class="button is-white is-fullwidth justify-content-start"
          type="button"
          on:mousedown={() => onClick(settlement)}
        >
          {settlement.name}
        </button>
      {/each}
    </div>
  {/if}
</section>

<style>
  section {
    position: absolute;
    padding: 1rem;
  }
  button {
    background-color: #fff;
    border-color: transparent;
    cursor: pointer;
    display: flex;
    padding: 0.5rem;
    width: 100%;
  }
  button:hover {
    background-color: #eee;
  }
  input:not(:focus-within) + .list {
    display: none;
  }
  .list {
    max-height: 80vh;
    overflow: auto;
  }
</style>
