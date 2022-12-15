import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import appReducer from '../reducers/appReducer';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist'; // defaults to localStorage for web

//import monitorReducersEnhancer from './enhancers/monitorReducers';
//import loggerMiddleware from './middleware/logger';

export default function configureAppStore(preloadedState) {
  const persistConfig = {
    key: 'root',
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, appReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: [...getDefaultMiddleware()],
    preloadedState,
    //enhancers: [monitorReducersEnhancer],
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(appReducer));
  }

  let persistor = persistStore(store);
  return {store, persistor};
}
