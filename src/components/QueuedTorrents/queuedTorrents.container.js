// @flow
import { connect } from 'react-redux';
import QueuedTorrentComponent from './queuedTorrents.component';
import type { StateType } from '../../types';

function mapStateToProps(state: StateType) {
  const announcersIds = state.api.announcers.map(an => an.infoHash);
  return {
    queuedTorrents: state.api.torrentFiles.filter(tf => !announcersIds.includes(tf.infoHash))
  };
}

export default connect(mapStateToProps)(QueuedTorrentComponent);
