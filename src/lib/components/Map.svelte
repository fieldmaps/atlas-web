<script lang="ts">
  import { PUBLIC_DATA } from '$env/static/public';
  import { map } from '$lib/stores/atlas';
  import { onInteraction } from '$lib/utils/admin';
  import MapLibreGL from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import { onMount } from 'svelte';

  const { Map, NavigationControl, setRTLTextPlugin } = MapLibreGL;
  let mapContainer: HTMLDivElement;

  onMount(() => {
    setRTLTextPlugin('/scripts/maplibre-gl-rtl-text.min.js', true);
    $map = new Map({
      center: [17.66809, 6.89908],
      container: mapContainer,
      hash: true,
      minZoom: 3,
      style: `${PUBLIC_DATA}/styles/light/style.json`,
    });
    $map.addControl(new NavigationControl(), 'top-right');
    $map.once('styledata', () => onInteraction());
  });
</script>

<div class="map" id="map" bind:this={mapContainer} />

<style>
  .map {
    width: 100%;
    flex-grow: 1;
  }
</style>
