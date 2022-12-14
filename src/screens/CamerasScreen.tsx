import React from 'react';
import {Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParams from '../navigation/RootStackParams';

type ScreenProps = NativeStackScreenProps<RootStackParams, 'Main', 'Main'>;
const CamerasScreen = ({navigation, route}: ScreenProps) => {
  return (
    <View style={{flex: 1, marginTop: 100}}>
      <Text>Cameras screen here ... </Text>
    </View>
  );
};

export default CamerasScreen;
