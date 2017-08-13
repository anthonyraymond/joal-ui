// @flow
import JOALStompClient from './JOALStompClient';
import { sendStartToServer, sendStopToServer } from './client/client.actions';
import { sendConfig } from './settings/settings.actions';
import type { ReduxStore } from './types';
import type { Config } from './settings/types';

let store;
let stompClient;

export const connectStomp = (appStore: ReduxStore) => {
  store = appStore;
  stompClient = new JOALStompClient(store, () => {
    // On disconnect

    // dispatch event to reset application state. (to clear interface)
  });
  stompClient.connect();
};

export const disconnectAndReconnect = () => {
  stompClient.disconnectAndReconnect();
};


export const sendStartSession = () => {
  store.dispatch(sendStartToServer());
  stompClient.send('/joal/global/start');
};

export const sendStopSession = () => {
  store.dispatch(sendStopToServer());
  stompClient.send('/joal/global/stop');
};

export const sendConfigToServer = (config: Config) => {
  store.dispatch(sendConfig(config));
  stompClient.send('/joal/config/save', JSON.stringify(config));
};

type File = {
  lastModified: number,
  name: string,
  size: number,
  type: string
};
export const uploadTorrent = (file: File) => {
  // Attempt to read the file using Filereader API
  const reader = new FileReader();
  reader.onload = () => {
    stompClient.send('/joal/torrents/upload', JSON.stringify({
      fileName: file.name,
      b64String: btoa(reader.result)
    }));
  };
  reader.onabort = () => console.log('file reading was aborted');
  reader.onerror = () => console.log('file reading has failed');

  reader.readAsBinaryString(file);
};
