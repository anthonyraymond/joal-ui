// @flow
import {
  GLOBAL_SEED_STARTED,
  GLOBAL_SEED_STOPPED,
  SEND_START_TO_SERVER,
  SEND_STOP_TO_SERVER,
  RESET_CLIENT_STATE
} from './client.actions';
import { createReducer } from 'redux-starter-kit';


const initialState = {
  isFetching: true,
  isStarted: false,
  name: ''
};

export default createReducer(initialState, {
  [GLOBAL_SEED_STARTED]: (state, action) => {
    state.isFetching = false;
    state.isStarted = true;
    state.name = action.payload.client;
  },
  [GLOBAL_SEED_STOPPED]: (state) => {
    state.isFetching = false;
    state.isStarted = false;
    state.name = '';
  },
  [SEND_START_TO_SERVER]: (state) => {
    state.isFetching = true;
  },
  [SEND_STOP_TO_SERVER]: (state) => {
    state.isFetching = true;
  },
  [RESET_CLIENT_STATE]: () => {
    return initialState;
  }
});
