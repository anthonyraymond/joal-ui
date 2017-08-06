// @flow
import isElectron from 'is-electron';
import type { GuiConfig } from './types';

let confProvider;

if (isElectron()) {
  confProvider = require('./ElectronConfigProvider'); // eslint-disable-line global-require
} else {
  confProvider = require('./WebBrowserConfigProvider'); // eslint-disable-line global-require
}


export const getGUIConfig = () => confProvider.getConfig();
export const saveGUIConfig = (config: GuiConfig) => confProvider.saveConfig(config);
