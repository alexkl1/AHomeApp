import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainTabParams from './MainTabParams';
import CamerasScreen from '../screens/CamerasScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {Icon} from '@rneui/themed';

const Tab = createBottomTabNavigator<MainTabParams>();

const screenOptions = ({route}: {route: {name: string}}) => ({
  headerShown: false,
  tabBarIcon: ({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: number | string;
    size: number | undefined;
  }) => {
    let iconName: string = '';

    if (route.name === 'Home') {
      iconName = focused
        ? 'ios-information-circle'
        : 'ios-information-circle-outline';
    } else if (route.name === 'Settings') {
      iconName = focused ? 'settings' : 'settings-outline';
    } else if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'Cameras') {
      iconName = focused ? 'camera' : 'camera-outline';
    }

    // You can return any component that you like here!
    return <Icon type="ionicon" name={iconName} size={size} color={color} />;
  },
});

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cameras" component={CamerasScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
