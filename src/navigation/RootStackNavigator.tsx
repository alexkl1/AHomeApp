import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootStackParams from './RootStackParams';
import MainTabNavigator from './MainTabNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../store/configureStore';
import InitialSetupScreen from '../screens/InitialSetupScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator<RootStackParams>();

const RootStackNavigator = () => {
  const firstScreen = useSelector((state: RootState) => state?.app.authToken)
    ? 'Main'
    : 'Login';
  console.log(`Initial screen = ${firstScreen}`);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={firstScreen}>
      <Stack.Screen name="InitialSetup" component={InitialSetupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
