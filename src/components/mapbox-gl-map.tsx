import React, { useEffect, useRef } from 'react';
import getMap from '../utils/mapbox-gl-map';

interface Props {
  setState: Function;
  pageContext: {
    bounds: number[];
  };
}

type MapDiv = HTMLDivElement | null;

const componentDidMount = (
  mapDiv: MapDiv,
  setState: Function,
  pageContext: any,
) => {
  if (mapDiv) getMap(mapDiv, setState, pageContext);
};

const MapboxGlMap = ({ setState, pageContext }: Props) => {
  const mapDiv = useRef<HTMLDivElement>(null);
  useEffect(() => componentDidMount(mapDiv.current, setState, pageContext), [
    pageContext,
    setState,
  ]);
  return <div ref={mapDiv} className="field-maps-flex-item" />;
};

export default MapboxGlMap;
