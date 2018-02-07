// @flow
export type Speed = {
  infoHash: string,
  bytesPerSecond: number
};

export type SpeedState = Array<Speed>;

export type SeedingSpeedHasChangedPayload = {
  speeds: Array<Speed>
};
