// @flow
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Announcer from './Announcer';
import type { Announcer as AnnouncerType } from './types';

const styles = theme => ({
  announersList: {
    marginTop: theme.spacing.unit,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing.unit * 2,
    }
  },
  announcer: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing.unit * 2,
    },
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing.unit,
    }
  }
});

type Props = {
  classes: {},
  announcers: Array<AnnouncerType>,
  onClickDeleteTorrent: (infoHash: string) => void
};

const Announcers = ({ classes, announcers, onClickDeleteTorrent }: Props) => (
  <div>
    <Typography variant="h6">{`Currently seeding (${announcers.length})`}</Typography>
    <div className={classes.announersList}>
      {announcers.map((announcer) => (
        <div key={announcer.infoHash}>
          <Announcer className={classes.announcer} announcer={announcer} onClickDeleteTorrent={onClickDeleteTorrent} />
        </div>
      ))}
      { announcers.length === 0 && (
        <div className="text-center">
          {'No torrents are currently seeding.'}
          <br />
          {'Drag and Drop torrents into the windows to start seeding'}
        </div>
      )}
    </div>
  </div>
);

export default withStyles(styles)(Announcers);
