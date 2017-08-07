// @flow
import React from 'react';
import DeterminateProgresBar from './DeterminateProgresBar';
import UndeterminateProgressBar from './UndeterminateProgressBar';

type SmartAnnounceProps = {
  isFetching: boolean,
  nextAnnounceIn?: number,
  announceInterval?: number
};

const SmartAnnounceProgressBar = (props: SmartAnnounceProps) => {
  const { isFetching, nextAnnounceIn, announceInterval } = props;
  if (isFetching) {
    return (<UndeterminateProgressBar />);
  }

  const currentValue = announceInterval - nextAnnounceIn;
  const maxValue = announceInterval;
  return (
    <DeterminateProgresBar
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
