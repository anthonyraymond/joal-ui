/* eslint-disable import/no-unresolved, global-require, import/no-absolute-path */
// @flow
import type { GuiConfig } from './types';

let cachedConf: GuiConfig;

export const getConfig = () => {
  if (!cachedConf) {
    const localStorageConf = localStorage.getItem('guiConfig');
    if (!localStorageConf) {
      throw new Error('Failed to get gui configuration from localStorage.');
    }

    cachedConf = JSON.parse(localStorageConf);
  }
  return cachedConf;
};

export const saveConfig = (newConfig: GuiConfig) => {
  console.error('Cannot save config: config is immutable in Electron context.', newConfig);
};
