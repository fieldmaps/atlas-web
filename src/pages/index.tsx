import React, { useState } from 'react';

import SEO from '../components/seo';
import Sidebar from '../components/sidebar';
import MapboxGlMap from '../components/mapbox-gl-map';

const IndexPage = () => {
  const [state, setState] = useState({ map: null });
  return (
    <div className="field-maps-flex-container">
      <SEO title="Home" />
      <MapboxGlMap setState={setState} />
      <Sidebar map={state.map} />
    </div>
  );
};

export default IndexPage;
