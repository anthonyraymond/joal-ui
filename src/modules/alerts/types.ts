export interface Notification {
  id: string,
  text: string,
  timeout: number,
  type: 'SUCCESS' | 'INFO' | 'ERROR'
};
export interface NotificationState {
  shouldShowDirtyConfNotif: boolean,
  notifs: Array<Notification>
};
