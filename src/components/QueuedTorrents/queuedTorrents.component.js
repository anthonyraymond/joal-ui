// @flow
import React from 'react';
import type { TorrentFile } from './types';

type Props = {
  queuedTorrents: Array<TorrentFile>
};

const QueuedTorrentComponent = ({ queuedTorrents }: Props) => (
  <div>
    <div className="text-center">
      {queuedTorrents.length === 0
        ? 'There is no more torrents in queue, consider adding some more!'
        : `${queuedTorrents.length} torrents are in queue ...`
      }
    </div>
  </div>
);

export default QueuedTorrentComponent;
