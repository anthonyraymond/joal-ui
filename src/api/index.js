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

    // TODO: dispatch event to reset application state. (to clear interface)
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
export const uploadTorrents = (files: Array<File>) => {
  const reader = new FileReader();

  // Process files one by one (queue like) to reduce memory consuption when sender a lot of torrent files.
  const processOne = () => {
    const singleFile = files.pop();
    if (singleFile === undefined) {
      return;
    }

    ((file) => {
      reader.onload = () => {
        const b64Encoded = reader.result.replace(/data:.+?,/, '');
        stompClient.send('/joal/torrents/upload', JSON.stringify({
          fileName: file.name,
          b64String: b64Encoded
        }));
        processOne();
      };
      reader.onabort = () => console.log(`file reading was aborted for [${file.name}]`);
      reader.onerror = () => console.log(`file reading has failed for [${file.name}]`);

      reader.readAsDataURL(file);
    })(singleFile);
  };

  processOne();
};

export const deleteTorrent = (torrentInfoHash: string) => {
  stompClient.send('/joal/torrents/delete', torrentInfoHash);
};
