import React, { useState } from 'react';
import MapGL from '../components/map-index';
import Menu from '../components/menu';
import Metadata from '../components/metadata';

export default () => {
  const [state, setState] = useState({ map: null });
  return (
    <>
      <Metadata name="Atlas" slug="" />
      <MapGL setState={setState} />
      <Menu map={state.map} />
    </>
  );
};
