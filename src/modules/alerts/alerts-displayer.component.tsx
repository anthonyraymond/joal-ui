// @flow
import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import { removeNotification } from './alerts.actions';

class JoalAlertDisplayer extends Component {
  props: {
    alert: {}, // given by withAlert wrapper
    notifs: Array<>,
    shouldShowDirtyConfNotif: boolean,
    onMessageClosed: (id: string) => void
  }

  shouldComponentUpdate(nextProps) {
    const { notifs: currentNotifs, shouldShowDirtyConfNotif: currentShouldShowDirtyConfNotif } = this.props;
    return (currentNotifs !== nextProps.notifs || currentShouldShowDirtyConfNotif !== nextProps.shouldShowDirtyConfNotif);
  }

  componentDidUpdate(prevProps) {
    const { shouldShowDirtyConfNotif, alert, notifs } = this.props;
    if (prevProps.shouldShowDirtyConfNotif !== shouldShowDirtyConfNotif) {
      if (shouldShowDirtyConfNotif === true) {
        alert.info('Config wont be refreshed until you restart JOAL', {
          id: 'dirtyConfID'
        });
      } else {
        alert.remove({ id: 'dirtyConfID' });
      }
    }

    if (notifs === prevProps.notifs) {
      return;
    }
    // Remove notifications that are not present anymore
    notifs.forEach(oldNotif => {
      if (notifs.findIndex(n => n.id === oldNotif.id) === -1) {
        alert.remove({ id: oldNotif.id });
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


function mapStateToProps(state) {
  const { notifs, shouldShowDirtyConfNotif } = state.alerts;
  return {
    notifs,
    shouldShowDirtyConfNotif
  };
}

function mapDispatchToProps(dispatch) {
  return ({
    onMessageClosed: (id: string) => dispatch(removeNotification(id))
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(JoalAlertDisplayer));
