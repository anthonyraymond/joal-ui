// @flow
export type TorrentFile = {
  id: string,
  name: string,
  size: number
};

export type TorrentFilePayload = TorrentFile;

export type FailedToAddTorrentFilePayload = {
  fileName: string,
  error: string
};

export type TorrentFilesState = Array<TorrentFilePayload>;