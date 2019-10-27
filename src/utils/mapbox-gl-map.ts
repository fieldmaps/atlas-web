import style from './mapbox-gl-style';
import {
  onClick,
  onDoubleClick,
  setPointer,
  unsetPointer,
} from './mapbox-gl-actions';

interface State {
  map: any;
}

const getMap = (mapDiv: HTMLDivElement, setState: Function) => {
  import('mapbox-gl/dist/mapbox-gl.js').then(mapboxgl => {
    const map = new mapboxgl.Map({
      container: mapDiv,
      style,
      bounds: process.env.GATSBY_BOUNDS.split(','),
      doubleClickZoom: false,
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
    map.on('mouseenter', 'settlements-1', () => setPointer(map));
    map.on('mouseenter', 'settlements-2', () => setPointer(map));
    map.on('mouseenter', 'settlements-3', () => setPointer(map));
    map.on('mouseenter', 'settlements-4', () => setPointer(map));
    map.on('mouseenter', 'settlements-5', () => setPointer(map));
    map.on('mouseenter', 'settlements-6', () => setPointer(map));
    map.on('mouseleave', 'settlements-1', () => unsetPointer(map));
    map.on('mouseleave', 'settlements-2', () => unsetPointer(map));
    map.on('mouseleave', 'settlements-3', () => unsetPointer(map));
    map.on('mouseleave', 'settlements-4', () => unsetPointer(map));
    map.on('mouseleave', 'settlements-5', () => unsetPointer(map));
    map.on('mouseleave', 'settlements-6', () => unsetPointer(map));
    setState((state: State) => ({ ...state, map }));
  });
};

export default getMap;
