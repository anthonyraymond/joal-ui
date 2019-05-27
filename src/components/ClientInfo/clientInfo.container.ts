// @flow
import { connect } from 'react-redux';
import ClientInfoComponent from './clientInfo.component';
import { sendStartSession, sendStopSession } from '../../modules/joal-api';

import { JoalState } from '../../reducers/types';

const calculateGobalSpeed = (speeds: Array<{ bytesPerSeconds: number }>) => {
  if (speeds.length === 0) {
    return 0;
  }
  return speeds.reduce((prevVal: number, speed) => (
    prevVal + speed.bytesPerSeconds
  ), 0);
};

const mapStateToProps = (state: JoalState) => {
  return {
    client: state.api.client.name,
    overallUploadSpeed: calculateGobalSpeed(state.api.speed),
    isStarted: state.api.client.isStarted,
    numberOfQueuedTorrents: state.api.torrentFiles.length - state.api.announcers.length,
    onClickStart: () => sendStartSession(),
    onClickStop: () => sendStopSession()
  };
}

export default connect(mapStateToProps)(ClientInfoComponent);
