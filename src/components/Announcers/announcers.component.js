// @flow
import React from 'react';
import Announcer from './Announcer';
import type { Announcer as AnnouncerType } from './types';

type Props = {
  announcers: Array<AnnouncerType>,
  onClickDeleteTorrent: (infoHash: string) => void
};

const Announcers = ({ announcers, onClickDeleteTorrent }: Props) => (
  <div>
    {announcers.map((announcer) => (
      <div key={announcer.infoHash}>
        <Announcer announcer={announcer} onClickDeleteTorrent={onClickDeleteTorrent} />
        <br />
      </div>
    ))}
    { announcers.length === 0 &&
      <div className="text-center">
        {'No torrents are currently seeding.'}
        <br />
        {'Drag and Drop torrents into the windows to start seeding'}
      </div>
    }
    { announcers.length !== 0 &&
      <div className="text-center">
        {`${announcers.length} torrents currently seeding ...`}
      </div>
    }
  </div>
);

export default Announcers;
