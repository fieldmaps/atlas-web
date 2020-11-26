import React, { useEffect } from 'react';

import SEO from '../components/seo';

const componentDidMount = () => {
  window.location.assign('https://fieldmaps.io/maps');
};

const HomePage = () => {
  useEffect(() => componentDidMount(), []);
  return <SEO title="Home" />;
};

export default HomePage;
