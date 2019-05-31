export const GLOBAL_SEED_STARTED = '@@api/listener/GLOBAL_SEED_STARTED';
export const GLOBAL_SEED_STOPPED = '@@api/listener/GLOBAL_SEED_STOPPED';

export const SEND_START_TO_SERVER = '@@api/send/SEND_START_TO_SERVER';
export const SEND_STOP_TO_SERVER = '@@api/send/SEND_STOP_TO_SERVER';

export const RESET_CLIENT_STATE = '@@reset/RESET_CLIENT_STATE';


export function sendStartToServer() {
  return {
    type: SEND_START_TO_SERVER
  };
}

export function sendStopToServer() {
  return {
    type: SEND_STOP_TO_SERVER,
  };
}


export const resetClientState = () => (
  { type: RESET_CLIENT_STATE }
);
