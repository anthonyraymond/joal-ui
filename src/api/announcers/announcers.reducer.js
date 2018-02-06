// @flow
import update from 'immutability-helper';
import {
  FAILED_TO_ANNOUNCE,
  SUCCESSFULLY_ANNOUNCE,
  TOO_MANY_ANNOUNCES_FAILED,
  WILL_ANNOUNCE,
  RESET_ANNOUNCER_STATE
} from './announcers.actions';
import createReducer from '../../reducers/createReducer';
import type {
  AnnouncerState,
  FailedToAnnouncePayload,
  SuccessfullyAnnouncePayload,
  TooManyAnnouncesFailedPayload,
  WillAnnouncePayload
} from './types';
import type {
  Handler,
  Action
} from '../types';


const initialState = [];


const handlers: Handler<AnnouncerState> = {
  [FAILED_TO_ANNOUNCE](state, action: Action<FailedToAnnouncePayload>) {
    if (!state.find(announcer => announcer.infoHash === action.payload.infoHash)) {
      return update(state, { $push: [
        Object.assign({}, { isFetching: false }, action.payload)
      ] });
    }
    return state.map(announcer => {
      if (announcer.infoHash === action.payload.infoHash) {
        return Object.assign({}, announcer,
          { isFetching: false },
          action.payload
        );
      }
      return announcer;
    });
  },
  [SUCCESSFULLY_ANNOUNCE](state, action: Action<SuccessfullyAnnouncePayload>) {
    if (action.payload.requestEvent === 'STOPPED') {
      return state.filter(announcer => announcer.infoHash !== action.payload.infoHash);
    }

    if (!state.find(announcer => announcer.infoHash === action.payload.infoHash)) {
      return update(state, { $push: [
        Object.assign({}, { isFetching: false }, action.payload)
      ] });
    }

    return state.map(announcer => {
      if (announcer.infoHash === action.payload.infoHash) {
        return Object.assign({}, announcer,
          { isFetching: false },
          action.payload
        );
      }
      return announcer;
    });
  },
  [TOO_MANY_ANNOUNCES_FAILED](state, action: Action<TooManyAnnouncesFailedPayload>) {
    return state.filter(announcer => announcer.infoHash !== action.payload.infoHash);
  },
  [WILL_ANNOUNCE](state, action: Action<WillAnnouncePayload>) {
    if (!state.find(announcer => announcer.infoHash === action.payload.infoHash)) {
      return update(state, { $push: [
        Object.assign({}, { isFetching: true }, action.payload)
      ] });
    }

    return state.map(announcer => {
      if (announcer.infoHash === action.payload.infoHash) {
        return Object.assign({}, announcer,
          { isFetching: true },
          action.payload
        );
      }
      return announcer;
    });
  },
  [RESET_ANNOUNCER_STATE]() {
    return initialState;
  }
};

export default createReducer(initialState, handlers);
