// @flow
import type { Config } from './types';

export const CONFIG_HAS_CHANGED = '@@api/listener/CONFIG_HAS_CHANGED';
export const INVALID_CONFIG = '@@api/listener/INVALID_CONFIG';
export const CONFIG_HAS_BEEN_LOADED = '@@api/listener/CONFIG_HAS_BEEN_LOADED';
export const CLIENT_FILES_DISCOVERED = '@@api/listener/CLIENT_FILES_DISCOVERED';

export const SEND_CONFIG = '@@api/send/SEND_CONFIG';

export const RESET_CONFIG = '@@reset/RESET_CONFIG';

export const sendConfig = (config: Config) => ({
  type: SEND_CONFIG,
  config
});


export const resetConfig = () => (
  { type: RESET_CONFIG }
);
