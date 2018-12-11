// @flow
import { connect } from 'react-redux';
import ClientInfoComponent from './clientInfo.component';
import { sendStartSession, sendStopSession } from '../../modules/joal-api';
import type { StateType } from '../../types';

const calculateGobalSpeed = (speeds) => {
  if (speeds.length === 0) {
    return 0;
  }
  return speeds.reduce((prevVal, speed) => (
    prevVal + speed.bytesPerSeconds
  ), 0);
};

function mapStateToProps(state: StateType) {
  // TODO : performance issue
  const announcersIds = state.api.announcers.map(an => an.infoHash);
  return {
    client: state.api.client.name,
    overallUploadSpeed: calculateGobalSpeed(state.api.speed),
    isStarted: state.api.client.isStarted,
    numberOfQueuedTorrents: state.api.torrentFiles.filter(tf => !announcersIds.includes(tf.infoHash)).length,
    onClickStart: () => sendStartSession(),
    onClickStop: () => sendStopSession()
  };
}

export default connect(mapStateToProps)(ClientInfoComponent);
