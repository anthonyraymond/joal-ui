// @flow
import React from 'react';
import filesize from 'filesize';
import Typography from '@material-ui/core/Typography';

interface UploadSpeedProps {
  className?: string,
  speedInBytesPerSeconds?: number
};

const UploadSpeed: React.FC<UploadSpeedProps> = (props) => {
  const { className: classNameProps, speedInBytesPerSeconds } = props;

  return (
    <Typography variant="caption" className={classNameProps}>
      {speedInBytesPerSeconds === undefined ? '? B/s' : `${filesize(speedInBytesPerSeconds, { base: 10 })}/s`}
    </Typography>
  );
};
UploadSpeed.defaultProps = {
  className: ''
};

export default UploadSpeed;
