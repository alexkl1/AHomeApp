// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';
import React from 'react';
// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.useFakeTimers();
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    get: jest.fn(() => null),
    set: jest.fn(() => null),
  };
});

jest.mock('@rneui/themed', () => ({
  // AirbnbRating: jest.fn()
  Input: jest.fn(() => <></>),
  Icon: jest.fn(() => <></>),
  createTheme: jest.fn(() => {}),
  ThemeProvider: jest.fn(({children}) => <>{children}</>),
}));

/*jest.mock('@rneui/themed',()=>{
  const Module = {};
  module.Icon = null;
  return Module;
});*/
// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
