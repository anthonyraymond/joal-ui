import { createReducer } from 'redux-starter-kit';
import {
  LOCAL_CONFIG_HAS_CHANGED,
  DISCARD_LOCAL_CONFIG
} from './settings.actions';
import {
  CONFIG_IS_IN_DIRTY_STATE as API___CONFIG_IS_IN_DIRTY_STATE,
  CONFIG_HAS_BEEN_LOADED as API____CONFIG_HAS_BEEN_LOADED
} from '../../modules/joal-api/settings/settings.actions';

import { LocalConfig } from '../../reducers/types';

const initialState: LocalConfig = {
  localConfig: undefined
};

export default createReducer(initialState, {
  [LOCAL_CONFIG_HAS_CHANGED]: (state, action) => {
    state.localConfig = action.config;
  },
  [DISCARD_LOCAL_CONFIG]: (state) => {
    state.localConfig = undefined;
  },
  // When the server send the new config we remove the local one
  [API___CONFIG_IS_IN_DIRTY_STATE]: () => {
    return initialState;
  },
  [API____CONFIG_HAS_BEEN_LOADED]: () => {
    return initialState;
  }
});
