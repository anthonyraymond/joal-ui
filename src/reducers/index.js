import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import torrentsTableReducer from '../components/TorrentsTable/torrentsTable.reducer';
import uiConfigReducer from '../pages/settings/settings.reducer';
import themeReducer from '../modules/theme/theme-modifier/theme-modifier.reducer';
import apiTorrentFileReducer from '../modules/joal-api/torrentFiles/torrentFiles.reducer';
import apiClientReducer from '../modules/joal-api/client/client.reducer';
import apiSettingsReducer from '../modules/joal-api/settings/settings.reducer';
import apiSpeedReducer from '../modules/joal-api/speed/speed.reducer';
import apiAnnouncersReducer from '../modules/joal-api/announcers/announcers.reducer';
import apiStompReducer from '../modules/joal-api/stomp/stomp.reducer';
import alertReducer from '../modules/alerts/alerts.reducer';

export default combineReducers({
  api: combineReducers({
    torrentFiles: apiTorrentFileReducer,
    client: apiClientReducer,
    announcers: apiAnnouncersReducer,
    settings: apiSettingsReducer,
    speed: apiSpeedReducer,
    stomp: apiStompReducer
  }),
  app: combineReducers({
    config: uiConfigReducer,
    torrentsTable: torrentsTableReducer
  }),
  theme: themeReducer,
  alerts: alertReducer,
  router
});
