import { connect } from 'react-redux';
import UiConfigChanger from './uiConfigChanger.component';
import { getGUIConfig, saveGUIConfig } from '../../utils/ConfigProvider';
import { disconnectAndReconnect } from '../../modules/joal-api';
import { GuiConfig } from '../../utils/ConfigProvider/types';

import { JoalState } from '../../reducers/types';

function mapStateToProps(state: JoalState) {
  return {
    isConnected: state.api.stomp.isConnected,
    config: getGUIConfig(),
    saveNewConf: (config: GuiConfig) => {
      saveGUIConfig(config);
      disconnectAndReconnect();
    }
  };
}

export default connect(mapStateToProps)(UiConfigChanger);
