// @flow
import type { Config as ApiConfig } from '../../api/settings/types';

export type Config = ApiConfig;

export type LocalConfigState = {
  localConfig: ?Config
};
