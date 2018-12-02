// @flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
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
  title: {
    marginTop: 3,
    lineHeight: 1.2,
    wordBreak: 'break-word'
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
  width: 'lg' | 'md' | 'sm' | 'xs',
  className?: string,
  announcer: AnnouncerType,
  onClickDeleteTorrent: (infoHash: string) => void
};

const Announcer = (props: Props) => {
  const {
    width: componentBreakpoint, className: classNameProps, classes, announcer, onClickDeleteTorrent
  } = props;
  let nextAnnounceIn = announcer.lastKnownInterval;
  if (announcer.lastAnnouncedAt !== undefined) {
    const lastAnnounceDate = Date.parse(announcer.lastAnnouncedAt);
    const deltaBetweenLastAnnounce = (Date.now() - lastAnnounceDate) / 1000;
    nextAnnounceIn = Math.round(announcer.lastKnownInterval - deltaBetweenLastAnnounce);
  }

  const maxAllowedTorrentNameLength = (componentBreakpoint === 'xs' || componentBreakpoint === 'sm') ? 70 : 175;
  let trimedTorrentName = announcer.torrentName;
  if (announcer.torrentName.length > maxAllowedTorrentNameLength) {
    trimedTorrentName = `${announcer.torrentName.substring(0, maxAllowedTorrentNameLength)}...`;
  }

  return (
    <Paper elevation={2} style={{ position: 'relative' }} className={classnames(classes.root, classNameProps)}>
      <Grid container direction="row">
        <Grid item xs>
          <Typography
            className={classes.title}
            variant="body2"
            gutterBottom
          >
            {`${trimedTorrentName} (${filesize(announcer.torrentSize, { standard: 'iec' })})`}
          </Typography>
        </Grid>
        <Grid item style={{ width: 42 }} alignContent="flex-end">
          <Tooltip title="Delete this torrent" placement="top">
            <IconButton
              className={classes.deleteButton}
              aria-label="Delete"
              onClick={() => onClickDeleteTorrent(announcer.infoHash)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item xs>
          <PeerStats className={classes.peersStats} leechers={announcer.lastKnownLeechers} seeders={announcer.lastKnownSeeders} />
        </Grid>
        <Grid item xs>
          <div className={classes.uploadSpeedContainer}>
            <UploadSpeed
              infoHash={announcer.infoHash}
            />
          </div>
        </Grid>
      </Grid>

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

export default withWidth()(withStyles(styles)(Announcer));
