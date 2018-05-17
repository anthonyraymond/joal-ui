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
        : `${queuedTorrents.length} torrent${queuedTorrents.length === 1 ? ' is' : 's are'} queued...`
      }
    </div>
    <div className="text-center">
      {queuedTorrents.length === 0
        ? ''
        : 'You can increase \'Simultaneous seed\' property to seed more torrents at a time'
      }
    </div>
  </div>
);

export default QueuedTorrentComponent;
