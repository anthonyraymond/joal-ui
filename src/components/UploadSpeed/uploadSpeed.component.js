// @flow
import React from 'react';
import filesize from 'filesize';
import ReactTooltip from 'react-tooltip';

type Props = {
  infoHash: string,
  speedInBytesPerSeconds: ?number
};

// The ReactTooltip does not support some special character, we need to create an infoHash with normal chars only
const normalizeInfoHash = (infoHash: string) => btoa(infoHash);

const UploadSpeed = (props: Props) => {
  const { infoHash, speedInBytesPerSeconds } = props;

  return (
    <div>
      <span data-for={`upSpeed${normalizeInfoHash(infoHash)}`} data-tip="Current upload speed">
        {speedInBytesPerSeconds === undefined ? '? B/s' : `${filesize(speedInBytesPerSeconds, { base: 10 })}/s`}
      </span>
      <ReactTooltip id={`upSpeed${normalizeInfoHash(infoHash)}`} />
    </div>
  );
};

export default UploadSpeed;
