// @flow
import { connect } from 'react-redux';
import UploadSpeed from './uploadSpeed.component';

import { JoalState } from '../../../../reducers/types';
import { Speed } from '../../../../modules/joal-api/types';

const mapStateToProps = (state: JoalState, ownProps: { infoHash: string }) => {
  const foundSpeed = state.api.speed.find((speed: Speed) => speed.infoHash === ownProps.infoHash);

  return {
    speedInBytesPerSeconds: foundSpeed === null || foundSpeed === undefined ? undefined : foundSpeed.bytesPerSeconds
  };
}

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UploadSpeed);
