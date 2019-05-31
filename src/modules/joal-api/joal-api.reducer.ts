import { combineReducers } from 'redux';
import apiTorrentFileReducer from './torrentFiles/torrentFiles.reducer';
import apiClientReducer from './client/client.reducer';
import apiSettingsReducer from './settings/settings.reducer';
import apiSpeedReducer from './speed/speed.reducer';
import apiAnnouncersReducer from './announcers/announcers.reducer';
import apiStompReducer from './stomp/stomp.reducer';

export default combineReducers({
  torrentFiles: apiTorrentFileReducer,
  client: apiClientReducer,
  announcers: apiAnnouncersReducer,
  settings: apiSettingsReducer,
  speed: apiSpeedReducer,
  stomp: apiStompReducer
});
