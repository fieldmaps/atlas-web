import React from 'react';

import SwInstalling from '../components/sw-installing';

interface Props {
  element: Element;
}

const WrapRootElement = ({ element }: Props) =>
  window.location.hostname !== 'localhost' &&
  window.location.hostname !== '127.0.0.1' &&
  !navigator.serviceWorker.controller ? (
    <SwInstalling />
  ) : (
    element
  );

export default WrapRootElement;
