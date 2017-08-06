// @flow
import type { GuiConfig } from './types';

let cachedConf: GuiConfig;

export const getConfig = () => {
  if (!cachedConf) {
    // TODO: replace me with localstorage
    cachedConf = {
      host: 'localhost',
      port: 5081,
      pathPrefix: 'secret-endpoint-path',
      secretToken: 'super-secret-token'
    };
  }
  return cachedConf || {};
};

export const saveConfig = (newConfig: GuiConfig) => {
  // TODO : implement me
  console.error('NOT IMPLEMENTED YET. Wont save new config', newConfig);
};
