// @flow
import type { Config } from './types';

export const LOCAL_CONFIG_HAS_CHANGED = '@@ui/LOCAL_CONFIG_HAS_CHANGED';

export function localConfigHasChanged(config: Config) {
  return {
    type: LOCAL_CONFIG_HAS_CHANGED,
    config
  };
}
