// @flow
import React from 'react';
import filesize from 'filesize';
import ReactTooltip from 'react-tooltip';

type Props = {
  id: string,
  speedInBytesPerSeconds: number
};

const UploadSpeed = (props: Props) => {
  const { id, speedInBytesPerSeconds } = props;

  return (
    <div>
      <span data-for={`upSpeed${id}`} data-tip="Current upload speed">
        {`${filesize(speedInBytesPerSeconds, { base: 10 })}/s`}
      </span>
      <ReactTooltip id={`upSpeed${id}`} />
    </div>
  );
};

export default UploadSpeed;
