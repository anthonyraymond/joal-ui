// @flow
import { connect } from 'react-redux';
import QueuedTorrentComponent from './queuedTorrents.component';
import type { StateType } from '../../types';

function mapStateToProps(state: StateType) {
  const announcersIds = state.api.announcers.map(an => an.id);
  return {
    queuedTorrents: state.api.torrentFiles.filter(tf => !announcersIds.includes(tf.id))
  };
}

export default connect(mapStateToProps)(QueuedTorrentComponent);
