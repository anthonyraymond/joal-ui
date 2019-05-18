// @flow
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Announcer from './Announcer';
import SearchBar from './SearchBar';
import SortActions from './SortActions';
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
  },
  searchBar: {
  },
  sortingActions: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    width: 'none'
  }
});

type Props = {
  classes: {},
  announcers: Array<AnnouncerType>,
  searchFilter: string,
  onFilterTextChange: (text: string) => void,
  sortProperty: string,
  sortDirection: string,
  onSortChange: (sortProperty: string, sortDirection: string) => void,
  onClickDeleteTorrent: (infoHash: string) => void
};

const Announcers = ({
  classes, announcers,
  searchFilter, onFilterTextChange,
  sortProperty, sortDirection, onSortChange,
  onClickDeleteTorrent
}: Props) => (
  <div>
    <Typography variant="h6">{`Currently seeding (${announcers.length})`}</Typography>
    <Grid container spacing={8} align="center">
      <Grid item xs>
        <SearchBar onFilterTextChange={onFilterTextChange} className={classes.searchBar} searchFilter={searchFilter} onSearchTextChange={console.log} />
      </Grid>
      <Grid item className={classes.sortingActions}>
        <SortActions onSortChange={onSortChange} sortProperty={sortProperty} sortDirection={sortDirection} />
      </Grid>
      <Grid item xs={12}>
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
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(Announcers);
