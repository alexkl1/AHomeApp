import {configureStore} from '@reduxjs/toolkit';
import appReducer from '../reducers/appReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';
import {appApi} from '../api/apiService'; // defaults to localStorage for web

//import monitorReducersEnhancer from './enhancers/monitorReducers';
//import loggerMiddleware from './middleware/logger';
const reduxDebugger = require('redux-flipper-colorized').default;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);
const rootReducer = {
  app: persistedReducer,
  [appApi.reducerPath]: appApi.reducer,
};

export default function configureAppStore() {
  let store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      let mw = getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      });
      mw.push(appApi.middleware);
      if (__DEV__) {
        mw.push(reduxDebugger());
        console.log(mw);
      }
      return mw;
    },
    //preloadedState: defaultState,
    //enhancers: [monitorReducersEnhancer],
  });

  /*if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(appReducer));
  }*/

  let persistor = persistStore(store);

  return {store, persistor};
}

export type RootState = {app: ReturnType<typeof persistedReducer>};
