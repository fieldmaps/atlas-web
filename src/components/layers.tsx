import React from 'react';

const onChange = (map: any, slug: string, value: string) => {
  map.setStyle(`/styles/v1/${slug}/${value}.json`);
  window.history.replaceState(
    null,
    null,
    `/${slug}/?style=${value}${window.location.hash}`,
  );
};

const isDefaultOption = (value: string) => {
  const urlParams = new URLSearchParams(window.location.search);
  const layer = urlParams.get('style') || 'default';
  return layer === value;
};

const Layers = ({ map, slug }) => {
  return (
    <section className="field-maps-layers">
      <div className="container box">
        <div className="field">
          <label className="radio">
            <input
              type="radio"
              name="layer"
              value="default"
              defaultChecked={isDefaultOption('default')}
              onChange={e => onChange(map, slug, e.currentTarget.value)}
            />{' '}
            Default
          </label>
        </div>
        <div className="field">
          <label className="radio">
            <input
              type="radio"
              name="layer"
              value="admin"
              defaultChecked={isDefaultOption('admin')}
              onChange={e => onChange(map, slug, e.currentTarget.value)}
            />{' '}
            Admin
          </label>
        </div>
      </div>
    </section>
  );
};

export default Layers;
