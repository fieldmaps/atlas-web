import { navigate } from 'gatsby';
import 'mapbox-gl/dist/mapbox-gl.css';

import './src/styles/styles.scss';

const ELEMENT_ID = 'gatsby-browser-service-worker-notification';

const addProgressBar = () => {
  if (!document.getElementById(ELEMENT_ID)) {
    const elem = document.createElement('progress');
    elem.id = ELEMENT_ID;
    elem.className = 'progress is-small is-primary is-fixed-top';
    document.body.prepend(elem);
  }
};

export const onServiceWorkerActive = () => window.location.reload();

export const onServiceWorkerUpdateFound = () => {
  if (navigator.serviceWorker.controller) addProgressBar();
};

export const onServiceWorkerUpdateReady = () =>
  navigate(window.location.pathname);
