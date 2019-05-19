// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DashboardPage from './pages/dashboard';
import SettingsPage from './pages/settings';
import Historypage from './pages/event-history';
import NavigationBar from './components/NavigationBar';
import TorrentDropZone from './components/TorrentDropZone';
import JoalAppBar from './components/AppBar';
import Alerts from './modules/alerts';
import { uploadTorrents } from './modules/joal-api';


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
  history: {},
  onFileDrop: () => void
};


const App = (props: Props) => {
  const {
    onFileDrop, classes, history
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
              <ConnectedRouter history={history}>
                <Switch>
                  <Route exact path="/history" component={Historypage} />
                  <Route exact path="/settings" component={SettingsPage} />
                  <Route exact path="/" component={DashboardPage} />
                </Switch>
              </ConnectedRouter>
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

type DropzoneFile = {
  lastModified: number,
  name: string,
  size: number,
  type: string
};

function mapStateToProps() {
  return {
    onFileDrop: (accepted: Array<DropzoneFile>) => {
      uploadTorrents(accepted);
    }
  };
}

export default connect(mapStateToProps)(withStyles(styles)(App));
