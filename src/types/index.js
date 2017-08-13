// @flow
import type { ApiState } from '../api/types';
import type { LocalConfigState } from '../components/Settings/types';

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
  config: LocalConfigState
};

export type StateType = {
  api: ApiState,
  app: AppStateType,
  router: {}
};
