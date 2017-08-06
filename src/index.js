import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, history } from './store/configureStore';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { connectStomp } from './api';

const store = configureStore();
connectStomp(store);

const rootEl = document.getElementById('root');

let render = () => {
  // Dynamically import our main App component, and render it
  const App = require('./components/App').default; // eslint-disable-line global-require
  ReactDOM.render(<App store={store} history={history} />, rootEl);
};

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render;

  // In development, we wrap the rendering function to catch errors,
  // and if something breaks, log the error
  render = () => {
    renderApp();
  };

  // Whenever the App component file or one of its dependencies
  // is changed, re-import the updated component and re-render it
  module.hot.accept('./components/App', () => {
    setTimeout(render);
  });
}

render();
registerServiceWorker();
