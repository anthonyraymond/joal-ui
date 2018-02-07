// @flow
import { connect } from 'react-redux';
import ClientInfoComponent from './clientInfo.component';
import { sendStartSession, sendStopSession } from '../../api';
import type { StateType } from '../../types';

const calculateGobalSpeed = (speeds) => {
  if (speeds.length === 0) {
    return 0;
  }
  return speeds.reduce((prevVal, speed) => (
    prevVal + speed.bytesPerSecond
  ), 0);
};

function mapStateToProps(state: StateType) {
  return {
    client: state.api.client.name,
    overallUploadSpeed: calculateGobalSpeed(state.api.speed),
    isStarted: state.api.client.isStarted,
    onClickStart: () => sendStartSession(),
    onClickStop: () => sendStopSession()
  };
}

export default connect(mapStateToProps)(ClientInfoComponent);
