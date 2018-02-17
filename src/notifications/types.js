// @flow
export type Notification = {
  id: string,
  text: string,
  time: number,
  type: 'SUCCESS' | 'INFO' | 'ERROR'
};
export type NotificationState = {
  shouldShowDirtyConfNotif: boolean,
  notifs: Array<Notification>
};
