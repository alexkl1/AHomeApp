import React from 'react';
import {View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import MainTabParams from '../navigation/MainTabParams';
import AppScreen from '../components/ui/AppScreen';
import HomeSensors from '../components/ui/sensors/HomeSensors';
import useTranslations from '../hooks/useTranslations';
import HomeCameras from '../components/ui/cameras/HomeCameras';

type ScreenProps = BottomTabScreenProps<MainTabParams, 'Home', 'Home'>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MainScreen = ({navigation, route}: ScreenProps) => {
  const T = useTranslations();
  return (
    <AppScreen title={T.Screen_Home}>
      <View style={{flex: 3}}>
        <HomeSensors />
      </View>
      <View style={{flex: 1}}>
        <HomeCameras />
      </View>
    </AppScreen>
  );
};

export default MainScreen;
