// @flow
import type { GuiConfig } from './types';

let cachedConf: GuiConfig;

export const getConfig = () => {
  if (!cachedConf) {
    const localStorageConf = localStorage.getItem('guiConfig');
    if (!localStorageConf) {
      cachedConf = {
        host: 'localhost',
        port: '0',
        pathPrefix: '',
        secretToken: ''
      };
    } else {
      cachedConf = JSON.parse(localStorageConf);
    }
  }
  return cachedConf;
};

export const saveConfig = (newConfig: GuiConfig) => {
  localStorage.setItem('guiConfig', JSON.stringify(newConfig));
  cachedConf = newConfig;
};
