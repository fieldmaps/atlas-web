import React from 'react';

const TILES_URL = process.env.GATSBY_TILES ?? 'https://tiles.fieldmaps.io';

const onChange = (map: any, value: string) => {
  map.setStyle(`${TILES_URL}/styles/v1/${value}.json`);
  window.history.replaceState(
    null,
    null,
    `/?style=${value}${window.location.hash}`
  );
};

const isDefaultOption = (value: string) => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const layer = urlParams.get('style') || 'default';
    return layer === value;
  }
};

const Layers = ({ map }) => {
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
              onChange={e => onChange(map, e.currentTarget.value)}
            />{' '}
            Color
          </label>
        </div>
        <div className="field">
          <label className="radio">
            <input
              type="radio"
              name="layer"
              value="dark"
              defaultChecked={isDefaultOption('dark')}
              onChange={e => onChange(map, e.currentTarget.value)}
            />{' '}
            Dark
          </label>
        </div>
        <div className="field">
          <label className="radio">
            <input
              type="radio"
              name="layer"
              value="light"
              defaultChecked={isDefaultOption('light')}
              onChange={e => onChange(map, e.currentTarget.value)}
            />{' '}
            Light
          </label>
        </div>
      </div>
    </section>
  );
};

export default Layers;
