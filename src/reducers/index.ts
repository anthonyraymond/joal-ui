import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import torrentsTableReducer from '../components/TorrentsTable/torrentsTable.reducer';
import uiConfigReducer from '../pages/settings/settings.reducer';
import themeReducer from '../modules/theme/theme-modifier/theme-modifier.reducer';
import apiReducer from '../modules/joal-api/joal-api.reducer';
import alertReducer from '../modules/alerts/alerts.reducer';

import { History } from 'history';

export default (history: History) => combineReducers({
  api: apiReducer,
  app: combineReducers({
    config: uiConfigReducer,
    torrentsTable: torrentsTableReducer
  }),
  theme: themeReducer,
  alerts: alertReducer,
  router: connectRouter(history)
});
