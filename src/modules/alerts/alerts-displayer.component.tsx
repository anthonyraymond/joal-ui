import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { withAlert, AlertManager } from 'react-alert';
import { connect } from 'react-redux';
import { removeNotification } from './alerts.actions';

import { JoalState } from '../../reducers/types';
import { Notification } from './types';

interface JoalAlertDisplayerProps {
  alert: AlertManager, // given by withAlert wrapper
  notifs: Array<Notification>,
  shouldShowDirtyConfNotif: boolean,
  onMessageClosed: (id: string) => void
}

class JoalAlertDisplayer extends Component<JoalAlertDisplayerProps> {

  shouldComponentUpdate(nextProps: JoalAlertDisplayerProps) {
    const { notifs: currentNotifs, shouldShowDirtyConfNotif: currentShouldShowDirtyConfNotif } = this.props;
    return (currentNotifs !== nextProps.notifs || currentShouldShowDirtyConfNotif !== nextProps.shouldShowDirtyConfNotif);
  }

  componentDidUpdate(prevProps: JoalAlertDisplayerProps) {
    const { shouldShowDirtyConfNotif, alert, notifs } = this.props;
    if (prevProps.shouldShowDirtyConfNotif !== shouldShowDirtyConfNotif) {
      if (shouldShowDirtyConfNotif === true) {
        alert.info('Config wont be refreshed until you restart JOAL');
      }
    }

    if (notifs === prevProps.notifs) {
      return;
    }

    // Add new notifications
    notifs.forEach(newNotif => {
      if (prevProps.notifs.findIndex(n => n.id === newNotif.id) === -1) {
        this.showNotification(newNotif);
      }
    });
  }

  showNotification(notification: Notification) {
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


function mapStateToProps(state: JoalState) {
  const { notifs, shouldShowDirtyConfNotif } = state.alerts;
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

export default withAlert()(connect(mapStateToProps, mapDispatchToProps)(JoalAlertDisplayer));
