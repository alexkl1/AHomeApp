/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppNavigationContainer from './src/navigation/AppNavigationContainer';
import {createTheme, ThemeProvider} from '@rneui/themed';
import {Provider} from 'react-redux';
import configureAppStore from './src/store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import axios from 'axios';
import Config from 'react-native-config';

const {store, persistor} = configureAppStore();

const theme = createTheme({
  lightColors: {
    primary: '#516fb9',
  },
  darkColors: {
    primary: '#204183',
  },
  mode: 'dark',
});

const App = () => {
  //const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : Colors.lighter,
    flex: 1,
  };

  /**
   * Android additional ping server before usage
   */
  useEffect(() => {
    console.log('Api ping');
    axios.get(Config?.API_URL + '/check').then(() => {
      console.log('Api ping succeeded');
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <AppNavigationContainer />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};
export default App;
