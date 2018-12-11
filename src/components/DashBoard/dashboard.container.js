// @flow
import { connect } from 'react-redux';
import isElectron from 'is-electron';
import Dashboard from './dashboard.component';
import { uploadTorrents } from '../../modules/joal-api';
import type { StateType } from '../../types';

function mapStateToProps(state: StateType) {
  return {
    isStarted: state.api.client.isStarted,
    isConnectedToWebSocket: state.api.stomp.isConnected,
    isClientGlobalStatePending: state.api.client.isFetching,
    shouldDisplayConfigChangerButton: !isElectron()
  };
}
function mapDispatchToProps() {
  return {
    uploadTorrentFiles: (files) => uploadTorrents(files)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
