// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';
import JoalMessageAlertContainer from './JoalMessageAlertContainer';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
  typography: {
    useNextVariants: true,
  },
});

type Props = {
  store: {},
  history: {}
};

const Root = ({ store, history }: Props) => (
  <MuiThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <Provider store={store}>
      <AlertProvider
        template={AlertTemplate}
        offset="14px"
        position="top right"
        timeout={0}
        transition="scale"
        zIndex={16777272}
      >
        <div>
          <JoalMessageAlertContainer />
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </div>
      </AlertProvider>
    </Provider>
  </MuiThemeProvider>
);

export default Root;
