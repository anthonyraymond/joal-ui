import JoalStompClient from './JoalStompClient';
import { resetAnnouncerState } from './announcers/announcers.actions';
import { sendStartToServer, sendStopToServer, resetClientState } from './client/client.actions';
import { sendConfig, resetConfig } from './settings/settings.actions';
import { resetStompState } from './stomp/stomp.actions';
import { resetTorrentFilesState } from './torrentFiles/torrentFile.actions';
import { resetSpeedState } from './speed/speed.actions';

import { Store } from 'redux';
import { Config } from './types';

let store: Store;
let stompClient: any;

export const connectStomp = (appStore: Store) => {
  store = appStore;
  stompClient = new JoalStompClient(store, () => {
    // On disconnect

    store.dispatch(resetStompState());
    store.dispatch(resetConfig());
    store.dispatch(resetClientState());
    store.dispatch(resetAnnouncerState());
    store.dispatch(resetTorrentFilesState());
    store.dispatch(resetSpeedState());
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
        if (reader.result == null) {
          return
        }
        const b64Encoded = (reader.result as string).replace(/data:.+?,/, '');
        stompClient.send('/joal/torrents/upload', JSON.stringify({
          fileName: file.name,
          b64String: b64Encoded
        }));
        setTimeout(processOne, 1300);
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
