// @flow
import { createReducer } from 'redux-starter-kit';
import {
  SEEDING_SPEED_HAS_CHANGED,
  RESET_SPEED_STATE
} from './speed.actions';

import { SpeedsArray, Speed } from '../types';

const initialState: SpeedsArray = {};


export default createReducer(initialState, {
  [SEEDING_SPEED_HAS_CHANGED]: (state, action: { payload: { speeds: Array<Speed> }}) => {
    const speeds: SpeedsArray = {};
    for (let currentSpeed of action.payload.speeds) {
      speeds[currentSpeed.infoHash] = currentSpeed;
    }
    return speeds;
  },
  [RESET_SPEED_STATE]: () => {
    return initialState;
  }
});
