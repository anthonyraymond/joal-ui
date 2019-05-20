import { Confdig as ApiConfig } from '../../modules/joal-api/settings/types';

export type Config = ApiConfig;

export type LocalConfigState = {
  localConfig: ?Config
};
