// @flow
export type Notification = {
  id: string,
  text: string,
  timeout: number,
  type: 'SUCCESS' | 'INFO' | 'ERROR'
};
export type NotificationState = {
  shouldShowDirtyConfNotif: boolean,
  notifs: Array<Notification>
};
