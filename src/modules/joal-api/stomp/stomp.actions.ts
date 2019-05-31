export const IS_CONNECTING = '@@api/stompClient/IS_CONNECTING';
export const HAS_CONNECTED = '@@api/stompClient/HAS_CONNECTED';
export const HAS_FAILED_TO_CONNECT = '@@api/stompClient/HAS_FAILED_TO_CONNECT';
export const HAS_DROP_CONNECTION = '@@api/stompClient/HAS_DROP_CONNECTION';
export const INIT_OVER = '@@api/stompClient/INIT_OVER';
export const RECEIVED_ERROR_MESSAGE = '@@api/stompClient/RECEIVED_ERROR_MESSAGE';

export const RESET_STOMP_STATE = '@@reset/RESET_STOMP_STATE';


export const isConnecting = () => ({
  type: IS_CONNECTING
});

export const hasConnected = () => ({
  type: HAS_CONNECTED
});

export const hasFailedToConnect = () => ({
  type: HAS_FAILED_TO_CONNECT
});

export const hasDropConnection = () => ({
  type: HAS_DROP_CONNECTION
});

export const initOver = () => ({
  type: INIT_OVER
});

export const hasReceivedError = (message: string) => ({
  type: RECEIVED_ERROR_MESSAGE,
  message
});


export const resetStompState = () => (
  { type: RESET_STOMP_STATE }
);
