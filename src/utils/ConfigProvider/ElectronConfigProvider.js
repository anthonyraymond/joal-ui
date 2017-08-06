/* eslint-disable import/no-unresolved, global-require, import/no-absolute-path */
// @flow
import type { GuiConfig } from './types';

let cachedConf: GuiConfig;

export const getConfig = () => {
  if (!cachedConf) {
    // TODO : implement me
    // cachedConf = require('electron').remote.getGlobal('sharedObject').guiConf;
  }
  return cachedConf || {};
};

export const saveConfig = (newConfig: GuiConfig) => {
  console.error('Cannot save config: config is immutable in Electron context.', newConfig);
};
