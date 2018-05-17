// @flow
export type Announcer = {
  infoHash: string,
  torrentName: string,
  torrentSize: number,
  lastKnownInterval: number,
  consecutiveFails: number,
  lastAnnouncedAt: ?string,
  lastKnownLeechers: ?number,
  lastKnownSeeders: ?number,
  isFetching: boolean
};

export type AnnouncerState = Array<Announcer>;

type AnnouncerPayload = {
  infoHash: string,
  torrentName: string,
  torrentSize: number,
  lastKnownInterval: number,
  consecutiveFails: number,
  lastAnnouncedAt: ?string,
  lastKnownLeechers: ?number,
  lastKnownSeeders: ?number
};

export type FailedToAnnouncePayload = AnnouncerPayload & {
  errMessage: string
};

export type SuccessfullyAnnouncePayload = AnnouncerPayload & {
  requestEvent: 'NONE' | 'COMPLETED' | 'STARTED' | 'STOPPED'
};

export type TooManyAnnouncesFailedPayload = AnnouncerPayload;

export type WillAnnouncePayload = AnnouncerPayload;
