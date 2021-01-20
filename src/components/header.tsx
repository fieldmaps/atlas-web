import React from 'react';
import { Link } from 'gatsby';

export default ({ active }) => (
  <nav className="level">
    <p className="level-item has-text-centered">
      <Link to="/?style=default">Default</Link>
    </p>
    <p className="level-item has-text-centered">
      <Link to="/?style=light">Light</Link>
    </p>
    <p className="level-item has-text-centered">
      <Link to="/?style=dark">Dark</Link>
    </p>
  </nav>
);
