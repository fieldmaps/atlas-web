import React, { useState, useEffect } from 'react';

interface State {
  camps: any;
  input: string;
  settlements: any;
}

const componentDidMount = (setState: Function) => {
  // fetch('/data/camps.json')
  //   .then(response => response.json())
  //   .then(({ features }) =>
  //     setState((state: State) => ({ ...state, camps: features })),
  //   );
  fetch('/data/settlements.json')
    .then(response => response.json())
    .then(({ features }) =>
      setState((state: State) => ({ ...state, settlements: features })),
    );
};

const onChange = (e: React.FormEvent<HTMLInputElement>, setState: Function) => {
  e.persist();
  setState((state: State) => ({ ...state, input: e.target.value }));
};

const onClick = (map, feature) => {
  map.flyTo({ center: feature.geometry.coordinates, zoom: 12 });
};

const Sidebar = ({ map }) => {
  const [state, setState] = useState({ camps: [], input: '', settlements: [] });
  useEffect(() => componentDidMount(setState), []);
  return (
    <section className="section field-maps-sidebar">
      <div className="container box">
        <div className="field field-maps-search-input">
          <p className="control">
            <input
              className="input"
              type="text"
              onChange={e => onChange(e, setState)}
              placeholder={`Search ${process.env.GATSBY_NAME_SHORT}`}
            />
          </p>
        </div>
        <ul className="field-maps-search-list">
          {state.input.length >= 3
            ? state.settlements
                .filter(item =>
                  item.properties.n
                    .toLowerCase()
                    .includes(state.input.toLowerCase()),
                )
                .map((settlement, index) => (
                  <li key={index}>
                    <button
                      className="button is-white is-fullwidth justify-content-start"
                      type="button"
                      onClick={() => onClick(map, settlement)}
                    >
                      {settlement.properties.n}
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
