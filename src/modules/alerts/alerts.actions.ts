export const REMOVE_NOTIFICATION = '@@notifications/REMOVE_NOTIFICATION';

export const removeNotification = (id: string) => ({
  type: REMOVE_NOTIFICATION,
  payload: id
});
