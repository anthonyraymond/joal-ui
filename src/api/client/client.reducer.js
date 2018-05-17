// @flow
import update from 'immutability-helper';
import {
  GLOBAL_SEED_STARTED,
  GLOBAL_SEED_STOPPED,
  SEND_START_TO_SERVER,
  SEND_STOP_TO_SERVER,
  RESET_CLIENT_STATE
} from './client.actions';
import createReducer from '../../reducers/createReducer';
import type {
  Handler,
  Action
} from '../types';
import type {
  ClientState,
  GlobalSeedStartedPayload
} from './types';


const initialState = {
  isFetching: true,
  isStarted: false,
  name: ''
};


const handlers: Handler<ClientState> = {
  [GLOBAL_SEED_STARTED](state, action: Action<GlobalSeedStartedPayload>) {
    return update(state, {
      isFetching: { $set: false },
      isStarted: { $set: true },
      name: { $set: action.payload.client }
    });
  },
  [GLOBAL_SEED_STOPPED](state) {
    return update(state, {
      isFetching: { $set: false },
      isStarted: { $set: false },
      name: { $set: '' }
    });
  },
  [SEND_START_TO_SERVER](state) {
    return update(state, {
      isFetching: { $set: true }
    });
  },
  [SEND_STOP_TO_SERVER](state) {
    return update(state, {
      isFetching: { $set: true }
    });
  },
  [RESET_CLIENT_STATE]() {
    return initialState;
  }
};


export default createReducer(initialState, handlers);
