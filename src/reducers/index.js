import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import uiConfigReducer from '../components/Settings/settings.reducer';
import apiTorrentFileReducer from '../api/torrentFiles/torrentFiles.reducer';
import apiClientReducer from '../api/client/client.reducer';
import apiSettingsReducer from '../api/settings/settings.reducer';
import apiSpeedReducer from '../api/speed/speed.reducer';
import apiAnnouncersReducer from '../api/announcers/announcers.reducer';
import apiStompReducer from '../api/stomp/stomp.reducer';
import notificationsReducer from '../notifications/notifications.reducer';

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
  notifications: notificationsReducer,
  router
});
