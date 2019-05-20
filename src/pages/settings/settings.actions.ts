export const LOCAL_CONFIG_HAS_CHANGED = '@@ui/LOCAL_CONFIG_HAS_CHANGED';
export const DISCARD_LOCAL_CONFIG = '@@ui/DISCARD_LOCAL_CONFIG';

export const localConfigHasChanged = (config) => {
  return {
    type: LOCAL_CONFIG_HAS_CHANGED,
    config
  };
}


export const discardLocalConfigChanges = () => {
  return {
    type: DISCARD_LOCAL_CONFIG,
  };
}
