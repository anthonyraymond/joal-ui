// @flow
import React from 'react';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from './AlertTemplate';
import AlertsDisplayer from './alertsDisplayer.component';

const JoalAlertProvider = () => (
  <AlertProvider
    template={AlertTemplate}
    offset="14px"
    position="top right"
    timeout={0}
    transition="scale"
    zIndex={14000000}
  >
    <AlertsDisplayer />
  </AlertProvider>
);

export default JoalAlertProvider;
