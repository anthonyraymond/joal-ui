import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { red500 } from 'material-ui/styles/colors';
import type { GuiConfig } from '../../utils/ConfigProvider/types';


class UiConfigChanger extends Component {
  props: {
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
    if (isNaN(intPort)) {
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
    this.setState({ ...(this.props.config), isModalVisible: false });
  }

  saveConfig() {
    const { host, port, pathPrefix, secretToken } = this.state;
    if (this.hasError()) {
      return;
    }

    this.props.saveNewConf({ host, port, pathPrefix, secretToken });
    this.setState({ isModalVisible: false });
  }

  hasError() {
    const { host, port, pathPrefix, secretToken, hostErr, portErr, pathPrefixErr, secretTokenErr } = this.state;
    if (!host || !port || !pathPrefix || !secretToken) {
      return true;
    }
    if (hostErr || portErr || pathPrefixErr || secretTokenErr) {
      return true;
    }
    return false;
  }

  render() {
    const { isConnected } = this.props;
    const {
      isModalVisible,
      host, port, pathPrefix, secretToken,
      hostErr, portErr, pathPrefixErr, secretTokenErr
    } = this.state;
    const modalActions = [
      <FlatButton
        label="Cancel"
        onClick={() => this.discardChangesAndClose()}
      />,
      <FlatButton
        label="Save"
        primary
        disabled={this.hasError()}
        onClick={() => this.saveConfig()}
      />,
    ];
    return (
      <div style={this.props.style}>
        <RaisedButton
          label="Change connection settings"
          fullWidth
          onClick={() => this.setState({ isModalVisible: true })}
          backgroundColor={isConnected ? '' : red500}
          labelColor={isConnected ? '' : '#FFF'}
        />
        <Dialog
          actions={modalActions}
          title="Connection settings"
          modal={false}
          open={isModalVisible}
          onRequestClose={() => this.discardChangesAndClose()}
          autoScrollBodyContent
        >
          <div>
            <TextField
              name="host"
              floatingLabelText="Server address"
              hintText="ip or hostname"
              floatingLabelFixed
              hintStyle={{ fontWeight: 300 }}
              value={host}
              errorText={hostErr}
              onChange={(e) => this.handleHostChange(e.target.value)}
            />
          </div>
          <div>
            <TextField
              name="port"
              type="number"
              floatingLabelText="Server port"
              hintText="port"
              floatingLabelFixed
              hintStyle={{ fontWeight: 300 }}
              value={port}
              errorText={portErr}
              onChange={(e) => this.handlePortChange(e.target.value)}
            />
          </div>
          <div>
            <TextField
              name="path-prefix"
              floatingLabelText="Path prefix"
              hintText="Obfuscation path prefix"
              floatingLabelFixed
              hintStyle={{ fontWeight: 300 }}
              value={pathPrefix}
              errorText={pathPrefixErr}
              onChange={(e) => this.handlePathPrefixChange(e.target.value)}
            />
          </div>
          <div>
            <TextField
              name="secret-token"
              floatingLabelText="Secret token"
              hintText="A super secret token"
              floatingLabelFixed
              hintStyle={{ fontWeight: 300 }}
              value={secretToken}
              errorText={secretTokenErr}
              onChange={(e) => this.handleSecretTokenChange(e.target.value)}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default UiConfigChanger;
