import React from 'react';
import ReactTooltip from 'react-tooltip';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import ClientInfo from '../../components/ClientInfo';
import AbsoluteOverlayFetchingIndicator from '../../components/Generics/FetchingIndicator/AbsoluteOverlayFetchingIndicator';
import UiConfigChangerButton from '../../components/UiConfigChanger';
import TorrentsTable from '../../components/TorrentsTable';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    relative: {
      position: 'relative'
    },
    addButton: {
      position: 'fixed',
      bottom: 75,
      right: theme.spacing(2)
    },
    addButtonInput: {
      display: 'none'
    },
    announcers: {
      marginBottom: 70
    }
  })
);


type Props = {
  theme: Theme,
  className?: string,
  isStarted: boolean,
  isConnectedToWebSocket: boolean,
  isClientGlobalStatePending: boolean,
  shouldDisplayConfigChangerButton: boolean,
  uploadTorrentFiles: (files: Array<File>) => void
};

const Dashboard = (props: Props) => {
  const classes = useStyles()
  const {
    className: classNameProps,
    shouldDisplayConfigChangerButton, theme, isConnectedToWebSocket, isClientGlobalStatePending, isStarted,
    uploadTorrentFiles
  } = props;

  return (
    <Grid
      container
      spacing={2}
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
        <Grid item xs={12} md={8} lg={9} className={classes.announcers}>
          <TorrentsTable />
        </Grid>
      )}
      <ReactTooltip place="top" type="dark" effect="float" />

      <input
        type="file"
        accept=".torrent"
        multiple
        id="add-torrent-file-button"
        className={classes.addButtonInput}
        onChange={(e) => {
          if (e.target.files != null) {
            uploadTorrentFiles(Array.from(e.target.files))
          }
        }}
      />
      <Zoom
        in={isStarted}
        timeout={{ enter: theme.transitions.duration.enteringScreen, exit: theme.transitions.duration.leavingScreen }}
        style={{
          transitionDelay: `${theme.transitions.duration.enteringScreen}ms`,
        }}
        unmountOnExit
      >
        <label htmlFor="add-torrent-file-button" className={classes.addButton}> {/* eslint-disable-line */}
          <Tooltip title="Add a torrent" aria-label="Add a torrent" placement="left">
            <Fab component="div" disabled={!isStarted} color="secondary" aria-label="Add">
              <AddIcon />
            </Fab>
          </Tooltip>
        </label>
      </Zoom>
    </Grid>
  );
}

Dashboard.defaultProps = {
  className: ''
};

export default withTheme(Dashboard);
