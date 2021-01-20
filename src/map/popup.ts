import { layers } from './config';

const getType = (type: any) => {
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

const getPcode = (pcode: string) => {
  if (pcode) {
    return ['<div><b>P-Code</b></div>', `<div>${pcode}</div>`];
  }
  return [];
};

const getStyleLayer = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('style') || 'default';
};

export const onClick = (mapboxgl, map, point) => {
  const mapLayers = layers[getStyleLayer()];
  const features = map.queryRenderedFeatures(point, { layers: mapLayers });
  if (features.length && getStyleLayer() === 'default') {
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
