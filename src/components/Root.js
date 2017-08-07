// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import JoalMessageAlertContainer from './JoalMessageAlertContainer';
import App from './App';

type Props = {
  store: {},
  history: {}
};

const Root = (props: Props) => (
  <MuiThemeProvider>
    <Provider store={props.store}>
      <div>
        <JoalMessageAlertContainer />
        <ConnectedRouter history={props.history}>
          <App />
        </ConnectedRouter>
      </div>
    </Provider>
  </MuiThemeProvider>
);

export default Root;
