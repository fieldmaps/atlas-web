export const onClick = ({ mapboxgl, map, point }) => {
  const features = map.queryRenderedFeatures(point, {
    layers: [
      'settlements-1',
      'settlements-2',
      'settlements-3',
      'settlements-4',
      'settlements-5',
      'settlements-6',
    ],
  });
  if (features.length) {
    const { lat, lng } = map.unproject(point);
    const feature = features[0];
    const popupText = [
      '<div><b>Latitude, Longitude</b></div>',
      `<div>${lat.toFixed(5)}, ${lng.toFixed(5)}</div>`,
      '<div><b>Name</b></div>',
      `<div>${feature.properties.n}</div>`,
      '<div><b>Size</b></div>',
      `<div>${feature.properties.s}</div>`,
    ].join('');
    new mapboxgl.Popup({ closeButton: false })
      .setLngLat({ lat, lng })
      .setHTML(popupText)
      .addTo(map);
  }
};

export const onDoubleClick = ({ mapboxgl, map, point }) => {
  const { lat, lng } = map.unproject(point);
  const popupText = [
    '<div><b>Latitude, Longitude</b></div>',
    `<div>${lat.toFixed(5)}, ${lng.toFixed(5)}</div>`,
  ].join('');
  new mapboxgl.Popup({ closeButton: false })
    .setLngLat({ lat, lng })
    .setHTML(popupText)
    .addTo(map);
};

export const setPointer = map => {
  map.getCanvas().style.cursor = 'pointer';
};

export const unsetPointer = map => {
  map.getCanvas().style.cursor = '';
};
