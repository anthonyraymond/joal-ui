// @flow
import { connect } from 'react-redux';
import UploadSpeed from './uploadSpeed.component';

const mapStateToProps = (state, ownProps: { infoHash: string }) => {
  const foundSpeed = state.api.speed.find(speed => speed.infoHash === ownProps.infoHash);

  return {
    speedInBytesPerSeconds: foundSpeed === null || foundSpeed === undefined ? undefined : foundSpeed.bytesPerSeconds
  };
}

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UploadSpeed);
