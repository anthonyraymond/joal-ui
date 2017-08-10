// @flow
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { getGUIConfig, saveGUIConfig } from '../../utils/ConfigProvider';

/*
type Props = {
  enabled: boolean
};
*/

// TODO : Use a Dialog instead of a plain component
class UiConfigChanger extends Component {
  constructor(props) {
    super(props);
    const conf = getGUIConfig();
    this.state = {
      host: conf.host,
      hostErr: '',
      port: conf.port,
      portErr: '',
      pathPrefix: conf.pathPrefix,
      secretToken: conf.secretToken,
    };
  }

  // TODO: move this to a reducer as for the localConfig ?
  handleHostChange(host: string) {
    const hostErr = host === '' ? 'Host is required' : '';
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
    this.setState({ pathPrefix });
  }
  handleSecretTokenChange(secretToken: string) {
    this.setState({ secretToken });
  }

  saveConfig() {
    console.log(this.state);
    const { hostErr, portErr, ...rest } = this.state;
    saveGUIConfig(rest);
    // TODO : disconnect, then reconnect NOW! no waiting. otherwise user won't be able to disconnect from current instance
  }

  render() {
    const { host, port, pathPrefix, secretToken } = this.state;
    const { hostErr, portErr } = this.state;
    return (
      <Paper style={{ padding: 15 }} zDepth={3}>
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
            onChange={(e) => this.handleSecretTokenChange(e.target.value)}
          />
        </div>
        <div className="text-right">
          <FlatButton label="Close" />
          <FlatButton label="Save" primary onTouchTap={() => this.saveConfig()} />
        </div>
      </Paper>
    );
  }
}

export default UiConfigChanger;
