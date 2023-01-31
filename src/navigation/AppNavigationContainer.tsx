import React from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './RootStackNavigator';

const AppNavigationContainer = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
