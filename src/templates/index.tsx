import React, { useState, useEffect } from 'react';
import { Workbox } from 'workbox-window';

import SEO from '../components/seo';
import Search from '../components/search';
import Layers from '../components/layers';
import MapboxGlMap from '../components/mapbox-gl-map';

interface Props {
  setState: Function;
  pageContext: {
    bounds: number[];
    slug: string;
  };
}

const componentDidMount = (slug: string) => {
  if (
    'serviceWorker' in navigator &&
    navigator.serviceWorker.controller &&
    window.location.host !== 'localhost:8000'
  ) {
    const wb = new Workbox(`/${slug}/sw.js`);
    wb.register();
  }
};

const IndexPage = ({ pageContext }: Props) => {
  const { slug } = pageContext;
  useEffect(() => componentDidMount(slug), [slug]);
  const [state, setState] = useState({ map: null });
  return (
    <div className="field-maps-flex-container">
      <SEO title="Home" slug={slug} />
      <MapboxGlMap setState={setState} pageContext={pageContext} />
      <Search map={state.map} slug={pageContext.slug} />
      <Layers map={state.map} slug={pageContext.slug} />
    </div>
  );
};

export default IndexPage;
