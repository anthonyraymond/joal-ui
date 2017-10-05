// @flow
import { connect } from 'react-redux';
import ClientInfoComponent from './clientInfo.component';
import { sendStartSession, sendStopSession } from '../../api';
import type { StateType } from '../../types';

const calculateGobalSpeed = (announcers) => {
  if (announcers.length === 0) {
    return 0;
  }
  // We need this weird division because the currentSpeed property is actually the max speed that the torrent would use if there were no other torrents
  //  but joal-core divide the speed for all torrent that are currently seeding (with more than 0 b/s)
  const announcersCount = announcers.filter(announcer => announcer.currentSpeed > 0).length;
  const divider = (announcersCount > 0 ? announcersCount : 1);
  return announcers.reduce((prevVal, announcer) => (
    prevVal + (announcer.currentSpeed / divider)
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
