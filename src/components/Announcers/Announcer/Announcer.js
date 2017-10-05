// @flow
import React from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Deleteicon from 'material-ui/svg-icons/action/delete-forever';
import { red500 } from 'material-ui/styles/colors';
import filesize from 'filesize';
import PeerStats from './Peers';
import AnnounceProgressBar from './ProgressBar';
import UploadIcon from './UploadIcon';
import UploadSpeed from './UploadSpeed';
import styles from './styles.css';
import type { Announcer as AnnouncerType } from '../types';

type Props = {
  announcer: AnnouncerType,
  onClickDeleteTorrent: (infoHash: string) => void
};

const Announcer = (props: Props) => {
  const { announcer, onClickDeleteTorrent } = props;
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
          <Subheader className={styles.torrentName}>{announcer.name}{' '}{`(${filesize(announcer.size, { standard: 'iec' })})`}</Subheader>

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
          <div className={styles.deleteButtonWrapper}>
            <IconButton
              className={styles.deleteButton}
              tooltip="Delete this torrent"
              tooltipPosition="top-center"
              onClick={() => onClickDeleteTorrent(announcer.id)}
            >
              <Deleteicon color={red500} />
            </IconButton>
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
