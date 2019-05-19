// @flow
import { createReducer } from 'redux-starter-kit';
import {
  SEEDING_SPEED_HAS_CHANGED,
  RESET_SPEED_STATE
} from './speed.actions';


const initialState = [];


export default createReducer(initialState, {
  [SEEDING_SPEED_HAS_CHANGED]: (state, action) => {
    return action.payload.speeds;
  },
  [RESET_SPEED_STATE]: () => {
    return initialState;
  }
});
