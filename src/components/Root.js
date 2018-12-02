// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import primary from '@material-ui/core/colors/teal';
import secondary from '@material-ui/core/colors/blue';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: primary[300],
      main: primary[500],
      dark: primary[700],
    },
    secondary: {
      light: secondary[300],
      main: secondary[500],
      dark: secondary[700],
    },
    // type: 'dark'
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
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>
);

export default Root;
