// @flow
import React from 'react';
import ReactTooltip from 'react-tooltip';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import ClientInfo from '../ClientInfo';
import AbsoluteOverlayFetchingIndicator from '../Generics/FetchingIndicator/AbsoluteOverlayFetchingIndicator';
import UiConfigChangerButton from '../UiConfigChanger';
import Announcers from '../Announcers';
import QueuedTorrents from '../QueuedTorrents';

const styles = theme => ({
  relative: {
    position: 'relative'
  },
  addButton: {
    position: 'fixed',
    bottom: 65,
    right: theme.spacing.unit
  }
});

type Props = {
  classes: {},
  className?: string,
  isStarted: boolean,
  isConnectedToWebSocket: boolean,
  isClientGlobalStatePending: boolean,
  shouldDisplayConfigChangerButton: boolean
};

const Dashboard = ({
  className: classNameProps,
  shouldDisplayConfigChangerButton, classes, isConnectedToWebSocket, isClientGlobalStatePending, isStarted
}: Props) => (
  <Grid
    container
    spacing={16}
    direction="row"
    className={classNameProps}
  >
    <Grid item xs={12} md={4} lg={3}>
      {shouldDisplayConfigChangerButton && <UiConfigChangerButton style={{ marginBottom: 6 }} />}
      <div className={classes.relative}>
        <AbsoluteOverlayFetchingIndicator active={!isConnectedToWebSocket || isClientGlobalStatePending} />
        <ClientInfo />
      </div>
    </Grid>
    {isStarted && (
      <Grid item xs={12} md={8} lg={9}>
        <Announcers />
        <h2>Queued torrents</h2>
        <div style={{ paddingLeft: 15, paddingRight: 15 }}>
          <QueuedTorrents />
        </div>
      </Grid>
    )}
    <ReactTooltip place="top" type="dark" effect="float" />

    <Fab className={classes.addButton} variant="fab" disabled={!isStarted} size="medium" color="secondary" aria-label="Add">
      <AddIcon />
    </Fab>
  </Grid>
);

Dashboard.defaultProps = {
  className: ''
};

export default withStyles(styles)(Dashboard);
