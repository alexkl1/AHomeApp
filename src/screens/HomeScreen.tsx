import React from 'react';
import {Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParams from '../navigation/RootStackParams';

type ScreenProps = NativeStackScreenProps<RootStackParams, 'Main', 'Main'>;
const MainScreen = ({navigation, route}: ScreenProps) => {
  return (
    <View style={{flex: 1, marginTop: 100}}>
      <Text>Main screen setup {route.name} </Text>
    </View>
  );
};

export default MainScreen;
