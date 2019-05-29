// @flow
import { connect } from 'react-redux';
import ClientInfoComponent from './clientInfo.component';
import { sendStartSession, sendStopSession } from '../../modules/joal-api';

import { JoalState } from '../../reducers/types';
import { SpeedsArray } from '../../modules/joal-api/types';

const calculateGobalSpeed = (speeds: SpeedsArray) => {
  let totalSpeed = 0
  for (let speed of Object.values(speeds)) {
    totalSpeed += speed.bytesPerSeconds;
  }
  return totalSpeed;
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
