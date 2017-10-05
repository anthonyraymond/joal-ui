// @flow
import update from 'immutability-helper';
import {
  SEED_SESSION_HAS_STARTED,
  SEED_SESSION_HAS_ENDED,
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
  SeedSessionHasStartedPayload
} from './types';


const initialState = {
  isFetching: true,
  isStarted: false,
  name: ''
};


const handlers: Handler<ClientState> = {
  [SEED_SESSION_HAS_STARTED](state, action: Action<SeedSessionHasStartedPayload>) {
    return update(state, {
      isFetching: { $set: false },
      isStarted: { $set: true },
      name: { $set: action.payload.client }
    });
  },
  [SEED_SESSION_HAS_ENDED](state) {
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
