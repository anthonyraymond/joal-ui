// @flow
import update from 'immutability-helper';
import { connect } from 'react-redux';
import Announcers from './announcers.component';
import type { StateType } from '../../types';

const fixAnnouncerSpeed = (announcers) => {
  if (announcers.length < 2) {
    return announcers;
  }
  return Object.assign([], announcers.map(an => {
    if (an.currentSpeed === 0) {
      return an;
    }
    return update(an, { currentSpeed: { $set: an.currentSpeed / announcers.length } });
  }));
};

function mapStateToProps(state: StateType) {
  return {
    announcers: fixAnnouncerSpeed(state.api.announcers)
  };
}

export default connect(mapStateToProps)(Announcers);
