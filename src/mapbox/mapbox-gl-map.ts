import { Workbox } from 'workbox-window';
import { onClick } from './mapbox-gl-popup';
import { layers } from './config';

interface State {
  map: any;
}

interface PageContext {
  bounds: number[];
  slug: string;
}

const addPointer = (layer: string, map: any) => {
  const setPointer = () => (map.getCanvas().style.cursor = 'pointer');
  const unsetPointer = () => (map.getCanvas().style.cursor = '');
  map.on('mouseenter', layer, () => setPointer());
  map.on('mouseleave', layer, () => unsetPointer());
};

const registerWorkbox = (slug: string) => {
  if (
    'serviceWorker' in navigator &&
    !navigator.serviceWorker.controller &&
    window.location.host !== 'localhost:8000'
  ) {
    const wb = new Workbox(`/${slug}/sw.js`);
    wb.register();
  }
};

const onDoubleClick = (mapboxgl, map, point) => {
  const { lat, lng } = map.unproject(point);
  const popupText = [
    '<div><b>Latitude, Longitude</b></div>',
    `<div>${lat.toFixed(4)}, ${lng.toFixed(4)}</div>`,
  ].join('');
  new mapboxgl.Popup({ closeButton: false })
    .setLngLat({ lat, lng })
    .setHTML(popupText)
    .addTo(map);
};

const getStyleLayer = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('style') || 'default';
};

const getMap = (
  mapDiv: HTMLDivElement,
  setState: Function,
  pageContext: PageContext
) => {
  import('mapbox-gl/dist/mapbox-gl.js').then(mapboxgl => {
    mapboxgl.setRTLTextPlugin('/scripts/mapbox-gl-rtl-text.min.js', null, true);
    const styleLayer = getStyleLayer();
    const map = new mapboxgl.Map({
      container: mapDiv,
      style: `/styles/v1/${pageContext.slug}/${styleLayer}.json`,
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
      })
    );
    map.on('click', ({ point }) => onClick(mapboxgl, map, point, styleLayer));
    map.on('dblclick', ({ point }) => onDoubleClick(mapboxgl, map, point));
    map.on('load', () => registerWorkbox(pageContext.slug));
    layers.default.forEach(layer => addPointer(layer, map));
    setState((state: State) => ({ ...state, map }));
  });
};

export default getMap;
