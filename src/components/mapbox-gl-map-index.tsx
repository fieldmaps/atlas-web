import React, { useEffect, useRef } from 'react';
import getMap from '../mapbox/mapbox-gl-map-index';

type MapDiv = HTMLDivElement | null;

const componentDidMount = (mapDiv: MapDiv) => {
  if (mapDiv) getMap(mapDiv);
};

const MapboxGlMap = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  useEffect(() => componentDidMount(mapDiv.current), []);
  return <div ref={mapDiv} className="field-maps-flex-item" />;
};

export default MapboxGlMap;
