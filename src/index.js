import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, history } from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import { saveGUIConfig } from './utils/ConfigProvider';
import { connectStomp } from './modules/joal-api';
import 'typeface-roboto';
import './app.global.css';

const attemptToGetUiConfigFromQuerySearchParam = () => {
  if (!window.location.search || !window.location.search.includes('ui_credentials')) {
    return;
  }
  const uRLSearchParams = new URLSearchParams(window.location.search); // eslint-disable-line compat/compat
  const credentialsUriEncoded = uRLSearchParams.get('ui_credentials');
  if (credentialsUriEncoded === null) {
    return;
  }

  try {
    const config = JSON.parse(decodeURIComponent(credentialsUriEncoded));
    saveGUIConfig(config);
  } catch (e) {
    console.error('Failed to extract uiConfig from url params.', e);
  } finally {
    // Remove url param from uri to make it cleaner in history tab
    uRLSearchParams.delete('ui_credentials');
    let cleanUri = window.location.pathname;
    if ([...uRLSearchParams].length >= 1) {
      cleanUri += `?${uRLSearchParams.toString()}`;
    }
    if (window.location.hash) {
      cleanUri += window.location.hash;
    }
    window.history.replaceState({}, document.title, cleanUri);
  }
};

const store = configureStore();

attemptToGetUiConfigFromQuerySearchParam();

connectStomp(store);

const rootEl = document.getElementById('root');

let render = () => {
  // Dynamically import our main App component, and render it
  const Root = require('./pages/Root').default; // eslint-disable-line global-require
  ReactDOM.render(<Root store={store} history={history} />, rootEl);
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
  module.hot.accept('./pages/Root', () => {
    setTimeout(render);
  });
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
