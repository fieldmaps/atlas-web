import type {
  SourceSpecification,
  LayerSpecification,
  PointLike,
} from 'maplibre-gl';
import { PUBLIC_TILES } from '$env/static/public';
import { get } from 'svelte/store';
import { map as mapStore, lvl as lvlStore, adm } from '../store';

let hoveredStateId: string | number | undefined;

const getlvl = () => {
  const map = get(mapStore);
  const zoom = map.getZoom();
  if (zoom < 4) return 0;
  if (zoom < 5) return 1;
  if (zoom < 6) return 2;
  if (zoom < 7) return 3;
  return 4;
};

export const onInteraction = () => {
  const map = get(mapStore);
  addOverlay();
  map.on('mousemove', 'admx', onMouseMove);
  map.on('mouseleave', 'admx', onMouseLeave);
  map.on('zoom', onZoom);
};

export const offInteraction = () => {
  const map = get(mapStore);
  map.off('mousemove', 'admx', onMouseMove);
  map.off('mouseleave', 'admx', onMouseLeave);
  map.on('zoom', onZoom);
};

const onMouseMove = (e) => {
  const map = get(mapStore);
  if (e.features.length > 0) {
    if (hoveredStateId) {
      map.setFeatureState(
        { source: 'admx', sourceLayer: 'admx', id: hoveredStateId },
        { hover: false }
      );
      adm.set({});
    }
    hoveredStateId = e.features[0].id;
    map.setFeatureState(
      { source: 'admx', sourceLayer: 'admx', id: hoveredStateId },
      { hover: true }
    );
    adm.set(e.features[0].properties);
  }
};

const onMouseLeave = () => {
  const map = get(mapStore);
  if (hoveredStateId) {
    map.setFeatureState(
      { source: 'admx', sourceLayer: 'admx', id: hoveredStateId },
      { hover: false }
    );
    adm.set({});
  }
  hoveredStateId = undefined;
};

const onZoom = ({ originalEvent }) => {
  const map = get(mapStore);
  const lvl = get(lvlStore);
  const zoom = map.getZoom();
  if (lvl !== 0 && zoom < 4) addOverlay();
  else if (lvl !== 1 && zoom >= 4 && zoom < 5) addOverlay();
  else if (lvl !== 2 && zoom >= 5 && zoom < 6) addOverlay();
  else if (lvl !== 3 && zoom >= 6 && zoom < 7) addOverlay();
  else if (lvl !== 4 && zoom >= 7) addOverlay();
  const point: PointLike = [originalEvent.layerX, originalEvent.layerY];
  const features = map.queryRenderedFeatures(point, { layers: ['admx'] });
  if (features.length > 0) onMouseMove({ features });
};

const removeOverlay = () => {
  const map = get(mapStore);
  map.getLayer('admx') && map.removeLayer('admx');
  map.getSource('admx') && map.removeSource('admx');
};

const addOverlay = () => {
  const map = get(mapStore);
  const lvl = getlvl();
  lvlStore.set(getlvl());
  const layerSource: SourceSpecification = {
    type: 'vector',
    promoteId: `adm${lvl}_id`,
    url: `${PUBLIC_TILES}/data/adm${lvl}.json`,
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
  map.addSource('admx', layerSource);
  map.addLayer(layerFill);
};
