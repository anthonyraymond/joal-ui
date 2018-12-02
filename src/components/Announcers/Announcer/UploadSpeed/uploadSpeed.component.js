// @flow
import React from 'react';
import filesize from 'filesize';
import Typography from '@material-ui/core/Typography';

type Props = {
  className?: string,
  speedInBytesPerSeconds: ?number
};

const UploadSpeed = (props: Props) => {
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
