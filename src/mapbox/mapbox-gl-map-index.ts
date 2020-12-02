const getMap = (mapDiv: HTMLDivElement) => {
  import('mapbox-gl/dist/mapbox-gl.js').then(mapboxgl => {
    mapboxgl.setRTLTextPlugin('/scripts/mapbox-gl-rtl-text.min.js', null, true);
    const map = new mapboxgl.Map({
      container: mapDiv,
      style: `${process.env.GATSBY_TILES}/styles/v1/default.json`,
      bounds: [-180, -90, 180, 90],
      doubleClickZoom: false,
      pitchWithRotate: false,
      hash: true,
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');
    map.addControl(new mapboxgl.GeolocateControl());
  });
};

export default getMap;
