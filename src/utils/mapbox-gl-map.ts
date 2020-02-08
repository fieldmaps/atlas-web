import { Workbox } from 'workbox-window';
import {
  onClick,
  onDoubleClick,
  setPointer,
  unsetPointer,
} from './mapbox-gl-actions';
import { layers } from '../config/names';

interface State {
  map: any;
}

interface PageContext {
  bounds: number[];
  slug: string;
}

const addPointer = (layer, map) => {
  map.on('mouseenter', layer, () => setPointer(map));
  map.on('mouseleave', layer, () => unsetPointer(map));
};

const registerWorkbox = (slug: string) => {
  console.log('start');
  if (
    'serviceWorker' in navigator &&
    window.origin !== 'http://localhost:8000'
  ) {
    const wb = new Workbox(`/${slug}/sw.js`);
    wb.register();
    console.log('registered');
  }
};

const getMap = (
  mapDiv: HTMLDivElement,
  setState: Function,
  pageContext: PageContext,
) => {
  import('mapbox-gl/dist/mapbox-gl.js').then(mapboxgl => {
    mapboxgl.setRTLTextPlugin('/scripts/mapbox-gl-rtl-text.min.js', null, true);
    const map = new mapboxgl.Map({
      container: mapDiv,
      style: `/styles/v1/${pageContext.slug}/default.json`,
      bounds: pageContext.bounds,
      doubleClickZoom: false,
      pitchWithRotate: false,
      hash: true,
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }),
    );
    map.on('click', ({ point }) => onClick({ mapboxgl, map, point }));
    map.on('dblclick', ({ point }) => onDoubleClick({ mapboxgl, map, point }));
    map.on('load', () => registerWorkbox(pageContext.slug));
    layers.forEach(layer => addPointer(layer, map));
    setState((state: State) => ({ ...state, map }));
  });
};

export default getMap;
