export interface ApiState {
  torrentFiles: Array<TorrentFile>
  client: Client,
  announcers: Array<Announcer>,
  settings: Settings,
  speed: Array<Speed>,
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
  keepTorrentWithZeroLeechers: boolean
}

export interface Settings {
  isDirty: boolean,
  errMessage?: string,
  config: Config,
  availableClients: Array<string>
}

export interface Speed {
  infoHash: string,
  bytesPerSeconds: number
}
