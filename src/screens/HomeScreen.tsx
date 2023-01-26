import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import MainTabParams from '../navigation/MainTabParams';
import AppScreen from '../components/ui/AppScreen';
import HomeSensors from '../components/ui/sensors/HomeSensors';
import useTranslations from '../hooks/useTranslations';
import HomeCameras from '../components/ui/cameras/HomeCameras';
import {Text} from '@rneui/themed';

type ScreenProps = BottomTabScreenProps<MainTabParams, 'Home', 'Home'>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomeScreen = ({navigation, route}: ScreenProps) => {
  const T = useTranslations();
  return (
    <AppScreen title={T.Screen_Home}>
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Text h4>Temp...</Text>
          <HomeSensors />
        </View>
        <View style={styles.bottomCams}>
          <Text h4>Cams...</Text>
          <HomeCameras />
        </View>
      </View>
    </AppScreen>
  );
};
const styles = StyleSheet.create({
  flex1: {flex: 1},
  bottomCams: {minHeight: 150},
  flex3: {flex: 3},
  container: {flex: 1, justifyContent: 'space-between'},
});
export default HomeScreen;
export type {ScreenProps};
