export const FAILED_TO_ANNOUNCE = '@@api/listener/FAILED_TO_ANNOUNCE';
export const SUCCESSFULLY_ANNOUNCE = '@@api/listener/SUCCESSFULLY_ANNOUNCE';
export const TOO_MANY_ANNOUNCES_FAILED = '@@api/listener/TOO_MANY_ANNOUNCES_FAILED';
export const WILL_ANNOUNCE = '@@api/listener/WILL_ANNOUNCE';

export const RESET_ANNOUNCER_STATE = '@@reset/RESET_ANNOUNCER_STATE';

export const resetAnnouncerState = () => (
  { type: RESET_ANNOUNCER_STATE }
);
