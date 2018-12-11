import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore, history } from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import { connectStomp } from './modules/joal-api';
import 'typeface-roboto';
import './app.global.css';


const store = configureStore();
connectStomp(store);

const rootEl = document.getElementById('root');

let render = () => {
  // Dynamically import our main App component, and render it
  const Root = require('./components/Root').default; // eslint-disable-line global-require
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
  module.hot.accept('./components/Root', () => {
    setTimeout(render);
  });
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
