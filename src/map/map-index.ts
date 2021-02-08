import mapboxgl from 'mapbox-gl';

const TILES_URL = process.env.GATSBY_TILES ?? 'https://tiles.fieldmaps.io';

interface State {
  map: any;
}

const getStyleLayer = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('style') || 'default';
};

const getMap = (mapDiv: HTMLDivElement, setState: Function) => {
  mapboxgl.setRTLTextPlugin('/scripts/mapbox-gl-rtl-text.min.js', null, true);
  const styleLayer = getStyleLayer();
  const map = new mapboxgl.Map({
    container: mapDiv,
    style: `${TILES_URL}/styles/v1/${styleLayer}.json`,
    bounds: [-180, -90, 180, 90],
    minZoom: 2,
    maxZoom: 13,
    doubleClickZoom: false,
    pitchWithRotate: false,
    hash: true,
  });
  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'top-right');
  map.addControl(new mapboxgl.GeolocateControl());
  setState((state: State) => ({ ...state, map }));
};

export default getMap;
