// @flow
import { connect } from 'react-redux';
import UploadSpeed from './uploadSpeed.component';
import type { StateType } from '../../../../types';


function mapStateToProps(state: StateType, ownProps: { infoHash: string }) {
  const foundSpeed = state.api.speed.find(speed => speed.infoHash === ownProps.infoHash);

  return {
    speedInBytesPerSeconds: foundSpeed === null || foundSpeed === undefined ? undefined : foundSpeed.bytesPerSeconds
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadSpeed);
