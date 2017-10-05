import Webstomp from 'webstomp-client';
import { getGUIConfig } from '../utils/ConfigProvider';
import {
  isConnecting,
  hasConnected,
  hasDropConnection,
  hasFailedToConnect,
  initOver,
  hasReceivedError
} from './stomp/stomp.actions';
import type { ReduxStore, StompMessage } from './types';

const uuidv4 = () => (
  ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => // eslint-disable-line
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) // eslint-disable-line
  )
);

type Frame = {
  command: string;
  headers: {};
  body: {} | string;
}

export default class JOALStompClient {
  constructor(reduxStore: ReduxStore, onDisconnectCallback: () => void) {
    this.reconnectTimeout = undefined;
    this.reduxStore = reduxStore;
    this.onDisconnectCallback = onDisconnectCallback;
    this.subscriptions = [];
    this.stompClient = {};
  }

  send(path: string, body: string = '', headers: {} = {}) {
    if (!this.stompClient || !this.stompClient.connected) {
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
    }, (error: CloseEvent | Frame) => {
      console.log('error message from websocket', error);

      if (error instanceof CloseEvent) {
        // if we had some subscriptions this is a connection drop.
        const isConnectionDropped = this.subscriptions.length > 0;

        if (isConnectionDropped) {
          this._dispatchHasDropConnection(); // eslint-disable-line no-underscore-dangle
        } else {
          this._dispatchHasFailedToConnect(); // eslint-disable-line no-underscore-dangle
        }
        if (this.onDisconnectCallback) this.onDisconnectCallback();
        this._reconnectAfterTimeout(8000); // eslint-disable-line no-underscore-dangle
      } else {
        this.reduxStore.dispatch(hasReceivedError(error.headers.message));
      }
    });
  }

  _dispatchIsReady() {
    this.reduxStore.dispatch(initOver());
  }

  _dispatchOnConnect() {
    this.reduxStore.dispatch(isConnecting());
  }

  _dispatchHasConnected() {
    this.reduxStore.dispatch(hasConnected());
  }

  _dispatchHasDropConnection() {
    this.reduxStore.dispatch(hasDropConnection());
  }

  _dispatchHasFailedToConnect() {
    this.reduxStore.dispatch(hasFailedToConnect());
  }

  onReceiveMessage(message: StompMessage) {
    const { type, payload } = message;
    this.reduxStore.dispatch({ type: `@@api/listener/${type}`, payload });
  }

  _reconnectAfterTimeout(timeout: number) {
    this.subscriptions.forEach(sub => sub.unsubscribe()); // release resources
    this.subscriptions = [];
    // the reconnectTimeout = undefined will ensure we don't cause memory leak.
    if (this.reconnectTimeout === undefined) {
      this.reconnectTimeout = setTimeout(() => {
        this.connect();
        this.reconnectTimeout = undefined;
      }, timeout);
    }
  }

  disconnect() {
    this.subscriptions.forEach(sub => sub.unsubscribe()); // release resources
    this.subscriptions = [];
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect();
    }
    if (this.onDisconnectCallback) this.onDisconnectCallback();
  }

  disconnectAndReconnect() {
    clearTimeout(this.reconnectTimeout);
    this.reconnectTimeout = undefined;
    this.disconnect();
    this.connect();
  }
}
