import React, { useEffect, useRef } from 'react';
import getMap from '../map/map-index';
import * as styles from './map-index.module.sass';

interface Props {
  setState: Function;
}

type MapDiv = HTMLDivElement | null;

const componentDidMount = (mapDiv: MapDiv, setState: Function) => {
  if (mapDiv) getMap(mapDiv, setState);
};

const GlMap = ({ setState }: Props) => {
  const mapDiv = useRef<HTMLDivElement>(null);
  useEffect(() => componentDidMount(mapDiv.current, setState), [setState]);
  return <div ref={mapDiv} className={styles.mapItem} />;
};

export default GlMap;
