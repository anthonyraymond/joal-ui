import { createReducer } from 'redux-starter-kit';
import {
  TORRENT_FILE_ADDED,
  TORRENT_FILE_DELETED,
  FAILED_TO_ADD_TORRENT_FILE,
  RESET_TORRENT_FILES_STATE
} from './torrentFile.actions';

import { TorrentFile } from '../types';

const initialState: Array<TorrentFile> = [];

export default createReducer(initialState, {
  [TORRENT_FILE_ADDED]: (state, action) => {
    const newState = state.filter(tf => tf.infoHash !== action.payload.infoHash);
    newState.push(action.payload);
    return newState;
  },
  [TORRENT_FILE_DELETED]: (state, action) => {
    return state.filter(tf => tf.infoHash !== action.payload.infoHash);
  },
  [FAILED_TO_ADD_TORRENT_FILE]: (state) => {
    // Do nothing, notifications reducer will handle it
    return state;
  },
  [RESET_TORRENT_FILES_STATE]: () => {
    return initialState;
  }
});
