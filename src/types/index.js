// @flow
import type { ApiState } from '../api/types';
import type { Config } from '../api/settings/types';

/* Redux */
// eslint-disable-next-line flowtype/no-weak-types
export type Dispatch = (action: {} | Promise<any>) => {};
export type Action<T> = { type: string, payload?: T};

/* Common */
export type Handler<T> = {
  [key: string]: (state: T, action: Action<*>) => T
};


/* App */
export type AppStateType = {
  config: {
    localConfig?: Config
  }
};

export type StateType = {
  api: ApiState,
  app: AppStateType,
  router: {}
};
