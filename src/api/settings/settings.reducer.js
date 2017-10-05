// @flow
import update from 'immutability-helper';
import {
  CONFIG_HAS_CHANGED,
  INVALID_CONFIG,
  CONFIG_HAS_BEEN_LOADED,
  CLIENT_FILES_DISCOVERED,
  RESET_CONFIG
} from './settings.actions';
import createReducer from '../../reducers/createReducer';
import type {
  SettingsState,
  InvalidConfigPayload,
  SettingsPayload,
  ClientFilesDiscoveredPayload
} from './types';
import type {
  Handler,
  Action
} from '../types';


const initialState = {
  isDirty: false,
  errMessage: undefined,
  config: {
    minUploadRate: 0,
    maxUploadRate: 0,
    simultaneousSeed: 0,
    client: '',
    keepTorrentWithZeroLeechers: false
  },
  availableClients: []
};

const handlers: Handler<SettingsState> = {
  [CONFIG_HAS_CHANGED](state, action: Action<SettingsPayload>) {
    return update(state, {
      isDirty: { $set: true },
      config: { $set: action.payload.config },
      errMessage: { $set: undefined }
    });
  },
  [INVALID_CONFIG](state, action: Action<InvalidConfigPayload>) {
    return update(state, {
      errMessage: { $set: action.payload.error }
    });
  },
  [CONFIG_HAS_BEEN_LOADED](state, action: Action<SettingsPayload>) {
    return update(state, {
      isDirty: { $set: false },
      config: { $set: action.payload.config },
      errMessage: { $set: undefined }
    });
  },
  [CLIENT_FILES_DISCOVERED](state, action: Action<ClientFilesDiscoveredPayload>) {
    return update(state, { availableClients: { $set: action.payload.clients } });
  },
  [RESET_CONFIG]() {
    return initialState;
  }
};

export default createReducer(initialState, handlers);
