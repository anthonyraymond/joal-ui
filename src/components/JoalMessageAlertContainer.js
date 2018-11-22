// @flow
import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import { removeNotification } from '../notifications/notifications.actions';
import type { StateType, Dispatch } from '../types';
import type { Notification } from '../notifications/types';

class JoalMessageAlertContainer extends Component {
  props: {
    alert: {}, // given by withAlert wrapper
    notifs: Array<Notification>,
    shouldShowDirtyConfNotif: boolean,
    onMessageClosed: (id: string) => void
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  componentDidUpdate(prevProps) {
    const { shouldShowDirtyConfNotif, alert, notifs } = this.props;
    if (prevProps.shouldShowDirtyConfNotif !== shouldShowDirtyConfNotif) {
      if (shouldShowDirtyConfNotif === true) {
        alert.info('Config wont be refreshed until you restart JOAL', {
          id: 'dirtyConfID'
        });
      } else {
        alert.remove('dirtyConfID');
      }
    }

    if (notifs === prevProps.notifs) {
      return;
    }
    // Remove notifications that are not present anymore
    notifs.forEach(oldNotif => {
      if (notifs.findIndex(n => n.id === oldNotif.id) === -1) {
        alert.remove(oldNotif.id);
      }
    });

    // Add new notifications
    notifs.forEach(newNotif => {
      if (prevProps.notifs.findIndex(n => n.id === newNotif.id) === -1) {
        this.showNotification(newNotif);
      }
    });
  }

  showNotification(notification) {
    const { alert, onMessageClosed } = this.props;
    const notifCopy = Object.assign({}, notification, {
      onClose: () => onMessageClosed(notification.id)
    });
    const { text } = notifCopy;
    switch (notifCopy.type) {
      case 'ERROR': {
        alert.error(<span>{text}</span>, notifCopy);
        break;
      }
      case 'SUCCESS': {
        alert.success(text, notifCopy);
        break;
      }
      case 'INFO': {
        alert.info(text, notifCopy);
        break;
      }
      default: {
        console.error(`Unknown AlertMessage type: ${notifCopy.type}`);
      }
    }
  }

  render() {
    return (
      <span />
    );
  }
}


function mapStateToProps(state: StateType) {
  const { notifs, shouldShowDirtyConfNotif } = state.notifications;
  return {
    notifs,
    shouldShowDirtyConfNotif
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return ({
    onMessageClosed: (id: string) => dispatch(removeNotification(id))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(withAlert(JoalMessageAlertContainer));
