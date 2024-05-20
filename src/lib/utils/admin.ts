import { PUBLIC_TILES } from '$env/static/public';
import { adm, lvl, map } from '$lib/stores/atlas';
import type { LayerSpecification, PointLike, SourceSpecification } from 'maplibre-gl';
import { get } from 'svelte/store';

let hoveredStateId: string | number | undefined;

function getlvl() {
  const $map = get(map);
  const zoom = $map.getZoom();
  if (zoom < 4) return 0;
  if (zoom < 5) return 1;
  if (zoom < 6) return 2;
  if (zoom < 7) return 3;
  return 4;
}

export function onInteraction() {
  const $map = get(map);
  addOverlay();
  $map.on('mousemove', 'admx', onMouseMove);
  $map.on('mouseleave', 'admx', onMouseLeave);
  $map.on('zoom', onZoom);
}

export function offInteraction() {
  const $map = get(map);
  $map.off('mousemove', 'admx', onMouseMove);
  $map.off('mouseleave', 'admx', onMouseLeave);
  $map.on('zoom', onZoom);
}

function onMouseMove(e) {
  const $map = get(map);
  if (e.features.length > 0) {
    $map.getCanvas().style.cursor = 'pointer';
    if (hoveredStateId) {
      $map.setFeatureState(
        { source: 'admx', sourceLayer: 'admx', id: hoveredStateId },
        { hover: false },
      );
      adm.set({});
    }
    hoveredStateId = e.features[0].id;
    $map.setFeatureState(
      { source: 'admx', sourceLayer: 'admx', id: hoveredStateId },
      { hover: true },
    );
    adm.set(e.features[0].properties);
  }
}

function onMouseLeave() {
  const $map = get(map);
  if (hoveredStateId) {
    $map.getCanvas().style.cursor = '';
    $map.setFeatureState(
      { source: 'admx', sourceLayer: 'admx', id: hoveredStateId },
      { hover: false },
    );
    adm.set({});
  }
  hoveredStateId = undefined;
}

function onZoom({ originalEvent }) {
  const $map = get(map);
  const $lvl = get(lvl);
  const zoom = $map.getZoom();
  if ($lvl !== 0 && zoom < 4) addOverlay();
  else if ($lvl !== 1 && zoom >= 4 && zoom < 5) addOverlay();
  else if ($lvl !== 2 && zoom >= 5 && zoom < 6) addOverlay();
  else if ($lvl !== 3 && zoom >= 6 && zoom < 7) addOverlay();
  else if ($lvl !== 4 && zoom >= 7) addOverlay();
  const point: PointLike = [originalEvent.layerX, originalEvent.layerY];
  const features = $map.queryRenderedFeatures(point, { layers: ['admx'] });
  if (features.length > 0) onMouseMove({ features });
}

function removeOverlay() {
  const $map = get(map);
  $map.getLayer('admx') && $map.removeLayer('admx');
  $map.getSource('admx') && $map.removeSource('admx');
}

function addOverlay() {
  lvl.set(getlvl());
  const $map = get(map);
  const $lvl = get(lvl);
  const layerSource: SourceSpecification = {
    type: 'vector',
    promoteId: `adm${$lvl}_id`,
    url: `${PUBLIC_TILES}/adm${$lvl}.json`,
  };
  const layerFill: LayerSpecification = {
    id: 'admx',
    type: 'fill',
    source: 'admx',
    'source-layer': 'admx',
    paint: {
      'fill-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        'hsla(0, 0%, 0%, 0.1)',
        'hsla(0, 0%, 0%, 0)',
      ],
    },
  };
  removeOverlay();
  $map.addSource('admx', layerSource);
  $map.addLayer(layerFill);
}
