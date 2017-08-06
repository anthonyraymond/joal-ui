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


export default class JOALStompClient {
  constructor(reduxStore: ReduxStore, onDisconnectCallback: () => void) {
    this.reduxStore = reduxStore;
    const guiConf = getGUIConfig();
    this.url = `ws://${guiConf.host}:${guiConf.port}/${guiConf.pathPrefix}`;
    this.secretToken = guiConf.secretToken;
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
    this._dispatchOnConnect(); // eslint-disable-line no-underscore-dangle
    this.stompClient = Webstomp.client(this.url, { debug: true });

    // TODO : replace X-Joal-Username with a random value
    this.stompClient.connect({ 'X-Joal-Auth-Token': this.secretToken, 'X-Joal-Username': 'qdsd' }, (/* response */) => {
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
      // Some time this event is called for non-disconnect events, in shuch case returns
      if (error.constructor.name !== 'CloseEvent') {
        // TODO : dispath err notif
        console.log(error);
        return;
      }

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
      this._reconnectAfterTimeout(); // eslint-disable-line no-underscore-dangle
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

  _reconnectAfterTimeout() {
    this.subscriptions.forEach(sub => sub.unsubscribe()); // release resources
    this.subscriptions = [];
    setTimeout(() => {
      this.connect();
    }, 8000);
  }

}
