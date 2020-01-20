import React, { useState } from 'react';

import SEO from '../components/seo';
import Sidebar from '../components/sidebar';
import MapboxGlMap from '../components/mapbox-gl-map';

interface Props {
  setState: Function;
  pageContext: {
    bounds: number[];
  };
}

const IndexPage = ({ pageContext }: Props) => {
  const [state, setState] = useState({ map: null });
  return (
    <div className="field-maps-flex-container">
      <SEO title="Home" />
      <MapboxGlMap setState={setState} pageContext={pageContext} />
      <Sidebar map={state.map} />
    </div>
  );
};

export default IndexPage;
