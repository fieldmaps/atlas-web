import React, { useState, useEffect } from 'react';
import { csvParse } from 'd3-dsv';

interface State {
  camps: any;
  input: string;
  features: any;
}

const componentDidMount = (setState: Function) => {
  fetch('/data/settlements.csv')
    .then(response => response.text())
    .then(rows => {
      setState((state: State) => ({ ...state, features: csvParse(rows) }));
    });
};

const onChange = (e: React.FormEvent<HTMLInputElement>, setState: Function) => {
  e.persist();
  setState((state: State) => ({ ...state, input: e.target.value }));
};

const onClick = (map, feature) => {
  map.flyTo({ center: [feature.X, feature.Y], zoom: 12 });
};

const Sidebar = ({ map }) => {
  const [state, setState] = useState({ camps: [], input: '', features: [] });
  useEffect(() => componentDidMount(setState), []);
  return (
    <section className="field-maps-sidebar">
      <div className="container box">
        <div className="field field-maps-search-input">
          <p className="control">
            <input
              className="input"
              type="text"
              onChange={e => onChange(e, setState)}
              placeholder="&#x1f50d;settlements"
            />
          </p>
        </div>
        <ul className="field-maps-search-list">
          {state.input.length >= 3
            ? state.features
                .filter(item =>
                  item.name
                    ? item.name
                        .toLowerCase()
                        .includes(state.input.toLowerCase())
                    : false,
                )
                .map((feature, index) => (
                  <li key={index}>
                    <button
                      className="button is-white is-fullwidth justify-content-start"
                      type="button"
                      onClick={() => onClick(map, feature)}
                    >
                      {feature.name}
                    </button>
                  </li>
                ))
            : null}
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;
