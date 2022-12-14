import React from 'react';
import {Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParams from '../navigation/RootStackParams';

type ScreenProps = NativeStackScreenProps<RootStackParams, 'InitialSetup'>;
const InitialSetupScreen = ({route, navigation}: ScreenProps) => {
  console.log('Render initial screen');
  return <Text>Initial setup {route.name} </Text>;
};

export default InitialSetupScreen;
