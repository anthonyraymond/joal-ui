import { Store } from 'redux';
import Webstomp, { Client as WebStompClient, Subscription, Frame } from 'webstomp-client';
import { getGUIConfig } from '../../utils/ConfigProvider';
import {
  isConnecting,
  hasConnected,
  hasDropConnection,
  hasFailedToConnect,
  initOver,
  hasReceivedError
} from './stomp/stomp.actions';

const uuidv4 = () => (
  ([1e7] as any +-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c: number) => (// eslint-disable-line space-infix-ops
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) // eslint-disable-line implicit-arrow-linebreak, no-bitwise, no-mixed-operators
  ))
);

export type StompMessage = {
  type: string,
  payload: {}
};

export default class JoalStompClient {
  reconnectTimeout?: number
  reduxStore: Store
  onDisconnectCallback: () => void
  subscriptions: Array<Subscription>
  stompClient: WebStompClient


  constructor(reduxStore: Store, onDisconnectCallback: () => void) {
    this.reconnectTimeout = undefined;
    this.reduxStore = reduxStore;
    this.onDisconnectCallback = onDisconnectCallback;
    this.subscriptions = [];
    this.stompClient = {} as WebStompClient;
  }

  send(path: string, body: string = '', headers: {} = {}) {
    if (!this.stompClient || !this.stompClient.connected) {
      console.error('You can not send message to JOAL when not connected through WebSocket.');
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
    const urlScheme = (window.location.protocol === 'https:' ? 'wss' : 'ws');
    const url = `${urlScheme}://${guiConf.host}:${guiConf.port}/${guiConf.pathPrefix}`;
    const { secretToken } = guiConf;
    this._dispatchOnConnect(); // eslint-disable-line no-underscore-dangle
    this.stompClient = Webstomp.client(url, { debug: false, protocols: ['v12.stomp', 'v11.stomp'] });

    this.stompClient.connect({ 'X-Joal-Auth-Token': secretToken, 'X-Joal-Username': uuidv4() }, (/* response */) => {
      this._dispatchHasConnected(); // eslint-disable-line no-underscore-dangle
      /* specific mapping that intentionally include the /joal prefix */
      this.stompClient.subscribe('/joal/initialize-me', (message) => {
        JSON.parse(message.body).forEach((msg: StompMessage) => {
          this.onReceiveMessage(msg);
        });
        // We consider that the app is inited when the replayable events has been played.
        this._dispatchIsReady(); // eslint-disable-line no-underscore-dangle
        message.ack();
        this.stompClient.unsubscribe('/initialize-me');
      });

      ['/global', '/announce', '/config', '/torrents', '/speed'].forEach(subscribesPath => {
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
        this.reduxStore.dispatch(hasReceivedError(error.headers['message'] || 'Undefined error'));
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
      this.reconnectTimeout = window.setTimeout(() => {
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
