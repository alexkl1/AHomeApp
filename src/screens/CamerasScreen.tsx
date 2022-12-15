import React from 'react';
import {Text, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import MainTabParams from '../navigation/MainTabParams';

type ScreenProps = BottomTabScreenProps<MainTabParams, 'Cameras', 'Cameras'>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CamerasScreen = ({navigation, route}: ScreenProps) => {
  return (
    <View style={{flex: 1, marginTop: 100}}>
      <Text>Cameras screen here ... </Text>
    </View>
  );
};

export default CamerasScreen;
