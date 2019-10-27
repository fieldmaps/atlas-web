import React, { useEffect, useRef } from 'react';
import getMap from '../utils/mapbox-gl-map';

interface Props {
  setState: Function;
}

type MapDiv = HTMLDivElement | null;

const componentDidMount = (mapDiv: MapDiv, setState: Function) => {
  if (mapDiv) getMap(mapDiv, setState);
};

const MapboxGlMap = ({ setState }: Props) => {
  const mapDiv = useRef<HTMLDivElement>(null);
  useEffect(() => componentDidMount(mapDiv.current, setState), [setState]);
  return <div ref={mapDiv} className="field-maps-flex-item" />;
};

export default MapboxGlMap;
