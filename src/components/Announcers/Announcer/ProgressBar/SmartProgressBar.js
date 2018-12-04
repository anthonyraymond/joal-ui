// @flow
import React from 'react';
import DeterminateProgresBar from './DeterminateProgresBar';
import UndeterminateProgressBar from './UndeterminateProgressBar';

type SmartAnnounceProps = {
  className?: string,
  color?: 'primary' | 'secondary',
  infoHash: string,
  isFetching: boolean,
  nextAnnounceIn?: number,
  announceInterval?: number
};

const SmartAnnounceProgressBar = (props: SmartAnnounceProps) => {
  const {
    className, color, isFetching, nextAnnounceIn, announceInterval, infoHash
  } = props;

  if (isFetching) {
    return (<UndeterminateProgressBar color={color} className={className} />);
  }

  const currentValue = announceInterval - nextAnnounceIn;
  const maxValue = announceInterval;
  return (
    <DeterminateProgresBar
      className={className}
      color={color}
      infoHash={infoHash}
      startAt={currentValue}
      maxValue={maxValue}
    />
  );
};
SmartAnnounceProgressBar.defaultProps = {
  className: '',
  color: 'primary',
  nextAnnounceIn: undefined,
  announceInterval: undefined
};

export default SmartAnnounceProgressBar;
