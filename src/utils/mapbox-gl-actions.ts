const getType = type => {
  if (typeof type === 'number') {
    switch (type) {
      case 1:
        return 'National Capital';
      case 2:
        return 'Admin1 Capital';
      case 3:
        return 'Admin2 Capital';
      case 4:
        return 'Primary town';
      case 5:
        return 'Secondary town';
      case 6:
        return 'Village';
      case 7:
        return 'IDP Camp';
      case 8:
        return 'Town area';
      default:
        return '<em>Unknown</em>';
    }
  }
  return type;
};

const getPcode = pcode => {
  if (pcode) {
    return ['<div><b>P-Code</b></div>', `<div>${pcode}</div>`];
  }
  return [];
};

export const onClick = ({ mapboxgl, map, point }) => {
  const features = map.queryRenderedFeatures(point, {
    layers: [
      'settlements-1',
      'settlements-2',
      'settlements-3',
      'settlements-4',
      'settlements-5',
      'settlements-6',
      'education-facilities-1',
      'education-facilities-2',
      'health-facilities-1',
      'health-facilities-2',
      'financial-services-1',
      'financial-services-2',
      'airports-1',
      'airports-2',
      'sea-ports-1',
      'sea-ports-2',
    ],
  });
  if (features.length) {
    const { lat, lng } = map.unproject(point);
    const feature = features[0];
    const popupText = [
      '<div><b>Latitude, Longitude</b></div>',
      `<div>${lat.toFixed(4)}, ${lng.toFixed(4)}</div>`,
      '<div><b>Name</b></div>',
      `<div>${feature.properties.name || '<em>Unknown</em>'}</div>`,
      '<div><b>Type</b></div>',
      `<div>${getType(feature.properties.type) || '<em>Unknown</em>'}</div>`,
      ...getPcode(feature.properties.pcode),
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
    `<div>${lat.toFixed(4)}, ${lng.toFixed(4)}</div>`,
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
