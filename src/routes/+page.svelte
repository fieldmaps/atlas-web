<script lang="ts">
  import Sidebar from '$lib/Sidebar.svelte';
  import Map from '$lib/Map.svelte';
</script>

<main>
  <Sidebar />
  <Map />
</main>

<style>
  main {
    height: 100%;
    display: flex;
    flex-direction: row;
  }
</style>
