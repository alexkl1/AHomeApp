import React from 'react';
import {Text, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import MainTabParams from '../navigation/MainTabParams';

type ScreenProps = BottomTabScreenProps<MainTabParams, 'Settings', 'Settings'>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SettingsScreen = ({navigation, route}: ScreenProps) => {
    console.log("settings");
  return (
    <View style={{flex: 1, marginTop: 100}}>
      <Text>Settings screen</Text>
    </View>
  );
};

export default SettingsScreen;
