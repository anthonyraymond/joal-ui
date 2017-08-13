// @flow
import { connect } from 'react-redux';
import UiConfigChanger from './uiConfigChanger.component';
import { getGUIConfig, saveGUIConfig } from '../../utils/ConfigProvider';
import { disconnectAndReconnect } from '../../api';
import type { GuiConfig } from '../../utils/ConfigProvider/types';

function mapStateToProps() {
  return {
    config: getGUIConfig(),
    saveNewConf: (config: GuiConfig) => {
      saveGUIConfig(config);
      disconnectAndReconnect();
    }
  };
}

export default connect(mapStateToProps)(UiConfigChanger);
