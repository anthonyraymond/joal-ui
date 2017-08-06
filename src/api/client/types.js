// @flow
export type SeedSessionHasStartedPayload = {
  client: string
};

export type ClientState = {
  isFetching: boolean,
  isStarted: boolean,
  name: string
};
