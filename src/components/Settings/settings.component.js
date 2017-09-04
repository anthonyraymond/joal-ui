// @flow
import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { green500 } from 'material-ui/styles/colors';
import AbsoluteOverlayFetchingIndicator from '../Generics/FetchingIndicator/AbsoluteOverlayFetchingIndicator';
import UploadRateFields from './UploadRateFields';
import ClientSelectField from './ClientSelectField';
import type { Config } from './types';
import styles from './styles.css';

type Props = {
  config: Config,
  availableClients: Array<string>,
  isConnectedToWebSocket: boolean,
  onSettingsChange: () => void,
  onClickSave: () => void
};

const Settings = (props: Props) => {
  const { isConnectedToWebSocket, onSettingsChange, onClickSave, availableClients, config } = props;

  const valueHasChanged = (newValue) => onSettingsChange(Object.assign({},
    config,
    newValue
  ));

  return (
    <Paper zDepth={2} className={styles.container}>
      <AbsoluteOverlayFetchingIndicator active={!isConnectedToWebSocket} />
      <UploadRateFields
        minUploadRate={config.minUploadRate}
        maxUploadRate={config.maxUploadRate}
        onChange={(uploadRates) => valueHasChanged(uploadRates)}
      />
      <div>
        <ClientSelectField
          availableClients={availableClients}
          selectedClient={config.client}
          onChange={(client) => valueHasChanged(client)}
        />
      </div>
      <div>
        <TextField
          floatingLabelText="Simultaneous seed"
          type="number"
          min={1}
          value={config.simultaneousSeed}
          onChange={(event) => {
            const value = parseInt(event.target.value, 10);
            if (isNaN(value)) return;
            valueHasChanged({ simultaneousSeed: value });
          }}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <Checkbox
          label="Keep torrents active when reach zero peers (if false peerless torrent will be removed)."
          checked={config.keepTorrentWithZeroLeechers}
          onCheck={(e, checked) => valueHasChanged({ keepTorrentWithZeroLeechers: checked })}
          onChange={(client) => valueHasChanged(client)}
        />
      </div>
      <RaisedButton
        label="Save"
        backgroundColor={green500}
        className={styles.buttonStyle}
        onTouchTap={() => onClickSave(config)}
      />
    </Paper>
  );
};

export default Settings;
