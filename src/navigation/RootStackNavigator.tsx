import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootStackParams from './RootStackParams';
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator<RootStackParams>();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Main">
      {/* <Stack.Screen name="InitialSetup" component={InitialSetupScreen} /> */}
      <Stack.Screen name="Main" component={MainTabNavigator} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
