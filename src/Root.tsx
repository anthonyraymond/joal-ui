import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from './modules/theme';
import App from './App';

import { History } from 'history';
import { Store } from 'redux';

interface RootProps {
  store: Store,
  history: History
};

const Root: React.FC<RootProps> = ({ store, history }) => (
  <Provider store={store}>
    <ThemeProvider>
      <App history={history} />
    </ThemeProvider>
  </Provider>
);

export default Root;
