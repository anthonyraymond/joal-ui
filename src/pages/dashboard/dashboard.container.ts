import { connect } from 'react-redux';
import isElectron from 'is-electron';
import Dashboard from './dashboard.component';
import { uploadTorrents } from '../../modules/joal-api';

import { JoalState } from '../../reducers/types';

function mapStateToProps(state: JoalState) {
  return {
    isStarted: state.api.client.isStarted,
    isConnectedToWebSocket: state.api.stomp.isConnected,
    isClientGlobalStatePending: state.api.client.isFetching,
    shouldDisplayConfigChangerButton: !isElectron()
  };
}
function mapDispatchToProps() {
  return {
    uploadTorrentFiles: (files: Array<File>) => uploadTorrents(files)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
