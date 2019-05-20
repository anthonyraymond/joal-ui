// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from './modules/theme';
import App from './App';

type Props = {
  store: {},
  history: {}
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ThemeProvider>
      <App history={history} />
    </ThemeProvider>
  </Provider>
);

export default Root;
