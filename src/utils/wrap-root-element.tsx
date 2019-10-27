import React from 'react';

import SwInstalling from '../components/sw-installing';

interface Props {
  element: Element;
}

const WrapRootElement = ({ element }: Props) =>
  navigator.serviceWorker.controller ? element : <SwInstalling />;

export default WrapRootElement;
