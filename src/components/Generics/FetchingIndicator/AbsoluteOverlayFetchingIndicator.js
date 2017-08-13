// @flow
import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 40,
    backgroundColor: 'rgba(200, 200, 200, 0.63)',
    zIndex: 9999
  },
  progress: {
    top: '50%',
    bottom: '50%',
    transform: 'translate(0, -50%)'
  }
};

type Props = {
  style?: {},
  containerStyle?: {},
  active: boolean
};

const AbsoluteOverlayFetchingIndicator = (props: Props) => {
  const { style, containerStyle, active, ...rest } = props;
  if (!active) {
    return (<div style={{ width: 0, height: 0, position: 'absolute' }} />);
  }
  return (
    <div className="text-center" style={Object.assign({}, styles.container, containerStyle)}>
      {active && <CircularProgress {...rest} style={Object.assign({}, styles.progress, style)} />}
    </div>
  );
};
AbsoluteOverlayFetchingIndicator.defaultProps = {
  style: {},
  containerStyle: {}
};

export default AbsoluteOverlayFetchingIndicator;
