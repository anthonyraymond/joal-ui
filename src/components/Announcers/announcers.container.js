// @flow
import update from 'immutability-helper';
import { connect } from 'react-redux';
import Announcers from './announcers.component';
import { deleteTorrent } from '../../api';
import type { StateType } from '../../types';


const fixAnnouncerSpeed = (announcers) => {
  if (announcers.length < 2) {
    return announcers;
  }
  const torrentCount = announcers.filter(an => an.currentSpeed > 0).length;
  return Object.assign([], announcers.map(an => {
    if (an.currentSpeed === 0) {
      return an;
    }
    return update(an, { currentSpeed: { $set: an.currentSpeed / torrentCount } });
  }));
};

function mapStateToProps(state: StateType) {
  return {
    announcers: fixAnnouncerSpeed(state.api.announcers)
  };
}

function mapDispatchToProps() {
  return {
    onClickDeleteTorrent: (infoHash) => deleteTorrent(infoHash)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Announcers);
