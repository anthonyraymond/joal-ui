import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import classnames from 'classnames';
import AbsoluteOverlayFetchingIndicator from '../../components/Generics/FetchingIndicator/AbsoluteOverlayFetchingIndicator';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    container: {
      padding: theme.spacing(2),
      position: 'relative',
    },
    discardChangesButton: {
      marginRight: theme.spacing(2)
    },
    formInput: {
      marginBottom: theme.spacing(3),
      minWidth: 180
    },
    rightSpaced: {
      marginRight: theme.spacing(2)
    }
  })
);


const ITEM_HEIGHT = 48;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 6
    },
  },
};

type Props = {
  isLocalConfigChanged: boolean,
  config: any,
  availableClients: Array<string>,
  isConnectedToWebSocket: boolean,
  discardLocalConfigChanges: () => void,
  onSettingsChange: (config: any) => void,
  onClickSave: (config: any) => void
};

const Settings = (props: Props) => {
  const classes = useStyles();
  const {
    isConnectedToWebSocket,
    discardLocalConfigChanges, onSettingsChange, onClickSave,
    availableClients, config, isLocalConfigChanged
  } = props;

  const valueHasChanged = (newValue: any) => onSettingsChange(Object.assign(
    {},
    config,
    newValue
  ));

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} md={6}>
        <Paper
          className={classes.container}
          elevation={2}
        >
          <AbsoluteOverlayFetchingIndicator active={!isConnectedToWebSocket} />
          <Grid
            container
            direction="row"
          >
            <Grid item xs={12}>
              <TextField
                className={classnames(classes.formInput, classes.rightSpaced)}
                label="Min upload rate (kB/s)"
                type="number"
                inputProps={{ min:0 }}
                value={config.minUploadRate}
                onChange={(event) => {
                  const value = event.target.value === '' ? '' : parseInt(event.target.value, 10);
                  valueHasChanged({ minUploadRate: value });
                }}
              />
              <TextField
                className={classes.formInput}
                label="Max upload rate (kB/s)"
                type="number"
                inputProps={{ min:0 }}
                value={config.maxUploadRate}
                onChange={(event) => {
                  const value = event.target.value === '' ? '' : parseInt(event.target.value, 10);
                  valueHasChanged({ maxUploadRate: value });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formInput}>
                <InputLabel htmlFor="torrent-client-selector">Torrent client</InputLabel>
                <Select
                  value={config.client}
                  onChange={(event) => valueHasChanged({ client: event.target.value })}
                  input={<Input name="torrent-client" id="torrent-client-selector" />}
                  MenuProps={MenuProps}
                >
                  {availableClients.map(client => (
                    <MenuItem
                      key={client}
                      value={client}
                    >
                      {client.substring(0, client.lastIndexOf('.'))}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.formInput}
                label="Simultaneous seed"
                type="number"
                inputProps={{ min:0 }}
                value={config.simultaneousSeed}
                onChange={(event) => {
                  const value = event.target.value === '' ? '' : parseInt(event.target.value, 10);
                  valueHasChanged({ simultaneousSeed: value });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.formInput}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      color="primary"
                      checked={config.keepTorrentWithZeroLeechers}
                      onChange={(e, checked) => valueHasChanged({ keepTorrentWithZeroLeechers: checked })}
                    />
                  )}
                  label="Keep seeding torrents even with no peers"
                />
                <FormHelperText style={{ marginTop: 0 }}>
                  If checked, when a torrent reach 0 peers it will seed at 0 kB/s. Otherwise, when a torrent reach 0 peers it will be removed.
                </FormHelperText>
              </div>
            </Grid>
          </Grid>
          <Grid container direction="row" justify="flex-end" alignItems="center">
            <Grid item>
              { isLocalConfigChanged && (
                <Button
                  variant="outlined"
                  onClick={() => discardLocalConfigChanges()}
                  color="secondary"
                  className={classes.discardChangesButton}
                >
                  Discard
                </Button>
              )}
              <Button
                variant="contained"
                onClick={() => onClickSave(config)}
                color="secondary"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Settings;
