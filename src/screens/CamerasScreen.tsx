import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import MainTabParams from '../navigation/MainTabParams';
import AppScreen from '../components/ui/AppScreen';
import useTranslations from '../hooks/useTranslations';
import NoCameras from '../components/ui/cameras/NoCameras';
import Swiper from 'react-native-swiper';
import {useGetCamerasQuery} from '../api/apiService';
import CameraView from '../components/ui/cameras/CameraView';

type ScreenProps = BottomTabScreenProps<MainTabParams, 'Cameras', 'Cameras'>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CamerasScreen = ({navigation, route}: ScreenProps) => {
  const T = useTranslations();
  const {data} = useGetCamerasQuery(null);
  //const [isFullScreen, setFullScreen] = useState(false);

  if (!(data && data?.length > 1)) {
    return (
      <View style={styles.center}>
        <NoCameras />
      </View>
    );
  }

  const activeCameraIdx = route?.params?.activeCameraId
    ? data.findIndex(i => i?.id === route.params.activeCameraId)
    : 0;
  const swiperKey = 'swiper_' + activeCameraIdx.toString();
  //console.log("Active idx = ",activeCameraIdx, "rparama=",route?.params?.activeCameraId);
  return (
    <AppScreen title={T.Screen_Cameras}>
      <View style={styles.flex1}>
        <Swiper key={swiperKey} showsButtons={true} index={activeCameraIdx}>
          {data?.map(i => (
            <CameraView key={'cview' + i?.id.toString()} cameraId={i?.id} />
          ))}
        </Swiper>
        {/*<View style={styles.bottomBox}>
          <Text h5>{T.Last_Update}: </Text>
        </View>*/}
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  flex1: {flex: 1},
  viewBox: {
    width: 100,
    height: 100,
  },
  bottomBox: {
    //height: 50
  },
});

export default CamerasScreen;
