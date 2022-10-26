<script lang="ts">
  import { onMount } from 'svelte';
  import { Map, NavigationControl } from 'maplibre-gl';
  import { PUBLIC_TILES } from '$env/static/public';
  import { onInteraction } from '../utils/admin';
  import { map } from '../store';
  import 'maplibre-gl/dist/maplibre-gl.css';

  let mapContainer: HTMLDivElement;

  onMount(() => {
    $map = new Map({
      container: mapContainer,
      style: `${PUBLIC_TILES}/styles/light/style.json`,
      center: [17.66809, 6.89908],
      minZoom: 3,
      hash: true,
    });
    $map.addControl(new NavigationControl({}), 'top-right');
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
