// @flow
export const SEEDING_SPEED_HAS_CHANGED = '@@api/listener/SEEDING_SPEED_HAS_CHANGED';

export const RESET_SPEED_STATE = '@@reset/RESET_SPEED_STATE';

export const resetSpeedState = () => (
  { type: RESET_SPEED_STATE }
);
