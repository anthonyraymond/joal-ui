import React from 'react';
import { Provider as AlertProvider, positions, transitions } from 'react-alert';
import withWidth, { isWidthUp, WithWidth } from '@material-ui/core/withWidth';
import AlertTemplate from './alert-template';
import AlertsDisplayer from './alerts-displayer.component';

interface JoalAlertProviderProps extends WithWidth {
}

const JoalAlertProvider: React.FC<JoalAlertProviderProps> = ({ width }) => (
  <AlertProvider
    template={AlertTemplate}
    offset={isWidthUp('sm', width) ? '10px' : '6px'}
    position={positions.TOP_RIGHT}
    timeout={0}
    transition={transitions.FADE}
    containerStyle={{ zIndex: 14000000 }}
  >
    <AlertsDisplayer />
  </AlertProvider>
);

export default withWidth()(JoalAlertProvider);
