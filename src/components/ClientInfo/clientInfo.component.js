// @flow
import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import PlayIcon from 'material-ui/svg-icons/av/play-circle-filled';
import PauseIcon from 'material-ui/svg-icons/av/pause-circle-filled';
import filesize from 'filesize';

const styles = {
  container: {
    padding: 15
  },
  startStopButton: {
    marginBottom: 20
  },
  colorStart: {
    color: '#27ae60'
  },
  colorStop: {
    color: '#e74c3c'
  }
};

type Props = {
  client: string,
  overallUploadSpeed: number,
  isStarted: boolean,
  onClickStart: () => void,
  onClickStop: () => void
};

const ClientInfo = (props: Props) => {
  const { client, overallUploadSpeed, isStarted, onClickStart, onClickStop } = props;
  const stateText = isStarted ? 'Running' : 'Paused';

  return (
    <Paper zDepth={2} style={styles.container}>
      <div className="text-center">
        <h3>{stateText}</h3>
        <RaisedButton
          fullWidth
          style={styles.startStopButton}
          onTouchTap={isStarted ? onClickStop : onClickStart}
          label={isStarted ? 'stop' : 'start'}
          buttonStyle={isStarted ? styles.colorStop : styles.colorStart}
          labelStyle={isStarted ? styles.colorStop : styles.colorStart}
          icon={isStarted ? <PauseIcon /> : <PlayIcon />}
        />
      </div>

      <Divider style={{ marginBottom: 10 }} />
      <div className="text-center" style={{ fontWeight: 500, marginBottom: 15 }}>{client}</div>
      <div style={{ fontWeight: 500 }}>{`Overall speed :  ${filesize(overallUploadSpeed, { base: 10 })}/s`}</div>
    </Paper>
  );
};

export default ClientInfo;
