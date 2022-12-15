import {configureStore} from '@reduxjs/toolkit';
import appReducer from '../reducers/appReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE,} from 'redux-persist/es/constants'; // defaults to localStorage for web

//import monitorReducersEnhancer from './enhancers/monitorReducers';
//import loggerMiddleware from './middleware/logger';

export default function configureAppStore(preloadedState) {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  const persistedReducer = persistReducer(persistConfig, appReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
      let mw = getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      });
      /*if (__DEV__) {
        const actionsBlacklist = [];
        const actionsWhitelist = [];
        const actionReplayDelay = 500;
        const reduxDebugger = require('redux-middleware-flipper').default;
        mw.push(
          reduxDebugger({
            actionsBlacklist,
            actionsWhitelist,
            actionReplayDelay,
          }),
        );
        console.log(mw);
      }*/
      return mw;
    },
    preloadedState,
    //enhancers: [monitorReducersEnhancer],
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(appReducer));
  }

  let persistor = persistStore(store);
  return {store, persistor};
}
