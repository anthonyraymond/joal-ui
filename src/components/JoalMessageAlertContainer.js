// @flow
import React, { Component } from 'react';
import AlertContainer from 'react-alert';
import { connect } from 'react-redux';
import { removeNotification } from '../notifications/notifications.actions';
import type { StateType, Dispatch } from '../types';
import type { Notification } from '../notifications/types';

class JoalMessageAlertContainer extends Component {
  props: {
    notifs: Array<Notification>,
    shouldShowDirtyConfNotif: boolean,
    onMessageClosed: (id: string) => void
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.shouldShowDirtyConfNotif !== this.props.shouldShowDirtyConfNotif) {
      if (this.props.shouldShowDirtyConfNotif === true) {
        this.reactAlert.info('Config wont be refreshed until you restart JOAL', {
          id: 'dirtyConfID'
        });
      } else {
        this.reactAlert.removeAlert('dirtyConfID');
      }
    }

    if (this.props.notifs === prevProps.notifs) {
      return;
    }
    // Remove notifications that are not present anymore
    prevProps.notifs.forEach(oldNotif => {
      if (this.props.notifs.findIndex(n => n.id === oldNotif.id) === -1) {
        this.reactAlert.removeAlert(oldNotif.id); // eslint-disable-line no-underscore-dangle
      }
    });

    // Add new notifications
    this.props.notifs.forEach(newNotif => {
      if (prevProps.notifs.findIndex(n => n.id === newNotif.id) === -1) {
        this.showNotification(newNotif);
      }
    });
  }

  showNotification(notification) {
    const notifCopy = Object.assign({}, notification, {
      onClose: () => this.props.onMessageClosed(notification.id)
    });
    const text = notifCopy.text;
    switch (notifCopy.type) {
      case 'ERROR': {
        this.reactAlert.error(<span>{text}</span>, notifCopy);
        break;
      }
      case 'SUCCESS': {
        this.reactAlert.success(text, notifCopy);
        break;
      }
      case 'INFO': {
        this.reactAlert.info(text, notifCopy);
        break;
      }
      default: {
        console.error(`Unknown AlertMessage type: ${notifCopy.type}`);
      }
    }
  }

  render() {
    return (
      <AlertContainer
        ref={a => { this.reactAlert = a; }}
        offset={14}
        position={'top right'}
        theme={'light'}
        time={0}
        transition={'scale'}
        style={{ zIndex: 16777272 }}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(JoalMessageAlertContainer);
