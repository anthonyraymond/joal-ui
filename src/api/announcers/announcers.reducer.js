// @flow
import update from 'immutability-helper';
import {
  ANNOUNCER_HAS_STARTED,
  ANNOUNCER_HAS_STOPPED,
  ANNOUNCER_WILL_ANNOUNCE,
  ANNOUNCER_HAS_ANNOUNCED,
  ANNOUNCER_HAS_FAILED_TO_ANNOUNCE
} from './announcers.actions';
import createReducer from '../../reducers/createReducer';
import type { AnnouncerState, AnnouncerPayload } from './types';
import type {
  Handler,
  Action
} from '../types';


const initialState = [];


const handlers: Handler<AnnouncerState> = {
  [ANNOUNCER_HAS_STARTED](state, action: Action<AnnouncerPayload>) {
    return update(state, { $push: [
      // isFetching is true to prevent the loading bar to appear
      Object.assign({}, { isFetching: true }, action.payload)
    ] });
  },
  [ANNOUNCER_HAS_STOPPED](state, action: Action<AnnouncerPayload>) {
    return state.filter(an => an.id !== action.payload.id);
  },
  [ANNOUNCER_WILL_ANNOUNCE](state, action: Action<AnnouncerPayload>) {
    return state.map(an => {
      if (an.id === action.payload.id) {
        return Object.assign({}, an,
          { isFetching: true },
          update(action.payload, { interval: { $set: 0 } })
        );
      }
      return an;
    });
  },
  [ANNOUNCER_HAS_ANNOUNCED](state, action: Action<AnnouncerPayload>) {
    return state.map(an => {
      if (an.id === action.payload.id) {
        return Object.assign({}, an, { isFetching: false }, action.payload);
      }
      return an;
    });
  },
  [ANNOUNCER_HAS_FAILED_TO_ANNOUNCE](state, action: Action<AnnouncerPayload>) {
    return state.map(an => {
      if (an.id === action.payload.id) {
        return Object.assign({}, an, { isFetching: false }, action.payload);
      }
      return an;
    });
  }
};

export default createReducer(initialState, handlers);
