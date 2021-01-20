import React, { useState, useEffect } from 'react';
import Metadata from '../components/metadata';
import MapGL from '../components/map-gl-index';
import Layers from '../components/layers-index';

export default () => {
  const [state, setState] = useState({ map: null });
  return (
    <div className="field-maps-flex-container">
      <Metadata name="Atlas" slug="" />
      <MapGL setState={setState} />
      <Layers map={state.map} />
    </div>
  );
};
