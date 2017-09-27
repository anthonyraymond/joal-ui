// @flow
import { connect } from 'react-redux';
import ClientInfoComponent from './clientInfo.component';
import { sendStartSession, sendStopSession } from '../../api';
import type { StateType } from '../../types';

const calculateGobalSpeed = (announcers) => {
  if (announcers.length === 0) {
    return 0;
  }
  return announcers.reduce((prevVal, announcer) => (
    prevVal + announcer.currentSpeed
  ), 0);
};

function mapStateToProps(state: StateType) {
  return {
    client: state.api.client.name,
    overallUploadSpeed: calculateGobalSpeed(state.api.announcers),
    isStarted: state.api.client.isStarted,
    onClickStart: () => sendStartSession(),
    onClickStop: () => sendStopSession()
  };
}

export default connect(mapStateToProps)(ClientInfoComponent);
