// @flow
import type { Config } from './types';

export const LOCAL_CONFIG_HAS_CHANGED = '@@ui/LOCAL_CONFIG_HAS_CHANGED';
export const DISCARD_LOCAL_CONFIG = '@@ui/DISCARD_LOCAL_CONFIG';

export function localConfigHasChanged(config: Config) {
  return {
    type: LOCAL_CONFIG_HAS_CHANGED,
    config
  };
}


export function discardLocalConfigChanges() {
  return {
    type: DISCARD_LOCAL_CONFIG,
  };
}
