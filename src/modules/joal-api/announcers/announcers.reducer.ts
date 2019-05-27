// @flow
import { createReducer } from 'redux-starter-kit';
import {
  FAILED_TO_ANNOUNCE,
  SUCCESSFULLY_ANNOUNCE,
  TOO_MANY_ANNOUNCES_FAILED,
  WILL_ANNOUNCE,
  RESET_ANNOUNCER_STATE
} from './announcers.actions';

import { Announcer as AnnouncerType } from '../types';

const initialState: Array<AnnouncerType> = [];


export default createReducer(initialState, {
  [FAILED_TO_ANNOUNCE]: (state, action) => {
    if (!state.find(announcer => announcer.infoHash === action.payload.infoHash)) {
      state.push(Object.assign({}, { isFetching: false }, action.payload));
      return;
    }
    return state.map(announcer => {
      if (announcer.infoHash === action.payload.infoHash) {
        return Object.assign(
          {},
          announcer,
          { isFetching: false },
          action.payload
        );
      }
      return announcer;
    });
  },
  [SUCCESSFULLY_ANNOUNCE]: (state, action) => {
    if (action.payload.requestEvent === 'STOPPED') {
      return state.filter(announcer => announcer.infoHash !== action.payload.infoHash);
    }

    if (!state.find(announcer => announcer.infoHash === action.payload.infoHash)) {
      state.push(Object.assign({}, { isFetching: false }, action.payload));
      return;
    }

    return state.map(announcer => {
      if (announcer.infoHash === action.payload.infoHash) {
        return Object.assign(
          {},
          announcer,
          { isFetching: false },
          action.payload
        );
      }
      return announcer;
    });
  },
  [TOO_MANY_ANNOUNCES_FAILED]: (state, action) => {
    return state.filter(announcer => announcer.infoHash !== action.payload.infoHash);
  },
  [WILL_ANNOUNCE]: (state, action) => {
    if (!state.find(announcer => announcer.infoHash === action.payload.infoHash)) {
      state.push(Object.assign({}, { isFetching: true }, action.payload));
      return;
    }

    return state.map(announcer => {
      if (announcer.infoHash === action.payload.infoHash) {
        return Object.assign(
          {},
          announcer,
          { isFetching: true },
          action.payload
        );
      }
      return announcer;
    });
  },
  [RESET_ANNOUNCER_STATE]: () => {
    return initialState;
  }
});
