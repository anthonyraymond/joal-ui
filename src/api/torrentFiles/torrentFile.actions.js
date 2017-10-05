// @flow

export const TORRENT_FILE_ADDED = '@@api/listener/TORRENT_FILE_ADDED';
export const TORRENT_FILE_DELETED = '@@api/listener/TORRENT_FILE_DELETED';
export const FAILED_TO_ADD_TORRENT_FILE = '@@api/listener/FAILED_TO_ADD_TORRENT_FILE';

export const RESET_TORRENT_FILES_STATE = '@@reset/RESET_TORRENT_FILES_STATE';


export const resetTorrentFilesState = () => (
  { type: RESET_TORRENT_FILES_STATE }
);
