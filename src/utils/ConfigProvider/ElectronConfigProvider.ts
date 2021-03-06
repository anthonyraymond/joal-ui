/* eslint-disable import/no-unresolved, global-require, import/no-absolute-path */

import { GuiConfig } from './types';

export const getConfig = (): GuiConfig => {
  const localStorageConf = localStorage.getItem('guiConfig');
  if (!localStorageConf) {
    console.log('Returning a mocked config to prevent exception from NullPointer');
    return {
      host: window.location.hostname, // this default settings is to prevent Firefox to crash with "SecurityError: The operation is insecure." due to cross origin websocket
      port: window.location.port || '80', // this default settings is to prevent Firefox to crash with "SecurityError: The operation is insecure." due to cross origin websocket
      pathPrefix: window.location.pathname.substring(1, window.location.pathname.lastIndexOf('/ui')) || '',
      secretToken: ''
    };
  }

  // We do not cache the config here. When running in electron the config is injected in a way that is subject to race condition.
  // If we read the value too early, we're going to cache the old config.
  return JSON.parse(localStorageConf);
};

export const saveConfig = (newConfig: GuiConfig) => {
  localStorage.setItem('guiConfig', JSON.stringify(newConfig));
};
