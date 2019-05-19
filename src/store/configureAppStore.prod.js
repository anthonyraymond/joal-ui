// @flow
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import createRootReducer from '../reducers';

export const history = createHashHistory();

export default function configureAppStore (initialState) {
  const store = configureStore({
    reducer: createRootReducer(history),
    middleware: [routerMiddleware(history), ...getDefaultMiddleware()],
    devTools: false,
    preloadedState: initialState
  })

  return store;
}
