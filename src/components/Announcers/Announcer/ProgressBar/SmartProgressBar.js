// @flow
import React from 'react';
import DeterminateProgresBar from './DeterminateProgresBar';
import UndeterminateProgressBar from './UndeterminateProgressBar';

type SmartAnnounceProps = {
  className?: string,
  infoHash: string,
  isFetching: boolean,
  nextAnnounceIn?: number,
  announceInterval?: number
};

const SmartAnnounceProgressBar = (props: SmartAnnounceProps) => {
  const {
    className, isFetching, nextAnnounceIn, announceInterval, infoHash
  } = props;

  if (isFetching) {
    return (<UndeterminateProgressBar className={className} />);
  }

  const currentValue = announceInterval - nextAnnounceIn;
  const maxValue = announceInterval;
  return (
    <DeterminateProgresBar
      className={className}
      infoHash={infoHash}
      startAt={currentValue}
      maxValue={maxValue}
    />
  );
};
SmartAnnounceProgressBar.defaultProps = {
  className: '',
  nextAnnounceIn: undefined,
  announceInterval: undefined
};

export default SmartAnnounceProgressBar;
