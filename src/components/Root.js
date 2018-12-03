// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import ThemeProvider from './ThemeProvider';
import App from './App';

type Props = {
  store: {},
  history: {}
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ThemeProvider>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);

export default Root;
