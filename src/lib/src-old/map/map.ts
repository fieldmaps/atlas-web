import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Workbox } from 'workbox-window';
import { layers } from './config';
import { onClick } from './popup';

interface State {
  map: any;
}

interface PageContext {
  bounds: number[];
  slug: string;
}

function addPointer(layer: string, map: any) {
  function setPointer() {
    map.getCanvas().style.cursor = 'pointer';
  }
  function unsetPointer() {
    map.getCanvas().style.cursor = '';
  }
  map.on('mouseenter', layer, () => setPointer());
  map.on('mouseleave', layer, () => unsetPointer());
}

function registerWorkbox(slug: string) {
  if (
    'serviceWorker' in navigator &&
    !navigator.serviceWorker.controller &&
    window.location.host !== 'localhost:8000'
  ) {
    const wb = new Workbox(`/${slug}/sw.js`);
    wb.register();
  }
}

function onDoubleClick(maplibregl, map, point) {
  const { lat, lng } = map.unproject(point);
  const popupText = [
    '<div><b>Latitude, Longitude</b></div>',
    `<div>${lat.toFixed(4)}, ${lng.toFixed(4)}</div>`,
  ].join('');
  new maplibregl.Popup({ closeButton: false })
    .setLngLat({ lat, lng })
    .setHTML(popupText)
    .addTo(map);
}

function getStyleLayer() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('style') || 'default';
}

function getMap(mapDiv: HTMLDivElement, setState: Function, pageContext: PageContext) {
  maplibregl.setRTLTextPlugin('/scripts/maplibre-gl-rtl-text.min.js', null, true);
  const styleLayer = getStyleLayer();
  const map = new maplibregl.Map({
    container: mapDiv,
    style: `/styles/${pageContext.slug}/${styleLayer}.json`,
    bounds: pageContext.bounds,
    doubleClickZoom: false,
    dragRotate: false,
    pitchWithRotate: false,
    hash: true,
  });
  const nav = new maplibregl.NavigationControl({ showCompass: false });
  map.addControl(nav, 'top-right');
  map.addControl(
    new maplibregl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
    }),
  );
  map.on('click', ({ point }) => onClick(maplibregl, map, point, styleLayer));
  map.on('dblclick', ({ point }) => onDoubleClick(maplibregl, map, point));
  map.on('load', () => registerWorkbox(pageContext.slug));
  layers.default.forEach((layer) => addPointer(layer, map));
  setState((state: State) => ({ ...state, map }));
}

export default getMap;
