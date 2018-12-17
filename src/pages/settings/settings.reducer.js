// @flow
import update from 'immutability-helper';
import createReducer from '../../reducers/createReducer';
import {
  LOCAL_CONFIG_HAS_CHANGED,
  DISCARD_LOCAL_CONFIG
} from './settings.actions';
import {
  CONFIG_IS_IN_DIRTY_STATE as API___CONFIG_IS_IN_DIRTY_STATE,
  CONFIG_HAS_BEEN_LOADED as API____CONFIG_HAS_BEEN_LOADED
} from '../../modules/joal-api/settings/settings.actions';
import type {
  Handler,
  Action
} from '../../types';
import type { LocalConfigState, Config } from './types';

const initialState = {
  localConfig: undefined
};

const handlers: Handler<LocalConfigState> = {
  [LOCAL_CONFIG_HAS_CHANGED](state, action: Action<Config>) {
    return update(state, {
      localConfig: { $set: action.config }
    });
  },
  [DISCARD_LOCAL_CONFIG](state) {
    return update(state, {
      localConfig: { $set: undefined }
    });
  },
  // When the server send the new config we remove the local one
  [API___CONFIG_IS_IN_DIRTY_STATE]() {
    return initialState;
  },
  [API____CONFIG_HAS_BEEN_LOADED]() {
    return initialState;
  }
};

export default createReducer(initialState, handlers);