import {
  onClick,
  onDoubleClick,
  setPointer,
  unsetPointer,
} from './mapbox-gl-actions';
import style from '../config/settlements';
import { layers, icons } from '../config/names';

interface State {
  map: any;
}

const addPointer = (layer, map) => {
  map.on('mouseenter', layer, () => setPointer(map));
  map.on('mouseleave', layer, () => unsetPointer(map));
};

const getMap = (mapDiv: HTMLDivElement, setState: Function) => {
  import('mapbox-gl/dist/mapbox-gl.js').then(mapboxgl => {
    mapboxgl.setRTLTextPlugin('/scripts/mapbox-gl-rtl-text.min.js');
    const map = new mapboxgl.Map({
      container: mapDiv,
      style,
      doubleClickZoom: false,
      bounds: process.env.GATSBY_BOUNDS.split(','),
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
    icons.forEach(icon => {
      map.loadImage(`/icons/${icon}.png`, (error, image) => {
        if (error) throw error;
        if (!map.hasImage(icon)) map.addImage(icon, image);
      });
    });
    setState((state: State) => ({ ...state, map }));
  });
};

export default getMap;
