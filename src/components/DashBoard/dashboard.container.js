// @flow
import { connect } from 'react-redux';
import isElectron from 'is-electron';
import Dashboard from './dashboard.component';
import type { StateType } from '../../types';

function mapStateToProps(state: StateType) {
  return {
    isStarted: state.api.client.isStarted,
    isConnectedToWebSocket: state.api.stomp.isConnected,
    isClientGlobalStatePending: state.api.client.isFetching,
    shouldDisplayConfigChangerButton: !isElectron()
  };
}

export default connect(mapStateToProps)(Dashboard);
