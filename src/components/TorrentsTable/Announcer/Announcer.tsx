import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import withWidth, { WithWidthProps } from '@material-ui/core/withWidth';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Tooltip from '@material-ui/core/Tooltip';
import filesize from 'filesize';
import classnames from 'classnames';
import PeerStats from './Peers';
import UploadSpeed from './UploadSpeed';
import AnnouncingProgressBar from './ProgressBar/AnnouncingProgressBar.component';
import TimeUntilAnnounceProgressBar from './ProgressBar/TimeUntilAnnounceProgressBar.component';

import { Announcer as AnnouncerType } from '../../../modules/joal-api/types';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(0.5)
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
      right: theme.spacing(2)
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
      bottom: 0,
      height: 4
    }
  })
);

interface AnnouncerProps extends WithWidthProps {
  className?: string,
  announcer: AnnouncerType,
  onClickDeleteTorrent: (infoHash: string) => void
};

const Announcer: React.FC<AnnouncerProps> = (props) => {
  const classes = useStyles();
  const {
    width: componentBreakpoint, className: classNameProps, announcer, onClickDeleteTorrent
  } = props;


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
            align="left"
            className={classes.title}
            variant="body2"
            gutterBottom
          >
            {`${trimedTorrentName} (${filesize(announcer.torrentSize, { standard: 'iec' })})`}
          </Typography>
        </Grid>
        <Grid item style={{ width: 42 }}>
          <Tooltip title="Delete this torrent" placement="left">
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
          <PeerStats
            className={classes.peersStats}
            leechers={announcer.lastKnownLeechers}
            seeders={announcer.lastKnownSeeders}
          />
        </Grid>
        <Grid item xs>
          <div className={classes.uploadSpeedContainer}>
            <UploadSpeed
              infoHash={announcer.infoHash}
            />
          </div>
        </Grid>
      </Grid>

      {announcer.isFetching || announcer.lastAnnouncedAt === undefined ? (
        <AnnouncingProgressBar className={classes.announceProgressBar} />
      ) : (
        <TimeUntilAnnounceProgressBar className={classes.announceProgressBar} lastAnnouncedDate={announcer.lastAnnouncedAt} interval={announcer.lastKnownInterval} />
      )}
    </Paper>
  );
};
Announcer.defaultProps = {
  className: ''
};

export default withWidth()(Announcer);
