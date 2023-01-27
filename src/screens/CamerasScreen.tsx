import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import MainTabParams from '../navigation/MainTabParams';
//import useTranslations from '../hooks/useTranslations';
import NoCameras from '../components/ui/cameras/NoCameras';
import {useGetCamerasQuery} from '../api/apiService';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Cameras} from '../api/apiTypes';
import FullScreenCamera from '../components/ui/cameras/FullScreenCamera';
import CamerasLandscape from '../components/segments/CamerasLandscape';
import CamerasPortrait from '../components/segments/CamerasPortrait';

type ScreenProps = BottomTabScreenProps<MainTabParams, 'Cameras', 'Cameras'>;

const CamerasScreen = ({navigation, route}: ScreenProps) => {
  //const T = useTranslations();
  const {data} = useGetCamerasQuery(null);
  const {width, height} = useWindowDimensions();
  const isLandscape = width > height;
  const [isFullScreen, setFullScreen] = useState<boolean>(false);
  const [fullScreenCameraId, setFullScreenCameraId] = useState<string | null>(
    null,
  );
  //const prevActiveCameraId = usePrevious(route?.params?.activeCameraId ?? 0);

  /**
   * change default camera on screen change
   */
  /*useEffect(() => {
    console.log(
      `prev=${prevActiveCameraId} cur=${route?.params?.activeCameraId}`,
    );
    if (
      prevActiveCameraId &&
      data &&
      prevActiveCameraId !== route.params.activeCameraId
    ) {
      const newIndex = findCameraIndex(data, route.params.activeCameraId ?? '');
      setCurIndex(newIndex);
      setFullScreen(false);
      console.log(
        'Route param changed to ',
        route.params.activeCameraId,
        ' newIndex = ',
        newIndex,
      );
    }
  }, [data, prevActiveCameraId, route.params?.activeCameraId]);
  */

  const onEnableFullScreen = (cameraId: string) => {
    setFullScreen(true);
    setFullScreenCameraId(cameraId);
  };
  // toogle fullscreen
  const onDisableFullScreen = useCallback(() => {
    setFullScreen(false);
    setFullScreenCameraId(null);
  }, []);

  /**
   * change orientation effect
   */
  useEffect(() => {
    console.log(`Orientation changed. Landscape = ${isLandscape}`);
  }, [isLandscape]);

  // show no cameras component
  if (!(data && data?.length > 1)) {
    return (
      <View style={styles.center}>
        <NoCameras />
      </View>
    );
  }

  //console.log('cards = ', cards);
  //console.log('Current index: ', curIndex, ' key=', swiperKey);

  //console.log("Active idx = ",activeCameraIdx, "rparama=",route?.params?.activeCameraId);
  console.log(`isFullScreen = ${isFullScreen}`);

  return isFullScreen && fullScreenCameraId ? (
    <FullScreenCamera
      onClick={onDisableFullScreen}
      cameraId={fullScreenCameraId}
    />
  ) : isLandscape ? (
    <CamerasLandscape
      navigation={navigation}
      onFullScreen={onEnableFullScreen}
      route={route}
    />
  ) : (
    <CamerasPortrait
      navigation={navigation}
      onFullScreen={onEnableFullScreen}
      route={route}
    />
  );
};

const styles = StyleSheet.create({
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default CamerasScreen;
