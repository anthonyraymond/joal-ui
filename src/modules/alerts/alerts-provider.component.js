// @flow
import React from 'react';
import { Provider as AlertProvider } from 'react-alert';
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
    position="top right"
    timeout={0}
    transition="fade"
    zIndex={14000000}
  >
    <AlertsDisplayer />
  </AlertProvider>
);

export default withWidth()(JoalAlertProvider);
