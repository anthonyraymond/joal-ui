export interface ApiState {
  torrentFiles: Array<TorrentFile>
  client: Client,
  announcers: Array<Announcer>,
  settings: Settings,
  speed: SpeedsArray,
  stomp: Stomp
}

export interface TorrentFile {
  infoHash: string
}

export interface Client {
  isFetching: boolean,
  isStarted: boolean,
  name: string
}

export interface Stomp {
  isConnected: boolean,
  isFullyInit: boolean
}

export interface Announcer {
  infoHash: string,
  torrentName: string,
  torrentSize: number,
  lastKnownInterval: number,
  consecutiveFails: number,
  lastAnnouncedAt?: string,
  lastKnownLeechers?: number,
  lastKnownSeeders?: number,
  isFetching: boolean
};

export interface Config {
  minUploadRate: number,
  maxUploadRate: number,
  simultaneousSeed: number,
  client: string,
  keepTorrentWithZeroLeechers: boolean,
  uploadRatioTarget: number
}

export interface Settings {
  isDirty: boolean,
  errMessage?: string,
  config: Config,
  availableClients: Array<string>
}

// See https://www.typescriptlang.org/docs/handbook/interfaces.html#indexable-types
export interface SpeedsArray {
  [infohash: string]: Speed
}

export interface Speed {
  infoHash: string,
  bytesPerSecond: number
}
