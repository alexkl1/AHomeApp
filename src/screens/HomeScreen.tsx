import React from 'react';
import {Text, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import MainTabParams from '../navigation/MainTabParams';

type ScreenProps = BottomTabScreenProps<MainTabParams, 'Home', 'Home'>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainScreen = ({navigation, route}: ScreenProps) => {
  return (
    <View style={{flex: 1, marginTop: 100}}>
      <Text>Main screen setup {route.name} </Text>
    </View>
  );
};

export default MainScreen;
