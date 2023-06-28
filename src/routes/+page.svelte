<script lang="ts">
  import Map from '$lib/Map.svelte';
  import Sidebar from '$lib/Sidebar.svelte';
</script>

<main>
  <Sidebar />
  <Map />
</main>

<style>
  @media only screen and (max-width: 768px) {
    main {
      flex-direction: column-reverse;
    }
  }

  main {
    height: 100%;
    display: flex;
  }
</style>
