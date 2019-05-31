import React from 'react';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import PauseIcon from '@material-ui/icons/PauseCircleFilled';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import filesize from 'filesize';
import classnames from 'classnames';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    container: {
      padding: 15
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    playPauseButton: {
      backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[100],
      boxShadow: theme.shadows[2],
      '&:focusVisible': {
        boxShadow: theme.shadows[6],
      },
      '&:active': {
        boxShadow: theme.shadows[8],
      },
      '&:disabled': {
        color: theme.palette.action.disabled,
        boxShadow: theme.shadows[0],
        backgroundColor: theme.palette.action.disabledBackground,
      },
      '&:hover': {
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300],
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[300],
        },
        '&:disabled': {
          backgroundColor: theme.palette.action.disabledBackground,
        },
      },
    },
    redTextButton: {
      color: red[400]
    },
    greenTextButton: {
      color: green[400]
    }
  })
);

type ClientInfoProps = {
  className?: string,
  client: string,
  overallUploadSpeed: number,
  isStarted: boolean,
  numberOfQueuedTorrents: number,
  onClickStart: () => void,
  onClickStop: () => void
};

const ClientInfo: React.FC<ClientInfoProps> = (props) => {
  const classes = useStyles();
  const {
    className: classNameProps,
    client, overallUploadSpeed, isStarted, onClickStart, onClickStop, numberOfQueuedTorrents
  } = props;
  const stateText = isStarted ? 'Running' : 'Paused';

  return (
    <Paper elevation={2} className={classnames(classes.container, classNameProps)}>
      <Typography align="center" variant="h5" gutterBottom>
        {stateText}
      </Typography>
      <Button
        color="primary"
        fullWidth
        variant="contained"
        className={isStarted ? classes.redTextButton : classes.greenTextButton}
        classes={{ contained: classes.playPauseButton }}
        onClick={isStarted ? onClickStop : onClickStart}
      >
        {isStarted ? <PauseIcon className={classes.leftIcon} /> : <PlayIcon className={classes.leftIcon} />}
        {isStarted ? 'stop' : 'start'}
      </Button>

      <Divider style={{ marginTop: 20, marginBottom: 10 }} />
      <Typography align="center" variant="body2" gutterBottom>
        <b>{client}</b>
      </Typography>
      <Typography align="left" variant="body2" gutterBottom>
        {`Overall speed :  ${filesize(overallUploadSpeed, { base: 10 })}/s`}
      </Typography>
      <Typography align="left" variant="body2" gutterBottom>
        {`Torrents in queue :  ${numberOfQueuedTorrents}`}
      </Typography>
    </Paper>
  );
};
ClientInfo.defaultProps = {
  className: ''
};

export default ClientInfo;
