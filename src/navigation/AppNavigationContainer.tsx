import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './RootStackNavigator';

const AppNavigationContainer = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
