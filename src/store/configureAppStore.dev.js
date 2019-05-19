// @flow
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createRootReducer from '../reducers';

// TODO : check that Browser history works with election
export const history = createHashHistory();


export default function configureAppStore (initialState) {
  const rootReducer = createRootReducer(history);
  const store = configureStore({
    reducer: createRootReducer(history),
    middleware: [
      createLogger({ level: 'info', collapsed: true }),
      routerMiddleware(history),
      ...getDefaultMiddleware()
    ],
    devTools: {
      actionCreators: {
        ...routerActions,
        trace: true
      }
    },
    preloadedState: initialState
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(rootReducer))
  }

  return store;
}
