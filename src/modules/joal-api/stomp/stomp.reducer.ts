// @flow
import { createReducer } from 'redux-starter-kit';
import {
  IS_CONNECTING,
  HAS_CONNECTED,
  HAS_FAILED_TO_CONNECT,
  HAS_DROP_CONNECTION,
  INIT_OVER,
  RESET_STOMP_STATE
} from './stomp.actions';


const initialState = {
  isConnected: false,
  isFullyInit: false
};


export default createReducer(initialState, {
  [IS_CONNECTING]: (state) => {
    state.isFullyInit = false;
  },
  [HAS_CONNECTED]: (state) => {
    state.isConnected = true;
  },
  [HAS_FAILED_TO_CONNECT]: (state) => {
    state.isConnected = false;
    state.isFullyInit = false;
  },
  [HAS_DROP_CONNECTION]: (state) => {
    state.isConnected = false;
    state.isFullyInit = false;
  },
  [INIT_OVER]: (state) => {
    state.isFullyInit = true;
  },
  [RESET_STOMP_STATE]: () => {
    return initialState;
  }
});
