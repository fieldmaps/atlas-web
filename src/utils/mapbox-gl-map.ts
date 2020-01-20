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
  setRTLTextPlugin: boolean;
}

const addPointer = (layer, map) => {
  map.on('mouseenter', layer, () => setPointer(map));
  map.on('mouseleave', layer, () => unsetPointer(map));
};

const getMap = (
  mapDiv: HTMLDivElement,
  setState: Function,
  pageContext: PageContext,
) => {
  import('mapbox-gl/dist/mapbox-gl.js').then(mapboxgl => {
    mapboxgl.setRTLTextPlugin('/scripts/mapbox-gl-rtl-text.min.js');
    const map = new mapboxgl.Map({
      container: mapDiv,
      style: '/styles/settlements/ssd.json',
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
    layers.forEach(layer => addPointer(layer, map));
    setState((state: State) => ({ ...state, map }));
  });
};

export default getMap;
