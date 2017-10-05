// @flow
export const ANNOUNCER_HAS_STARTED = '@@api/listener/ANNOUNCER_HAS_STARTED';
export const ANNOUNCER_HAS_STOPPED = '@@api/listener/ANNOUNCER_HAS_STOPPED';
export const ANNOUNCER_WILL_ANNOUNCE = '@@api/listener/ANNOUNCER_WILL_ANNOUNCE';
export const ANNOUNCER_HAS_ANNOUNCED = '@@api/listener/ANNOUNCER_HAS_ANNOUNCED';
export const ANNOUNCER_HAS_FAILED_TO_ANNOUNCE = '@@api/listener/ANNOUNCER_HAS_FAILED_TO_ANNOUNCE';

export const RESET_ANNOUNCER_STATE = '@@reset/RESET_ANNOUNCER_STATE';

export const resetAnnouncerState = () => (
  { type: RESET_ANNOUNCER_STATE }
);
