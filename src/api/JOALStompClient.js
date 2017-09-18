import Webstomp from 'webstomp-client';
import { getGUIConfig } from '../utils/ConfigProvider';
import {
  isConnecting,
  hasConnected,
  hasDropConnection,
  hasFailedToConnect,
  initOver
} from './stomp/stomp.actions';
import type { ReduxStore, StompMessage } from './types';

const uuidv4 = () => (
  ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => // eslint-disable-line
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) // eslint-disable-line
  )
);

export default class JOALStompClient {
  constructor(reduxStore: ReduxStore, onDisconnectCallback: () => void) {
    this.reconnectTimeout = undefined;
    this.reduxStore = reduxStore;
    this.onDisconnectCallback = onDisconnectCallback;
    this.subscriptions = [];
    this.stompClient = {};
    this.isConnected = false;
  }

  send(path: string, body: string = '', headers: {} = {}) {
    if (!this.isConnected) {
      console.error('You can not send message to JOAL when not connected through WebScoket.');
      return;
    }
    this.stompClient.send(
      path,
      body,
      headers
    );
  }

  connect() {
    const guiConf = getGUIConfig();
    const url = `ws://${guiConf.host}:${guiConf.port}/${guiConf.pathPrefix}`;
    const secretToken = guiConf.secretToken;
    this._dispatchOnConnect(); // eslint-disable-line no-underscore-dangle
    this.stompClient = Webstomp.client(url, { debug: false });

    this.stompClient.connect({ 'X-Joal-Auth-Token': secretToken, 'X-Joal-Username': uuidv4() }, (/* response */) => {
      this._dispatchHasConnected(); // eslint-disable-line no-underscore-dangle

      /* specific mapping that intentionally include the /joal prefix */
      const replayableEvents = this.stompClient.subscribe('/joal/events/replay', (message) => {
        JSON.parse(message.body).forEach(msg => {
          this.onReceiveMessage(msg);
        });
        // We consider that the app is inited when the replayable events has been played.
        this._dispatchIsReady(); // eslint-disable-line no-underscore-dangle
        message.ack();
      });
      this.subscriptions.push(replayableEvents);

      ['/global', '/announce', '/config', '/torrents'].forEach(subscribesPath => {
        const subscribtion = this.stompClient.subscribe(subscribesPath, (message) => {
          message.ack();
          this.onReceiveMessage(JSON.parse(message.body));
        }, { ack: 'client' });
        this.subscriptions.push(subscribtion);
      });
    }, (error) => {
      console.log(error);
      // if we were already connected this is a connection drop.
      const isConnectionDropped = this.isConnected;

      if (isConnectionDropped) {
        // connection dropped
        this._dispatchHasDropConnection(); // eslint-disable-line no-underscore-dangle
      } else {
        // Failed to connect / reconnect
        this._dispatchHasFailedToConnect(); // eslint-disable-line no-underscore-dangle
      }
      if (this.onDisconnectCallback) this.onDisconnectCallback();
      this._reconnectAfterTimeout(8000); // eslint-disable-line no-underscore-dangle
    });
  }

  _dispatchIsReady() {
    this.reduxStore.dispatch(initOver());
  }

  _dispatchOnConnect() {
    this.reduxStore.dispatch(isConnecting());
  }

  _dispatchHasConnected() {
    this.isConnected = true;
    this.reduxStore.dispatch(hasConnected());
  }

  _dispatchHasDropConnection() {
    this.isConnected = false;
    this.reduxStore.dispatch(hasDropConnection());
  }

  _dispatchHasFailedToConnect() {
    this.isConnected = false;
    this.reduxStore.dispatch(hasFailedToConnect());
  }

  onReceiveMessage(message: StompMessage) {
    const { type, payload } = message;
    this.reduxStore.dispatch({ type: `@@api/listener/${type}`, payload });
  }

  _reconnectAfterTimeout(timeout: number) {
    this.subscriptions.forEach(sub => sub.unsubscribe()); // release resources
    this.subscriptions = [];
    this.reconnectTimeout = setTimeout(() => {
      this.connect();
    }, timeout);
  }

  disconnect() {
    if (this.isConnected) {
      this.subscriptions.forEach(sub => sub.unsubscribe()); // release resources
      this.subscriptions = [];
      this.stompClient.disconnect();
    }
    this.isConnected = false;
  }

  disconnectAndReconnect() {
    clearTimeout(this.reconnectTimeout);
    this.disconnect();
    this.connect();
  }

}
