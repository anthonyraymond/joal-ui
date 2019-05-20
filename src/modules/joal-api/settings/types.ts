// @flow
export type Config = {
  minUploadRate: number,
  maxUploadRate: number,
  simultaneousSeed: number,
  client: string,
  keepTorrentWithZeroLeechers: boolean
};
export type SettingsState = {
  isDirty: boolean,
  config: Config,
  availableClients: Array<string>,
  errMessage: ?string
};

export type SettingsPayload = {
  config: Config
};
export type InvalidConfigPayload = {
  error: string
};
export type ClientFilesDiscoveredPayload = {
  clients: Array<string>
};
