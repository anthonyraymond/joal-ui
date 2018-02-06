// @flow
export type Announcer = {
  infoHash: string,
  isFetching: boolean,
  interval: number
};

export type AnnouncerState = Array<Announcer>;

type AnnouncerPayload = {
  infoHash: string
};

export type FailedToAnnouncePayload = AnnouncerPayload & {
  errMessage: string,
  dateTime: string,
  interval: number
};

export type SuccessfullyAnnouncePayload = AnnouncerPayload & {
  dateTime: string,
  requestEvent: 'NONE' | 'COMPLETED' | 'STARTED' | 'STOPPED',
  interval: number
};

export type TooManyAnnouncesFailedPayload = AnnouncerPayload;

export type WillAnnouncePayload = AnnouncerPayload & {
  dateTime: string
};
