import React, { useState } from 'react';
import styles from './menu.module.sass';
import menu from '../img/menu.svg';
import close from '../img/close.svg';
import sun from '../img/sun.svg';
import moon from '../img/moon.svg';

const TILES_URL = process.env.GATSBY_TILES ?? 'https://tiles.fieldmaps.io';

const onClick = (
  map: any,
  layer: string,
  theme: string,
  setState: Function
) => {
  map.setStyle(`${TILES_URL}/styles/v1/${layer}-${theme}.json`);
  window.history.replaceState(
    null,
    null,
    `/?style=${layer}-${theme}${window.location.hash}`
  );
  setState((state: any) => ({ ...state, layer, theme }));
};

const getLayer = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('style') || 'admin-light';
};

const isDefaultOption = (value: string) => {
  if (typeof window !== 'undefined') {
    return getLayer() === value;
  }
};

const onClickMenu = (setState: any, open: boolean) => {
  setState((state: any) => ({ ...state, open }));
};

export default ({ map }) => {
  const themes = ['light', 'dark'];
  const [layer, theme] = getLayer().split('-');
  const [state, setState] = useState({ open: true, layer, theme });
  return (
    <>
      <div
        className={styles.buttonOpen}
        onClick={e => onClickMenu(setState, true)}
      >
        <img className={styles.buttonOpenImage} src={menu} />
      </div>
      <div
        className={[
          styles.sidebar,
          state.open ? styles.sidebarOpen : styles.sidebarClosed,
        ].join(' ')}
      >
        <div className={styles.header}>
          <div
            className={styles.buttonClose}
            onClick={e =>
              onClick(
                map,
                state.layer,
                themes.find(x => x != state.theme),
                setState
              )
            }
          >
            <img
              className={styles.buttonCloseImage}
              src={state.theme === 'dark' ? moon : sun}
            />
          </div>
          <div className={styles.spacer} />
          <div
            className={styles.buttonClose}
            onClick={e => onClickMenu(setState, false)}
          >
            <img className={styles.buttonCloseImage} src={close} />
          </div>
        </div>
        <div
          className={[
            styles.layerButton,
            state.layer === 'admin' ? styles.layerActive : '',
          ].join(' ')}
          onClick={e => onClick(map, 'admin', state.theme, setState)}
        >
          Administrative Areas
        </div>
        <div
          className={[
            styles.layerButton,
            state.layer === 'places' ? styles.layerActive : '',
          ].join(' ')}
          onClick={e => onClick(map, 'places', state.theme, setState)}
        >
          Populated Places
        </div>
      </div>
    </>
  );
};
