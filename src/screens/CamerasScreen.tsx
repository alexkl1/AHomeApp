import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import MainTabParams from '../navigation/MainTabParams';
import AppScreen from '../components/ui/AppScreen';
import useTranslations from '../hooks/useTranslations';
import {useSelector} from 'react-redux';
import NoCameras from '../components/ui/cameras/NoCameras';

type ScreenProps = BottomTabScreenProps<MainTabParams, 'Cameras', 'Cameras'>;
type cameraState = {
  cameras: [] | null;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CamerasScreen = ({navigation, route}: ScreenProps) => {
  const T = useTranslations();
  const cameras = useSelector((state: cameraState) => state?.cameras);

  if (!(cameras && cameras?.length > 1)) {
    return (
      <View style={styles.center}>
        <NoCameras />
      </View>
    );
  }
  return (
    <AppScreen title={T.Screen_Cameras}>
      <View style={styles.flex1}>
        <Text>Cameras screen here ... </Text>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  flex1: {flex: 1},
});

export default CamerasScreen;
