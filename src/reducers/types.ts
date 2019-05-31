import { RouterState } from 'connected-react-router';
import { ApiState, Config } from '../modules/joal-api/types';
import { ThemeState } from '../modules/theme/types';
import { NotificationState } from '../modules/alerts/types';


interface TorrentsTable {
  searchFilter: string,
  sortProperty: string,
  sortDirection: string,
  currentPage: number,
  torrentsPerPage: number
}

export interface LocalConfig {
  localConfig?: Config
}

export interface AppState {
  config: LocalConfig,
  torrentsTable: TorrentsTable
}



export interface JoalState {
  api: ApiState,
  app: AppState,
  theme: ThemeState,
  alerts: NotificationState,
  router: RouterState
}
