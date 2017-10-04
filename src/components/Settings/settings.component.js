// @flow
import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { green500 } from 'material-ui/styles/colors';
import AbsoluteOverlayFetchingIndicator from '../Generics/FetchingIndicator/AbsoluteOverlayFetchingIndicator';
import UploadRateFields from './UploadRateFields';
import ClientSelectField from './ClientSelectField';
import type { Config } from './types';
import styles from './styles.css';

type Props = {
  isLocalConfigChanged: boolean,
  config: Config,
  availableClients: Array<string>,
  isConnectedToWebSocket: boolean,
  discardLocalConfigChanges: () => void,
  onSettingsChange: () => void,
  onClickSave: () => void
};

const Settings = (props: Props) => {
  const {
    isConnectedToWebSocket,
    discardLocalConfigChanges, onSettingsChange, onClickSave,
    availableClients, config, isLocalConfigChanged
  } = props;

  const valueHasChanged = (newValue) => onSettingsChange(Object.assign({},
    config,
    newValue
  ));

  return (
    <Paper zDepth={2} className={styles.container}>
      { isLocalConfigChanged &&
        <div className={styles.unsavedConfigWrapper}>
          <span>Unsaved configuration</span>
          <FlatButton
            label="discard"
            onClick={() => discardLocalConfigChanges()}
            hoverColor="transparent"
            disableTouchRipple
            primary
          />
        </div>
      }
      <AbsoluteOverlayFetchingIndicator active={!isConnectedToWebSocket} />
      <div className={styles.inputsContainer}>
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
            label={
              <div>
                <div style={{ height: 16 }}>Keep seeding torrents even with no peers</div>
                <div style={{ height: 13 }} className={styles.inputDescription}>If checked, when a torrent reach 0 peers it will seed at 0 kB/s.</div>
                <div className={styles.inputDescription}>If unchecked, when a torrent reach 0 peers it will be removed.</div>
              </div>
            }
            checked={config.keepTorrentWithZeroLeechers}
            onCheck={(e, checked) => valueHasChanged({ keepTorrentWithZeroLeechers: checked })}
            onChange={(client) => valueHasChanged(client)}
          />
        </div>
      </div>
      <RaisedButton
        label="Save"
        backgroundColor={green500}
        className={styles.buttonStyle}
        onClick={() => onClickSave(config)}
      />
    </Paper>
  );
};

export default Settings;
