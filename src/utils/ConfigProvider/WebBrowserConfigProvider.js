// @flow
import type { GuiConfig } from './types';

let cachedConf: GuiConfig;

export const getConfig = () => {
  if (!cachedConf) {
    const localStorageConf = localStorage.getItem('guiConfig');
    if (!localStorageConf) {
      cachedConf = {
        host: window.location.hostname, // this default settings is to prevent Firefox to crash with "SecurityError: The operation is insecure." due to cross origin websocket
        port: window.location.port || 80, // this default settings is to prevent Firefox to crash with "SecurityError: The operation is insecure." due to cross origin websocket
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
