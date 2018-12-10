// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DashboardPage from './DashBoard';
import SettingsPage from './Settings';
import Historypage from './EventHistory';
import NavigationBar from './NavigationBar';
import TorrentDropZone from './TorrentDropZone';
import JoalAppBar from './AppBar';
import Alerts from '../modules/alerts';
import { uploadTorrents } from '../api';


const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  navigationBarWrapper: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0
  }
});

type Props = {
  classes: {},
  onFileDrop: () => void
};

type DropzoneFile = {
  lastModified: number,
  name: string,
  size: number,
  type: string
};

const App = (props: Props) => {
  const {
    onFileDrop, classes
  } = props;
  return (
    <div>
      <Alerts />
      <TorrentDropZone onDrop={onFileDrop}>
        <header>
          <JoalAppBar />
        </header>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <main>
              <Route exact path="/history" component={Historypage} />
              <Route exact path="/settings" component={SettingsPage} />
              <Route exact path="/" component={DashboardPage} />
            </main>
            <footer className={classes.navigationBarWrapper}>
              <NavigationBar />
            </footer>
          </Grid>
        </Grid>
      </TorrentDropZone>
    </div>
  );
};

function mapStateToProps() {
  return {
    onFileDrop: (accepted: Array<DropzoneFile>/* , rejected: Array<DropzoneFile> */) => {
      uploadTorrents(accepted);
    }
  };
}

export default connect(mapStateToProps)(withStyles(styles)(App));
