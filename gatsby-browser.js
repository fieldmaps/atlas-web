import 'mapbox-gl/dist/mapbox-gl.css';

import './src/styles/styles.sass';

export const onServiceWorkerActive = () => {
  const slug = window.location.hostname.split('-')[0];
  window.location.replace(`https://atlas.fieldmaps.io/maps/${slug}/`);
};

export const onServiceWorkerUpdateReady = () => {
  const slug = window.location.hostname.split('-')[0];
  window.location.replace(`https://atlas.fieldmaps.io/maps/${slug}/`);
};
