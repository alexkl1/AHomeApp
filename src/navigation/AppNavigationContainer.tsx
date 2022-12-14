import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import RootStackParams from './RootStackParams';
import InitialSetupScreen from '../screens/InitialSetupScreen';
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator();

const RootStack = createNativeStackNavigator<RootStackParams>();

const AppNavigationContainer = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Main">
        <Stack.Screen name="InitialSetup" component={InitialSetupScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
