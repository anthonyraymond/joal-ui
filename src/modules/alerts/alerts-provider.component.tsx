// @flow
import React from 'react';
import { Provider as AlertProvider, positions, transitions } from 'react-alert';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import AlertTemplate from './alert-template';
import AlertsDisplayer from './alerts-displayer.component';

type Props = {
  width: number
}

const JoalAlertProvider = ({ width }: Props) => (
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
