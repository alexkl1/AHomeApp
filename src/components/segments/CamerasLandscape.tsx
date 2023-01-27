/**
 * Landscape mode cameras
 * Create swipable list
 */
//import useTranslations from '../../hooks/useTranslations';
import {useGetCamerasQuery} from '../../api/apiService';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import MainTabParams from '../../navigation/MainTabParams';
import React, {useCallback, useRef} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import Swiper from 'react-native-swiper';
import CameraSwipeSlide from '../ui/cameras/CameraSwipeSlide';
import useCameraIndex from '../../hooks/useCameraIndex';

type ScreenProps = BottomTabScreenProps<MainTabParams, 'Cameras', 'Cameras'> & {
  onFullScreen: (id: string) => void;
};

const CamerasLandScape = ({route}: ScreenProps) => {
  //const T = useTranslations();
  const {data} = useGetCamerasQuery(null);

  const {width} = useWindowDimensions();
  const swiperRef = useRef(null);
  const defaultCameraIndex = useCameraIndex(
    data,
    route?.params?.activeCameraId ?? undefined,
  );

  const curIndex = useRef(
    data && route?.params?.activeCameraId ? defaultCameraIndex : 0,
  );
  /*const [curIndex, setCurIndex] = useState<number>(
    data && route?.params?.activeCameraId ? defaultCameraIndex : 0,
  );*/

  // create swiper cards
  const cards = data?.map(i => (
    <CameraSwipeSlide
      onClick={() => {
        onClick();
      }}
      key={'cview' + i?.id.toString() + '_' + width.toString()}
      cameraId={i?.id}
    />
  ));

  /** full screen toggle
   *
   */
  const onClick = () => {
    console.log('onclick');
    if (data) {
      //const currentIndex = curIndex.current;
      //console.log(`index = ${currentIndex}`);
      //onFullScreen(data[currentIndex].id);
    }
  };

  const onIndexChanged = useCallback((newIndex: number) => {
    //setCurIndex(newIndex);
    curIndex.current = newIndex;
  }, []);
  const swiperKey = 'swiper';

  if (!data) {
    return null;
  }

  console.log('render');
  return (
    <View style={styles.flex1}>
      <Swiper
        key={swiperKey}
        showsButtons={true}
        ref={swiperRef}
        index={curIndex.current}
        onIndexChanged={onIndexChanged}>
        {cards}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  flex1: {flex: 1},
  viewBox: {
    width: 100,
    height: 100,
  },
  portraitContainer: {
    flex: 1,
    //width: '100%',
    backgroundColor: 'gray',
    //flexDirection: 'column',
  },
  bottomBox: {
    //height: 50
  },
});

export default CamerasLandScape;
