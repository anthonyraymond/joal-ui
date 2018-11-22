// @flow
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Tooltip from '@material-ui/core/Tooltip';
import filesize from 'filesize';
import classnames from 'classnames';
import PeerStats from './Peers';
import AnnounceProgressBar from './ProgressBar';
// import UploadIcon from './UploadIcon';
import UploadSpeed from './UploadSpeed';
import type { Announcer as AnnouncerType } from '../types';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit
  },
  uploadSpeedContainer: {
    bottom: 5,
    fontSize: 18,
    position: 'absolute',
    right: theme.spacing.unit * 2
  },
  peersStats: {
    fontSize: 14
  },
  deleteButton: {
    color: theme.palette.error.main,
    '&:hover': {
      backgroundColor: fade(theme.palette.error.main, theme.palette.action.hoverOpacity)
    },
    position: 'absolute',
    right: 2,
    top: 2,
    padding: 0,
    height: 35,
    width: 42
  },
  announceProgressBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  }
});

type Props = {
  classes: {},
  className?: string,
  announcer: AnnouncerType,
  onClickDeleteTorrent: (infoHash: string) => void
};

const Announcer = (props: Props) => {
  const {
    className: classNameProps, classes, announcer, onClickDeleteTorrent
  } = props;
  let nextAnnounceIn = announcer.lastKnownInterval;
  if (announcer.lastAnnouncedAt !== undefined) {
    const lastAnnounceDate = Date.parse(announcer.lastAnnouncedAt);
    const deltaBetweenLastAnnounce = (Date.now() - lastAnnounceDate) / 1000;
    nextAnnounceIn = Math.round(announcer.lastKnownInterval - deltaBetweenLastAnnounce);
  }

  return (
    <Paper elevation={2} style={{ position: 'relative' }} className={classnames(classes.root, classNameProps)}>
      <Typography
        variant="body2"
        gutterBottom
      >
        {`${announcer.torrentName} (${filesize(announcer.torrentSize, { standard: 'iec' })})`}
      </Typography>
      <Tooltip title="Delete this torrent" placement="top">
        <IconButton
          className={classes.deleteButton}
          aria-label="Delete"
          onClick={() => onClickDeleteTorrent(announcer.infoHash)}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <PeerStats className={classes.peersStats} leechers={announcer.lastKnownLeechers} seeders={announcer.lastKnownSeeders} />
      <div className={classes.uploadSpeedContainer}>
        <UploadSpeed
          infoHash={announcer.infoHash}
        />
      </div>
      <AnnounceProgressBar
        className={classes.announceProgressBar}
        infoHash={announcer.infoHash}
        isFetching={announcer.isFetching}
        announceInterval={announcer.lastKnownInterval}
        nextAnnounceIn={nextAnnounceIn}
      />
    </Paper>
  );
};
Announcer.defaultProps = {
  className: ''
};

export default withStyles(styles)(Announcer);
