import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DashboardPage from './pages/dashboard';
import SettingsPage from './pages/settings';
import Historypage from './pages/event-history';
import NavigationBar from './components/NavigationBar';
import TorrentDropZone from './components/TorrentDropZone';
import JoalAppBar from './components/AppBar';
import Alerts from './modules/alerts';
import { uploadTorrents } from './modules/joal-api';

import { History } from 'history';


const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2)
    },
    navigationBarWrapper: {
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0
    }
  })
);


interface AppProps {
  history: History,
  onFileDrop: (accepted: Array<File>) => void,
};


const App: React.FC<AppProps> = ({ onFileDrop, history }) => {
  const classes = useStyles();

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
}


const mapStateToProps = () => ({
  onFileDrop: (accepted: Array<File>) => {
    uploadTorrents(accepted);
  }
});

export default connect(mapStateToProps)(App);
