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

const SmartAnnounceProgressBar: React.FC<SmartAnnounceProps> = (props) => {
  const {
    className, color, isFetching, nextAnnounceIn, announceInterval, infoHash
  } = props;

  if (isFetching) {
    return (<UndeterminateProgressBar color={color || 'primary'} className={className} />);
  }

  const currentValue = (announceInterval || 0) - (nextAnnounceIn || 0);
  const maxValue = announceInterval;
  return (
    <DeterminateProgresBar
      className={className}
      color={color || 'primary'}
      infoHash={infoHash}
      startAt={currentValue}
      maxValue={maxValue || 0}
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
