<script lang="ts">
  import Map from '$lib/components/Map.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';

  const url = 'https://atlas.fieldmaps.io/';
  const img = 'https://atlas.fieldmaps.io/img/atlas-preview.png';
  const title = 'FieldMaps — Atlas';
  const description = 'Reference maps for humanitarian use.';
</script>

<svelte:head>
  <link rel="manifest" href="/manifest.json" />
  <title>Atlas | Fieldmaps.io</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={img} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={url} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={img} />
</svelte:head>

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
