import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainTabParams from './MainTabParams';
import CamerasScreen from '../screens/CamerasScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator<MainTabParams>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cameras" component={CamerasScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
