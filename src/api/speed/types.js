// @flow
export type Speed = {
  infoHash: string,
  bytesPerSeconds: number
};

export type SpeedState = Array<Speed>;

export type SeedingSpeedHasChangedPayload = {
  speeds: Array<Speed>
};
