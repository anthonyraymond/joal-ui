// @flow
import { connect } from 'react-redux';
import SettingsComponent from './settings.component';
import { localConfigHasChanged, discardLocalConfigChanges } from './settings.actions';
import { sendConfigToServer } from '../../modules/joal-api';
import type { StateType, Dispatch } from '../../types';
import type { Config } from './types';

function mapStateToProps(state: StateType) {
  return {
    // if local config is set it means the user has modified the config, so we show it
    isLocalConfigChanged: state.app.config.localConfig !== undefined,
    config: state.app.config.localConfig || state.api.settings.config,
    availableClients: state.api.settings.availableClients,
    isConnectedToWebSocket: state.api.stomp.isConnected
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return ({
    discardLocalConfigChanges: () => dispatch(discardLocalConfigChanges()),
    onSettingsChange: (config: Config) => dispatch(localConfigHasChanged(config)),
    onClickSave: (config: Config) => sendConfigToServer(config)
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
