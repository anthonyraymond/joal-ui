// @flow
import {
  SEEDING_SPEED_HAS_CHANGED,
  RESET_SPEED_STATE
} from './speed.actions';
import createReducer from '../../reducers/createReducer';
import type {
  SpeedState,
  SeedingSpeedHasChangedPayload
} from './types';
import type {
  Handler,
  Action
} from '../types';


const initialState = [];


const handlers: Handler<SpeedState> = {
  [SEEDING_SPEED_HAS_CHANGED](state, action: Action<SeedingSpeedHasChangedPayload>) {
    return action.payload.speeds;
  },
  [RESET_SPEED_STATE]() {
    return initialState;
  }
};

export default createReducer(initialState, handlers);
