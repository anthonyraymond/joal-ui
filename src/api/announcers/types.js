// @flow
export type AnnounceResult =
  | {
    type: 'SUCCESS',
    dateTime: string
  }
  | {
    type: 'ERROR',
    dateTime: string,
    errMessage: string
  };

export type Announcer = {
  id: string,
  name: string,
  size: number,
  currentSpeed: number,
  interval?: number,
  seeders?: number,
  leechers?: number,
  announceHistory: Array<AnnounceResult>
};

export type AnnouncerState = Array<Announcer>;

export type AnnouncerPayload = {
  id: string,
  name: string,
  size: number,
  currentSpeed: number,
  interval?: number,
  seeders?: number,
  leechers?: number,
  announceHistory: Array<AnnounceResult>
};
