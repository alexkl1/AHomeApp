import React from 'react';
import {Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParams from '../navigation/RootStackParams';
import AppScreen from '../components/ui/AppScreen';

type ScreenProps = NativeStackScreenProps<
  RootStackParams,
  'InitialSetup',
  'InitialSetup'
>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const InitialSetupScreen = ({route, navigation}: ScreenProps) => {
  console.log('Render initial screen');
  return (
    <AppScreen title={'Initial'}>
      <Text>Initial setup {route.name} </Text>;
    </AppScreen>
  );
};

export default InitialSetupScreen;
