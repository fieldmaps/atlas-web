import { map } from '$lib/stores/country';
import MapLibreGL from 'maplibre-gl';
import { get } from 'svelte/store';

const { Popup } = MapLibreGL;

const layers = [
  'settlements-1',
  'settlements-2',
  'settlements-3',
  'settlements-4',
  'settlements-5',
  'settlements-6',
  'education-facilities-1',
  'education-facilities-2',
  'health-facilities-1',
  'health-facilities-2',
  'financial-services-1',
  'financial-services-2',
  'airports-1',
  'airports-2',
  'heliports-1',
  'heliports-2',
  'sea-ports-1',
  'sea-ports-2',
];

export function init() {
  const $map = get(map);
  $map.on('click', ({ point }) => onClick(point));
  $map.on('dblclick', ({ point }) => onDoubleClick(point));
  layers.forEach((layer) => addPointer(layer));
}

function addPointer(layer: string) {
  const $map = get(map);
  function setPointer() {
    $map.getCanvas().style.cursor = 'pointer';
  }
  function unsetPointer() {
    $map.getCanvas().style.cursor = '';
  }
  $map.on('mouseenter', layer, () => setPointer());
  $map.on('mouseleave', layer, () => unsetPointer());
}

function onDoubleClick(point) {
  const $map = get(map);
  const { lat, lng } = $map.unproject(point);
  const popupText = [
    '<div><b>Latitude, Longitude</b></div>',
    `<div>${lat.toFixed(4)}, ${lng.toFixed(4)}</div>`,
  ].join('');
  new Popup({ closeButton: false }).setLngLat({ lat, lng }).setHTML(popupText).addTo($map);
}

function getType(type: any) {
  if (typeof type === 'number') {
    switch (type) {
      case 1:
        return 'National Capital';
      case 2:
        return 'Admin1 Capital';
      case 3:
        return 'Admin2 Capital';
      case 4:
        return 'Primary town';
      case 5:
        return 'Secondary town';
      case 6:
        return 'Village';
      case 7:
        return 'IDP Camp';
      case 8:
        return 'Town area';
      default:
        return '<em>Unknown</em>';
    }
  }
  return type;
}

function getPcode(pcode: string) {
  if (pcode) {
    return ['<div><b>P-Code</b></div>', `<div>${pcode}</div>`];
  }
  return [];
}

export function onClick(point) {
  const $map = get(map);
  const features = $map.queryRenderedFeatures(point, { layers });
  if (features.length) {
    const { lat, lng } = $map.unproject(point);
    const feature = features[0];
    const popupText = [
      '<div><b>Latitude, Longitude</b></div>',
      `<div>${lat.toFixed(4)}, ${lng.toFixed(4)}</div>`,
      '<div><b>Name</b></div>',
      `<div>${feature.properties.name || '<em>Unknown</em>'}</div>`,
      '<div><b>Type</b></div>',
      `<div>${getType(feature.properties.type) || '<em>Unknown</em>'}</div>`,
      ...getPcode(feature.properties.pcode),
    ].join('');
    new Popup({ closeButton: false }).setLngLat({ lat, lng }).setHTML(popupText).addTo($map);
  }
}
