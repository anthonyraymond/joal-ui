// @flow
import React from 'react';
import DeterminateProgresBar from './DeterminateProgresBar';
import UndeterminateProgressBar from './UndeterminateProgressBar';

type SmartAnnounceProps = {
  infoHash: string,
  isFetching: boolean,
  nextAnnounceIn: ?number,
  announceInterval:? number
};

const SmartAnnounceProgressBar = (props: SmartAnnounceProps) => {
  const { isFetching, nextAnnounceIn, announceInterval, infoHash } = props;
  if (isFetching) {
    return (<UndeterminateProgressBar />);
  }

  const currentValue = announceInterval - nextAnnounceIn;
  const maxValue = announceInterval;
  return (
    <DeterminateProgresBar
      infoHash={infoHash}
      startAt={currentValue}
      maxValue={maxValue}
    />
  );
};
SmartAnnounceProgressBar.defaultProps = {
  nextAnnounceIn: undefined,
  announceInterval: undefined
};

export default SmartAnnounceProgressBar;
