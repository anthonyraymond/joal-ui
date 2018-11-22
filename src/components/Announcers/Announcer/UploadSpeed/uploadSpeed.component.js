// @flow
import React from 'react';
import filesize from 'filesize';

type Props = {
  className?: string,
  speedInBytesPerSeconds: ?number
};

const UploadSpeed = (props: Props) => {
  const { className: classNameProps, speedInBytesPerSeconds } = props;

  return (
    <div className={classNameProps}>
      {speedInBytesPerSeconds === undefined ? '? B/s' : `${filesize(speedInBytesPerSeconds, { base: 10 })}/s`}
    </div>
  );
};
UploadSpeed.defaultProps = {
  className: ''
};

export default UploadSpeed;
