// @flow
import { connect } from 'react-redux';
import Announcers from './announcers.component';
import { deleteTorrent } from '../../modules/joal-api';
import type { StateType } from '../../types';


function mapStateToProps(state: StateType) {
  return {
    announcers: state.api.announcers
  };
}

function mapDispatchToProps() {
  return {
    onClickDeleteTorrent: (infoHash) => deleteTorrent(infoHash)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Announcers);
