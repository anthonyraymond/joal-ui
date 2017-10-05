// @flow
import update from 'immutability-helper';
import {
  TORRENT_FILE_ADDED,
  TORRENT_FILE_DELETED,
  FAILED_TO_ADD_TORRENT_FILE,
  RESET_TORRENT_FILES_STATE
} from './torrentFile.actions';
import createReducer from '../../reducers/createReducer';
import type {
  Handler,
  Action
} from '../../types';
import type {
  TorrentFilesState,
  TorrentFilePayload
} from './types';


const initialState = [];


const handlers: Handler<TorrentFilesState> = {
  [TORRENT_FILE_ADDED](state, action: Action<TorrentFilePayload>) {
    return update(state, { $push: [action.payload] });
  },
  [TORRENT_FILE_DELETED](state, action: Action<TorrentFilePayload>) {
    return state.filter(tf => tf.id !== action.payload.id);
  },
  [FAILED_TO_ADD_TORRENT_FILE](state) {
    // Do nothing, notifications reducer will handle it
    return state;
  },
  [RESET_TORRENT_FILES_STATE]() {
    return initialState;
  }
};

export default createReducer(initialState, handlers);
// @flow
