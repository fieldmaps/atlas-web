<script lang="ts">
  import { page } from '$app/stores';
  import { PUBLIC_DATA } from '$env/static/public';
  import { map } from '$lib/stores/country';
  import { init } from '$lib/utils/country';
  import MapLibreGL from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import { onMount } from 'svelte';

  const { Map, NavigationControl, GeolocateControl, setRTLTextPlugin } = MapLibreGL;
  let mapContainer: HTMLDivElement;

  onMount(async () => {
    setRTLTextPlugin('/scripts/maplibre-gl-rtl-text.min.js', true);
    const response = await fetch(`${PUBLIC_DATA}/atlas-v1/bounds.json`);
    const config = await response.json();
    $map = new Map({
      bounds: config[$page.params.slug],
      container: mapContainer,
      doubleClickZoom: false,
      dragRotate: false,
      hash: true,
      pitchWithRotate: false,
      style: `${PUBLIC_DATA}/atlas-v1/styles/v1/${$page.params.slug}/default.json`,
    });
    $map.addControl(new NavigationControl(), 'top-right');
    $map.addControl(
      new GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
    );
    $map.once('styledata', init);
  });
</script>

<div class="map" id="map" bind:this={mapContainer} />

<style>
  .map {
    width: 100%;
    flex-grow: 1;
  }
</style>
