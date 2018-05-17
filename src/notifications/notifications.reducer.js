// @flow
import update from 'immutability-helper';
import createReducer from '../reducers/createReducer';
import { CONFIG_IS_IN_DIRTY_STATE, CONFIG_HAS_BEEN_LOADED } from '../api/settings/settings.actions';
import { TORRENT_FILE_ADDED, FAILED_TO_ADD_TORRENT_FILE } from '../api/torrentFiles/torrentFile.actions';
import {
  INIT_OVER,
  HAS_CONNECTED,
  HAS_DROP_CONNECTION,
  HAS_FAILED_TO_CONNECT,
  RECEIVED_ERROR_MESSAGE
} from '../api/stomp/stomp.actions';
import { REMOVE_NOTIFICATION } from './notifications.actions';
import type {
  Handler,
  Action
} from '../types';
import type { NotificationState } from './types';
import type {
  TorrentFilePayload,
  FailedToAddTorrentFilePayload
} from '../api/torrentFiles/types';


const uuidv4 = () => (
  ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => // eslint-disable-line
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) // eslint-disable-line
  )
);

const initialState = {
  shouldShowDirtyConfNotif: false,
  notifs: []
};
let isAppInit = false;

const handlers: Handler<NotificationState> = {
  [INIT_OVER](state) {
    isAppInit = true;
    return state;
  },
  [HAS_CONNECTED](state) {
    isAppInit = false;
    const notif = {
      id: uuidv4(),
      text: 'Connected to JOAL',
      time: 6000,
      type: 'SUCCESS'
    };
    return update(state, {
      notifs: { $push: [notif] }
    });
  },
  [HAS_DROP_CONNECTION](state) {
    const notif = {
      id: uuidv4(),
      text: 'Lost connection to JOAL, auto-reconnect in 8 seconds.',
      time: 6000,
      type: 'ERROR'
    };
    return update(state, {
      notifs: { $push: [notif] }
    });
  },
  [HAS_FAILED_TO_CONNECT](state) {
    const notif = {
      id: uuidv4(),
      text: 'Failed to connect to JOAL, retry in 8 seconds.',
      time: 6000,
      type: 'ERROR'
    };
    return update(state, {
      notifs: { $push: [notif] }
    });
  },
  [REMOVE_NOTIFICATION](state, action: Action<string>) {
    return Object.assign({},
      state,
      { notifs: state.notifs.filter(notif => notif.id !== action.payload) }
    );
  },
  [CONFIG_IS_IN_DIRTY_STATE](state) {
    return update(state, {
      shouldShowDirtyConfNotif: { $set: true }
    });
  },
  [CONFIG_HAS_BEEN_LOADED](state) {
    return update(state, {
      shouldShowDirtyConfNotif: { $set: false }
    });
  },
  [TORRENT_FILE_ADDED](state, action: Action<TorrentFilePayload>) {
    if (!isAppInit) {
      // don't show notification if app is not inited
      return state;
    }
    const notif = {
      id: uuidv4(),
      text: `${action.payload.name} added`,
      time: 6000,
      type: 'SUCCESS'
    };
    return update(state, {
      notifs: { $push: [notif] }
    });
  },
  [FAILED_TO_ADD_TORRENT_FILE](state, action: Action<FailedToAddTorrentFilePayload>) {
    const notif = {
      id: uuidv4(),
      text: `${action.payload.fileName} was rejected by server: ${action.payload.error}`,
      time: 6000,
      type: 'ERROR'
    };
    return update(state, {
      notifs: { $push: [notif] }
    });
  },
  [RECEIVED_ERROR_MESSAGE](state, action: Action<string>) {
    const notif = {
      id: uuidv4(),
      text: action.message,
      time: 8000,
      type: 'ERROR'
    };
    return update(state, {
      notifs: { $push: [notif] }
    });
  }
};

export default createReducer(initialState, handlers);
