import React from 'react';
import {Text, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import MainTabParams from '../navigation/MainTabParams';
import {Button} from '@rneui/themed';

type ScreenProps = BottomTabScreenProps<MainTabParams, 'Settings', 'Settings'>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SettingsScreen = ({navigation, route}: ScreenProps) => {
  console.log('settings');
  console.log('test');

  const onPress = () => {
    console.log('Presss');
    console.log('rss');
  };

  return (
    <View style={{flex: 1, marginTop: 100}}>
      <Text>Settings screen</Text>
      <Button title={'test'} onPress={onPress} />
    </View>
  );
};

export default SettingsScreen;
