import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const TILES_URL = process.env.GATSBY_TILES ?? 'https://tiles.fieldmaps.io';

interface State {
  map: any;
}

const getStyleLayer = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('style') || 'admin-light';
};

const getMap = (mapDiv: HTMLDivElement, setState: Function) => {
  maplibregl.setRTLTextPlugin(
    '/scripts/maplibre-gl-rtl-text.min.js',
    null,
    true
  );
  const styleLayer = getStyleLayer();
  const map = new maplibregl.Map({
    container: mapDiv,
    style: `${TILES_URL}/styles/${styleLayer}/style.json`,
    bounds: [-180, -90, 180, 90],
    minZoom: 2,
    maxZoom: 18,
    doubleClickZoom: false,
    dragRotate: false,
    pitchWithRotate: false,
    hash: true,
  });
  const nav = new maplibregl.NavigationControl({ showCompass: false });
  map.addControl(nav, 'top-right');
  map.addControl(new maplibregl.GeolocateControl());
  setState((state: State) => ({ ...state, map }));
};

export default getMap;
