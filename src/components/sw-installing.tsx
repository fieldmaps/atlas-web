import React, { useState, useEffect } from 'react';

const componentDidMount = (setState: Function) => {
  setInterval(() => {
    navigator.storage.estimate().then(({ usageDetails }) => {
      if (usageDetails.caches) setState(() => ({ usage: usageDetails.caches }));
    });
  }, 250);
};

const SwInstalling = () => {
  const [state, setState] = useState({ usage: 0 });
  useEffect(() => componentDidMount(setState), []);
  const total = appTotal + jsonTotal;
  const usage = Math.min(state.usage, total);
  const percentage = Math.floor((usage / total) * 100);
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">{percentage}%</h1>
          <h2 className="subtitle">
            {percentage === 100
              ? 'Installing Map'
              : 'Downloading Map for Offline Use'}
          </h2>
          <h2 className="subtitle">
            {Math.floor((usage * 10) / (1024 * 1024)) / 10} /{' '}
            {Math.floor((total * 10) / (1024 * 1024)) / 10} MB
          </h2>
          {percentage === 100 ? (
            <progress className="progress is-small is-primary" />
          ) : (
            <progress
              className="progress is-small is-primary"
              value={percentage}
              max={100}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default SwInstalling;
