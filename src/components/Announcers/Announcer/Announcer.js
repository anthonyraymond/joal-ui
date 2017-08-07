// @flow
import React from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import filesize from 'filesize';
import PeerStats from './Peers';
import AnnounceProgressBar from './ProgressBar';
import UploadIcon from './UploadIcon';
import UploadSpeed from './UploadSpeed';
import styles from './styles.css';
import type { Announcer as AnnouncerType } from '../types';

type Props = {
  announcer: AnnouncerType
};

const Announcer = ({ announcer }: Props) => {
  let nextAnnounceIn = announcer.interval;
  if (announcer.announceHistory.length > 0 && announcer.interval) {
    const lastAnnounceDate = Date.parse(
      announcer.announceHistory[announcer.announceHistory.length - 1].dateTime
    );
    const deltaBetweenLastAnnounce = (Date.now() - lastAnnounceDate) / 1000;
    nextAnnounceIn = Math.round(announcer.interval - deltaBetweenLastAnnounce);
  }

  return (
    <div className="row">
      <div className="col-xs-12">
        <Paper zDepth={2} style={{ position: 'relative' }}>
          <Subheader>{announcer.name}{' '}{`(${filesize(announcer.size, { standard: 'iec' })})`}</Subheader>

          <div className={styles.statsContainer}>
            <PeerStats leechers={announcer.leechers} seeders={announcer.seeders} />
            <div className={styles.uploadSpeedContainer}>
              <UploadIcon />
              <UploadSpeed
                id={announcer.id}
                speedInBytesPerSeconds={announcer.currentSpeed}
              />
            </div>
          </div>
          <AnnounceProgressBar
            isFetching={announcer.isFetching}
            announceInterval={announcer.interval}
            nextAnnounceIn={nextAnnounceIn}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Announcer;
