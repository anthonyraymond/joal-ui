export const CONFIG_IS_IN_DIRTY_STATE = '@@api/listener/CONFIG_IS_IN_DIRTY_STATE';
export const INVALID_CONFIG = '@@api/listener/INVALID_CONFIG';
export const CONFIG_HAS_BEEN_LOADED = '@@api/listener/CONFIG_HAS_BEEN_LOADED';
export const LIST_OF_CLIENT_FILES = '@@api/listener/LIST_OF_CLIENT_FILES';

export const SEND_CONFIG = '@@api/send/SEND_CONFIG';

export const RESET_CONFIG = '@@reset/RESET_CONFIG';

export const sendConfig = (config) => ({
  type: SEND_CONFIG,
  config
});


export const resetConfig = () => (
  { type: RESET_CONFIG }
);
