import React, { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';
import Layers from '../components/layers';
import MapGL from '../components/map';
import Metadata from '../components/metadata';
import Search from '../components/search';
import './styles.sass';

interface Props {
  setState: Function;
  pageContext: {
    bounds: number[];
    slug: string;
  };
}

function componentDidMount(slug: string) {
  if (
    'serviceWorker' in navigator &&
    navigator.serviceWorker.controller &&
    window.location.host !== 'localhost:8000'
  ) {
    const wb = new Workbox(`/${slug}/sw.js`);
    wb.register();
  }
}
export default ({ pageContext }: Props) => {
  const { slug } = pageContext;
  useEffect(() => componentDidMount(slug), [slug]);
  const [state, setState] = useState({ map: null });
  return (
    <div className="field-maps-flex-container">
      <Metadata name={pageContext.slug.toUpperCase() + ' Atlas'} slug={'/' + pageContext.slug} />
      <MapGL setState={setState} pageContext={pageContext} />
      <Search map={state.map} slug={pageContext.slug} />
      <Layers map={state.map} slug={pageContext.slug} />
    </div>
  );
};
