// @flow
import type { AnnouncerState } from './announcers/types';
import type { ClientState } from './client/types';
import type { TorrentFilesState } from './torrentFiles/types';
import type { SettingsState } from './settings/types';
import type { StompState } from './stomp/types';

export type ReduxStore = {
  dispatch: Dispatch
};
export type Dispatch = (action: {} | Promise<any>) => {};
export type Action<T> = { type: string, payload?: T};

/* Common */
export type Handler<T> = {
  [key: string]: (state: T, action: Action<*>) => T
};

export type StompMessage = {
  type: string,
  payload: {}
};

export type ApiState = {
  announcers: AnnouncerState,
  client: ClientState,
  torrentFiles: TorrentFilesState,
  settings: SettingsState,
  stomp: StompState
};
