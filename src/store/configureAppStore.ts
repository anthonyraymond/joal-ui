import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createRootReducer from '../reducers';

import { EnhancerOptions } from 'redux-devtools-extension';

export const history = createHashHistory();


export default function configureAppStore (initialState?: any) {
  const rootReducer = createRootReducer(history);

  const middlewares = [
    routerMiddleware(history),
    ...getDefaultMiddleware()
  ]
  if (process.env.NODE_ENV !== 'production') {
    middlewares.unshift(createLogger({ level: 'info', collapsed: true }));
  }

  let devtools: boolean | EnhancerOptions = false;
  if (process.env.NODE_ENV !== 'production') {
    devtools = {
      actionCreators: {
        ...routerActions
      },
      trace: true
    };
  }

  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools: devtools,
    preloadedState: initialState
  })

  if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
    (module as any).hot.accept('../reducers', () => store.replaceReducer(rootReducer))
  }

  return store;
}
