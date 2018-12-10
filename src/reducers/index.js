import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import uiConfigReducer from '../components/Settings/settings.reducer';
import themeReducer from '../modules/theme/theme-modifier/theme-modifier.reducer';
import apiTorrentFileReducer from '../api/torrentFiles/torrentFiles.reducer';
import apiClientReducer from '../api/client/client.reducer';
import apiSettingsReducer from '../api/settings/settings.reducer';
import apiSpeedReducer from '../api/speed/speed.reducer';
import apiAnnouncersReducer from '../api/announcers/announcers.reducer';
import apiStompReducer from '../api/stomp/stomp.reducer';
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
    config: uiConfigReducer
  }),
  theme: themeReducer,
  alerts: alertReducer,
  router
});
