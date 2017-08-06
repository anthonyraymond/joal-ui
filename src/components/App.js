// @flow
import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Home from './Home';
import About from './About';

type Props = {
  store: {},
  history: {}
};

const App = (props: Props) => (
  <Provider store={props.store}>
    <ConnectedRouter history={props.history}>
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/about-us">About</Link>
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
        </main>
      </div>
    </ConnectedRouter>
  </Provider>
);

export default App;
