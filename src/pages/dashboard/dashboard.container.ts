// @flow
import { connect } from 'react-redux';
import isElectron from 'is-electron';
import Dashboard from './dashboard.component';
import { uploadTorrents } from '../../modules/joal-api';

function mapStateToProps(state) {
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
