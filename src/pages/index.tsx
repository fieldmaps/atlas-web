import React, { useState, useEffect } from 'react';

import SEO from '../components/seo';
import Sidebar from '../components/sidebar';
import MapboxGlMap from '../components/mapbox-gl-map';

const componentDidMount = () => {
  const slug = window.location.hostname.split('-')[0];
  window.location.replace(`https://atlas.fieldmaps.io/maps/${slug}/`);
};

const IndexPage = () => {
  const [state, setState] = useState({ map: null });
  useEffect(() => componentDidMount(), []);
  return (
    <div className="field-maps-flex-container">
      <SEO title="Home" />
      <MapboxGlMap setState={setState} />
      <Sidebar map={state.map} />
    </div>
  );
};

export default IndexPage;
