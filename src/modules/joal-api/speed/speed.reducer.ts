// @flow
import { createReducer } from 'redux-starter-kit';
import {
  SEEDING_SPEED_HAS_CHANGED,
  RESET_SPEED_STATE
} from './speed.actions';

import { Speed } from '../types';

const initialState: Array<Speed> = [];


export default createReducer(initialState, {
  [SEEDING_SPEED_HAS_CHANGED]: (state, action) => {
    return action.payload.speeds;
  },
  [RESET_SPEED_STATE]: () => {
    return initialState;
  }
});
