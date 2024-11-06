<script lang="ts">
  import { PUBLIC_DATA } from '$env/static/public';
  import { map } from '$lib/stores/atlas';
  import { onInteraction } from '$lib/utils/admin';
  import MapLibreGL from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import { onMount } from 'svelte';

  const { Map, NavigationControl, setRTLTextPlugin, GlobeControl } = MapLibreGL;
  let mapContainer: HTMLDivElement = $state();

  onMount(() => {
    setRTLTextPlugin('/scripts/maplibre-gl-rtl-text.min.js', true);
    $map = new Map({
      bounds: [-17.5316266, -34.8335451, 51.4150688, 37.3473421],
      container: mapContainer,
      hash: true,
      minZoom: 3,
      style: `${PUBLIC_DATA}/styles/light/style.json`,
    });
    $map.addControl(new NavigationControl());
    $map.addControl(new GlobeControl());
    $map.once('styledata', () => onInteraction());
  });
</script>

<div class="map" id="map" bind:this={mapContainer}></div>

<style>
  .map {
    width: 100%;
    flex-grow: 1;
  }
</style>
