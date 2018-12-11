// @flow
import update from 'immutability-helper';
import {
  IS_CONNECTING,
  HAS_CONNECTED,
  HAS_FAILED_TO_CONNECT,
  HAS_DROP_CONNECTION,
  INIT_OVER,
  RESET_STOMP_STATE
} from './stomp.actions';
import createReducer from '../../../reducers/createReducer';
import type {
  Handler
} from '../../../types';
import type { StompState } from './types';


const initialState = {
  isConnected: false,
  isFullyInit: false
};


const handlers: Handler<StompState> = {
  [IS_CONNECTING](state) {
    return update(state, {
      isFullyInit: { $set: false }
    });
  },
  [HAS_CONNECTED](state) {
    return update(state, {
      isConnected: { $set: true }
    });
  },
  [HAS_FAILED_TO_CONNECT](state) {
    return update(state, {
      isConnected: { $set: false },
      isFullyInit: { $set: false }
    });
  },
  [HAS_DROP_CONNECTION](state) {
    return update(state, {
      isConnected: { $set: false },
      isFullyInit: { $set: false }
    });
  },
  [INIT_OVER](state) {
    return update(state, {
      isFullyInit: { $set: true }
    });
  },
  [RESET_STOMP_STATE]() {
    return initialState;
  }
};

export default createReducer(initialState, handlers);
