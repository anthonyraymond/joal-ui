import { createReducer } from 'redux-starter-kit';
import {
  CONFIG_IS_IN_DIRTY_STATE,
  INVALID_CONFIG,
  CONFIG_HAS_BEEN_LOADED,
  LIST_OF_CLIENT_FILES,
  RESET_CONFIG
} from './settings.actions';

import { Settings } from '../types';

const initialState: Settings = {
  isDirty: false,
  errMessage: undefined,
  config: {
    minUploadRate: 0,
    maxUploadRate: 0,
    simultaneousSeed: 0,
    client: '',
    keepTorrentWithZeroLeechers: false,
    uploadRatioTarget: -1
  },
  availableClients: []
};


export default createReducer(initialState, {
  [CONFIG_IS_IN_DIRTY_STATE]: (state, action) => {
    state.isDirty = true;
    state.config = action.payload.config;
    state.errMessage = undefined;
  },
  [INVALID_CONFIG]: (state, action) => {
    state.errMessage = action.payload.error;
  },
  [CONFIG_HAS_BEEN_LOADED]: (state, action) => {
    state.isDirty = false;
    state.config = action.payload.config;
    state.errMessage = undefined;
  },
  [LIST_OF_CLIENT_FILES]: (state, action) => {
    state.availableClients = action.payload.clients;
  },
  [RESET_CONFIG]: () => {
    return initialState;
  }
});
