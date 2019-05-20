// @flow
import { createReducer } from 'redux-starter-kit';
import { CONFIG_IS_IN_DIRTY_STATE, CONFIG_HAS_BEEN_LOADED, INVALID_CONFIG } from '../joal-api/settings/settings.actions';
import { TORRENT_FILE_ADDED, FAILED_TO_ADD_TORRENT_FILE } from '../joal-api/torrentFiles/torrentFile.actions';
import {
  INIT_OVER,
  HAS_CONNECTED,
  HAS_DROP_CONNECTION,
  HAS_FAILED_TO_CONNECT,
  RECEIVED_ERROR_MESSAGE
} from '../joal-api/stomp/stomp.actions';
import { REMOVE_NOTIFICATION } from './alerts.actions';


const uuidv4 = () => (
  ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (// eslint-disable-line
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) // eslint-disable-line
  ))
);

const initialState = {
  shouldShowDirtyConfNotif: false,
  notifs: []
};
let isAppInit = false;

export default createReducer(initialState, {
  [INIT_OVER]: (state) => {
    isAppInit = true;
    return state;
  },
  [HAS_CONNECTED]: (state) => {
    isAppInit = false;
    const notif = {
      id: uuidv4(),
      text: 'Connected to JOAL',
      timeout: 6000,
      type: 'SUCCESS'
    };

    state.notifs.push(notif);
  },
  [HAS_DROP_CONNECTION]: (state) => {
    const notif = {
      id: uuidv4(),
      text: 'Lost connection to JOAL, auto-reconnect in 8 seconds.',
      timeout: 6000,
      type: 'ERROR'
    };

    state.notifs.push(notif);
  },
  [HAS_FAILED_TO_CONNECT]: (state) => {
    const notif = {
      id: uuidv4(),
      text: 'Failed to connect to JOAL, retry in 8 seconds.',
      timeout: 6000,
      type: 'ERROR'
    };

    state.notifs.push(notif);
  },
  [REMOVE_NOTIFICATION]: (state, action) => {
    state.notifs = state.notifs.filter(notif => notif.id !== action.payload);
  },
  [CONFIG_IS_IN_DIRTY_STATE]: (state) => {
    state.shouldShowDirtyConfNotif = true;
  },
  [CONFIG_HAS_BEEN_LOADED]: (state) => {
    state.shouldShowDirtyConfNotif = false;
  },
  [INVALID_CONFIG]: (state, action) => {
    const notif = {
      id: uuidv4(),
      text: `Invalid config: ${action.payload.error}`,
      timeout: 6000,
      type: 'ERROR'
    };

    state.notifs.push(notif);
  },
  [TORRENT_FILE_ADDED]: (state, action) => {
    if (!isAppInit) {
      // don't show notification if app is not inited
      return state;
    }
    const notif = {
      id: uuidv4(),
      text: `${action.payload.name} added`,
      timeout: 6000,
      type: 'SUCCESS'
    };

    state.notifs.push(notif);
  },
  [FAILED_TO_ADD_TORRENT_FILE]: (state, action) => {
    const notif = {
      id: uuidv4(),
      text: `${action.payload.fileName} was rejected by server: ${action.payload.error}`,
      timeout: 6000,
      type: 'ERROR'
    };

    state.notifs.push(notif);
  },
  [RECEIVED_ERROR_MESSAGE]: (state, action) =>{
    const notif = {
      id: uuidv4(),
      text: action.message,
      timeout: 8000,
      type: 'ERROR'
    };

    state.notifs.push(notif);
  }
});
