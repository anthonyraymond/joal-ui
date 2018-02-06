// @flow
export type GlobalSeedStartedPayload = {
  client: string
};

export type ClientState = {
  isFetching: boolean,
  isStarted: boolean,
  name: string
};
