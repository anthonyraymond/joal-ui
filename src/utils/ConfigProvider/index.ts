import isElectron from 'is-electron';

import { GuiConfig } from './types';

interface ConfigProvider {
  getConfig: () => GuiConfig
  saveConfig: (config: GuiConfig) => void
}

let selectedConfProvider: ConfigProvider;
if (isElectron()) {
  selectedConfProvider = require('./ElectronConfigProvider'); // eslint-disable-line global-require
} else {
  selectedConfProvider = require('./WebBrowserConfigProvider'); // eslint-disable-line global-require
}


export const getGUIConfig = () => selectedConfProvider.getConfig();
export const saveGUIConfig = (config: GuiConfig) => selectedConfProvider.saveConfig(config);

export type GuiConfig = GuiConfig;
