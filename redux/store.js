import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './rootRedcer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    // 开发模式打印redux信息
    const { logger } = require('redux-logger');
    middleware.push(logger);
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore () {
  const store = createStore(
    reducer,
    bindMiddleware([sagaMiddleware])
  );
  // saga是系统的常驻进程
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
}

export default configureStore;