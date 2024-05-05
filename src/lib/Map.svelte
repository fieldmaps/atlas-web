<script lang="ts">
  import { PUBLIC_TILES } from '$env/static/public';
  import MapLibreGL from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import { onMount } from 'svelte';
  import { map } from '../store';
  import { onInteraction } from '../utils/admin';

  const { Map, NavigationControl } = MapLibreGL;
  let mapContainer: HTMLDivElement;

  onMount(() => {
    $map = new Map({
      center: [17.66809, 6.89908],
      container: mapContainer,
      hash: true,
      minZoom: 3,
      style: `${PUBLIC_TILES}/styles/light/style.json`,
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
