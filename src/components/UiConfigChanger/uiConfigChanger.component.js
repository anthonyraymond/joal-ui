import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
import type { GuiConfig } from '../../utils/ConfigProvider/types';

const styles = theme => ({
  changeConfigButton: {
    color: theme.palette.getContrastText(theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[100]),
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
  redButton: {
    color: theme.palette.getContrastText(theme.palette.error.main),
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark
    }
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

class UiConfigChanger extends Component {
  props: {
    classes: {},
    isConnected: boolean,
    config: GuiConfig,
    saveNewConf: (config: GuiConfig) => void,
    style?: {}
  };

  static defaultProps = {
    style: {}
  }

  constructor(props) {
    super(props);
    const { config } = props;

    this.state = {
      isModalVisible: false,
      host: config.host,
      port: config.port,
      pathPrefix: config.pathPrefix,
      secretToken: config.secretToken,
      hostErr: config.host !== '' ? '' : 'Required field',
      portErr: config.port !== '' ? '' : 'Required field',
      pathPrefixErr: config.pathPrefix !== '' ? '' : 'Required field',
      secretTokenErr: config.secretToken !== '' ? '' : 'Required field',
    };
  }

  handleHostChange(host: string) {
    const hostErr = host === '' ? 'Required field' : '';
    this.setState({ host, hostErr });
  }

  handlePortChange(port: string) {
    let portErr = '';
    const intPort = port - 0;
    if (isNaN(intPort)) { // eslint-disable-line no-restricted-globals
      portErr = 'You mad bro !';
    } else {
      if (intPort === 0) portErr = 'Port is required';
      if (intPort > 65535) portErr = 'A port that big, seriously ?';
    }
    this.setState({ port, portErr });
  }

  handlePathPrefixChange(pathPrefix: string) {
    const pathPrefixErr = pathPrefix === '' ? 'Required field' : '';
    this.setState({ pathPrefix, pathPrefixErr });
  }

  handleSecretTokenChange(secretToken: string) {
    const secretTokenErr = secretToken === '' ? 'Required field' : '';
    this.setState({ secretToken, secretTokenErr });
  }

  discardChangesAndClose() {
    const { config } = this.props;
    this.setState({ ...(config), isModalVisible: false });
  }

  saveConfig() {
    const { saveNewConf } = this.props;
    const {
      host, port, pathPrefix, secretToken
    } = this.state;

    if (this.hasError()) {
      return;
    }

    saveNewConf({
      host, port, pathPrefix, secretToken
    });
    this.setState({ isModalVisible: false });
  }

  hasError() {
    const {
      host, port, pathPrefix, secretToken, hostErr, portErr, pathPrefixErr, secretTokenErr
    } = this.state;

    if (!host || !port || !pathPrefix || !secretToken) {
      return true;
    }
    if (hostErr || portErr || pathPrefixErr || secretTokenErr) {
      return true;
    }
    return false;
  }

  render() {
    const { classes, isConnected, style } = this.props;
    const {
      isModalVisible,
      host, port, pathPrefix, secretToken,
      hostErr, portErr, pathPrefixErr, secretTokenErr
    } = this.state;
    return (
      <div style={style}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => this.setState({ isModalVisible: true })}
          className={isConnected ? '' : classes.redButton}
          classes={{ contained: classes.changeConfigButton }}
        >
          Change connection settings
        </Button>
        <Dialog
          open={isModalVisible}
          onClose={() => this.discardChangesAndClose()}
          aria-labelledby="form-dialog-connection-settings"
          scroll="paper"
        >
          <DialogTitle id="form-dialog-connection-settings">Connection settings</DialogTitle>
          <DialogContent>
            <FormControl
              className={classes.formControl}
              error={hostErr.length > 0}
              aria-describedby="server-address-text"
            >
              <InputLabel htmlFor="server-address">Server address</InputLabel>
              <Input id="server-address" placeholder="host" value={host} onChange={(e) => this.handleHostChange(e.target.value)} />
              <FormHelperText id="server-address-text">{hostErr}</FormHelperText>
            </FormControl>
            <FormControl
              className={classes.formControl}
              error={hostErr.length > 0}
              aria-describedby="server-port-text"
            >
              <InputLabel htmlFor="server-port">Server port</InputLabel>
              <Input id="server-port" placeholder="port" type="number" value={port} onChange={(e) => this.handlePortChange(e.target.value)} />
              <FormHelperText id="server-port-text">{portErr}</FormHelperText>
            </FormControl>
            <FormControl
              className={classes.formControl}
              error={hostErr.length > 0}
              aria-describedby="path-prefix-text"
            >
              <InputLabel htmlFor="path-prefix">Path prefix</InputLabel>
              <Input id="path-prefix" placeholder="Obfuscation path prefix" value={pathPrefix} onChange={(e) => this.handlePathPrefixChange(e.target.value)} />
              <FormHelperText id="path-prefix-text">{pathPrefixErr}</FormHelperText>
            </FormControl>
            <FormControl
              className={classes.formControl}
              error={hostErr.length > 0}
              aria-describedby="secret-token-text"
            >
              <InputLabel htmlFor="secret-token">Secret token</InputLabel>
              <Input id="secret-token" placeholder="Your secret token" value={secretToken} onChange={(e) => this.handleSecretTokenChange(e.target.value)} />
              <FormHelperText id="secret-token-text">{secretTokenErr}</FormHelperText>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              label="Cancel"
              onClick={() => this.discardChangesAndClose()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={this.hasError()}
              onClick={() => this.saveConfig()}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(UiConfigChanger);
