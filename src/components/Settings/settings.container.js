// @flow
import { connect } from 'react-redux';
import SettingsComponent from './settings.component';
import { localConfigHasChanged } from './settings.actions';
import { sendConfigToServer } from '../../api';
import type { StateType, Dispatch } from '../../types';
import type { Config } from './types';

function mapStateToProps(state: StateType) {
  return {
    // if local config is set it means the user has modified the config, so we show it
    config: state.app.config.localConfig || state.api.settings.config,
    availableClients: state.api.settings.availableClients
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return ({
    onSettingsChange: (config: Config) => dispatch(localConfigHasChanged(config)),
    onClickSave: (config: Config) => sendConfigToServer(config)
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
